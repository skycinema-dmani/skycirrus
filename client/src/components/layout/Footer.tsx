import { Link } from 'react-router-dom';
import { BRAND, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/5">
      <div className="section-padding pb-12">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-6">
                <span className="font-display text-3xl text-cream">
                  Sky<span className="text-gold">Cinema</span>
                </span>
              </Link>
              <p className="text-cream/50 text-sm leading-relaxed mb-4">
                {BRAND.tagline}
              </p>
              <p className="text-gold text-xs uppercase tracking-widest">
                Authorized JBL Dealer
              </p>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-cream text-sm uppercase tracking-widest mb-6">
                Experience Centers
              </h4>
              <div className="space-y-6">
                <div>
                  <p className="text-gold text-xs uppercase tracking-wider mb-2">
                    Krishnagiri
                  </p>
                  <p className="text-cream/50 text-sm">
                    {BRAND.locations.krishnagiri.address}
                  </p>
                </div>
                <div>
                  <p className="text-gold text-xs uppercase tracking-wider mb-2">
                    Salem
                  </p>
                  <p className="text-cream/50 text-sm">
                    {BRAND.locations.salem.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-cream text-sm uppercase tracking-widest mb-6">
                Explore
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-cream/50 text-sm hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-cream text-sm uppercase tracking-widest mb-6">
                Connect
              </h4>
              <div className="space-y-4">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="block text-cream/50 text-sm hover:text-gold transition-colors"
                >
                  +91 {BRAND.phone}
                </a>
                <a
                  href={BRAND.website}
                  className="block text-cream/50 text-sm hover:text-gold transition-colors"
                >
                  {BRAND.website.replace('https://', '')}
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="block text-cream/50 text-sm hover:text-gold transition-colors"
                >
                  {BRAND.email}
                </a>
                <div className="flex gap-4 pt-4">
                  {Object.entries(BRAND.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/50 transition-all duration-300"
                      aria-label={platform}
                    >
                      <SocialIcon platform={platform} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden border border-white/5 mb-12 h-48 md:h-64">
            <iframe
              title="SkyCinema Locations"
              src="https://maps.google.com/maps?q=Krishnagiri,Salem,Tamil+Nadu&output=embed&z=8"
              className="w-full h-full grayscale opacity-60 hover:opacity-80 transition-opacity duration-500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="luxury-divider mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-cream/30 text-xs">
            <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
            <p>{BRAND.secondaryTagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.664-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    facebook: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    youtube: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  };
  return icons[platform] || null;
}
