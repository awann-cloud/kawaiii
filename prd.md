# PRD.md

## PRD: UNO Deck, Website Ulang Tahun untuk Dia

Versi: 1.0
Tanggal: 2026
Pemilik Produk: Lo (pacar / orang yang bikin kado)
Target Rilis: Sebelum 22 September
Platform: Web mobile first (bisa diinstal sebagai PWA)

---

## 1. Ringkasan Produk

UNO Deck adalah website personal yang cuma bisa diakses oleh satu orang, yaitu dia, yang ulang tahun tanggal 22 September 2004 dan berzodiak Virgo. Website ini berfungsi sebagai tiga hal sekaligus. Pertama, sebagai kado digital yang bisa dibuka berkali kali. Kedua, sebagai papan target dan harapan pribadi dia. Ketiga, sebagai permainan UNO antara dia dan lo, di mana dia menang kalau dia berhasil menyelesaikan targetnya, dan lo kalah kalau kartu plus di tangan lo sudah menumpuk.

Konsep intinya begini. Setiap target yang dia tulis adalah satu kartu UNO. Target yang dia anggap ringan bernilai +2. Target yang dia anggap besar dan berat bernilai +4. Setiap kali dia menyelesaikan target, kartu itu berpindah dari deck dia ke deck lo. Semakin banyak kartu plus di deck lo, semakin dekat lo ke kekalahan. Jadi lo memang lawan, tapi lo adalah lawan yang pengen kalah.

---

## 2. Latar Belakang dan Masalah

Kado ulang tahun biasanya habis dalam satu momen. Setelah dibuka, selesai. Padahal ada kebutuhan yang lebih dalam, yaitu tempat untuk dia menuliskan apa yang dia ingin capai, dan seseorang yang menemani prosesnya tanpa harus menagih terus.

Virgo cenderung teliti, suka struktur, perfeksionis, analitis, tulus, dan sering keras terhadap diri sendiri. Kalau diberi tempat yang rapi dan memaafkan, dia akan betah. Kalau diberi tempat yang penuh tekanan dan penalti, dia akan cepat lelah dan berhenti.

Maka masalah yang mau diselesaikan ada tiga. Bagaimana caranya bikin kado yang tetap hidup setelah hari ulang tahun. Bagaimana caranya bikin dia mau menulis target jangka panjang tanpa merasa sedang diinterogasi. Bagaimana caranya lo bisa support dia tanpa harus bertanya "gimana targetnya?" setiap hari.

---

## 3. Tujuan Produk

Tujuan utama adalah membuat satu tempat digital yang personal, ringan, dan menyenangkan, yang membuat dia mau kembali membukanya minimal sekali seminggu.

Tujuan sekunder adalah membuat lo punya visibilitas terhadap progres dia tanpa harus menagih, serta menyimpan jejak memori tiap pencapaian dalam bentuk album digital yang bisa dibuka tiap tahun.

Indikator keberhasilan yang bisa diukur adalah jumlah kartu yang dibuat dalam bulan pertama, jumlah langkah yang dicentang, jumlah kartu yang berhasil dipindahkan ke deck lo, dan apakah dia membuka website lagi setelah minggu pertama.

---

## 4. Persona Pengguna

Pengguna utama adalah dia, perempuan, lahir 22 September 2004, Virgo, suka hal yang rapi dan bermakna, suka kejutan yang personal, aktif di mobile, tidak suka tampilan yang ramai dan bertele tele.

Pengguna kedua adalah lo, sebagai lawan dan admin. Lo bisa login untuk melihat deck lo sendiri, melihat kartu yang sudah dia kirim, dan menambahkan pesan atau hadiah kecil di tiap kartu yang masuk.

---

## 5. Prinsip Desain

Referensi visual yang dipakai adalah gaya Olmo. Ciri utamanya adalah blok warna tebal yang berganti ganti antar section, tipografi besar dan tegas untuk judul, ilustrasi coretan tangan yang playful, mockup HP yang ditaruh di tengah sebagai bukti kalau produk ini mobile, dan alur cerita dari atas ke bawah yang mengarahkan pembaca.

