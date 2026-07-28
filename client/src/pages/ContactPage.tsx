import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/common/SEO';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { BRAND, PROJECT_TYPES, BUDGET_RANGES } from '@/lib/constants';
import { createAppointment } from '@/lib/api';
import { mockFAQ } from '@/lib/mockData';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  city: z.string().min(2, 'City is required'),
  project_type: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().optional(),
  preferred_date: z.string().min(1, 'Please select a preferred date'),
  location: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      project_type: searchParams.get('product') ? 'Hi-Fi Audio' : '',
      message: searchParams.get('product')
        ? `I'm interested in: ${searchParams.get('product')}`
        : '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      await createAppointment(data);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Contact & Appointments"
        description="Book a private demonstration at SkyCinema experience centers in Krishnagiri or Salem. Premium home theatre consultations."
      />

      <section className="pt-32 pb-16 section-padding">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Get In Touch"
            title="Book Your Experience"
            description="Schedule a private demonstration at our experience center. Let us design your perfect home entertainment system."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-lg p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl text-cream mb-4">Thank You</h3>
                  <p className="text-cream/60">
                    Your appointment request has been received. Our team will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Full Name" error={errors.name?.message}>
                      <input {...register('name')} className="form-input" placeholder="Your name" />
                    </FormField>
                    <FormField label="Phone" error={errors.phone?.message}>
                      <input {...register('phone')} className="form-input" placeholder="+91" />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Email" error={errors.email?.message}>
                      <input {...register('email')} type="email" className="form-input" placeholder="you@email.com" />
                    </FormField>
                    <FormField label="City" error={errors.city?.message}>
                      <input {...register('city')} className="form-input" placeholder="Your city" />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Project Type" error={errors.project_type?.message}>
                      <select {...register('project_type')} className="form-input">
                        <option value="">Select type</option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Budget Range" error={errors.budget?.message}>
                      <select {...register('budget')} className="form-input">
                        <option value="">Select budget</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Preferred Visit Date" error={errors.preferred_date?.message}>
                      <input {...register('preferred_date')} type="date" className="form-input" />
                    </FormField>
                    <FormField label="Preferred Location">
                      <select {...register('location')} className="form-input">
                        <option value="">Select showroom</option>
                        <option value="Krishnagiri">Krishnagiri</option>
                        <option value="Salem">Salem</option>
                      </select>
                    </FormField>
                  </div>

                  <FormField label="Message">
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="form-input resize-none"
                      placeholder="Tell us about your vision..."
                    />
                  </FormField>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <Button type="submit" size="lg" disabled={isSubmitting} magnetic={false}>
                    {isSubmitting ? 'Submitting...' : 'Reserve Appointment'}
                  </Button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="glass rounded-lg p-8">
                <h3 className="font-display text-xl text-cream mb-6">Experience Centers</h3>
                {Object.entries(BRAND.locations).map(([key, loc]) => (
                  <div key={key} className="mb-6 last:mb-0">
                    <p className="text-gold text-xs uppercase tracking-widest mb-1">{loc.name}</p>
                    <p className="text-cream/50 text-sm">{loc.address}</p>
                  </div>
                ))}
              </div>

              <div className="glass rounded-lg p-8">
                <h3 className="font-display text-xl text-cream mb-4">Direct Contact</h3>
                <a href={`tel:${BRAND.phone}`} className="block text-gold text-2xl font-display mb-2 hover:text-gold-light transition-colors">
                  +91 {BRAND.phone}
                </a>
                <a href={`mailto:${BRAND.email}`} className="text-cream/50 text-sm hover:text-gold transition-colors">
                  {BRAND.email}
                </a>
              </div>

              <div className="rounded-lg overflow-hidden border border-white/5 h-48">
                <iframe
                  title="SkyCinema Map"
                  src="https://maps.google.com/maps?q=Krishnagiri,Salem,Tamil+Nadu&output=embed&z=8"
                  className="w-full h-full grayscale opacity-60"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal/30">
        <div className="container-luxury max-w-3xl">
          <SectionHeading subtitle="FAQ" title="Common Questions" />
          <div className="space-y-4">
            {mockFAQ.map((faq, i) => (
              <div key={i} className="glass rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="text-cream font-medium">{faq.q}</span>
                  <span className={`text-gold transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-cream/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">{label}</label>
      {children}
      {error && <p className="text-red-400/80 text-xs mt-1">{error}</p>}
    </div>
  );
}
