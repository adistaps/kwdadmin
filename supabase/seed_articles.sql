-- ============================================================
-- Seed: 3 existing articles (from the original hardcoded
-- /artikel/[slug] page) into the Supabase `articles` table.
--
-- This does NOT change what visitors see on /artikel/[slug] —
-- that page still renders its own hardcoded content untouched,
-- exactly as it does today. This seed only makes these 3
-- articles appear in Admin > Artikel and in the Homepage CMS
-- checklist, using the SAME slugs, so links still resolve to
-- the identical existing article page.
--
-- hero_image is left blank on purpose — add photos manually
-- via Admin > Artikel > Edit after running this.
--
-- Safe to re-run: uses ON CONFLICT to update instead of duplicate.
-- ============================================================

insert into articles (slug, title_id, excerpt_id, content_id, hero_image, published, show_on_home, translation_status)
values
  (
    $s1$panel-sandwich-eps-tahan-api$s1$,
    $t1$Panel Sandwich EPS Tahan Api: Ringan, Cepat dan Ekonomis—tetapi Istilah “Tahan Api” Harus Dipahami dengan Benar$t1$,
    $e1$Panel ini sering ditemui pada pabrik, gudang, kantor proyek, dan bangunan prefab. Alasannya mudah dipahami: bobotnya ringan, pemasangannya cepat, insulasinya baik, dan biayanya relatif terkendali. Namun ada satu istilah yang paling sering menimbulkan salah paham—“tahan api”.$e1$,
    $c1$<p class="article-opening">Saat memilih panel, yang sebenarnya dibeli bukan hanya selembar material. Kita sedang memilih sebuah sistem dinding atau atap: inti EPS, lembaran baja, perekat, profil sambungan, sekrup, sealant, dan cara pemasangannya. Jika hanya melihat harga per meter, banyak hal penting justru terlewat.</p>
<section id="pengertian">
<h2>Apa yang dimaksud dengan panel sandwich EPS produksi mekanis?</h2>
<p>Panel sandwich EPS terdiri dari dua lembar baja berlapis warna dengan inti expanded polystyrene (EPS) di bagian tengah. Pada lini produksi mekanis, gulungan baja dibentuk sesuai profil, permukaannya diberi perekat, inti EPS dimasukkan, lalu seluruh lapisan ditekan dan dipotong menurut panjang yang dibutuhkan.</p>
<p>Kata "mekanis" penting karena proses yang stabil membantu menjaga ukuran, kerataan, tekanan ikatan, dan bentuk sambungan antarpanel. Walaupun begitu, mesin bukan jaminan tunggal. Kualitas bahan baku, formulasi perekat, ketepatan suhu dan tekanan, serta pemeriksaan hasil akhir tetap menentukan apakah panel akan bertahan baik di lapangan.</p>
<figure class="article-figure wide"><img src="/products/eps-04.jpg" alt="Lembaran EPS yang dipotong rapi pada lini produksi PT KWD" /><figcaption>Pemotongan mekanis membantu menghasilkan ukuran inti EPS yang seragam sebelum dirakit menjadi panel.</figcaption></figure>
</section>
<section id="keunggulan">
<h2>Mengapa panel EPS banyak digunakan?</h2>
<h3>1. Ringan dan lebih mudah ditangani</h3>
<p>Sebagian besar volume EPS berisi udara, sehingga bobot panel relatif ringan. Ini memudahkan pengangkutan dan pengangkatan, sekaligus mengurangi beban mati pada struktur. Pada proyek dengan jadwal ketat, perbedaan bobot sangat terasa dalam kecepatan kerja tim pemasangan.</p>
<h3>2. Membantu mengurangi perpindahan panas</h3>
<p>Struktur sel tertutup EPS mampu menahan perpindahan panas dengan baik. Ketika ketebalan dan sambungan dipilih dengan benar, panel membantu menjaga suhu dalam ruangan lebih stabil. Manfaat ini umum dicari pada gudang, ruang kerja, bangunan prefab, dan beberapa fasilitas bersuhu terkendali.</p>
<h3>3. Pemasangan cepat</h3>
<p>Panel diproduksi sesuai panjang proyek dan tepinya dibuat saling mengunci. Dibandingkan dinding konvensional yang membutuhkan beberapa lapisan pekerjaan, panel dapat membentuk permukaan dalam, inti insulasi, dan permukaan luar dalam satu tahap pemasangan.</p>
<h3>4. Biaya proyek lebih mudah dikendalikan</h3>
<p>Harga material biasanya kompetitif, tetapi penghematan sebenarnya juga datang dari waktu pemasangan, kebutuhan tenaga kerja, bobot struktur, dan minimnya pekerjaan finishing. Tetap penting menghitung biaya sebagai satu sistem, bukan hanya membandingkan harga panel per meter persegi.</p>
</section>
<figure class="article-figure split"><img src="/products/eps-01.jpg" alt="Blok EPS berukuran besar tersusun di area produksi PT KWD" /><figcaption>EPS yang ringan dapat diproduksi dalam ukuran besar, kemudian dipotong sesuai ketebalan dan kebutuhan panel.</figcaption></figure>
<section id="api">
<h2>Apakah "EPS tahan api" berarti tidak dapat terbakar?</h2>
<p>Jawaban singkatnya: tidak. EPS adalah material polimer organik dan tetap termasuk bahan yang dapat terbakar. Pada EPS berpenghambat api, bahan tambahan digunakan untuk memperlambat penyalaan dan penyebaran api, serta membantu material berhenti terbakar setelah sumber api kecil dijauhkan. Istilah ini tidak boleh disamakan dengan material noncombustible atau tidak dapat terbakar.</p>
<p>Di dalam panel sandwich, lembaran baja melindungi inti dari paparan langsung. Akan tetapi, kinerja saat terjadi kebakaran tidak ditentukan oleh inti saja. Sambungan panel, tepi yang terbuka, penetrasi kabel dan pipa, pintu, detail pertemuan dengan struktur, sumber panas, serta pekerjaan pengelasan di lokasi semuanya dapat mengubah tingkat risiko.</p>
<p>Karena itu, jangan membeli hanya berdasarkan tulisan "fire retardant" pada penawaran. Untuk proyek yang memiliki persyaratan kebakaran, mintalah bukti pengujian yang relevan dengan sistem panel yang ditawarkan dan cocokkan dengan peraturan, fungsi ruangan, serta rancangan keselamatan kebakaran setempat. Pada area bersuhu tinggi, pemisah kebakaran, atau bangunan dengan tuntutan noncombustibility yang lebih tinggi, panel berinti rock wool bisa menjadi pilihan yang lebih tepat.</p>
</section>
<section id="aplikasi">
<h2>Di mana panel sandwich EPS cocok digunakan?</h2>
<p>Panel ini lazim dipilih untuk proyek yang mengutamakan bobot ringan, insulasi, kecepatan, dan efisiensi biaya, antara lain:</p>
<ul>
<li>dinding dan partisi pabrik atau gudang dengan risiko kebakaran yang terkendali;</li>
<li>kantor proyek, mess, ruang rapat, dan fasilitas sementara;</li>
<li>rumah prefab, rumah kontainer, serta bangunan modular;</li>
<li>ruang pendukung produksi dan bangunan komersial ringan;</li>
<li>beberapa ruang bersuhu terkendali dengan spesifikasi yang sesuai; dan</li>
<li>renovasi atau perluasan bangunan yang membutuhkan pekerjaan cepat dan bersih.</li>
</ul>
<p>Untuk cold room, clean room, fasilitas makanan, atau bangunan dengan kelembapan dan sanitasi khusus, pemilihan tidak cukup berhenti pada jenis inti. Ketebalan panel, lapisan permukaan, detail kedap udara, jembatan termal, sealant, sudut, pintu, dan penetrasi utilitas perlu direncanakan secara terpisah.</p>
</section>
<section id="pemasangan">
<h2>Hal yang perlu diperhatikan saat pemasangan dan penggunaan</h2>
<h3>Jaga sambungan tetap rapat</h3>
<p>Celah kecil dapat menjadi jalur udara, air, panas, asap, atau serangga. Pastikan profil pengunci, sekrup, sealant, flashing, dan penutup ujung dipasang sesuai detail. Sekrup yang terlalu longgar menimbulkan celah; sekrup yang terlalu kencang dapat merusak permukaan dan sambungan.</p>
<h3>Tutup kembali inti yang terpotong</h3>
<p>Setiap lubang untuk kabel, pipa, ducting, jendela, atau pintu membuat inti panel terbuka. Bagian tersebut harus ditutup dan disegel dengan sistem yang sesuai. Jangan membiarkan EPS terlihat tanpa perlindungan di area yang berpotensi terkena panas atau percikan.</p>
<h3>Kendalikan pekerjaan panas</h3>
<p>Pengelasan, pemotongan, dan pekerjaan yang menghasilkan percikan perlu dilakukan dengan izin kerja panas, pelindung, alat pemadam, dan pengawasan. Serpihan EPS serta bahan kemasan harus dibersihkan dari area kerja. Setelah pekerjaan selesai, lokasi perlu diperiksa kembali untuk memastikan tidak ada bara atau panas tersisa.</p>
<h3>Angkat, jangan diseret</h3>
<p>Permukaan baja mudah tergores jika panel diseret satu sama lain. Panel panjang juga perlu penyangga yang cukup agar tidak melengkung saat diangkat. Simpan panel di tempat rata, kering, terlindung dari hujan dan panas berlebihan, serta lepaskan film pelindung sesuai waktu yang dianjurkan.</p>
<figure class="article-figure portrait"><img src="/products/eps-02.jpg" alt="Proses pengangkutan blok EPS di fasilitas produksi PT KWD" /><figcaption>Penanganan dan pengangkutan yang terencana membantu menjaga material tetap bersih serta mengurangi kerusakan sebelum produksi dan pemasangan.</figcaption></figure>
</section>
<section id="checklist">
<h2>Sebelum membeli, periksa enam hal ini</h2>
<ol class="article-checklist">
<li><b>Jenis inti EPS:</b> pastikan apakah EPS standar atau EPS berpenghambat api, dan minta informasi produk yang jelas.</li>
<li><b>Densitas inti:</b> pilih berdasarkan kekuatan dan fungsi panel; jangan menganggap angka tertinggi selalu paling tepat.</li>
<li><b>Ketebalan panel:</b> sesuaikan dengan kebutuhan insulasi, bentang, beban, dan kondisi lingkungan.</li>
<li><b>Lembaran baja:</b> periksa ketebalan, lapisan pelindung, sistem cat, warna, dan ketahanan korosinya.</li>
<li><b>Sistem sambungan:</b> pastikan profil pengunci, pengikat, sealant, flashing, dan detail ujung sesuai dengan penggunaan.</li>
<li><b>Bukti dan persyaratan proyek:</b> cocokkan laporan uji, klasifikasi, dan spesifikasi panel dengan aturan serta rancangan proyek.</li>
</ol>
</section>
<section>
<h2>EPS atau rock wool—mana yang lebih baik?</h2>
<p>Tidak ada jawaban tunggal. EPS biasanya unggul ketika proyek membutuhkan panel ringan, insulasi termal yang baik, pemasangan cepat, dan biaya efisien pada lingkungan dengan risiko kebakaran yang dapat dikendalikan. Rock wool lebih sering dipilih ketika noncombustibility, suhu tinggi, pemisahan kebakaran, atau pengendalian suara menjadi prioritas utama.</p>
<p>Pilihan yang bertanggung jawab dimulai dari fungsi bangunan dan risikonya, lalu diterjemahkan menjadi spesifikasi. Dengan cara itu, kata "hemat" tidak hanya berarti murah saat membeli, tetapi juga tepat selama bangunan digunakan.</p>
</section>
<section>
<h2>Penutup</h2>
<p>Panel sandwich EPS berpenghambat api adalah solusi praktis untuk banyak bangunan industri dan modular. Kelebihannya nyata: ringan, cepat, memiliki insulasi yang baik, dan membantu mengendalikan biaya. Namun, manfaat tersebut baru tercapai jika spesifikasi, detail sambungan, proteksi inti, dan disiplin pemasangan diperlakukan sebagai satu sistem.</p>
<p>Sebelum memesan, jelaskan fungsi bangunan, ukuran ruang, kondisi suhu dan kelembapan, kebutuhan kebakaran, serta situasi pemasangan kepada tim teknis. Beberapa pertanyaan tambahan di awal jauh lebih murah daripada memperbaiki panel yang salah pilih setelah proyek selesai.</p>
</section>$c1$,
    null,
    true,
    true,
    'pending'
  ),
  (
    $s2$panel-sandwich-rock-wool$s2$,
    $t2$Panel Sandwich Baja Berinti Rock Wool: Tahan Api Hanyalah Awal, Sistem Secara Keseluruhan yang Menentukan$t2$,
    $e2$Saat membicarakan panel sandwich rock wool, orang biasanya langsung menyebut satu hal: tahan api. Itu memang keunggulan penting, tetapi pengalaman proyek mengajarkan bahwa kualitas bangunan tidak pernah ditentukan oleh inti panel saja. Lembaran baja, sambungan, detail bukaan, penyimpanan, dan cara pemasangan ikut menentukan hasil akhirnya.$e2$,
    $c2$<p class="article-opening">Dalam praktiknya, panel rock wool yang baik bukan sekadar dua lembar baja dengan bahan berwarna kuning kecokelatan di tengahnya. Ia adalah sebuah sistem. Setiap bagian harus bekerja bersama agar dinding atau atap memiliki kinerja yang konsisten selama digunakan.</p>
<section id="produksi">
<h2>Bagaimana panel sandwich rock wool diproduksi?</h2>
<p>Secara umum, panel terdiri dari dua lapisan baja berlapis warna dan inti rock wool di antaranya. Pada lini produksi mekanis, material inti disusun dengan arah dan kepadatan yang terkontrol, diberi perekat, lalu dipres bersama lembaran baja hingga menjadi satu panel. Bagian tepi kemudian dibentuk menjadi profil sambungan agar panel dapat dipasang saling mengunci.</p>
<p>Proses yang terlihat sederhana ini sebenarnya menuntut ketelitian. Sebaran perekat harus merata, permukaan baja harus bersih, tekanan harus stabil, dan ukuran panel harus konsisten. Jika salah satu bagian tidak terkendali, masalah seperti delaminasi, permukaan bergelombang, atau sambungan yang tidak rapat bisa muncul di kemudian hari.</p>
<figure class="article-figure wide"><img src="/products/sandwich-05.jpg" alt="Pekerja dan panel sandwich rock wool pada lini produksi PT KWD" /><figcaption>Proses produksi mekanis membantu menjaga ukuran, tekanan, dan kualitas sambungan panel tetap konsisten.</figcaption></figure>
</section>
<section id="alasan">
<h2>Mengapa banyak bangunan industri menggunakan inti rock wool?</h2>
<h3>1. Kinerja terhadap api</h3>
<p>Serat mineral rock wool tidak mudah terbakar dan mampu menahan temperatur tinggi. Karena itu material ini sering dipilih untuk bangunan yang memerlukan tingkat keselamatan kebakaran lebih tinggi, misalnya pabrik, gudang, ruang mesin, fasilitas produksi, dan bangunan dengan area berisiko.</p>
<p>Namun, istilah "tahan api" tidak boleh dibaca sebagai jaminan tanpa syarat. Peringkat ketahanan api bergantung pada sistem yang diuji: jenis dan ketebalan panel, arah pemasangan, jarak bentang, jenis pengikat, sambungan, serta detail pertemuan dengan lantai, atap, pintu, dan penetrasi instalasi. Dengan kata lain, bahan inti yang baik harus didukung desain dan pemasangan yang benar.</p>
<h3>2. Membantu menjaga suhu bangunan</h3>
<p>Struktur serat rock wool menahan perpindahan panas dan membantu menjaga suhu dalam bangunan lebih stabil. Pada pabrik atau gudang, hal ini dapat mengurangi panas yang masuk melalui selubung bangunan. Pada ruang dengan pengondisian udara, insulasi yang tepat juga membantu sistem pendingin bekerja lebih efisien.</p>
<h3>3. Lebih baik untuk pengendalian kebisingan</h3>
<p>Inti berserat mampu menyerap sebagian energi suara. Panel ini kerap dipertimbangkan untuk ruang mesin, workshop, ruang produksi, atau bangunan yang berdekatan dengan area kerja yang bising. Hasil akhirnya tetap dipengaruhi oleh ketebalan panel, konstruksi sambungan, dan kebocoran suara di sekitar pintu atau bukaan.</p>
</section>
<figure class="article-figure split"><img src="/products/sandwich-03.jpg" alt="Perbandingan panel rock wool dan panel inti lainnya di gudang PT KWD" /><figcaption>Inti, lembaran baja, profil tepi, dan detail sambungan perlu dinilai sebagai satu sistem.</figcaption></figure>
<section id="aplikasi">
<h2>Di mana panel sandwich rock wool dapat digunakan?</h2>
<p>Penggunaannya cukup luas, terutama ketika proyek membutuhkan kombinasi proteksi kebakaran, insulasi, dan pemasangan cepat. Contohnya meliputi:</p>
<ul>
<li>dinding luar dan partisi pabrik;</li>
<li>gudang dan pusat logistik;</li>
<li>ruang mesin, ruang listrik, dan area utilitas;</li>
<li>fasilitas makanan, farmasi, dan elektronik dengan detail permukaan yang sesuai;</li>
<li>bangunan modular dan kantor proyek;</li>
<li>dinding pemisah pada area yang memerlukan perlindungan kebakaran lebih tinggi; serta</li>
<li>sistem atap tertentu yang dirancang khusus untuk panel rock wool.</li>
</ul>
<p>Untuk ruang bersih, panel tidak cukup dinilai dari jenis inti. Kerataan permukaan, bahan pelapis, sambungan kedap, silikon, sudut lengkung, pintu, jendela, dan penetrasi utilitas harus direncanakan sebagai bagian dari sistem ruang.</p>
</section>
<section id="perhatian">
<h2>Hal-hal yang sering terabaikan</h2>
<h3>Jangan hanya membandingkan densitas</h3>
<p>Densitas memang penting, tetapi angka yang lebih tinggi tidak otomatis berarti panel selalu lebih baik. Kinerja juga dipengaruhi oleh kualitas serat, orientasi lamela, kekuatan ikatan, ketebalan inti, profil baja, dan kesesuaian panel dengan bentang struktur. Pilihan yang tepat harus dimulai dari kebutuhan bangunan, bukan dari satu angka di lembar penawaran.</p>
<h3>Periksa ketebalan dan lapisan pelindung baja</h3>
<p>Lembaran baja adalah permukaan yang pertama menghadapi cuaca, kelembapan, benturan, dan kegiatan pembersihan. Ketebalan baja, massa lapisan pelindung, sistem cat, dan kondisi lingkungan penggunaan perlu diperiksa. Untuk area lembap, korosif, atau sering dicuci, spesifikasi permukaan tidak boleh disamakan dengan bangunan kering biasa.</p>
<h3>Masalah sering muncul di sambungan, bukan di tengah panel</h3>
<p>Sambungan yang renggang dapat menjadi jalur panas, udara, air, asap, atau suara. Detail sekrup, sealant, flashing, penutup ujung, pertemuan sudut, dan bukaan harus dikerjakan dengan disiplin. Pemotongan yang kasar atau pengencangan sekrup berlebihan juga dapat merusak lapisan baja dan mengurangi kerapatan sambungan.</p>
<h3>Panel tidak boleh diseret dan dibiarkan terbuka di lokasi</h3>
<p>Saat bongkar muat, panel harus diangkat dengan penyangga yang memadai agar tidak melengkung. Panel sebaiknya disimpan di tempat rata, terlindung dari hujan, dan diberi kemiringan agar air tidak menggenang. Film pelindung pada permukaan baja juga perlu dilepas sesuai waktu yang dianjurkan; jika dibiarkan terlalu lama di bawah matahari, perekatnya dapat menempel kuat dan sulit dibersihkan.</p>
<h3>Material penutup tahan api harus tetap utuh</h3>
<p>Pemotongan di lapangan, lubang kabel, pipa, ducting, dan pekerjaan tambahan dapat mengganggu sistem pelindung. Setiap penetrasi perlu ditutup dengan sistem yang sesuai. Menambah lubang tanpa detail pemulihan dapat membuat kinerja kebakaran berbeda jauh dari kondisi yang direncanakan.</p>
<figure class="article-figure portrait"><img src="/products/sandwich-06.jpg" alt="Panel sandwich rock wool siap dikirim dari pabrik PT KWD" /><figcaption>Pengangkutan dan penanganan yang benar membantu mencegah panel melengkung, tergores, atau rusak sebelum pemasangan.</figcaption></figure>
</section>
<section id="checklist">
<h2>Sebelum membeli, pastikan enam hal ini</h2>
<ol class="article-checklist">
<li><b>Fungsi bangunan:</b> dinding, atap, partisi, ruang bersih, atau area proteksi kebakaran.</li>
<li><b>Kebutuhan kinerja:</b> insulasi panas, akustik, ketahanan api, kebersihan, dan ketahanan korosi.</li>
<li><b>Spesifikasi panel:</b> ketebalan total, jenis dan densitas inti, ketebalan baja, lapisan permukaan, serta profil sambungan.</li>
<li><b>Bukti pengujian:</b> laporan uji atau klasifikasi yang relevan dengan konfigurasi panel yang ditawarkan.</li>
<li><b>Detail pemasangan:</b> bentang, arah panel, pengikat, sealant, flashing, sambungan, dan penetrasi utilitas.</li>
<li><b>Logistik lokasi:</b> panjang panel, akses truk, alat angkat, area penyimpanan, dan urutan pemasangan.</li>
</ol>
</section>
<section>
<h2>Penutup</h2>
<p>Panel sandwich rock wool adalah material yang sangat berguna, tetapi bukan produk yang sebaiknya dipilih hanya dari harga per meter atau satu angka spesifikasi. Nilai sebenarnya muncul ketika panel, struktur, sambungan, dan metode pemasangan direncanakan sebagai satu kesatuan.</p>
<p>Sebelum memesan, bicarakan fungsi bangunan, risiko lingkungan, target kinerja, dan kondisi pemasangan dengan pemasok atau tim teknis. Percakapan singkat di awal sering kali menghindarkan proyek dari perbaikan yang jauh lebih mahal setelah bangunan selesai.</p>
</section>$c2$,
    null,
    true,
    true,
    'pending'
  ),
  (
    $s3$rumah-prefab$s3$,
    $t3$Rumah Prefab Bukan Sekadar “Cepat Dibangun”: Memahami Struktur, Penggunaan, dan Hal yang Harus Diperhatikan$t3$,
    $e3$Ketika orang pertama kali melihat rumah prefab, perhatian biasanya tertuju pada kecepatannya. Komponen datang ke lokasi, dirakit, dan bangunan segera berdiri. Namun setelah digunakan bertahun-tahun, yang menentukan kepuasan bukan lagi seberapa cepat bangunan selesai—melainkan apakah ruangnya nyaman, tetap kering, mudah dirawat, dan sesuai dengan kebutuhan sejak awal.$e3$,
    $c3$<p class="article-opening">Rumah prefab bukan satu jenis produk dengan mutu yang selalu sama. Di balik tampilan luar yang sederhana terdapat sistem struktur baja, panel dinding dan atap, sambungan, lapisan kedap air, pintu-jendela, instalasi listrik, sanitasi, dan fondasi. Kualitas bangunan lahir dari bagaimana semua bagian itu direncanakan dan dipasang sebagai satu kesatuan.</p>
<section id="pengertian">
<h2>Apa yang dimaksud dengan rumah prefab?</h2>
<p>Prefab adalah singkatan dari prefabricated. Artinya, sebagian besar komponen bangunan dibuat lebih dahulu di pabrik dalam ukuran dan modul yang terencana. Setelah itu, komponen dibawa ke lokasi untuk dirakit. Pekerjaan di lapangan tetap ada—mulai dari persiapan lahan dan fondasi hingga sambungan utilitas—tetapi proses basah dan pekerjaan yang sulit dikontrol dapat dikurangi.</p>
<p>Sistemnya bisa berupa rangka dan panel yang dirakit satu per satu, modul ruang yang hampir selesai dari pabrik, atau unit lipat yang dikembangkan setelah tiba di lokasi. Masing-masing punya kelebihan. Karena itu, istilah "rumah prefab" sebaiknya dipahami sebagai metode membangun, bukan sebagai satu model rumah tertentu.</p>
<figure class="article-figure wide"><img src="/products/prefab-03.jpg" alt="Bangunan modular dua lantai dengan fasad kaca" /><figcaption>Desain prefab tidak harus terlihat sementara. Kombinasi modul, panel, kaca, dan finishing yang tepat dapat membentuk bangunan komersial yang rapi.</figcaption></figure>
</section>
<section id="perbedaan">
<h2>Apakah rumah prefab sama dengan rumah kontainer?</h2>
<p>Tidak selalu. Di pasar Indonesia, kedua istilah ini memang sering dipakai bergantian. Rumah kontainer pada umumnya mengacu pada ruang berbentuk kotak yang mudah dipindahkan—baik menggunakan kontainer pengiriman yang dimodifikasi maupun unit baru yang dibuat dengan ukuran menyerupai kontainer. Rumah prefab memiliki cakupan lebih luas: bentuk, ukuran, jumlah lantai, susunan ruang, dan materialnya dapat dirancang sejak awal sesuai fungsi bangunan.</p>
<p>Jika proyek memerlukan pemindahan berulang, unit kontainer yang ringkas bisa menjadi pilihan praktis. Jika kebutuhannya berupa kantor panjang, mess bertingkat, ruang kelas, klinik, atau fasilitas dengan pembagian ruang khusus, sistem prefab berbasis modul biasanya memberi keleluasaan desain yang lebih besar.</p>
</section>
<section id="alasan">
<h2>Mengapa bangunan prefab semakin banyak digunakan?</h2>
<h3>1. Waktu pembangunan lebih singkat</h3>
<p>Komponen dapat diproduksi di pabrik ketika pekerjaan fondasi berjalan di lokasi. Saat keduanya selesai, proses perakitan dapat dilakukan dengan cepat. Keuntungan ini sangat terasa pada kantor proyek, fasilitas produksi, dan hunian pekerja yang harus segera digunakan.</p>
<h3>2. Produksi lebih mudah dikendalikan</h3>
<p>Pemotongan, pengelasan, pembentukan panel, dan pemeriksaan ukuran dilakukan dalam lingkungan kerja yang lebih teratur. Kondisi ini membantu menjaga konsistensi dibandingkan pekerjaan yang seluruhnya dilakukan di lapangan dan sangat dipengaruhi cuaca.</p>
<h3>3. Mudah dikembangkan</h3>
<p>Modul tambahan dapat direncanakan ketika kebutuhan ruang bertambah. Bangunan juga dapat disusun memanjang atau bertingkat selama struktur, fondasi, tangga, jalur evakuasi, dan sambungannya sudah diperhitungkan. "Bisa ditambah" bukan berarti boleh menumpuk unit tanpa perhitungan teknik.</p>
<h3>4. Biaya lebih mudah dipetakan</h3>
<p>Banyak komponen ditentukan sejak awal sehingga jumlah material dan lingkup pekerjaan lebih mudah dihitung. Meski demikian, harga bangunan bukan hanya harga unit. Transportasi, crane, fondasi, instalasi listrik dan air, septic tank, kanopi, tangga, serta pekerjaan luar tetap perlu dimasukkan agar anggaran tidak tampak murah di awal lalu membengkak di akhir.</p>
</section>
<section id="aplikasi">
<h2>Di mana rumah prefab cocok digunakan?</h2>
<p>Fleksibilitasnya membuat bangunan prefab digunakan untuk kebutuhan sementara maupun jangka panjang, antara lain:</p>
<ul>
<li>kantor pabrik, ruang rapat, pos keamanan, dan fasilitas pendukung produksi;</li>
<li>kantor proyek, mess karyawan, kantin, serta kamp di lokasi konstruksi atau pertambangan;</li>
<li>asrama, ruang kelas, klinik, ruang administrasi, dan fasilitas pelayanan masyarakat;</li>
<li>showroom, toko sementara, gudang ringan, serta ruang usaha modular; dan</li>
<li>hunian tambahan atau bangunan yang perlu dikembangkan secara bertahap.</li>
</ul>
<p>Yang perlu ditanyakan bukan hanya "bisa atau tidak", melainkan "apakah sistem ini cocok untuk pola penggunaan tersebut". Bangunan yang dipakai delapan jam sehari tentu memiliki tuntutan ventilasi, beban listrik, sanitasi, dan kenyamanan berbeda dari mess yang digunakan selama dua puluh empat jam.</p>
<figure class="article-figure split"><img src="/products/prefab-04.jpg" alt="Proyek bangunan prefab dua lantai PT KWD di area industri" /><figcaption>Bangunan prefab dua lantai pada tahap pekerjaan lapangan. Fondasi, akses, tangga, dan utilitas tetap menjadi bagian penting dari sistem.</figcaption></figure>
</section>
<section id="komponen">
<h2>Lima bagian yang paling menentukan kenyamanan dan umur pakai</h2>
<h3>Struktur dan fondasi</h3>
<p>Rangka harus dirancang berdasarkan ukuran bangunan, jumlah lantai, beban penggunaan, kondisi tanah, angin, dan kebutuhan setempat. Fondasi yang tidak rata dapat membuat pintu sulit ditutup, sambungan panel terbuka, dan air masuk. Bangunan ringan tetap membutuhkan dasar yang benar.</p>
<h3>Panel dinding dan atap</h3>
<p>Jenis inti, ketebalan panel, ketebalan lembaran baja, lapisan antikarat, serta detail penguncian memengaruhi insulasi, kekuatan, dan perawatan. EPS ringan dan ekonomis; rock wool lebih umum dipertimbangkan ketika ketahanan api dan pengendalian suara menjadi prioritas. Pemilihannya harus mengikuti fungsi bangunan, bukan sekadar kebiasaan.</p>
<h3>Drainase dan kedap air</h3>
<p>Kebocoran sering muncul bukan karena panel utamanya rusak, tetapi karena kemiringan atap, sambungan, flashing, talang, sekrup, sealant, atau lubang penetrasi kurang tepat. Di iklim tropis dengan hujan deras, jalur pembuangan air perlu dipikirkan sejak gambar awal, bukan ditambahkan setelah bangunan selesai.</p>
<h3>Insulasi, ventilasi, dan pengendalian panas</h3>
<p>Panel berinsulasi membantu mengurangi panas, tetapi kenyamanan ruang juga dipengaruhi warna atap, paparan matahari, luas jendela, ventilasi, jumlah penghuni, dan kapasitas AC. Ruang yang tertutup rapat tanpa pertukaran udara dapat terasa pengap sekalipun dindingnya menggunakan panel yang baik.</p>
<h3>Instalasi listrik dan sanitasi</h3>
<p>Posisi kabel, stopkontak, panel listrik, pipa air, saluran buangan, dan unit AC sebaiknya ditentukan sebelum produksi. Setiap lubang yang dibuat belakangan berpotensi merusak lapisan pelindung dan menjadi jalur air. Instalasi yang rapi bukan sekadar masalah tampilan, tetapi juga keselamatan dan kemudahan perawatan.</p>
<figure class="article-figure portrait"><img src="/products/prefab-05.jpg" alt="Bangunan prefab dua lantai dengan instalasi AC luar" /><figcaption>Posisi unit AC, pipa, kabel, dan pembuangan kondensat perlu direncanakan agar tidak merusak panel maupun mengganggu pemeliharaan.</figcaption></figure>
</section>
<section id="perhatian">
<h2>Beberapa anggapan yang perlu diluruskan</h2>
<h3>"Harga per meter persegi sudah mencakup semuanya"</h3>
<p>Belum tentu. Tanyakan dengan jelas apakah harga mencakup fondasi, lantai, plafon, instalasi, pintu-jendela, sanitasi, transportasi, crane, pemasangan, serta pekerjaan luar. Dua penawaran dengan angka per meter yang sama dapat memiliki lingkup sangat berbeda.</p>
<h3>"Rumah prefab pasti bersifat sementara"</h3>
<p>Umur pakai lebih banyak ditentukan oleh desain, bahan, perlindungan korosi, kualitas sambungan, lokasi, dan perawatan. Bangunan yang dirancang untuk penggunaan jangka panjang tentu perlu spesifikasi berbeda dari kantor proyek enam bulan. Jelaskan sejak awal berapa lama dan seberapa intensif bangunan akan digunakan.</p>
<h3>"Semua unit dapat dipindahkan kapan saja"</h3>
<p>Secara teori banyak sistem dapat dibongkar atau dipindah, tetapi frekuensi pemindahan memengaruhi desain. Unit yang akan sering dipindahkan membutuhkan titik angkat, penguatan, ukuran transportasi, sambungan, dan perlindungan interior yang sesuai. Memindahkan bangunan yang sejak awal dirancang permanen bisa mahal dan berisiko merusak komponen.</p>
</section>
<section id="checklist">
<h2>Sebelum memesan, periksa tujuh hal ini</h2>
<ol class="article-checklist">
<li><b>Fungsi dan masa penggunaan:</b> jelaskan siapa yang memakai bangunan, berapa jam sehari, dan untuk berapa tahun.</li>
<li><b>Denah dan kapasitas:</b> pastikan jumlah ruang, penghuni, pintu, jendela, jalur evakuasi, dan fasilitas sanitasi sesuai kebutuhan nyata.</li>
<li><b>Struktur serta fondasi:</b> minta penjelasan tentang sistem rangka, jumlah lantai, kondisi lokasi, dan persiapan dasar.</li>
<li><b>Spesifikasi panel:</b> periksa jenis inti, ketebalan panel, lembaran baja, pelapis, warna, dan detail sambungan.</li>
<li><b>Utilitas:</b> sepakati titik listrik, lampu, AC, air bersih, drainase, dan saluran limbah sebelum produksi.</li>
<li><b>Lingkup penawaran:</b> bedakan dengan jelas bagian yang termasuk dan tidak termasuk—terutama transportasi, pemasangan, crane, dan pekerjaan sipil.</li>
<li><b>Purna jual:</b> tanyakan dokumen serah terima, panduan perawatan, masa garansi, serta siapa yang dapat dihubungi jika ada masalah.</li>
</ol>
</section>
<section>
<h2>Bagaimana membuat bangunan prefab tetap baik dalam jangka panjang?</h2>
<p>Perawatannya tidak rumit, tetapi harus teratur. Bersihkan talang dan saluran air, periksa sealant dan flashing, segera perbaiki goresan pada lapisan baja, jaga area bawah bangunan tetap kering, dan pastikan pembuangan air AC tidak membasahi panel. Setelah bangunan mengalami cuaca ekstrem atau dipindahkan, periksa kembali baut, sambungan, pintu, serta area penetrasi utilitas.</p>
<p>Perubahan tata ruang juga sebaiknya dikonsultasikan. Membuka dinding, menambah tangki air, memasang mesin berat, atau membuat lubang baru dapat memengaruhi struktur dan kedap air. Bangunan modular memang fleksibel, tetapi fleksibel bukan berarti bebas diubah tanpa rencana.</p>
</section>
<section>
<h2>Penutup</h2>
<p>Kecepatan adalah keunggulan rumah prefab yang paling mudah dilihat, tetapi bukan satu-satunya alasan untuk memilihnya. Nilai sebenarnya terletak pada proses yang lebih terencana, kualitas yang dapat dikendalikan, ruang yang mudah dikembangkan, dan biaya yang lebih mudah dipetakan.</p>
<p>Bangunan yang baik dimulai dari pertanyaan yang tepat: dipakai untuk apa, oleh berapa orang, di lokasi seperti apa, berapa lama, dan fasilitas apa yang dibutuhkan. Setelah itu barulah struktur, panel, instalasi, dan metode pemasangan dipilih. Dengan urutan seperti ini, rumah prefab tidak terasa sebagai jalan pintas, melainkan sebagai cara membangun yang masuk akal.</p>
</section>$c3$,
    null,
    true,
    true,
    'pending'
  )
on conflict (slug) do update set
  title_id = excluded.title_id,
  excerpt_id = excluded.excerpt_id,
  content_id = excluded.content_id,
  published = excluded.published;