Prinsip yang harus dipegang adalah mobile first, artinya semua layout dirancang untuk layar kecil dulu baru diperlebar. Warna harus berani, jangan takut pakai blok penuh. Animasi harus halus dan tidak berat. Setiap section harus punya satu pesan saja, tidak boleh campur. Dan yang paling penting, tidak boleh ada elemen yang bikin dia merasa dihakimi.

Palet warna yang dipakai mengambil dari kartu UNO. Merah untuk karier dan pencapaian besar. Biru untuk pengembangan diri. Hijau untuk kesehatan dan kebiasaan. Kuning untuk petualangan dan hal baru. Ditambah warna netral krem dan hitam untuk teks dan latar.

Tipografi memakai satu font display yang tebal dan bulat untuk judul, dan satu font sans yang bersih untuk isi. Ukuran judul hero minimal 40px di mobile. Spasi antar section minimal 80px di mobile.

---

## 6. Arsitektur Teknologi

Stack yang dipakai adalah Next.js versi terbaru dengan App Router, TypeScript, Tailwind CSS, Framer Motion untuk animasi, Supabase untuk database, auth, dan storage, lalu Vercel untuk hosting dan deployment.

Alasan memilih Next.js adalah karena dia mendukung server rendering, punya routing bawaan, gampang dideploy ke Vercel, dan cocok untuk PWA. Alasan memilih Supabase adalah karena auth dan row level security nya sudah jadi, jadi tidak perlu bikin backend sendiri.

Komponen pendukung lain adalah sonner atau react hot toast untuk notifikasi, lucide react untuk ikon, dan howler atau audio HTML biasa untuk suara UNO.

Struktur folder yang disarankan adalah sebagai berikut.

```text
app/
  (public)/
    page.tsx              -> landing page gaya Olmo
    login/page.tsx        -> halaman kartu akses
  (app)/
    layout.tsx            -> shell dengan bottom nav
    meja/page.tsx         -> dashboard utama
    tujuan/page.tsx       -> daftar kartu target
    tujuan/[id]/page.tsx  -> detail kartu dan langkah
    tujuan/baru/page.tsx  -> form tambah kartu
    deck-lawanku/page.tsx -> kartu plus yang sudah dikirim ke lo
    virgo/page.tsx        -> halaman profil Virgo
    memori/page.tsx       -> album pencapaian
    faq/page.tsx          -> pertanyaan yang sering ditanya
    profil/page.tsx       -> profil, countdown, pengaturan
  api/
    cards/route.ts
    transfers/route.ts
components/
lib/
  supabase/
    client.ts
    server.ts
  utils/
```

---

## 7. Model Data

Database memakai Supabase Postgres. Berikut tabel yang dibutuhkan beserta fungsinya.

| Nama Tabel | Fungsi | Kolom Penting |
| --- | --- | --- |
| profiles | Menyimpan data dua pemain | id, display_name, role, birthday, avatar_url, created_at |
| seasons | Menyimpan musim permainan, biasanya per tahun | id, name, start_date, end_date, lose_threshold, status |
| cards | Menyimpan kartu target | id, season_id, owner_id, title, description, category, weight, status, created_at, completed_at |
| card_steps | Menyimpan langkah kecil di dalam satu kartu | id, card_id, title, is_done, order_index, done_at |
| transfers | Menyimpan riwayat kartu yang berpindah ke deck lo | id, card_id, from_user, to_user, points, note, created_at |
| ledger | Menyimpan mutasi poin per pemain | id, season_id, user_id, delta, reason, ref_card_id, created_at |
| memories | Menyimpan album dan catatan pencapaian | id, season_id, card_id, title, note, image_url, created_at |
| notes | Menyimpan pesan kecil dari lo ke dia | id, card_id, body, is_read, created_at |

Aturan penting pada level database adalah sebagai berikut.

