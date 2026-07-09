import { Helmet } from 'react-helmet-async';
import { BRAND } from '@/lib/constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: object;
}

export default function SEO({
  title,
  description = 'Premium Home Theatre, Hi-Fi Audio and Smart Home Automation designed for luxury living. Authorized JBL Dealer in Krishnagiri & Salem.',
  image = '/og-image.jpg',
  url,
  type = 'website',
  schema,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : BRAND.website);

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND.name,
    description,
    url: BRAND.website,
    telephone: BRAND.phone,
    image,
    slogan: BRAND.tagline,
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Krishnagiri',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Salem',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
    ],
    sameAs: Object.values(BRAND.social),
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={BRAND.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
}
