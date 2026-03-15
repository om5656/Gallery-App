const Image = require('../models/imageModel');
const path = require('path');
const fs = require('fs-extra');

const uploadFolder = path.join(__dirname, '../uploads');

exports.createImage = async (req, res) => {
    try {
        const { title } = req.body;
        const imageFile = req.file;

        if (!title || !imageFile) {
            return res.status(400).json({ error: "Title and image are required" });
        }

        const newImage = Image.create(title, imageFile.filename);
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllImages = (req, res) => {
    const images = Image.getAll();
    res.json(images);
};

exports.getImageById = (req, res) => {
    const image = Image.getById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    res.json(image);
};

exports.updateImage = async (req, res) => {
    const { title } = req.body;
    const imageFile = req.file;
    const id = req.params.id;

    const image = Image.getById(id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    if (imageFile) {
        const oldFile = path.join(uploadFolder, image.image);
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
    }

    const updatedImage = Image.update(id, title, imageFile ? imageFile.filename : null);
    res.json(updatedImage);
};

exports.deleteImage = (req, res) => {
    const id = req.params.id;
    const image = Image.delete(id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    const filePath = path.join(uploadFolder, image.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({ message: "Image deleted successfully" });
};