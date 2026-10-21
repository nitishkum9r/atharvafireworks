const fs = require('fs');
const path = require('path');
const https = require('https');

const scraped = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/scraped_products.json'), 'utf8'));
const outDir = path.join(__dirname, '../public/assets/items');

// Mapping dictionary from item id (1 to 111) to either local file or scraped key
const mappings = {
  // Bombs (1 - 18)
  1: { local: '8e.jpg' }, // Jawan & Lady
  2: { scraped: '3 1/2 inch Laxmi crackers (5 pcs)', fallback: '8b.jpg' },
  3: { scraped: 'Red Bijili Crackers B (100Pcs)', fallback: '8a.jpg' },
  4: { scraped: '2 sound crackers (5 pcs)', fallback: '8c.jpg' },
  5: { scraped: '10 Giant Crackers B (1 Pkt)', fallback: '8d.jpg' },
  6: { scraped: '28 Chorsa Crackers B (1Pkt)', fallback: '8a.jpg' },
  7: { scraped: '28 Giant Crackers B (1 Pkt)', fallback: '8b.jpg' },
  8: { scraped: '56 Giant Crackers B (1 Pkt)', fallback: '8c.jpg' },
  9: { scraped: 'MEGA CLASSIC BOMB E (10 Pcs)', fallback: '8d.jpg' },
  10: { scraped: 'Shell Bomb (Heavy Sound) E (10 Pcs)', fallback: '8e.jpg' },
  11: { scraped: 'HYDROGEN BOMB E (10 Pcs)', fallback: '8a.jpg' },
  12: { scraped: '555 Timing Bomb E (10 Pcs)', fallback: '8d.jpg' },
  13: { scraped: '4 inch HERCULES DELUXE S (5 pcs)', fallback: '8b.jpg' },
  14: { scraped: 'Atom Bomb Big Green B (10 pcs)', fallback: '8a.jpg' },
  15: { scraped: 'Classic Bomb Green B (10 pcs)', fallback: '8b.jpg' },
  16: { scraped: '28 Chorsa Crackers B (1Pkt)', fallback: '8c.jpg' },
  17: { local: '8c.jpg' },
  18: { scraped: 'Thunder bomb green (10 pcs)', fallback: '8d.jpg' },

  // Flower Pots (19 - 25)
  19: { scraped: 'Flower Pots Asoka B (10Pcs)', fallback: '2a.jpg' },
  20: { scraped: 'Colour Koti B (MultI Colour) (10 pcs)', fallback: '2d.jpg' },
  21: { scraped: 'Flower Pots Special B  (10 pcs)', fallback: '2c.jpg' },
  22: { scraped: 'Flower Pots Asoka E (10Pcs)', fallback: '2b.jpg' },
  23: { scraped: 'Flower pots giant S (10 pcs)', fallback: '2e.jpg' },
  24: { scraped: 'Flower pots big S (10 pcs)', fallback: '2a.jpg' },
  25: { scraped: 'SABSE BADA KOTI  E (10 Pcs)', fallback: '2f.jpg' },

  // Sparklers (26 - 39)
  26: { scraped: '15Cm Lemon Tree sparklers (10 pcs)', fallback: '1a.jpg' },
  27: { scraped: '30 Cm crackling sparklers S (5 pcs)', fallback: '1b.jpg' },
  28: { scraped: '30cm Green Colour B (5Pcs)', fallback: '1c.jpg' },
  29: { scraped: '30cm Green Colour B (5Pcs)', fallback: '1e.jpg' },
  30: { scraped: '7cm Electric sparklers B (10 Pcs)', fallback: '1d.jpg' },
  31: { scraped: '30 cm Electric E (Export Quality)(5 Pcs)', fallback: '1f.jpg' },
  32: { scraped: '15cm Electric Sparklers B (10Pcs)', fallback: '1a.jpg' },
  33: { scraped: '30 Cm gold sparklers (5 pcs)', fallback: '1g.jpg' },
  34: { scraped: '30 cm crackling E (Export Quality) (5 pcs)', fallback: '1b.jpg' },
  35: { scraped: '30cm Red Colour B (5Pcs)', fallback: '1e.jpg' },
  36: { scraped: '7cm Crackling Sparklers B (10 Pcs)', fallback: '1d.jpg' },
  37: { scraped: '20 CM EXPORT CRACKLING SPARKLERS (10 PCS)', fallback: '1c.jpg' },
  38: { scraped: '50 cm Electric E (Export Quality) (5 Pcs)', fallback: '1f.jpg' },
  39: { scraped: '120 cm Deluxe Twinkling star B  (10 pcs)', fallback: '1g.jpg' },

  // Rockets (40 - 47)
  40: { scraped: 'Rohini rockets (10 pcs)', fallback: '9a.jpg' },
  41: { scraped: 'Parachute rockets (5 pcs)', fallback: '9c.jpg' },
  42: { scraped: 'WHISTLING SYMPHONY ROCKET E (10 PCS)', fallback: '9d.jpg' },
  43: { scraped: 'Bomb rockets (10 pcs)', fallback: '9b.jpg' },
  44: { scraped: 'Crackling Rocket E (10 Pcs)', fallback: '9e.jpg' },
  45: { scraped: 'Surveyor rockets (10 pcs)', fallback: '9f.jpg' },
  46: { local: '9b.jpg' },
  47: { scraped: 'THREE SOUND ROCKET E (10 Pcs)', fallback: '9e.jpg' },

  // Fancy (48 - 82)
  48: { scraped: '3.5 Inc PIPE 1000 Gems in the sky (1 pcs)', fallback: '6a.jpg' },
  49: { scraped: '2 Inc PIPE Comet E (3 Pcs)', fallback: '6b.jpg' },
  50: { scraped: '3 Inch PIPE Night Wonder B (1 Pcs)', fallback: '6c.jpg' },
  51: { scraped: '2 Inch PIPE Golden Dreams B (1 Pcs)', fallback: '6a.jpg' },
  52: { scraped: '12 Shot Colour B CAKES (Mega size)', fallback: '5a.jpg' },
  53: { scraped: 'Seven Shots Red / Violet (5 Pcs)', fallback: '5b.jpg' },
  54: { scraped: '2.5 Inc PIPE Sun flower (1 pcs)', fallback: '6b.jpg' },
  55: { scraped: 'Sky wash (12 shot CAKES)', fallback: '5c.jpg' },
  56: { scraped: '15 Shots CAKES B (Multicolour)', fallback: '5b.jpg' },
  57: { scraped: '3 Inch PIPE Snow Falls B (1 Pcs)', fallback: '6c.jpg' },
  58: { scraped: 'Fantasy - 30 Shots CAKES B (Ultra)', fallback: '5d.jpg' },
  59: { scraped: 'Rajukanna 4 Inc FANCY PIPE Double Balls (2 Pcs)', fallback: '6c.jpg' },
  60: { scraped: '50 Shots CAKES B (Multi Colour)', fallback: '5e.jpg' },
  61: { scraped: 'KALEIDOSCOPE (100 SHOTS CAKES)', fallback: '5e.jpg' },
  62: { scraped: 'VANITHA BOOMERANG 18 (18 SHOTS CAKES)', fallback: '5c.jpg' },
  63: { scraped: '240 Shots CAKES B (Multi Colour)', fallback: '5f.jpg' },
  64: { scraped: '2 Inch PIPE Star Plus B (1 Pcs)', fallback: '6a.jpg' },
  65: { scraped: '1 Inc PIPE Super Star (Crackling &amp; Silver) (1 Pcs)', fallback: '6b.jpg' },
  66: { scraped: '2.5 Inc PIPE Garden of eden (1 pcs)', fallback: '6b.jpg' },
  67: { scraped: '4 Inch PIPE Night Mega B (2 pcs)', fallback: '6c.jpg' },
  68: { scraped: 'SYMPHONY-50 Shots Multi Colour CAKES E (1 Pce)', fallback: '5e.jpg' },
  69: { scraped: 'VANITHA 5 Inch PREMIUM FANCY PIPE (2 PCS)', fallback: '6c.jpg' },
  70: { scraped: '4 Inc PIPE Premium Comet (1 Pcs)', fallback: '6a.jpg' },
  71: { scraped: 'PALA-SOLA-KI B (30 Shot FAN CAKE)', fallback: '5d.jpg' },
  72: { scraped: '7 Angels / 7 Wonders (56 shot CAKES)', fallback: '5d.jpg' },
  73: { scraped: '10 x 10 Shot CRACKLING B (FAN CAKE)', fallback: '5e.jpg' },
  74: { scraped: 'multi colour candles (10 pcs)', fallback: '7g.jpg' },
  75: { scraped: 'Wabot - 12 (12 shot CAKES)', fallback: '5a.jpg' },
  76: { scraped: '1 1/4 Inch Chotta Fancy B (1 Pcs)', fallback: '6a.jpg' },
  77: { scraped: 'Rajukanna 3 Inc FANCY PIPE (3 Pcs)', fallback: '6b.jpg' },
  78: { scraped: 'VANITHA V-FORCE/CHILLOUT SETOUTS(12 Shots / 3 1/2" PIPE )', fallback: '5c.jpg' },
  79: { scraped: 'Black Ghost (40 shot CAKES)', fallback: '5d.jpg' },
  80: { scraped: 'Ravindra TEMPLE RUN (FAN CAKES - 16 SHOTS)', fallback: '5b.jpg' },
  81: { scraped: '3.5 Inc PIPE Blue angels (1 pcs)', fallback: '6c.jpg' },
  82: { scraped: '3.5 Inc PIPE Colour Changing Balls (1 Pce)', fallback: '6b.jpg' },

  // Chakkars (83 - 92)
  83: { scraped: 'zamin chakkar delux (10 pcs)', fallback: '3d.jpg' },
  84: { scraped: 'zamin chakkar asoka (10 pcs)', fallback: '3c.jpg' },
  85: { scraped: 'Ground Chakkar Deluxe B (10 Pcs)', fallback: '3b.jpg' },
  86: { scraped: 'Zamin chakkar big (10 pcs)', fallback: '3a.jpg' },
  87: { scraped: 'Ground Chakkar Asoka B  (10 pcs)', fallback: '3c.jpg' },
  88: { local: '3a.jpg' },
  89: { local: '3c.jpg' },
  90: { local: '3d.jpg' },
  91: { scraped: 'whizz wheel (Whistling Sounds)', fallback: '3b.jpg' },
  92: { scraped: 'Planet Wheeling Show B (Crackling) 2 pcs(NEW)', fallback: '3d.jpg' },

  // Other Crackers (93 - 111)
  93: { scraped: '2.5 Inc PIPE Silver dragon (1 pcs)', fallback: '4a.jpg' },
  94: { scraped: 'Robin Super Deluxe 10 in 1 Deluxe (10 Pcs)', fallback: '4b.jpg' },
  95: { local: '7g.jpg' },
  96: { scraped: '2 3/4" Sparrow Crackers (5 Pcs)', fallback: '7d.jpg' },
  97: { scraped: 'Singing birds (100 shot CAKES)', fallback: '5e.jpg' },
  98: { local: '7d.jpg' },
  99: { local: '7c.jpg' },
  100: { scraped: '1000 Giant Wala Crackers B Full Count', fallback: '4a.jpg' },
  101: { scraped: '2000 Giant Wala crackers B Full Count', fallback: '4b.jpg' },
  102: { scraped: '3300 Giant wala  Crackers E (New)', fallback: '4c.jpg' },
  103: { local: '7a.jpg' },
  104: { local: '7e.jpg' },
  105: { local: '10a.jpg' },
  106: { scraped: 'COLOUR CHANGING BUTTERFLY (10 PCS)', fallback: '7b.jpg' },
  107: { scraped: 'FUN RUN E (6 PCS)', fallback: '7f.jpg' },
  108: { scraped: 'Colour Fog Fountains (5 Pcs)', fallback: '2f.jpg' },
  109: { scraped: 'Tri colour fountains (millennium) (5 pcs)', fallback: '2d.jpg' },
  110: { scraped: 'Roll Caps B', fallback: '10c.jpg' },
  111: { scraped: 'Treasure Box (Red &amp; White) (5 Pcs)', fallback: '10d.jpg' }
};

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Failed with status ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Processing all 111 item images...');
  for (let id = 1; id <= 111; id++) {
    const targetFile = path.join(outDir, `item-${id}.jpg`);
    const cfg = mappings[id];
    if (!cfg) {
      console.log(`Missing config for item ${id}`);
      continue;
    }

    if (cfg.local) {
      const src = path.join(outDir, cfg.local);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, targetFile);
        console.log(`Copied local ${cfg.local} -> item-${id}.jpg`);
        continue;
      }
    }

    let url = null;
    if (cfg.scraped && scraped[cfg.scraped]) {
      url = scraped[cfg.scraped];
    }

    if (url) {
      try {
        await downloadUrl(url, targetFile);
        console.log(`Downloaded ${cfg.scraped} -> item-${id}.jpg`);
        continue;
      } catch (e) {
        console.log(`Download failed for ${id}: ${e.message}`);
      }
    }

    // Fallback to local
    if (cfg.fallback) {
      const fallbackSrc = path.join(outDir, cfg.fallback);
      if (fs.existsSync(fallbackSrc)) {
        fs.copyFileSync(fallbackSrc, targetFile);
        console.log(`Fallback copy ${cfg.fallback} -> item-${id}.jpg`);
      }
    }
  }
  console.log('All 111 item images processed!');
}

run();
