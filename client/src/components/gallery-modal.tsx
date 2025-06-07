import { useEffect } from "react";

interface GalleryImage {
  src: string;
  thumb: string;
  alt: string;
}

interface GalleryModalProps {
  images: GalleryImage[];
  selectedIndex: number | null;
  onClose: () => void;
}

export function GalleryModal({ images, selectedIndex, onClose }: GalleryModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [selectedIndex, onClose]);

  if (selectedIndex === null) return null;

  const image = images[selectedIndex];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="max-w-4xl max-h-full relative">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-2xl hover:text-[hsl(196,100%,50%)] transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>
        <img 
          src={image.src} 
          alt={image.alt}
          className="max-w-full max-h-full object-contain rounded-xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
