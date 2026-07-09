import { motion } from 'framer-motion';
import { cn } from '@/hooks/useAnimations';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'mb-16 md:mb-20',
        align === 'center' && 'text-center',
        className
      )}
    >
      {subtitle && (
        <span className="inline-block text-gold text-xs uppercase tracking-[0.3em] mb-4 font-sans">
          {subtitle}
        </span>
      )}
      <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6">
        {title}
      </h2>
      <div className={cn('luxury-divider mb-6', align === 'left' && 'mx-0')} />
      {description && (
        <p
          className={cn(
            'text-cream/60 text-lg font-light max-w-2xl leading-relaxed',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
