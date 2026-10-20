-- Taalmo School Finance seed for a disposable PostgreSQL database only.
-- DO NOT execute against production. Deterministic educational fixture.
BEGIN;
CREATE SCHEMA IF NOT EXISTS school;
DROP TABLE IF EXISTS school.payments;
DROP TABLE IF EXISTS school.invoices;
DROP TABLE IF EXISTS school.students;
CREATE TABLE school.students (
  student_id BIGINT PRIMARY KEY,
  full_name TEXT NOT NULL,
  grade TEXT NOT NULL,
  is_active BOOLEAN NOT NULL,
  enrolled_at DATE NOT NULL
);
CREATE TABLE school.invoices (
  invoice_id BIGINT PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES school.students(student_id),
  period_month DATE NOT NULL,
  due_date DATE NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  CONSTRAINT invoice_student_month_uniq UNIQUE (student_id,period_month)
);
CREATE TABLE school.payments (
  payment_id BIGINT PRIMARY KEY,
  invoice_id BIGINT NOT NULL REFERENCES school.invoices(invoice_id),
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  status TEXT NOT NULL CHECK (status IN ('succeeded','pending','failed')),
  paid_at TIMESTAMPTZ NULL
);
INSERT INTO school.students VALUES
 (1,'Alya Putri','SD',true,'2023-07-11'),
 (2,'Bima Pratama','SD',true,'2023-07-11'),
 (3,'Citra Rahma','SMP',true,'2021-07-10'),
 (4,'Danu Saputra','SD',false,'2022-07-12'),
 (5,'Elina Zahra','TK',true,'2024-07-15'),
 (6,'Farhan Hasan','SMP',true,'2021-07-10');
INSERT INTO school.invoices VALUES
 (101,1,'2026-08-01','2026-08-10',500000),
 (102,1,'2026-09-01','2026-09-10',500000),
 (103,2,'2026-08-01','2026-08-10',450000),
 (104,2,'2026-09-01','2026-09-10',450000),
 (105,3,'2026-08-01','2026-08-10',650000),
 (106,3,'2026-09-01','2026-09-10',650000),
 (107,4,'2026-08-01','2026-08-10',450000),
 (108,5,'2026-09-01','2026-09-10',400000),
 (109,6,'2026-08-01','2026-08-10',650000),
 (110,6,'2026-09-01','2026-09-10',650000);
INSERT INTO school.payments VALUES
 (201,101,500000,'succeeded','2026-08-05 03:00:00+00'),
 (202,102,200000,'succeeded','2026-09-07 03:00:00+00'),
 (203,103,250000,'succeeded','2026-08-09 03:00:00+00'),
 (204,103,200000,'succeeded','2026-08-12 03:00:00+00'),
 (205,104,450000,'pending',NULL),
 (206,105,650000,'failed',NULL),
 (207,106,500000,'succeeded','2026-09-08 03:00:00+00'),
 (208,107,450000,'succeeded','2026-08-09 03:00:00+00'),
 (209,109,300000,'succeeded','2026-08-08 03:00:00+00'),
 (210,109,350000,'succeeded','2026-08-11 03:00:00+00'),
 (211,110,650000,'succeeded','2026-09-06 03:00:00+00');
COMMIT;
-- Known answers to validate first course labs:
-- 6 students, 10 invoices, 11 payments.
-- Total billed = 5,350,000.00
-- Total succeeded = 3,400,000.00 (pending and failed ignored).
-- Outstanding = 1,950,000.00
-- Caution: never aggregate billed and paid on a direct invoice JOIN without
-- preaggregating successful payments first; one-to-many duplicates billed.
-- Invoice 102 remaining 300,000; invoice 103 fully paid via two installments.
-- Invoice 104 remains 450,000 despite pending payment record.
-- Invoice 105 remains 650,000 despite failed payment record.
