# Taalmo Database Zero to Master — Paket untuk Codex

**Tersedia**
- `PROMPT_UNTUK_CODEX.md` — tempel ke Codex saat repository Taalmo dibuka.
- `KURIKULUM_DATABASE_ZERO_TO_MASTER.md` — dokumen kurikulum 42 pekan, 10 level, 40 modul, 120 lesson blueprint, flow belajar, rubrik, golden example.
- `curriculum-blueprint.json` — katalog terstruktur / source of truth untuk stable IDs, learning goal dan aktivitas, prerequisite, gating.
- `school_finance_seed.sql` — fixture PostgreSQL yang hanya boleh dijalankan pada database sandbox/disposable.

## Cara pakai
1. Taruh keempat file di dalam repository Taalmo, misalnya folder `curriculum/database-zero-to-master/`.
2. Buka Codex di root repository. Berikan isi `PROMPT_UNTUK_CODEX.md` sebagai instruksi.
3. Minta Codex melakukan audit existing architecture sebelum menyentuh fitur, lalu mengadaptasi blueprint ke content model yang sudah ada.
4. Verifikasi bahwa konten berstatus `published` memang memiliki lesson body, soal, aktivitas, dan validator; metadata saja tidak cukup.
5. Jangan jalankan SQL seed pada production.

## Ketentuan kejujuran status
120 lesson di JSON adalah **blueprint rinci**, bukan 120 pelajaran penuh yang langsung bisa dipublish tanpa authoring. Codex bertugas mengembangkan setiap blueprint menjadi pengajaran lengkap, quiz dan exercise yang berfungsi, beserta tests. Prompt mengizinkan batch pekerjaan bertahap jika semuanya tak bisa diselesaikan dalam satu pass; unfinished lesson harus tetap `draft`.
