import { motion } from 'framer-motion';
import SEO from '@/components/common/SEO';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { mockTeam } from '@/lib/mockData';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="SkyCinema — Where Technology Meets Lifestyle. Premium home theatre design and installation with over 10 years of experience. Authorized JBL Dealer."
      />

      <section className="relative pt-32 pb-20 min-h-[50vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-obsidian/50" />
        </div>
        <div className="container-luxury relative px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Our Story</span>
            <h1 className="heading-display text-5xl md:text-7xl text-cream mb-6">
              Where Technology<br /><span className="text-gradient-gold italic">Meets Lifestyle</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                subtitle="Company Story"
                title="Crafting Experiences Since 2014"
                align="left"
              />
              <div className="space-y-6 text-cream/60 leading-relaxed">
                <p>
                  SkyCinema was born from a simple belief: that every home deserves cinema-quality
                  entertainment. What started as a passion project in Krishnagiri has grown into
                  Tamil Nadu's premier destination for luxury home theatre and Hi-Fi audio.
                </p>
                <p>
                  With over 500 installations across residential and commercial spaces, we've
                  earned the trust of discerning clients who demand nothing less than perfection.
                  Our partnership as an Authorized JBL Dealer ensures access to the world's finest
                  audio technology.
                </p>
                <p>
                  Today, with experience centers in Krishnagiri and Salem, we invite you to
                  step inside and discover what premium sound truly feels like.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80"
                alt="SkyCinema showroom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal/30">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Mission', text: 'To transform living spaces into extraordinary entertainment experiences through expert design, premium products, and meticulous craftsmanship.' },
              { title: 'Vision', text: 'To be South India\'s most trusted name in luxury home entertainment, setting the standard for excellence in design and installation.' },
              { title: 'Authorized Dealer', text: 'As an official JBL Authorized Dealer, we provide genuine products, full manufacturer warranty, and expert guidance on the complete JBL range.' },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-lg p-8"
              >
                <h3 className="font-display text-2xl text-gold mb-4">{item.title}</h3>
                <p className="text-cream/50 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading subtitle="The People Behind SkyCinema" title="Meet the Team" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {mockTeam.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.role}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <p className="text-cream font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal/30 text-center">
        <div className="container-luxury max-w-2xl">
          <h2 className="heading-display text-4xl text-cream mb-6">Ready to Begin?</h2>
          <p className="text-cream/50 mb-8">Visit our experience center for a private demonstration.</p>
          <Button to="/contact" size="lg">Book Private Demo</Button>
        </div>
      </section>
    </>
  );
}
