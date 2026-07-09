import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { SERVICES } from '@/lib/constants';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Services"
        description="Premium home theatre design, Hi-Fi audio, smart home automation, acoustic solutions, and professional installation by SkyCinema."
      />

      <section className="pt-32 pb-16 section-padding">
        <div className="container-luxury">
          <SectionHeading
            subtitle="End-to-End Solutions"
            title="Our Services"
            description="From initial consultation to final calibration, we handle every detail of your luxury entertainment system."
          />

          <div className="space-y-8">
            {SERVICES.map((service, i) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group flex flex-col md:flex-row gap-8 glass rounded-lg p-8 md:p-10 hover:border-gold/20 transition-all duration-500"
              >
                <span className="text-gold/30 font-display text-5xl md:w-24 flex-shrink-0 group-hover:text-gold/60 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl md:text-3xl text-cream mb-3 group-hover:text-gold transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-cream/50 leading-relaxed">{service.description}</p>
                </div>
                <span className="text-gold text-sm self-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <Button to="/contact" size="lg">Schedule Consultation</Button>
          </div>
        </div>
      </section>
    </>
  );
}
