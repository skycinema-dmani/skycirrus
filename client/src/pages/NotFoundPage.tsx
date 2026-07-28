import Button from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center">
        <span className="font-display text-8xl text-gold/20">404</span>
        <h1 className="heading-display text-3xl text-cream mt-4 mb-4">Page Not Found</h1>
        <p className="text-cream/50 mb-8">The page you're looking for doesn't exist.</p>
        <Button to="/">Return Home</Button>
      </div>
    </div>
  );
}
