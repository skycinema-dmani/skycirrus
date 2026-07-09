import { useState, useEffect } from 'react';
import { getAppointments } from '@/lib/api';

interface AppointmentRow {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  project_type: string;
  budget: string;
  preferred_date: string;
  status: string;
  created_at: string;
}

const mockAppointments: AppointmentRow[] = [
  { id: 1, name: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh@email.com', city: 'Krishnagiri', project_type: 'Home Theatre', budget: '₹10 - 25 Lakhs', preferred_date: '2025-07-15', status: 'pending', created_at: '2025-07-01' },
  { id: 2, name: 'Priya Sharma', phone: '9876543211', email: 'priya@email.com', city: 'Salem', project_type: 'Hi-Fi Audio', budget: '₹5 - 10 Lakhs', preferred_date: '2025-07-20', status: 'confirmed', created_at: '2025-07-02' },
  { id: 3, name: 'Arun Venkat', phone: '9876543212', email: 'arun@email.com', city: 'Krishnagiri', project_type: 'Smart Home', budget: '₹25 - 50 Lakhs', preferred_date: '2025-07-18', status: 'pending', created_at: '2025-07-03' },
];

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>(mockAppointments);

  useEffect(() => {
    getAppointments().then((res) => {
      if (res.data.data?.length) setAppointments(res.data.data);
    }).catch(() => {});
  }, []);

  const updateStatus = (id: number, status: string) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-8">Appointments</h1>

      <div className="glass rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-cream/40 text-xs uppercase tracking-widest">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Contact</th>
              <th className="text-left p-4">Project</th>
              <th className="text-left p-4">Budget</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b border-white/5">
                <td className="p-4">
                  <p className="text-cream">{a.name}</p>
                  <p className="text-cream/40 text-xs">{a.city}</p>
                </td>
                <td className="p-4">
                  <p className="text-cream/50">{a.phone}</p>
                  <p className="text-cream/40 text-xs">{a.email}</p>
                </td>
                <td className="p-4 text-cream/50">{a.project_type}</td>
                <td className="p-4 text-cream/50">{a.budget}</td>
                <td className="p-4 text-cream/50">{a.preferred_date}</td>
                <td className="p-4">
                  <select
                    value={a.status}
                    onChange={(e) => updateStatus(a.id, e.target.value)}
                    className="form-input py-1 text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