1. Semua tabel wajib mengaktifkan Row Level Security.
2. Hanya user yang terautentikasi yang bisa membaca data.
3. Kartu hanya bisa diubah oleh owner nya, dalam hal ini dia.
4. Transfers hanya bisa dibuat oleh owner kartu saat menandai selesai.
5. Tidak ada endpoint publik untuk pendaftaran akun baru. Akun dibuat manual lewat dashboard Supabase.

Skema SQL awal yang bisa langsung dijalankan di SQL Editor Supabase.

```sql
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null,
  role text not null check (role in ('her','me')),
  birthday date,
  avatar_url text,
  created_at timestamptz default now()
);

create table seasons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_date date not null,
  end_date date,
  lose_threshold int not null default 50,
  status text not null default 'active'
);

create table cards (
  id uuid primary key default gen_random_uuid(),
  season_id uuid references seasons(id) on delete cascade,
  owner_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  category text not null check (category in ('merah','biru','hijau','kuning')),
  weight int not null check (weight in (2,4)),
  status text not null default 'aktif' check (status in ('aktif','selesai','arsip')),
  created_at timestamptz default now(),
  completed_at timestamptz
);

create table card_steps (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references cards(id) on delete cascade,
  title text not null,
  is_done boolean default false,
  order_index int default 0,
  done_at timestamptz
);

create table transfers (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references cards(id) on delete cascade,
  from_user uuid references profiles(id),
  to_user uuid references profiles(id),
  points int not null,
  note text,
  created_at timestamptz default now()
);

create table ledger (
  id uuid primary key default gen_random_uuid(),
  season_id uuid references seasons(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  delta int not null,
  reason text,
  ref_card_id uuid references cards(id) on delete set null,
  created_at timestamptz default now()
);

create table memories (
  id uuid primary key default gen_random_uuid(),
  season_id uuid references seasons(id) on delete cascade,
  card_id uuid references cards(id) on delete set null,
  title text not null,
  note text,
  image_url text,
  created_at timestamptz default now()
);

create table notes (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references cards(id) on delete cascade,
  body text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table seasons enable row level security;
alter table cards enable row level security;
alter table card_steps enable row level security;
alter table transfers enable row level security;
alter table ledger enable row level security;
alter table memories enable row level security;
alter table notes enable row level security;

create policy "read all for authenticated" on profiles for select to authenticated using (true);
create policy "read all seasons" on seasons for select to authenticated using (true);
create policy "read all cards" on cards for select to authenticated using (true);
create policy "insert own cards" on cards for insert to authenticated with check (owner_id = auth.uid());
create policy "update own cards" on cards for update to authenticated using (owner_id = auth.uid());
create policy "delete own cards" on cards for delete to authenticated using (owner_id = auth.uid());
create policy "read all steps" on card_steps for select to authenticated using (true);
create policy "write own steps" on card_steps for all to authenticated using (
  exists (select 1 from cards c where c.id = card_id and c.owner_id = auth.uid())
);
create policy "read all transfers" on transfers for select to authenticated using (true);
create policy "insert own transfers" on transfers for insert to authenticated with check (from_user = auth.uid());
create policy "read all ledger" on ledger for select to authenticated using (true);
create policy "insert own ledger" on ledger for insert to authenticated with check (user_id = auth.uid());
create policy "read all memories" on memories for select to authenticated using (true);
create policy "write own memories" on memories for all to authenticated using (true);
create policy "read all notes" on notes for select to authenticated using (true);
create policy "write own notes" on notes for all to authenticated using (true);
```

---

## 8. Alur Autentikasi

Halaman login dibuat seperti kartu UNO tertutup di tengah layar. Ada tulisan "Masukkan kartu akses lo". Ada dua input, yaitu email dan password. Setelah submit, kartu berputar dengan animasi flip, lalu masuk ke halaman meja.

Autentikasi memakai Supabase Auth dengan email dan password. Pendaftaran publik dimatikan. Dua akun dibuat manual dari dashboard Supabase, satu untuk dia dan satu untuk lo. Opsional, bisa ditambah magic link supaya dia bisa masuk tanpa password kalau lupa.

Sesi disimpan di cookie melalui Supabase SSR helper. Middleware Next.js melindungi semua route di dalam grup (app) dan mengalihkan ke halaman login kalau belum ada sesi.

