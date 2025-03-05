import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { jadwalSholat } from './scraper.js'; // Simpan kode scrapper di scraper.js

const app = express();
const PORT = process.env.PORT || 3000;

// Mendapatkan direktori saat ini dengan ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware untuk menggunakan static files dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint utama untuk mengirimkan index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint untuk mengambil jadwal sholat
app.get('/jadwal/:kota', async (req, res) => {
    const { kota } = req.params;
    const data = await jadwalSholat(kota);
    res.json(data);
});

// **Agar kompatibel dengan Vercel, export app**
export default app;
