import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Props {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function AnimatedDisclosure({ title, open, onToggle, children }: Props) {
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const arrow = useRef<SVGSVGElement>(null);
  const { contextSafe } = useGSAP({ scope: container });
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animate = contextSafe(() => {
      gsap.to(panel.current, { height: open ? 'auto' : 0, opacity: open ? 1 : 0,
        duration: query.matches ? 0 : 0.32, ease: 'power2.inOut', overwrite: true,
        onComplete: () => ScrollTrigger.refresh() });
      gsap.to(arrow.current, { rotate: open ? 180 : 0, duration: query.matches ? 0 : 0.25, overwrite: true });
    });
    animate();
    query.addEventListener('change', animate);
    const targets = [panel.current, arrow.current];
    return () => { query.removeEventListener('change', animate); gsap.killTweensOf(targets); };
  }, [open, contextSafe]);

  return <div ref={container} className="career-disclosure">
    <button type="button" id={`${id}-trigger`} aria-expanded={open} aria-controls={id} onClick={onToggle}>
      {title}<ChevronDown ref={arrow} size={18} aria-hidden="true" />
    </button>
    <div ref={panel} id={id} role="region" aria-labelledby={`${id}-trigger`} aria-hidden={!open} inert={!open} className="career-disclosure-panel">
      <div className="career-disclosure-content">{children}</div>
    </div>
  </div>;
}
