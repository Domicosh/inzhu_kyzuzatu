import { useEffect, useRef, RefObject, useState } from "react";

interface UseParallaxOptions {
  offset?: number;
  direction?: "up" | "down";
}

export function useParallax(
  options: UseParallaxOptions = {}
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);
  const { offset = 50, direction = "up" } = options;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const rect = element.getBoundingClientRect();
    const elementTop = window.scrollY + rect.top;
    
    // Continuous parallax based on scroll position
    const moveDistance = (scrollY - elementTop + window.innerHeight) * (offset / 100);
    const translateValue = direction === "up" ? moveDistance : -moveDistance;

    element.style.transform = `translateY(${translateValue}px)`;
  }, [scrollY, offset, direction]);

  return ref;
}

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
  direction?: "up" | "down";
  className?: string;
}

export function Parallax({
  children,
  offset = 50,
  direction = "up",
  className = "",
}: ParallaxProps) {
  const ref = useParallax({ offset, direction });

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
}

interface MouseFollowProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export function MouseFollow({
  children,
  intensity = 10,
  className = "",
}: MouseFollowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / (rect.width / 2) * intensity;
      const y = (e.clientY - centerY) / (rect.height / 2) * intensity;

      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </div>
  );
}