Pesan error dibuat manusiawi. Kalau password salah, tulisannya bukan "Invalid credentials", tapi "Kartu ini bukan punya lo. Coba cek lagi ya."

---

## 9. Daftar Halaman dan Fitur

### 9.1 Landing Page

Landing page mengikuti struktur Olmo. Bagian atas adalah hero dengan judul besar, subjudul, dan mockup HP. Setelah itu blok warna ungu berisi penjelasan aturan main dan penjelasan singkat Virgo. Lalu blok oranye berisi cara menang dan cara ngalahin lo. Lalu blok tosca berisi FAQ. Lalu blok hitam berisi dua pemain di meja ini. Terakhir footer dengan countdown dan tombol masuk.

Judul hero yang disarankan adalah "Deck lo udah siap." dengan subjudul "Tulis target lo. Gue yang bakal kalah."

Tombol utama di hero bertuliskan "Buka Kartu Akses" dan mengarah ke halaman login.

### 9.2 Halaman Meja

Ini halaman utama setelah login. Isinya adalah ringkasan musim berjalan. Ada kartu besar yang menampilkan poin di deck lo dengan progress bar menuju ambang kekalahan. Ada kartu kecil berisi jumlah target aktif, jumlah target selesai, dan streak mingguan.

Di tengah ada visual meja UNO sederhana, dua tumpukan kartu dengan label "Deck Lo" dan "Deck Gue". Setiap kali ada kartu baru masuk ke deck lo, animasi kartu terbang dari kiri ke kanan.

Di bawahnya ada aktivitas terbaru, misalnya "3 jam lalu, lo nyelesaiin 'Lari 5K', gue dapet +2."

### 9.3 Halaman Tujuan

Menampilkan semua kartu target dalam bentuk grid atau list. Setiap kartu punya warna sesuai kategori, punya label +2 atau +4, punya progress langkah, dan punya status.

Ada filter berdasarkan warna, status, dan bobot. Ada tombol tambah kartu yang mengambang di kanan bawah.

### 9.4 Form Tambah Kartu

Form berisi judul target, deskripsi singkat, pilihan warna kategori, pilihan bobot +2 atau +4, dan daftar langkah kecil yang bisa ditambah satu per satu.

Di bawah pilihan bobot ada penjelasan singkat. Untuk +2 tulisannya "Ini ringan, bisa dicapai dalam waktu dekat." Untuk +4 tulisannya "Ini besar, butuh tenaga dan waktu."

Ada juga pilihan kartu spesial, yaitu Skip untuk target yang mau dijeda, Reverse untuk target yang berubah arah, Wild untuk mimpi yang belum jelas caranya, dan Draw untuk target yang butuh bantuan lo.

### 9.5 Detail Kartu

Menampilkan judul, deskripsi, kategori, bobot, dan checklist langkah. Setiap langkah bisa dicentang. Progress bar di atas menunjukkan berapa langkah yang sudah selesai.

Kalau semua langkah selesai, tombol "UNO" menyala dan berdenyut. Saat ditekan, muncul konfeti, suara UNO, dan animasi kartu terbang ke deck lo. Setelah itu status kartu berubah jadi selesai, dan tercatat di tabel transfers serta ledger.

Setelah kartu selesai, muncul kotak untuk menulis catatan atau pelajaran dari proses itu. Catatan ini otomatis tersimpan ke tabel memories.

### 9.6 Halaman Deck Lawanku

Halaman ini menampilkan semua kartu plus yang sudah dia kirim ke lo. Ada total poin, ada progress bar kekalahan lo, dan ada daftar kartu yang bisa dibuka satu per satu.

Setiap kartu punya slot untuk pesan dari lo. Jadi ketika dia selesai, lo bisa menulis satu pesan pendek di kartu itu, misalnya "Gue bangga. Ini +2 pertama lo tahun ini."

Kalau total poin sudah melewati ambang kekalahan, muncul layar besar bertuliskan "GUE KALO." dengan konfeti dan tombol untuk klaim hadiah. Hadiahnya bisa berupa voucher, janji traktir, atau apa pun yang lo siapkan.

