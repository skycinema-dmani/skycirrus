import { useParams } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import Button from '@/components/ui/Button';
import { SERVICES } from '@/lib/constants';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-cream/50">Service not found</p>
      </div>
    );
  }

  const content: Record<string, string[]> = {
    'premium-home-theatre': [
      'Dedicated cinema room design and engineering',
      '4K/8K projection and large-format display systems',
      'Dolby Atmos and DTS:X immersive audio',
      'Luxury seating and lighting design',
      'Acoustic treatment and sound isolation',
      'Professional calibration and tuning',
    ],
    'hi-fi-audio': [
      'Two-channel reference system design',
      'Turntable and vinyl setup',
      'Room acoustic analysis and treatment',
      'Speaker placement optimization',
      'Premium cable and power conditioning',
      'Listening room design consultation',
    ],
    'smart-home': [
      'Unified control of entertainment, lighting, and climate',
      'Voice control integration (Alexa, Google, Siri)',
      'Custom scene programming',
      'Remote monitoring and management',
      'Multi-room audio distribution',
      'Security and surveillance integration',
    ],
  };

  const features = content[service.slug] || [
    'Expert consultation and system design',
    'Premium product selection and sourcing',
    'Professional installation and integration',
    'Calibration and performance optimization',
    'Training and ongoing support',
  ];

  return (
    <>
      <SEO title={service.name} description={service.description} />

      <section className="pt-32 pb-16 section-padding">
        <div className="container-luxury max-w-4xl">
          <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Service</span>
          <h1 className="heading-display text-4xl md:text-6xl text-cream mb-6">{service.name}</h1>
          <div className="luxury-divider mx-0 mb-8" />
          <p className="text-cream/60 text-lg leading-relaxed mb-12">{service.description}</p>

          <div className="glass rounded-lg p-8 md:p-10 mb-12">
            <h2 className="font-display text-2xl text-cream mb-6">What's Included</h2>
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-4 text-cream/60">
                  <span className="text-gold mt-1 flex-shrink-0">✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button to="/contact" size="lg">Book Consultation</Button>
            <Button to="/projects" variant="secondary" size="lg">View Projects</Button>
          </div>
        </div>
      </section>
    </>
  );
}
