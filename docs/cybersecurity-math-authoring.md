# Authoring Matematika Cybersecurity

## Sumber dan batas publikasi

Blueprint ada di [kurikulum](../curriculum/cybersecurity-math/README.md), kontrak produk di [desain](superpowers/specs/2026-11-07-cybersecurity-math-design.md), dan urutan kerja di [backlog](cybersecurity-math-tasks.md). Saat rilis fondasi, hanya L0M01 yang authored: 3 lesson, 2 × 5 soal modul, dan task/rubrik. Level assessment belum authored; 117 lesson target lain tetap draft.

`src/content/cybersecurity-math/catalog.ts` adalah metadata bilingual seluruh target; `foundation.ts` memuat tiga lesson lengkap dan dua set soal modul; `types.ts` mendefinisikan kontrak konten. Publikasi diturunkan dari keberadaan konten lengkap, bukan flag yang diisi untuk stub. Karena itu, jangan memasukkan objek konten parsial ke map authored. Route `[lessonId]` hanya menghasilkan static params untuk konten terbit dan menolak draft/ID tidak dikenal.

`Copy` menyimpan pasangan teks `{ id, en }` yang dipilih dengan preferensi `useLocale` yang sama dengan aplikasi. UI menggunakan pasangan bilingual langsung; satu label menu memakai kamus `messages.ts`. Penggantian locale tidak mengganti ID atau isi angka contoh. Saat menerjemahkan, pertahankan angka, set soal, urutan pilihan, asumsi, dan makna feedback.

## Kontrak lesson saat ini

Setiap `MathLessonContent` memiliki hook, objective, prediction, exploration, explanation, worked steps/result, tiga practice (dua variasi + edge), tiga hint, transfer, reflection, serta dua set checkpoint berisi tiga soal. Setiap `MathQuestion` memiliki jawaban angka eksak, solusi, feedback salah umum, optional feedback untuk nilai salah tertentu, dan optional penanda critical.

Visual yang sudah tersedia: `count` (dua kelompok dijumlahkan), `groups` (kelompok sama besar), dan `division` (hasil bagi/sisa). Setiap aktivitas menentukan initial, target, instruksi aksi, dan soal pengamatan. Pengguna harus mencapai target dan menjawab pengamatan dengan benar. Mengubah input membatalkan jawaban pengamatan aktif. Tidak membuat jenis visual universal; tambahkan bentuk yang sesuai ketika modul baru memerlukannya.

Rentang L0M01: count/groups 0–8 per kontrol; division total 0–24 dan divisor 1–8. Jawaban saat ini hanya integer −1.000.000 sampai 1.000.000, kolom kosong ditolak. Belum ada comparator pecahan/desimal, parser ekspresi, atau bigint. CM-02 dan modul lanjutan harus menambahkan kontrak/validasi yang relevan sebelum dipublikasikan, tanpa memaksakan angka pecahan ke grader integer.

## Progres dan penilaian

`src/lib/cybersecurity-math.ts` mengelola parser, angka, mastery dan prasyarat; `cybersecurity-math-progress.ts` menangani browser storage. Seluruh write matematika hanya menuju `taalmo.cybersecurity-math.progress.v1`. Record memakai `id@contentVersion`; versi publikasi pertama `1.0.0`. Jangan mengubah key/ID database untuk mendukung materi matematika.

Lesson resmi berurutan; modul berikutnya memerlukan checkpoint modul sebelumnya. Belum ada level assessment dan perpindahan level resmi tetap tertutup sampai engine/konten assessment level ditambahkan dalam pekerjaan L0 lengkap. Teori published dapat dipreview tanpa menulis progres; setelah unlock, jawaban preview tidak dipromosikan menjadi kelulusan.

Mastery dihitung ulang dari jawaban yang sesuai konten, target eksplorasi, latihan, refleksi terisi, set checkpoint yang telah dilihat, dan timestamp completion. Catatan transfer opsional. Record passed disimpan sebagai snapshot dan tidak ditimpa retake. Parser menolak snapshot yang tidak lagi memenuhi aturan jawaban atau flag bukti yang bertipe salah. Kelulusan hanya untuk versi konten yang aktif; record versi terdahulu disimpan sebagai JSON pasif di `history`, tanpa menyaring jawaban memakai soal versi baru dan tanpa menyetarakannya dengan mastery aktif.

Solusi checkpoint yang dibuka memblokir tombol finish untuk attempt itu; pilih set lain untuk melanjutkan. Membuka hint ketiga/solusi latihan juga berpindah ke set checkpoint lain dan menghapus jawaban checkpoint aktif, tanpa menghapus latihan/refleksi. Retake mempertahankan riwayat bantuan dan menandai set yang benar-benar pernah dilihat; restart sebelum melihat checkpoint tidak menandainya sebagai telah dilihat. Setelah dua set pernah dilihat, latihan tetap bisa memberi progres formatif; tidak diklaim sebagai assessment independen atau terproteksi.

Catatan transfer/refleksi maksimal 6.000 karakter masing-masing. Draf task modul maksimal 20.000, dapat ditulis setelah checkpoint modul; perubahan draf mengembalikan status dari siap direview menjadi draf. Nilai rubrik/review manusia tidak dihasilkan otomatis. Task dan proof tidak mengunci progres lesson.

Resume menyimpan step terakhir melalui interaksi atau tombol navigasi; input angka yang belum diperiksa tidak disimpan sebagai jawaban. Write terbaru memakai ulang records dari storage yang ada, tetapi dua tab yang menulis bersamaan masih dapat saling menimpa. Write gagal memakai memory fallback dan pemberitahuan; mencoba perubahan baru sesudah storage diaktifkan akan mencoba save lagi.

## Review tiap modul

1. Telusuri semua judul/ID/prasyarat dan route; pastikan draft tidak punya link peluncuran.
2. Baca derivasi hasil, unit, asumsi, edge case, dan feedback per miskonsepsi dalam kedua bahasa.
3. Baca grader/parser/write path, invalidasi jawaban, assistance, snapshot retake, dan locked preview.
4. Baca kontrol keyboard/label, alternatif tabel/teks, tema, wrapping navigasi, dan bounds.
5. Perbarui jumlah terbit/rencana, README, roadmap, backlog, dan evidence; commit modul lengkap lalu push.

Ini source/diff review. Jangan membuat unit test, menjalankan test, browser/manual check, lint, typecheck, build, audit script, atau mengeksekusi contoh tanpa permintaan eksplisit pengguna. Jangan menyebut source review sebagai hasil runtime atau jaminan aksesibilitas/perhitungan yang telah dieksekusi.
