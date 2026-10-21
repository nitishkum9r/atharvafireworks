export const brandsData = [
  { name: 'Standard',       file: 'standard.png' },
  { name: 'Coronation',     file: 'coronation.png' },
  { name: 'Sony',           file: 'simba.png' },
  { name: 'Kaniskarr',      file: 'kavya.png' },
  { name: 'Murugan',        file: 'muthu.png' },
  { name: 'Sarnavel',       file: 'samrat.png' },
  { name: 'Sri Nivas',      file: 'surya.png' },
  { name: 'Tamrai Kanan',   file: 'tenkheda.png' },
  { name: 'Clasic',         file: 'sikandar.png' },
  { name: 'Vanitha',        file: 'vml.png' },
  { name: 'NSV',            file: 'spl.png' },
  { name: 'Arasan',         file: 'anil.png' },
  { name: 'Sri Ram',        file: 'gokul.png' },
  { name: 'Jai Durga',      file: 'deepam.png' },
  { name: 'Jai Baba',       file: 'pothi.png' },
  { name: 'Mithra',         file: 'lunik.png' },
  { name: 'Thirumalai',     file: 'sk.png' },
  { name: 'Indian National',file: 'madhuri.png' },
];

export const brandLogoMap = Object.fromEntries(
  brandsData.map((b) => [b.name.toLowerCase(), b.file])
);

// Fallbacks for extra aliases
brandLogoMap['multi'] = 'standard.png';
brandLogoMap['taimur'] = 'bhawani.png';
brandLogoMap['kiran'] = 'anil.png';
brandLogoMap['balaji'] = 'apna.png';
brandLogoMap['others'] = 'zing.png';
brandLogoMap['terkheda'] = 'tenkheda.png';
brandLogoMap['gananval'] = 'simba.png';
brandLogoMap['tiger & royal'] = 'koras.png';
brandLogoMap['aascar'] = 'win.png';
brandLogoMap['chitput'] = 'moriya.png';
