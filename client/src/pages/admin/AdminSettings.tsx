import { useState } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    site_title: 'SkyCinema — Where Technology Meets Lifestyle',
    meta_description: 'Premium Home Theatre, Hi-Fi Audio and Smart Home Automation. Authorized JBL Dealer.',
    phone: '8300040110',
    email: 'hello@skycirrus.com',
    instagram_token: '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-8">Site Settings & SEO</h1>

      <form onSubmit={handleSave} className="glass rounded-lg p-8 space-y-6 max-w-2xl">
        <div>
          <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Site Title</label>
          <input
            className="form-input"
            value={settings.site_title}
            onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Meta Description</label>
          <textarea
            className="form-input resize-none"
            rows={3}
            value={settings.meta_description}
            onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Phone</label>
            <input className="form-input" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
          </div>
          <div>
            <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Email</label>
            <input className="form-input" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Instagram API Token (optional)</label>
          <input
            className="form-input"
            placeholder="For live Instagram feed"
            value={settings.instagram_token}
            onChange={(e) => setSettings({ ...settings, instagram_token: e.target.value })}
          />
        </div>
        <button type="submit" className="px-8 py-3 bg-gold text-obsidian text-sm uppercase tracking-widest hover:bg-gold-light transition-colors">
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
