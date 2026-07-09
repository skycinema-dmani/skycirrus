export const BRAND = {
  name: 'SkyCinema',
  tagline: 'Where Technology Meets Lifestyle',
  secondaryTagline: 'More Than A Visit — An Experience.',
  website: 'https://skycirrus.com',
  phone: '8300040110',
  email: 'hello@skycirrus.com',
  locations: {
    krishnagiri: {
      name: 'Krishnagiri Experience Center',
      address: 'Krishnagiri, Tamil Nadu, India',
      mapUrl: 'https://maps.google.com/?q=Krishnagiri,Tamil+Nadu',
    },
    salem: {
      name: 'Salem Experience Center',
      address: 'Salem, Tamil Nadu, India',
      mapUrl: 'https://maps.google.com/?q=Salem,Tamil+Nadu',
    },
  },
  social: {
    instagram: 'https://instagram.com/skycinema',
    facebook: 'https://facebook.com/skycinema',
    youtube: 'https://youtube.com/@skycinema',
    linkedin: 'https://linkedin.com/company/skycinema',
  },
} as const;

export const STATS = [
  { value: '500+', label: 'Installations' },
  { value: '10+', label: 'Years Experience' },
  { value: '2', label: 'Showrooms' },
  { value: '100%', label: 'Customer Satisfaction' },
] as const;

export const WHY_SKYCINEMA = [
  {
    title: 'Expert Design',
    description: 'Bespoke home theatre and audio solutions crafted by certified specialists for your unique space.',
    icon: 'design',
  },
  {
    title: 'Authorized JBL Dealer',
    description: 'Official JBL partnership delivering authentic products, warranty support, and expert guidance.',
    icon: 'jbl',
  },
  {
    title: 'Professional Calibration',
    description: 'Precision tuning with industry-standard tools for reference-quality sound and picture.',
    icon: 'calibration',
  },
  {
    title: 'Complete Installation',
    description: 'End-to-end installation with concealed wiring, acoustic treatment, and seamless integration.',
    icon: 'installation',
  },
  {
    title: 'Premium Support',
    description: 'Dedicated after-sales care, maintenance programs, and priority service for peace of mind.',
    icon: 'support',
  },
] as const;

export const CATEGORIES = [
  { slug: 'home-theatre', name: 'Home Theatre', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80' },
  { slug: 'bookshelf-speakers', name: 'Bookshelf Speakers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80' },
  { slug: 'tower-speakers', name: 'Tower Speakers', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231d799?w=800&q=80' },
  { slug: 'center-speakers', name: 'Center Speakers', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { slug: 'subwoofers', name: 'Subwoofers', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0e6d0?w=800&q=80' },
  { slug: 'in-wall-speakers', name: 'In-Wall Speakers', image: 'https://images.unsplash.com/photo-1593359677877-bcde36964c2a?w=800&q=80' },
  { slug: 'ceiling-speakers', name: 'Ceiling Speakers', image: 'https://images.unsplash.com/photo-1558089696-f8680799e469?w=800&q=80' },
  { slug: 'av-receivers', name: 'AV Receivers', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80' },
  { slug: 'amplifiers', name: 'Amplifiers', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231d799?w=800&q=80' },
  { slug: 'streaming', name: 'Streaming', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80' },
  { slug: 'automation', name: 'Automation', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80' },
] as const;

export const SERVICES = [
  { slug: 'premium-home-theatre', name: 'Premium Home Theatre', description: 'Dedicated cinema rooms with 4K projection, Dolby Atmos, and luxury seating.' },
  { slug: 'hi-fi-audio', name: 'Hi-Fi Audio', description: 'Reference-grade two-channel systems for the discerning audiophile.' },
  { slug: 'smart-home', name: 'Smart Home', description: 'Intelligent automation for lighting, climate, security, and entertainment.' },
  { slug: 'acoustics', name: 'Acoustics', description: 'Professional acoustic design and treatment for optimal sound performance.' },
  { slug: 'lighting-control', name: 'Lighting Control', description: 'Scene-based lighting that complements your entertainment experience.' },
  { slug: 'automation', name: 'Automation', description: 'One-touch control of your entire home entertainment ecosystem.' },
  { slug: 'installation', name: 'Installation', description: 'Meticulous installation with attention to every detail and finish.' },
  { slug: 'calibration', name: 'Calibration', description: 'Professional audio and video calibration for reference performance.' },
  { slug: 'maintenance', name: 'Maintenance', description: 'Ongoing care and support to keep your systems performing flawlessly.' },
] as const;

export const JBL_WHY = [
  { title: 'Legendary Heritage', description: 'Over 75 years of audio innovation powering the world\'s greatest venues.' },
  { title: 'Dolby Atmos', description: 'Immersive three-dimensional sound that places you inside the action.' },
  { title: 'Cinema Technology', description: 'Professional cinema systems adapted for luxury home environments.' },
  { title: 'Reference Sound', description: 'Studio-monitor accuracy that reveals every detail in your music and movies.' },
  { title: 'Engineering Excellence', description: 'Meticulous engineering and premium materials in every component.' },
] as const;

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/products', label: 'Products' },
  { path: '/services', label: 'Services' },
  { path: '/blog', label: 'Journal' },
  { path: '/contact', label: 'Contact' },
] as const;

export const PROJECT_TYPES = [
  'Home Theatre',
  'Hi-Fi Audio',
  'Smart Home',
  'Full Integration',
  'Commercial',
  'Other',
] as const;

export const BUDGET_RANGES = [
  'Under ₹5 Lakhs',
  '₹5 - 10 Lakhs',
  '₹10 - 25 Lakhs',
  '₹25 - 50 Lakhs',
  '₹50 Lakhs+',
  'Prefer to discuss',
] as const;
