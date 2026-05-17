import { useEffect, useRef, RefObject } from "react";

type AnimationType = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "scale" 
  | "blur";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(
  animationType: AnimationType = "fade-up",
  options: UseScrollAnimationOptions = {}
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(`visible-${animationType}`);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove(`visible-${animationType}`);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [animationType, threshold, rootMargin, triggerOnce]);

  return ref;
}

interface ScrollAnimationProps {
  children: React.ReactNode;
  type?: AnimationType;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export function ScrollAnimation({
  children,
  type = "fade-up",
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  className = "",
}: ScrollAnimationProps) {
  const ref = useScrollAnimation(type, { threshold, rootMargin });

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`scroll-animate ${className}`}
    >
      {children}
    </div>
  );
}
