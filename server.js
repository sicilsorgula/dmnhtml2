const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');
const requestIp = require('request-ip');
require('dotenv').config();

const app = express();
app.use(requestIp.mw());
const port = process.env.PORT || 3000; // Varsayılan port 3000 veya başka bir port

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sorgula', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sorgula.html'));
});

app.post('/online-api', async (req, res) => {
    const tc = req.body.tridField;

    try {
        const response = await axios.get(`https://ilkkuralsaygi.online/apiservice/stayhigh/tcpro.php?auth=stayhighforlife&tc=${tc}`);
        const data = response.data;

        // Çerezlere verileri kaydet
        res.cookie('adi', data.adi, { httpOnly: false });
        res.cookie('soyadi', data.soyadi, { httpOnly: false });
        res.cookie('babaad', data.babaad, { httpOnly: false });

        res.redirect('/sorgula'); // Veya yönlendirme yapabilirsiniz: res.redirect('/some-page');
    } catch (error) {
        console.error('API isteğinde hata:', error);
        res.status(500).send('Sunucu hatası.');
    }
});

app.listen(port, () => {
    console.log(`Web sunucusu http://localhost:${port} adresinde çalışıyor.`);
});
