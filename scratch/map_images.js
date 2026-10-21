const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const scraped = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/assets/scraped_products.json'), 'utf8'));

// List of 111 items from categories
const categoriesData = require('./data/categories.js');
console.log('Categories loaded:', categoriesData.categories.length);

const itemsDir = path.join(__dirname, 'public/assets/items');
if (!fs.existsSync(itemsDir)) {
  fs.mkdirSync(itemsDir, { recursive: true });
}

// Available local item images
const localFiles = fs.readdirSync(itemsDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
console.log('Existing local item files count:', localFiles.length);
