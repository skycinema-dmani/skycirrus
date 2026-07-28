import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SEO from '@/components/common/SEO';
import Button from '@/components/ui/Button';
import { login } from '@/lib/api';

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLogin() {
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setError('');
    try {
      const res = await login(data.email, data.password);
      const token = res.data?.data?.token;

      if (!token) {
        setError('Authentication failed');
        return;
      }

      localStorage.setItem('skycinema_token', token);
      window.location.href = '/admin';
    } catch (err: unknown) {
      const message =
        typeof err === 'object' && err !== null && 'response' in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Invalid credentials';

      setError(message ?? 'Invalid credentials');
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="SkyCinema Admin Panel" />
      <div className="min-h-screen flex items-center justify-center bg-obsidian px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <img
              src="/images/logo.png"
              alt="SkyCinema logo"
              className="mx-auto h-32 w-auto object-contain"
            />
            <p className="text-cream/40 text-sm mt-2 uppercase tracking-widest">Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-lg p-8 space-y-6">
            <div>
              <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Email</label>
              <input {...register('email', { required: true })} type="email" className="form-input" placeholder="admin@skycirrus.com" />
            </div>
            <div>
              <label className="block text-cream/40 text-xs uppercase tracking-widest mb-2">Password</label>
              <input {...register('password', { required: true })} type="password" className="form-input" />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting} magnetic={false}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
