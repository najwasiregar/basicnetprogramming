const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

// Mengatur direktori views dan partials
const direktoriViews = path.join(__dirname, '../templates/views');
const direktoriPartials = path.join(__dirname, '../templates/partials');

// Setup view engine hbs
app.set('view engine', 'hbs');
app.set('views', direktoriViews);
hbs.registerPartials(direktoriPartials);

// Menyajikan file statis
app.use(express.static(path.join(__dirname, '../public'))); // Menambahkan middleware untuk file statis

// Halaman utama
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Najwa Alawiyah Siregar' 
    });
});

// Halaman /index
app.get('/index', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Najwa Alawiyah Siregar' 
    });
});

// Halaman 'tentang'
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Aplikasi',
        nama: 'Najwa Alawiyah Siregar' 
    });
});

// Halaman bantuan/FAQ
app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        teksBantuan: 'Silakan hubungi kami untuk bantuan lebih lanjut.',
        nama: 'Najwa Alawiyah Siregar'
    });
});

// Halaman infoCuaca
app.get('/infoCuaca', (req, res) => {
    res.send({
        prediksiCuaca: 'cuaca berpotensi hujan',
        lokasi: 'Padang'
    });
});

// Route wildcard untuk menangani error 404
app.get('*', (req, res) => {
    res.render('404', {
        pesanKesalahan: 'Halaman yang Anda cari tidak ditemukan.',
        nama: 'Najwa Alawiyah Siregar' // Tambahkan ini
    });
});


// Menjalankan server pada port 4000
app.listen(4000, () => {
    console.log('Server berjalan pada port 4000.');
});