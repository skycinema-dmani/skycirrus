import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'skycirrus';
const DB_NAME = process.env.DB_NAME || 'skycinema';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image VARCHAR(500),
  parent_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  model VARCHAR(100) NOT NULL,
  brand VARCHAR(100) NOT NULL DEFAULT 'JBL',
  category_id INT NOT NULL,
  description TEXT NOT NULL,
  specifications JSON,
  image VARCHAR(500) NOT NULL,
  gallery JSON,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  series VARCHAR(100),
  downloads JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  equipment JSON,
  testimonial TEXT,
  client_name VARCHAR(255),
  featured TINYINT(1) NOT NULL DEFAULT 0,
  cover_image VARCHAR(500) NOT NULL,
  before_after JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  caption VARCHAR(255),
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_photo VARCHAR(500),
  rating TINYINT NOT NULL DEFAULT 5,
  review TEXT NOT NULL,
  location VARCHAR(255),
  featured TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  content TEXT,
  image VARCHAR(500),
  icon VARCHAR(100),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  cover_image VARCHAR(500),
  author VARCHAR(255) DEFAULT 'SkyCinema Team',
  published_at DATE NOT NULL,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  project_type VARCHAR(100) NOT NULL,
  budget VARCHAR(100) NOT NULL,
  message TEXT,
  preferred_date DATE NOT NULL,
  location VARCHAR(255),
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  product_id INT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT NOT NULL
);
`;

const CATEGORIES = [
  { name: 'Home Theatre', slug: 'home-theatre', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80' },
  { name: 'Bookshelf Speakers', slug: 'bookshelf-speakers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80' },
  { name: 'Tower Speakers', slug: 'tower-speakers', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231d799?w=800&q=80' },
  { name: 'Center Speakers', slug: 'center-speakers', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { name: 'Subwoofers', slug: 'subwoofers', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0e6d0?w=800&q=80' },
  { name: 'In-Wall Speakers', slug: 'in-wall-speakers', image: 'https://images.unsplash.com/photo-1593359677877-bcde36964c2a?w=800&q=80' },
  { name: 'Ceiling Speakers', slug: 'ceiling-speakers', image: 'https://images.unsplash.com/photo-1558089696-f8680799e469?w=800&q=80' },
  { name: 'AV Receivers', slug: 'av-receivers', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80' },
  { name: 'Amplifiers', slug: 'amplifiers', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231d799?w=800&q=80' },
  { name: 'Streaming', slug: 'streaming', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80' },
  { name: 'Automation', slug: 'automation', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80' },
];

const PRODUCTS = [
  { name: 'JBL Synthesis SDR-35', slug: 'jbl-synthesis-sdr-35', model: 'SDR-35', brand: 'JBL', category: 'av-receivers', description: 'The flagship JBL Synthesis AV processor delivers uncompromising cinema performance with 16 channels of processing and Dirac Live room correction.', specifications: { Channels: '16', 'Dolby Atmos': 'Yes', 'HDMI 2.1': '8 In / 4 Out', 'Room Correction': 'Dirac Live' }, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', featured: true, series: 'Synthesis' },
  { name: 'JBL Synthesis SCL-3', slug: 'jbl-synthesis-scl-3', model: 'SCL-3', brand: 'JBL', category: 'in-wall-speakers', description: "Premium in-wall LCR speaker with JBL's patented D2 compression driver technology for reference-quality dialogue reproduction.", specifications: { Type: '3-Way In-Wall', 'Frequency Response': '55Hz - 40kHz', Sensitivity: '91dB', Impedance: '8 Ohm' }, image: 'https://images.unsplash.com/photo-1593359677877-bcde36964c2a?w=800&q=80', featured: true, series: 'Synthesis' },
  { name: 'JBL Stage A190', slug: 'jbl-stage-a190', model: 'A190', brand: 'JBL', category: 'tower-speakers', description: "Floorstanding speaker delivering powerful, room-filling sound with JBL's legendary horn technology in an elegant design.", specifications: { Type: '3-Way Floorstanding', 'Frequency Response': '38Hz - 40kHz', Power: '200W RMS', Drivers: '1" Tweeter, Dual 6.5" Woofers' }, image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231d799?w=800&q=80', featured: true, series: 'Stage' },
  { name: 'JBL Stage A135A', slug: 'jbl-stage-a135a', model: 'A135A', brand: 'JBL', category: 'subwoofers', description: 'Powered subwoofer with 12" polypropylene driver delivering deep, authoritative bass for home theatre and music.', specifications: { Driver: '12" Polypropylene', 'Frequency Response': '35Hz - 150Hz', Power: '350W RMS', 'Phase Control': '0-180°' }, image: 'https://images.unsplash.com/photo-1614680376573-df3480f0e6d0?w=800&q=80', featured: true, series: 'Stage' },
  { name: 'JBL Synthesis SSW-4', slug: 'jbl-synthesis-ssw-4', model: 'SSW-4', brand: 'JBL', category: 'subwoofers', description: 'Reference-grade in-wall subwoofer system designed for dedicated home theatre installations with dual 10" drivers.', specifications: { Type: 'In-Wall Subwoofer', Drivers: 'Dual 10"', Power: '1000W', 'Frequency Response': '20Hz - 120Hz' }, image: 'https://images.unsplash.com/photo-1614680376573-df3480f0e6d0?w=800&q=80', featured: false, series: 'Synthesis' },
  { name: 'JBL Stage A130', slug: 'jbl-stage-a130', model: 'A130', brand: 'JBL', category: 'bookshelf-speakers', description: 'Compact bookshelf speaker with JBL horn-loaded tweeter delivering dynamic, detailed sound in a refined package.', specifications: { Type: '2-Way Bookshelf', 'Frequency Response': '55Hz - 40kHz', Power: '125W RMS', Sensitivity: '86dB' }, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80', featured: false, series: 'Stage' },
];

const PROJECTS = [
  { title: 'The Meridian Villa', slug: 'the-meridian-villa', location: 'Krishnagiri', type: 'Home Theatre', description: 'A dedicated 7.2.4 Dolby Atmos home theatre with 4K laser projection, acoustic treatment, and luxury recliner seating for 8.', equipment: ['JBL Synthesis SDR-35', 'JBL SCL-3 LCR', 'JBL SSW-4 Subwoofers', 'Sony VPL-XW5000ES', '120" Acoustically Transparent Screen'], testimonial: 'SkyCinema transformed our basement into a world-class cinema. The attention to detail in acoustic design and calibration is extraordinary.', client_name: 'Rajesh & Priya M.', featured: true, cover_image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80', before_after: { before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', after: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80' } },
  { title: 'Skyline Penthouse', slug: 'skyline-penthouse', location: 'Salem', type: 'Residential', description: 'Whole-home audio and smart automation integration in a luxury penthouse with invisible in-ceiling speakers throughout.', equipment: ['JBL Stage A190 Towers', 'JBL Stage A135A Sub', 'Control4 Automation', 'Lutron Lighting'], testimonial: 'Every room in our home now has perfect sound. The smart integration is seamless — one touch controls everything.', client_name: 'Arun K.', featured: true, cover_image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80', before_after: null },
  { title: 'Cinema Room Elite', slug: 'cinema-room-elite', location: 'Krishnagiri', type: 'Home Theatre', description: 'Reference-grade dedicated theatre room with star ceiling, tiered seating, and full JBL Synthesis system.', equipment: ['JBL Synthesis Full System', 'JVC NZ900 Projector', 'Stewart Filmscreen', 'Kinetics Acoustic Panels'], testimonial: "Better than any commercial cinema we've visited. SkyCinema exceeded every expectation.", client_name: 'Vikram S.', featured: true, cover_image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=80', before_after: null },
  { title: 'Modern Media Lounge', slug: 'modern-media-lounge', location: 'Salem', type: 'Media Room', description: 'Elegant living room integration with hidden speakers, 85" OLED display, and ambient lighting scenes.', equipment: ['JBL Stage A130 Bookshelf', 'JBL Stage A135A Sub', 'LG G4 OLED 85"', 'Savant Automation'], testimonial: null, client_name: 'Deepa R.', featured: false, cover_image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=80', before_after: null },
];

const TESTIMONIALS = [
  { client_name: 'Rajesh M.', client_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', rating: 5, review: 'SkyCinema transformed our home into a personal cinema. The JBL Synthesis system sounds absolutely incredible. Professional from start to finish.', location: 'Krishnagiri', featured: true },
  { client_name: 'Priya S.', client_photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', rating: 5, review: "The team's expertise in acoustic design made all the difference. Our dedicated theatre room is the highlight of our home. Highly recommended!", location: 'Salem', featured: true },
  { client_name: 'Arun K.', client_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', rating: 5, review: 'From consultation to calibration, every step was handled with precision. The smart home integration works flawlessly. True professionals.', location: 'Krishnagiri', featured: true },
  { client_name: 'Deepa R.', client_photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', rating: 5, review: 'We visited both showrooms and the experience was phenomenal. They understood our vision and delivered beyond expectations.', location: 'Salem', featured: true },
];

const SERVICES = [
  { name: 'Premium Home Theatre', slug: 'premium-home-theatre', description: 'Dedicated cinema rooms with 4K projection, Dolby Atmos, and luxury seating.' },
  { name: 'Hi-Fi Audio', slug: 'hi-fi-audio', description: 'Reference-grade two-channel systems for the discerning audiophile.' },
  { name: 'Smart Home', slug: 'smart-home', description: 'Intelligent automation for lighting, climate, security, and entertainment.' },
  { name: 'Acoustics', slug: 'acoustics', description: 'Professional acoustic design and treatment for optimal sound performance.' },
  { name: 'Lighting Control', slug: 'lighting-control', description: 'Scene-based lighting that complements your entertainment experience.' },
  { name: 'Automation', slug: 'automation', description: 'One-touch control of your entire home entertainment ecosystem.' },
  { name: 'Installation', slug: 'installation', description: 'Meticulous installation with attention to every detail and finish.' },
  { name: 'Calibration', slug: 'calibration', description: 'Professional audio and video calibration for reference performance.' },
  { name: 'Maintenance', slug: 'maintenance', description: 'Ongoing care and support to keep your systems performing flawlessly.' },
];

const BLOG_POSTS = [
  { title: 'The Art of Home Theatre Design', slug: 'art-of-home-theatre-design', excerpt: 'Discover how proper room design, acoustic treatment, and speaker placement create an immersive cinema experience.', content: 'Designing a home theatre is both an art and a science. From room dimensions to speaker placement, every decision affects the final experience.', cover_image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', published_at: '2025-06-15' },
  { title: 'Why Dolby Atmos Changes Everything', slug: 'why-dolby-atmos-changes-everything', excerpt: "Understanding three-dimensional sound and why it's the most significant upgrade for your home cinema.", content: 'Dolby Atmos adds height channels and object-based audio, placing sounds precisely in three-dimensional space around the listener.', cover_image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80', published_at: '2025-05-28' },
  { title: 'JBL Synthesis: Reference Sound at Home', slug: 'jbl-synthesis-reference-sound', excerpt: "An inside look at JBL's flagship Synthesis series and why it's the choice of professional cinema designers worldwide.", content: 'JBL Synthesis brings commercial cinema technology into the home with uncompromising performance and build quality.', cover_image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', published_at: '2025-05-10' },
];

const SITE_SETTINGS = {
  site_title: 'SkyCinema — Where Technology Meets Lifestyle',
  meta_description: 'Premium Home Theatre, Hi-Fi Audio and Smart Home Automation. Authorized JBL Dealer.',
  phone: '8300040110',
  email: 'hello@skycirrus.com',
  instagram_token: '',
};

async function seed(conn) {
  const [users] = await conn.query('SELECT COUNT(*) AS count FROM users');
  if (users[0].count > 0) {
    console.log('Database already seeded — skipping seed data.');
    return;
  }

  const passwordHash = await bcrypt.hash('admin123', 10);
  await conn.query(
    'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
    ['admin@skycirrus.com', passwordHash, 'Admin', 'admin']
  );

  for (const cat of CATEGORIES) {
    await conn.query(
      'INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)',
      [cat.name, cat.slug, cat.image]
    );
  }

  const [categoryRows] = await conn.query('SELECT id, slug FROM categories');
  const categoryMap = Object.fromEntries(categoryRows.map((r) => [r.slug, r.id]));

  for (const p of PRODUCTS) {
    await conn.query(
      `INSERT INTO products (name, slug, model, brand, category_id, description, specifications, image, featured, series)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.name, p.slug, p.model, p.brand, categoryMap[p.category], p.description, JSON.stringify(p.specifications), p.image, p.featured ? 1 : 0, p.series]
    );
  }

  for (const proj of PROJECTS) {
    await conn.query(
      `INSERT INTO projects (title, slug, location, type, description, equipment, testimonial, client_name, featured, cover_image, before_after)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [proj.title, proj.slug, proj.location, proj.type, proj.description, JSON.stringify(proj.equipment), proj.testimonial, proj.client_name, proj.featured ? 1 : 0, proj.cover_image, proj.before_after ? JSON.stringify(proj.before_after) : null]
    );
  }

  for (const t of TESTIMONIALS) {
    await conn.query(
      'INSERT INTO testimonials (client_name, client_photo, rating, review, location, featured) VALUES (?, ?, ?, ?, ?, ?)',
      [t.client_name, t.client_photo, t.rating, t.review, t.location, t.featured ? 1 : 0]
    );
  }

  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    await conn.query(
      'INSERT INTO services (name, slug, description, sort_order) VALUES (?, ?, ?, ?)',
      [s.name, s.slug, s.description, i]
    );
  }

  for (const b of BLOG_POSTS) {
    await conn.query(
      'INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, published_at) VALUES (?, ?, ?, ?, ?, ?)',
      [b.title, b.slug, b.excerpt, b.content, b.cover_image, b.published_at]
    );
  }

  for (const [key, value] of Object.entries(SITE_SETTINGS)) {
    await conn.query(
      'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)',
      [key, value]
    );
  }

  console.log('Seed data inserted.');
  console.log('Admin login: admin@skycirrus.com / admin123');
}

async function main() {
  const rootConn = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  console.log(`Database "${DB_NAME}" ready.`);

  const conn = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    multipleStatements: true,
  });

  await conn.query(SCHEMA);
  console.log('Tables created.');

  await seed(conn);

  await conn.end();
  await rootConn.end();
  console.log('Setup complete.');
}

main().catch((err) => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
