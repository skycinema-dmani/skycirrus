import { useState, useEffect } from 'react';
import { getProjects, deleteProject } from '@/lib/api';
import { mockProjects } from '@/lib/mockData';
import type { Project } from '@/types';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  useEffect(() => {
    getProjects().then((res) => {
      if (res.data.data?.length) setProjects(res.data.data);
    }).catch(() => {});
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try { await deleteProject(id); } catch { /* demo */ }
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-cream">Projects</h1>
        <button className="px-6 py-2 bg-gold text-obsidian text-sm uppercase tracking-widest hover:bg-gold-light transition-colors">
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="glass rounded-lg overflow-hidden">
            <img src={p.cover_image} alt={p.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <h3 className="font-display text-xl text-cream mb-1">{p.title}</h3>
              <p className="text-cream/40 text-sm mb-4">{p.location} • {p.type}</p>
              <div className="flex gap-3">
                <button className="text-gold text-xs uppercase tracking-wider hover:text-gold-light">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-cream/40 text-xs uppercase tracking-wider hover:text-red-400">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
