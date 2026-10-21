const fs = require('fs');
let cat = fs.readFileSync('./data/categories.js', 'utf8');
cat = cat.replace(/\{\s*id:\s*'(\d+)',/g, "{ id: '$1', img: '/assets/items/item-$1.jpg',");
fs.writeFileSync('./data/categories.js', cat, 'utf8');
console.log('categories.js successfully updated with individual img paths!');
