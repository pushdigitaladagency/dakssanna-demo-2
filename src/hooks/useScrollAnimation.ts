import { useEffect, useRef } from 'react';

export type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade'
  | 'scale-up'
  | 'clip-left'
  | 'clip-up'
  | 'line-draw';

interface ScrollAnimOptions {
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  stagger?: number;
  rootMargin?: string;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  opts: ScrollAnimOptions = {}
): React.MutableRefObject<T | null> {
  const {
    variant = 'fade-up',
    delay = 0,
    duration = 650,
    threshold = 0.12,
    once = false,
    stagger = 0,
    rootMargin = '0px 0px -40px 0px',
  } = opts;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.dataset.anim = variant;
    el.style.setProperty('--anim-duration', `${duration}ms`);
    el.style.setProperty('--anim-delay', `${delay}ms`);

    if (stagger > 0) {
      const children = Array.from(el.children) as HTMLElement[];
      children.forEach((child, i) => {
        child.dataset.animChild = 'true';
        child.style.setProperty('--anim-stagger', `${i * stagger}ms`);
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('anim-in');
          el.classList.remove('anim-out');
          if (once) observer.disconnect();
        } else if (!once) {
          el.classList.remove('anim-in');
          el.classList.add('anim-out');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [variant, delay, duration, threshold, once, stagger, rootMargin]);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  stagger = 80,
  opts: Omit<ScrollAnimOptions, 'stagger'> = {}
): React.MutableRefObject<T | null> {
  return useScrollAnimation<T>({ ...opts, stagger, variant: opts.variant ?? 'fade-up' });
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.3
): React.MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const relY = (rect.top + rect.height / 2) - window.innerHeight / 2;
        el.style.transform = `translateY(${relY * speed}px)`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}
