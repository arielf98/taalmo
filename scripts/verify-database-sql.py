"""Verify trusted authored examples on a fresh PostgreSQL 17 container, never a supplied DB URL."""
import argparse
import csv
import io
import json
import re
from pathlib import Path
import subprocess
import time
import uuid

root = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--context', default='default', help='Docker context with local postgres:17-alpine image')
args = parser.parse_args()
name = 'taalmo-curriculum-check-' + uuid.uuid4().hex[:12]
docker = ['docker', '--context', args.context]

def run(command, **kwargs):
    return subprocess.run(command, text=True, capture_output=True, check=True, timeout=60, **kwargs).stdout

def sql(query):
    return run(docker + ['exec', '-i', name, 'psql', '-h', '127.0.0.1', '-X', '-q', '--csv', '-P', 'null=__TAALMO_NULL__', '-v', 'ON_ERROR_STOP=1', '-v', 'VERBOSITY=verbose', '-U', 'postgres', '-d', 'taalmo_curriculum_check'], input="SET statement_timeout='5s'; SET TIME ZONE 'UTC'; SET datestyle='ISO, YMD';\n"+query)

def transaction(query):
    return query if re.search(r'\b(?:BEGIN|COMMIT|ROLLBACK)\s*;', query, re.I) else 'BEGIN;\n' + query + '\nROLLBACK;'

