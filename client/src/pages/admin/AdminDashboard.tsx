import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import { getDashboardStats } from '@/lib/api';
import type { DashboardStats } from '@/types';
import AdminProducts from './AdminProducts';
import AdminProjects from './AdminProjects';
import AdminTestimonials from './AdminTestimonials';
import AdminAppointments from './AdminAppointments';
import AdminSettings from './AdminSettings';

const NAV = [
  { path: '/admin', label: 'Dashboard', exact: true },
  { path: '/admin/products', label: 'Products' },
  { path: '/admin/projects', label: 'Projects' },
  { path: '/admin/testimonials', label: 'Testimonials' },
  { path: '/admin/appointments', label: 'Appointments' },
  { path: '/admin/settings', label: 'Settings' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('skycinema_token');

  if (!token) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    localStorage.removeItem('skycinema_token');
    navigate('/admin/login');
  };

  return (
    <>
      <SEO title="Admin Dashboard" />
      <div className="min-h-screen bg-obsidian flex">
        <aside className="w-64 bg-charcoal border-r border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5">
            <Link to="/" className="font-display text-xl text-cream">
              Sky<span className="text-gold">Cinema</span>
            </Link>
            <p className="text-cream/30 text-xs mt-1 uppercase tracking-widest">Admin</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {NAV.map((item) => {
              const active = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path) && item.path !== '/admin'
                  ? true
                  : item.exact && location.pathname === '/admin';
              const isActive = item.exact
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path) && item.path !== '/admin';

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-sm transition-colors ${
                    (item.exact ? location.pathname === '/admin' : location.pathname.startsWith(item.path) && item.path !== '/admin')
                      ? 'bg-gold/10 text-gold'
                      : 'text-cream/50 hover:text-cream hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-sm text-cream/50 hover:text-red-400 transition-colors text-left"
            >
              Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Routes>
              <Route index element={<DashboardHome />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
}

function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>({
    products: 6,
    projects: 4,
    appointments: 12,
    enquiries: 8,
    testimonials: 4,
    blogPosts: 3,
  });

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data.data))
      .catch(() => {});
  }, []);

  const cards = [
    { label: 'Products', value: stats.products, path: '/admin/products' },
    { label: 'Projects', value: stats.projects, path: '/admin/projects' },
    { label: 'Appointments', value: stats.appointments, path: '/admin/appointments' },
    { label: 'Enquiries', value: stats.enquiries, path: '/admin/appointments' },
    { label: 'Testimonials', value: stats.testimonials, path: '/admin/testimonials' },
    { label: 'Blog Posts', value: stats.blogPosts, path: '/admin/settings' },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.path}
            className="glass rounded-lg p-6 hover:border-gold/20 transition-colors"
          >
            <p className="text-cream/40 text-xs uppercase tracking-widest mb-2">{card.label}</p>
            <p className="font-display text-4xl text-gold">{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
