import { useState, useEffect } from 'react';
import { getTestimonials, deleteTestimonial } from '@/lib/api';
import { mockTestimonials } from '@/lib/mockData';
import type { Testimonial } from '@/types';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);

  useEffect(() => {
    getTestimonials().then((res) => {
      if (res.data.data?.length) setTestimonials(res.data.data);
    }).catch(() => {});
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    try { await deleteTestimonial(id); } catch { /* demo */ }
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-cream">Testimonials</h1>
        <button className="px-6 py-2 bg-gold text-obsidian text-sm uppercase tracking-widest">Add Testimonial</button>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="glass rounded-lg p-6 flex gap-6">
            {t.client_photo && (
              <img src={t.client_photo} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-cream font-medium">{t.client_name}</p>
                  <p className="text-cream/40 text-sm">{t.location} • {'★'.repeat(t.rating)}</p>
                </div>
                <button onClick={() => handleDelete(t.id)} className="text-cream/40 text-xs hover:text-red-400 uppercase tracking-wider">Delete</button>
              </div>
              <p className="text-cream/60 text-sm mt-3 italic">"{t.review}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
