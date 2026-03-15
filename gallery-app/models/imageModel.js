const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataFile = path.join(__dirname, '../data/images.json');

function readData() {
    if (!fs.existsSync(dataFile)) return [];
    const data = fs.readFileSync(dataFile);
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

class Image {
    constructor(title, image) {
        this.id = uuidv4();
        this.title = title;
        this.image = image;
    }

    static getAll() {
        return readData();
    }

    static getById(id) {
        const images = readData();
        return images.find(img => img.id === id);
    }

    static create(title, image) {
        const images = readData();
        const newImage = new Image(title, image);
        images.push(newImage);
        writeData(images);
        return newImage;
    }

    static update(id, title, image) {
        const images = readData();
        const index = images.findIndex(img => img.id === id);
        if (index === -1) return null;
        if (title) images[index].title = title;
        if (image) images[index].image = image;
        writeData(images);
        return images[index];
    }

    static delete(id) {
        const images = readData();
        const index = images.findIndex(img => img.id === id);
        if (index === -1) return null;
        const deleted = images.splice(index, 1)[0];
        writeData(images);
        return deleted;
    }
}

module.exports = Image;