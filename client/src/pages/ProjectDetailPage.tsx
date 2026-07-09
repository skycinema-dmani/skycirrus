import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/common/SEO';
import Button from '@/components/ui/Button';
import type { Project } from '@/types';
import { getProject } from '@/lib/api';
import { mockProjects } from '@/lib/mockData';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | undefined>(
    mockProjects.find((p) => p.slug === slug)
  );

  useEffect(() => {
    if (slug) {
      getProject(slug)
        .then((res) => setProject(res.data.data))
        .catch(() => {});
    }
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-cream/50">Project not found</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={project.title}
        description={project.description}
        image={project.cover_image}
        type="article"
      />

      <section className="relative h-[60vh] min-h-[400px]">
        <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-24">
          <div className="container-luxury">
            <span className="text-gold text-xs uppercase tracking-[0.3em]">{project.location}</span>
            <h1 className="heading-display text-4xl md:text-6xl text-cream mt-2">{project.title}</h1>
            <span className="inline-block mt-4 px-3 py-1 glass text-xs uppercase tracking-widest text-cream/70">
              {project.type}
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <p className="text-cream/60 text-lg leading-relaxed mb-12">{project.description}</p>

              {project.before_after && (
                <div className="mb-12">
                  <h2 className="font-display text-2xl text-cream mb-6">Before & After</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-cream/30 text-xs uppercase tracking-widest mb-2">Before</p>
                      <img src={project.before_after.before} alt="Before" className="rounded-lg w-full aspect-[4/3] object-cover" />
                    </div>
                    <div>
                      <p className="text-cream/30 text-xs uppercase tracking-widest mb-2">After</p>
                      <img src={project.before_after.after} alt="After" className="rounded-lg w-full aspect-[4/3] object-cover" />
                    </div>
                  </div>
                </div>
              )}

              {project.testimonial && (
                <blockquote className="border-l-2 border-gold pl-8 py-4">
                  <p className="font-display text-2xl text-cream/70 italic leading-relaxed mb-4">
                    "{project.testimonial}"
                  </p>
                  {project.client_name && (
                    <cite className="text-gold text-sm not-italic">— {project.client_name}</cite>
                  )}
                </blockquote>
              )}
            </div>

            <div>
              <div className="glass rounded-lg p-8 sticky top-32">
                <h3 className="font-display text-xl text-cream mb-6">Equipment Used</h3>
                <ul className="space-y-3 mb-8">
                  {project.equipment.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-cream/50 text-sm">
                      <span className="text-gold mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button to="/contact" className="w-full">Start Your Project</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
