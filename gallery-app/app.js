// Load environment variables from .env
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || 'uploads';
const DATA_FILE = process.env.DATA_FILE || 'data/images.json';

fs.ensureDirSync(path.join(__dirname, UPLOAD_FOLDER));
fs.ensureDirSync(path.dirname(DATA_FILE));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const imageRoutes = require('./routes/imageRoutes');
app.use('/images', imageRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});