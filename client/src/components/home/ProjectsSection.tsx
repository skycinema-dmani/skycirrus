import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import type { Project } from '@/types';
import { getProjects } from '@/lib/api';
import { mockProjects } from '@/lib/mockData';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(
    mockProjects.filter((p) => p.featured)
  );

  useEffect(() => {
    getProjects({ featured: 'true', limit: 3 })
      .then((res) => {
        if (res.data.data?.length) setProjects(res.data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-charcoal/30">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Our Portfolio"
          title="Completed Projects"
          description="Every project tells a story of craftsmanship, precision, and the pursuit of perfection."
        />

        <div className="space-y-16 md:space-y-24">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
            >
              <Link
                to={`/projects/${project.slug}`}
                className={`group relative aspect-[16/10] overflow-hidden rounded-lg ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={project.cover_image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-obsidian/0 transition-colors duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 glass text-cream text-[10px] uppercase tracking-widest">
                    {project.type}
                  </span>
                </div>
              </Link>

              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="text-gold text-xs uppercase tracking-[0.2em]">
                  {project.location}
                </span>
                <h3 className="font-display text-3xl md:text-4xl text-cream mt-2 mb-4">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="hover:text-gold transition-colors"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="text-cream/50 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-cream/30 text-xs uppercase tracking-widest mb-3">
                    Equipment Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.equipment.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 border border-white/10 text-cream/50 text-xs rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {project.testimonial && (
                  <blockquote className="border-l-2 border-gold/50 pl-6 mb-6">
                    <p className="text-cream/60 italic font-display text-lg leading-relaxed">
                      "{project.testimonial}"
                    </p>
                    {project.client_name && (
                      <cite className="text-gold/60 text-sm not-italic mt-2 block">
                        — {project.client_name}
                      </cite>
                    )}
                  </blockquote>
                )}

                <Button to={`/projects/${project.slug}`} variant="ghost" size="sm">
                  View Project →
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-20">
          <Button to="/projects" variant="secondary">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
