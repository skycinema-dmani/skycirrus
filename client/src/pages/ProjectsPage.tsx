import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/common/SEO';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Project } from '@/types';
import { getProjects } from '@/lib/api';
import { mockProjects } from '@/lib/mockData';

const FILTERS = ['All', 'Residential', 'Commercial', 'Home Theatre', 'Automation', 'Media Room'];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getProjects()
      .then((res) => {
        if (res.data.data?.length) setProjects(res.data.data);
      })
      .catch(() => {});
  }, []);

  const filtered = filter === 'All'
    ? projects
    : projects.filter((p) => p.type.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <SEO
        title="Projects"
        description="Explore SkyCinema's portfolio of luxury home theatre installations, smart home integrations, and premium audio systems."
      />

      <section className="pt-32 pb-16 section-padding">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Portfolio"
            title="Our Projects"
            description="Modern villas, dedicated theatre rooms, and luxury living spaces — each crafted with precision."
          />

          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${
                  filter === f
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-white/10 text-cream/50 hover:border-gold/50 hover:text-gold'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/projects/${project.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-6">
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-gold text-xs uppercase tracking-widest">{project.location}</span>
                      <h3 className="font-display text-2xl text-cream group-hover:text-gold transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <span className="absolute top-4 right-4 px-3 py-1 glass text-[10px] uppercase tracking-widest text-cream/70">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-cream/50 text-sm line-clamp-2">{project.description}</p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
