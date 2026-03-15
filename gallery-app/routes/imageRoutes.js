const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const imageController = require('../controllers/imageController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.post('/', upload.single('image'), imageController.createImage);
router.get('/', imageController.getAllImages);
router.get('/:id', imageController.getImageById);
router.put('/:id', upload.single('image'), imageController.updateImage);
router.delete('/:id', imageController.deleteImage);

module.exports = router;