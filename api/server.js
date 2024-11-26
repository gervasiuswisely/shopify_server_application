const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');
const app = express();
require('dotenv').config();

if (!process.env.url) {
  console.error("Variabel 'url' tidak ditemukan dalam .env");
} else {
  console.log(process.env.url); // Harus menampilkan nilai URL
}
// Middleware
app.use(express.json());
app.use(cors());
app.use(multer().none()); // Menangani data multipart/form-data

// Mengatur kredensial Basic Authentication
// const login = process.env.login;
// const password = process.env.password;
// const credentials = Buffer.from(`${login}:${password}`).toString('base64');
// const authHeader = `Basic ${credentials}`;

// app.post('/api/data', async (req, res) => {
//     console.log('Request Body:', req.body);
//   try {
//     // Membuat instance FormData
//     const form = new FormData();

//     // Menambahkan data dari body request ke FormData
//     Object.keys(req.body).forEach(key => {
//       form.append(key, req.body[key]);
//     });

//     // Mengirim permintaan POST ke API eksternal dengan FormData dan Basic Authentication
//     const response = await fetch(process.env.url, {
//       method: 'POST',
//       headers: {
//         ...form.getHeaders(), // Menyertakan header yang diperlukan untuk FormData
//         'Authorization': authHeader // Menyertakan header Basic Authentication
//       },
//       body: form // Mengirim FormData sebagai body permintaan
//     });

//     // Mendapatkan data dari API eksternal
//     const data = await response.json();

//     // Mengirimkan data kembali ke klien
//     res.json(data);
//   } catch (error) {
//     // Menangani kesalahan dan mengirimkan respons error
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

app.post('/api/data', async (req, res) => {
  console.log('Request Body:', req.body.key1,process.env.secret);
  console.log(process.env.url)
  const body = ({
    secret: process.env.secret, // Secret key dari reCAPTCHA
    response: req.body.key1,   // Token yang didapat dari klien (frontend)
});

try {

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:body,
  });

  // Mendapatkan data dari API eksternal
  const data = await response.json();
  // Mengirimkan data kembali ke klien
  res.json(data);
} catch (error) {
  // Menangani kesalahan dan mengirimkan respons error
  console.error(error);
  res.status(500).json({ error: 'Failed to fetch data' });
}
});

module.exports = app;
