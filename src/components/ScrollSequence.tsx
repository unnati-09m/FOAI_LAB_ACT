'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface ScrollSequenceProps {
    frameCount: number;
    imagesPath: string; // e.g., "/images/valkyriesequence/"
    imageExtension?: string; // e.g., "jpg"
    className?: string;
}

export default function ScrollSequence({
    frameCount,
    imagesPath,
    imageExtension = 'jpg',
    className = '',
}: ScrollSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollYProgress } = useScroll();

    // Transform scroll progress (0-1) to frame index (0 to frameCount-1)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.src = `${imagesPath}${i}.${imageExtension}`;
                    img.onload = () => {
                        loadedImages[i - 1] = img; // maintain order
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image: ${img.src}`);
                        // Fallback or skip
                        resolve();
                    }
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, [frameCount, imagesPath, imageExtension]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const image = images[index];

        if (!canvas || !context || !image) return;

        // Responsive Canvas Handling
        // We want the image to "contain" within the canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Clear canvas
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        // Calculate aspect ratios
        const imgAspect = image.width / image.height;
        const canvasAspect = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgAspect > canvasAspect) {
            // Image is wider than canvas (fit width)
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgAspect;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            // Image is taller than canvas (fit height)
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgAspect;
            offsetY = 0;
            offsetX = (canvasWidth - drawWidth) / 2;
        }

        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Redraw when frameIndex changes
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!isLoaded) return;
        const index = Math.round(latest);
        requestAnimationFrame(() => renderFrame(index));
    });

    // Initial draw and resize handler
    useEffect(() => {
        if (!isLoaded || !canvasRef.current) return;

        // Set canvas size to window/container size
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(Math.round(frameIndex.get()));
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial sizing

        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, frameIndex]); // Re-bind if isLoaded changes

    // Also trigger a render when loaded to show the first frame immediately
    useEffect(() => {
        if (isLoaded) {
            renderFrame(0);
        }
    }, [isLoaded]);


    return (
        <div className={`fixed inset-0 z-0 ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black text-white z-50">
                    <p className="text-sm uppercase tracking-widest animate-pulse">Initializing Valkyrie System...</p>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-contain"
            />
        </div>
    );
}
