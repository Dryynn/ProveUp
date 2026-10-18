import { useRef } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export function useCareerMotion(root: RefObject<HTMLDivElement | null>, career: string) {
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const { contextSafe } = useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', context => {
      const scope = root.current;
      if (!scope) return;
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.from(scope.querySelector('.career-hero'), { y: 18, opacity: 0, duration: 0.55 })
        .from(scope.querySelectorAll('[data-intro]'), { y: 22, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.12)
        .from(scope.querySelector('.career-photo img'), { scale: 1.08, duration: 1.1 }, 0);

      const score = scope.querySelector<HTMLElement>('[data-score]');
      if (score) {
        const value = Number(score.dataset.value);
        const counter = { value: 0 };
        intro.to(counter, { value, duration: 0.9, ease: 'power2.out', onUpdate: () => {
          score.textContent = counter.value.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
        } }, 0.18);
      }
      scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach(section => {
        gsap.from(section, { y: 24, opacity: 0, duration: 0.55, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 94%', once: true } });
      });
      scope.querySelectorAll<HTMLElement>('[data-activities]').forEach(list => {
        gsap.from(list.children, { y: 18, opacity: 0, duration: 0.45, stagger: 0.1,
          scrollTrigger: { trigger: list, start: 'top 93%', once: true } });
      });
      const controls = Array.from(scope.querySelectorAll<HTMLElement>('[data-interactive]'));
      const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      context.add('enter', (event: Event) => {
        const target = event.currentTarget as HTMLElement;
        gsap.to(target, { y: -3, duration: 0.22, overwrite: 'auto', ease: 'power2.out' });
        const arrow = target.querySelector('[data-arrow]');
        if (arrow) gsap.to(arrow, { x: 4, duration: 0.22, overwrite: 'auto' });
      });
      context.add('leave', (event: Event) => {
        const target = event.currentTarget as HTMLElement;
        gsap.to(target, { y: 0, duration: 0.3, overwrite: 'auto', ease: 'power2.out' });
        const arrow = target.querySelector('[data-arrow]');
        if (arrow) gsap.to(arrow, { x: 0, duration: 0.3, overwrite: 'auto' });
      });
      if (canHover) controls.forEach(element => {
        element.addEventListener('pointerenter', context.enter);
        element.addEventListener('pointerleave', context.leave);
      });
      return () => {
        controls.forEach(element => {
          element.removeEventListener('pointerenter', context.enter);
          element.removeEventListener('pointerleave', context.leave);
        });
        if (score) score.textContent = Number(score.dataset.value).toLocaleString('pt-BR', { maximumFractionDigits: 1 });
      };
    }, root);
    return () => { media.revert(); scrollTween.current?.kill(); };
  }, { scope: root, dependencies: [career], revertOnUpdate: true });

  const scrollTo = (target: Element | number, onComplete?: () => void) => contextSafe(() => {
    scrollTween.current?.kill();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (typeof target === 'number') window.scrollTo(0, target);
      else target.scrollIntoView({ block: 'start', behavior: 'auto' });
      onComplete?.();
      return;
    }
    scrollTween.current = gsap.to(window, { scrollTo: { y: target, offsetY: typeof target === 'number' ? 0 : 24, autoKill: true },
      duration: 0.65, ease: 'power3.inOut', overwrite: 'auto', onComplete });
  })();
  return { scrollTo };
}