### 9.7 Halaman Virgo

Halaman ini menjelaskan Virgo dengan cara yang personal, bukan sekadar copas ramalan. Isinya adalah penjelasan singkat karakter Virgo, kekuatan, hal yang sering bikin dia capek sendiri, dan cara website ini dirancang supaya cocok buat dia.

Ada juga bagian "Cara Main Lo" yang menjelaskan bahwa di sini tidak ada penalti, tidak ada omelan, dan tidak ada target yang dipaksa. Kalau butuh jeda, pakai kartu Skip. Kalau target berubah, pakai kartu Reverse.

### 9.8 Halaman Memori

Album semua pencapaian yang sudah selesai, diurutkan dari yang terbaru. Setiap item menampilkan nama kartu, tanggal selesai, catatan, dan gambar kalau ada.

Ada filter per musim. Tujuannya supaya tiap ulang tahun berikutnya, dia bisa lihat lagi semua yang sudah dia lewati.

### 9.9 Halaman FAQ

Berisi pertanyaan yang sering ditanyakan, ditulis dengan gaya santai. Contoh pertanyaannya adalah "Apa itu +2 dan +4?", "Kapan gue menang?", "Boleh nggak nggak nyelesaiin target?", "Kalau gue overthinking gimana?", dan "Kenapa cuma gue yang bisa masuk?"

Jawabannya harus singkat dan menenangkan. Nada bicaranya seperti lo sedang ngomong langsung ke dia.

### 9.10 Halaman Profil

Berisi data dia, tanggal lahir, zodiak, countdown ke ulang tahun berikutnya, statistik total, dan pengaturan suara serta notifikasi.

Ada juga tombol untuk reset musim baru, tapi tombol ini cuma muncul untuk akun lo.

---

## 10. Mekanik Permainan

Aturan poin dibuat sederhana supaya gampang dimengerti. Target ringan bernilai +2. Target besar bernilai +4. Kartu spesial tidak bernilai poin, tapi bisa mengubah status kartu.

Ambang kekalahan default adalah 50 poin per musim. Angka ini bisa diubah di tabel seasons. Kalau poin di deck lo sudah mencapai atau melewati ambang itu, musim dinyatakan selesai dan lo dinyatakan kalah.

Streak dihitung dari jumlah minggu berturut turut di mana minimal satu langkah dicentang. Streak ini dipakai untuk lencana, bukan untuk penalti.

Lencana yang disarankan adalah "Kartu Pertama", "Empat Warna", "Streak Empat Minggu", "Tembus 20 Poin", "Selesai Tanpa Skip", dan "Wild Pertama".

Musim direset setiap ulang tahun dia. Kartu yang sudah selesai dipindahkan ke arsip, dan ledger ditutup. Musim baru dibuka dengan nama tahun berjalan.

---

## 11. Spesifikasi UI dan UX

Navigasi bawah hanya punya empat item, yaitu Meja, Tujuan, Memori, dan Profil. Halaman Virgo dan FAQ diakses dari landing page dan dari halaman profil.

Animasi wajib ada di tiga tempat. Pertama, animasi flip kartu saat login. Kedua, animasi kartu terbang saat target selesai. Ketiga, animasi progress bar saat poin bertambah.

Suara wajib ada dua, yaitu suara kartu dibuka dan suara UNO saat target selesai. Ada tombol mute di halaman profil dan pengaturannya disimpan di localStorage.

Getaran halus boleh dipakai di perangkat yang mendukung, khususnya saat target selesai.

Aksesibilitas yang harus dijaga adalah kontras warna minimal 4.5 banding 1 untuk teks, ukuran tombol minimal 44px, semua tombol punya label, dan animasi menghormati preferensi reduce motion.

---

## 12. Non Functional Requirement

Performa ditargetkan skor Lighthouse mobile minimal 90 untuk performance dan accessibility. First contentful paint di bawah 1.8 detik pada koneksi 4G.

