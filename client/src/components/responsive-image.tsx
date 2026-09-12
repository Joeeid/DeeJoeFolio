import { imageWidths } from '@/content/images';

interface Props {
	name: string;
	alt: string;
	className?: string;
	priority?: boolean;
	sizes: string;
}
export function ResponsiveImage({
	name,
	alt,
	className,
	priority,
	sizes,
}: Props) {
	return (
		<picture>
			<source
				type="image/webp"
				srcSet={imageWidths
					.map(
						(width) =>
							`/assets/optimized/${name}-${width}.webp ${width}w`,
					)
					.join(", ")}
				sizes={sizes}
			/>
			<img
				src={`/assets/${name}.jpg`}
				width="2732"
				height="4096"
				alt={alt}
				className={className}
				loading={priority ? "eager" : "lazy"}
				fetchPriority={priority ? "high" : "auto"}
				decoding="async"
			/>
		</picture>
	);
}
