aos (animate on scroll)

cara pasang (CDN)
1. taruh ini di bagian head html:
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />

2. taruh ini di bagian body html:
   <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
      AOS.init()
    </script>

cara pakai:
1. ada banyak animasinya contohnya (fade up, fade down, fade right dan masih banyak lagi)
   cara panggil animasinya dengan cara:
   a. data-aos="fade-up" misalnya
      data-aos-duration="1500" artinya durasi animasinya 1500 ms
      data-aos-delay="3000 atau 300" artinya saat di scroll ada delay atau waktu sebelum animsinya keluar antara 3000ms dan 300ms