Keamanan dijaga dengan RLS di semua tabel, tidak ada service role key di sisi client, dan semua input divalidasi di server memakai zod.

Reliabilitas dijaga dengan penanganan error yang jelas di setiap fetch, serta optimistic update untuk centang langkah supaya terasa cepat.

Maintainability dijaga dengan struktur folder yang rapi, TypeScript strict mode, dan komponen yang dipisah per fungsi.

---

## 13. Deployment dan Konfigurasi

Deployment utama memakai Vercel. Database dan auth memakai Supabase. Repositori dihubungkan ke Vercel supaya setiap push ke branch main otomatis terdeploy.

Variabel lingkungan yang dibutuhkan adalah sebagai berikut.

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=https://domain-lo.vercel.app
```

Langkah deployment yang harus dilakukan secara berurutan adalah sebagai berikut.

1. Buat project baru di Supabase, lalu jalankan skema SQL di atas.
2. Buat dua user di Authentication, satu untuk dia dan satu untuk lo.
3. Isi tabel profiles untuk kedua user tersebut, lengkap dengan role nya.
4. Buat satu baris di tabel seasons untuk musim tahun ini, tentukan lose_threshold.
5. Buat repo GitHub, push kode Next.js.
6. Import repo ke Vercel, isi environment variables.
7. Deploy, lalu tes login dari HP.
8. Tambahkan manifest PWA dan ikon supaya bisa diinstal ke home screen.
9. Kirim link ke dia beserta email dan password di hari ulang tahunnya.

---

## 14. Roadmap Pengerjaan

Fase satu adalah fondasi. Isinya setup Next.js, Tailwind, Supabase, auth, middleware, dan layout dasar dengan bottom nav. Estimasi tiga sampai empat hari.

Fase dua adalah fitur inti. Isinya halaman meja, daftar tujuan, form tambah kartu, detail kartu dengan checklist, dan mekanik transfer kartu ke deck lo. Estimasi satu minggu.

Fase tiga adalah polesan. Isinya landing page gaya Olmo, halaman Virgo, FAQ, memori, animasi Framer Motion, dan suara. Estimasi empat sampai lima hari.

Fase empat adalah peluncuran. Isinya PWA, pengujian di HP asli, perbaikan bug, dan deploy final. Estimasi dua hari.

---

## 15. Kriteria Penerimaan

Website dinyatakan selesai kalau semua poin berikut terpenuhi.

1. Dia bisa login memakai email dan password, dan orang lain tidak bisa masuk.
2. Dia bisa menambah kartu target dengan warna, bobot, dan langkah kecil.
3. Dia bisa mencentang langkah dan melihat progress bar bertambah.
4. Saat semua langkah selesai, kartu berpindah ke deck lo dengan animasi dan suara.
5. Poin di deck lo bertambah sesuai bobot kartu, dan progress kekalahan lo ikut naik.
6. Kalau poin melewati ambang, muncul layar kemenangan untuk dia.
7. Semua kartu yang selesai muncul di halaman memori.
8. Landing page tampil rapi di mobile dan mengikuti gaya blok warna serta tipografi besar.
9. Website bisa diinstal ke home screen lewat fitur PWA.
10. Tidak ada error di console saat alur utama dijalankan.

---

## 16. Ide Lanjutan

Kalau versi pertama sudah jalan, ada beberapa hal yang bisa ditambah. Notifikasi email atau push saat lo menulis pesan di kartu yang dia selesaikan. Mode dua pemain sungguhan dengan giliran. Kartu hadiah fisik yang dicetak dari halaman memori. Integrasi kalender untuk pengingat langkah mingguan. Dan mode tamu terbatas supaya teman dekat bisa ngasih semangat tanpa bisa melihat data pribadi.

---

## 17. Penutup

Inti dari produk ini bukan permainannya, tapi perasaannya. Kartu UNO cuma alat supaya dia mau menulis mimpinya, dan supaya lo punya cara untuk kalah dengan cara yang manis. Semua keputusan desain dan teknis harus kembali ke satu pertanyaan, yaitu apakah ini bikin dia merasa ditemani, bukan dikejar.