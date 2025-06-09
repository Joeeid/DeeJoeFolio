// hooks/use-intersection-observer.ts
import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
	threshold?: number;
	rootMargin?: string;
}

export function useIntersectionObserver(
	options: UseIntersectionObserverOptions = {}
) {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);
			},
			{
				threshold: options.threshold || 0.1,
				rootMargin: options.rootMargin || "0px 0px -50px 0px",
			}
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, [options.threshold, options.rootMargin]);

	return { ref, isIntersecting };
}