seed = (root/'curriculum/taalmo-database-zero-to-master/school_finance_seed.sql').read_text()
lessons = sum([json.loads((root/f'src/content/database/{file}.json').read_text()) for file in ['l0','l1-query','l1-mutation','l2-subqueries','l2-windows','l2-time-reports','l2-correctness','l3-modeling','l3-normalization','l3-types-constraints','l3-evolution','l4-acid','l4-isolation','l4-concurrency','l4-payments','l4-side-effects','l5-planner','l5-indexes','l5-joins-rewrite','l5-large-data','l5-tuning','l6-storage','l6-wal','l6-vacuum','l6-observability','l7-releases','l7-backup-recovery','l7-replication','l7-operations','l8-caching','l8-partitioning-tenancy','l8-distributed','l8-data-stores','l9-ledger-design','l9-load-failure']], [])
try:
    run(docker + ['run', '--pull=never', '-d', '--name', name, '--label', 'taalmo.curriculum-check=true', '--network', 'none', '--memory', '512m', '--cpus', '1', '-e', 'POSTGRES_HOST_AUTH_METHOD=trust', '-e', 'POSTGRES_DB=taalmo_curriculum_check', 'postgres:17-alpine', 'postgres', '-c', 'shared_buffers=32MB', '-c', 'max_connections=10'])
    for _ in range(100):
        ready = subprocess.run(docker + ['exec', name, 'pg_isready', '-h', '127.0.0.1', '-U', 'postgres'], capture_output=True, timeout=5)
        if ready.returncode == 0:
            break
        time.sleep(.2)
    else:
        raise RuntimeError('Disposable PostgreSQL did not become ready')
    print(sql('SELECT version();').strip())
    for lesson in lessons:
        worked = lesson['worked']
        sql(seed)
        protected_table = {'l1m05l01':'lesson_students','l1m05l02':'lesson_invoices'}.get(lesson['id'])
        if protected_table:
            sql(f'CREATE TABLE public.{protected_table} (sentinel integer); INSERT INTO public.{protected_table} VALUES (42);')
        actual = list(csv.reader(io.StringIO(sql(transaction(worked.get('setupSql','') + '\n' + worked['sql'])))))
        expected = [worked['columns']] + [[value if value is not None else '__TAALMO_NULL__' for value in row] for row in worked['rows']]
        if not worked.get('ordered', False):
            actual = actual[:1] + sorted(actual[1:])
            expected = expected[:1] + sorted(expected[1:])
        if actual != expected:
            raise AssertionError(f"{lesson['id']} worked result mismatch\nexpected: {expected}\nactual: {actual}")
        # Independent fresh fixture per reference solution; no learner SQL is accepted.
        sql(seed)
        expected_error = lesson['activity'].get('solutionError')
        try:
            sql(transaction(worked.get('setupSql','') + '\n' + lesson['activity']['solutionSql']))
        except subprocess.CalledProcessError as error:
            if not expected_error or expected_error not in error.stderr:
                raise
        else:
            if expected_error:
                raise AssertionError(f"{lesson['id']}: expected SQLSTATE {expected_error}")
        if protected_table:
            guard = sql(f'SELECT sentinel FROM public.{protected_table};')
            if list(csv.reader(io.StringIO(guard))) != [['sentinel'], ['42']]:
                raise AssertionError('Lesson setup touched a persistent namesake table')
        print(lesson['id'] + ': worked rows and reference SQL passed')
    sql(seed)
    failures = [
        ("23514", "INSERT INTO school.invoices VALUES (999,1,DATE '2027-01-01',DATE '2027-01-10',-1);"),
        ("23503", "INSERT INTO school.invoices VALUES (999,999,DATE '2027-01-01',DATE '2027-01-10',100);"),
        ("23505", "INSERT INTO school.invoices VALUES (999,1,DATE '2026-08-01',DATE '2026-08-10',100);"),
        ("23514", "INSERT INTO school.payments VALUES (999,101,0,'succeeded',NULL);"),
    ]
    for state, query in failures:
        try:
            sql(transaction(query))
        except subprocess.CalledProcessError as error:
            if state not in error.stderr:
                raise
        else:
            raise AssertionError(f'Expected invariant rejection SQLSTATE {state}')
    cases = [
        ("SELECT NULL = NULL AS comparison, NULL IS NULL AS missing, 5 NOT IN (1,NULL) AS anti;", [['comparison','missing','anti'],['__TAALMO_NULL__','t','__TAALMO_NULL__']]),
        ("SELECT i.invoice_id, i.amount-COALESCE(SUM(p.amount) FILTER (WHERE p.status='succeeded'),0) AS outstanding FROM school.invoices i LEFT JOIN school.payments p ON p.invoice_id=i.invoice_id WHERE i.invoice_id IN (102,103,104,105,108) GROUP BY i.invoice_id ORDER BY i.invoice_id;", [['invoice_id','outstanding'],['102','300000.00'],['103','0.00'],['104','450000.00'],['105','650000.00'],['108','400000.00']]),
        ("SELECT SUM(i.amount) AS inflated_billed FROM school.invoices i LEFT JOIN school.payments p ON p.invoice_id=i.invoice_id;", [['inflated_billed'],['6450000.00']]),
        ("SELECT SUM(amount) AS billed FROM school.invoices;", [['billed'],['5350000.00']]),
        ("SELECT SUM(amount) AS paid FROM school.payments WHERE status='succeeded';", [['paid'],['3400000.00']]),
        ("SELECT s.student_id FROM school.students s WHERE NOT EXISTS (SELECT 1 FROM school.invoices i JOIN school.payments p ON p.invoice_id=i.invoice_id WHERE i.student_id=s.student_id AND p.status='succeeded') ORDER BY s.student_id;", [['student_id'],['5']]),
        ("SELECT EXISTS (SELECT NULL) AS exists_null, 5 NOT IN (SELECT x FROM (VALUES (1),(NULL)) v(x)) AS not_in_null, NOT EXISTS (SELECT 1 FROM (VALUES (1),(NULL)) v(x) WHERE x=5) AS anti_null, 5 IN (SELECT x FROM (VALUES (1)) v(x) WHERE false) AS in_empty;", [['exists_null','not_in_null','anti_null','in_empty'],['t','__TAALMO_NULL__','t','f']]),
        ("WITH billed AS (SELECT SUM(amount) AS amount FROM school.invoices), received AS (SELECT SUM(amount) AS amount FROM school.payments WHERE status='succeeded') SELECT b.amount AS billed, r.amount AS paid, b.amount-r.amount AS outstanding FROM billed b CROSS JOIN received r;", [['billed','paid','outstanding'],['5350000.00','3400000.00','1950000.00']]),
        ("WITH aug AS (SELECT DISTINCT i.student_id FROM school.invoices i JOIN school.payments p USING (invoice_id) WHERE p.status='succeeded' AND p.paid_at >= TIMESTAMPTZ '2026-08-01 00:00:00+00' AND p.paid_at < TIMESTAMPTZ '2026-09-01 00:00:00+00'), sep AS (SELECT DISTINCT i.student_id FROM school.invoices i JOIN school.payments p USING (invoice_id) WHERE p.status='succeeded' AND p.paid_at >= TIMESTAMPTZ '2026-09-01 00:00:00+00' AND p.paid_at < TIMESTAMPTZ '2026-10-01 00:00:00+00') SELECT (SELECT COUNT(*) FROM (SELECT * FROM aug UNION SELECT * FROM sep) u) AS either, (SELECT COUNT(*) FROM (SELECT * FROM aug UNION ALL SELECT * FROM sep) u) AS combined, (SELECT string_agg(student_id::text,',' ORDER BY student_id) FROM (SELECT * FROM aug INTERSECT SELECT * FROM sep) u) AS both, (SELECT string_agg(student_id::text,',' ORDER BY student_id) FROM (SELECT * FROM aug EXCEPT SELECT * FROM sep) u) AS august_only;", [['either','combined','both','august_only'],['5','7','1,6','2,4']]),
    ]
    for query, expected in cases:
        actual = list(csv.reader(io.StringIO(sql(query))))
        if actual != expected:
            raise AssertionError(f'Fixture edge case mismatch: {actual} != {expected}')
    print(f'Fixture integrity passed: {len(failures)} rejected mutations, {len(cases)} semantic edge cases, persistent namesake tables preserved.')
    print(f'PostgreSQL verification passed: {len(lessons)} worked results and {len(lessons)} reference solutions; disposable container removed on exit.')
except subprocess.CalledProcessError as error:
    print(error.stderr)
    raise
finally:
    subprocess.run(docker + ['rm', '-f', '-v', name], text=True, capture_output=True, timeout=30)
