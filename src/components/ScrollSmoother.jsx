import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const ScrollSmoother = ({ children, speed = 1 }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: speed * 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Refresh ScrollTrigger after init
        ScrollTrigger.refresh();

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, [speed]);

    // Expose scroll velocity for other components
    useEffect(() => {
        const getVelocity = () => lenisRef.current?.velocity || 0;
        window.__scrollVelocity = { current: 0 };
        
        const interval = setInterval(() => {
            if (lenisRef.current) {
                window.__scrollVelocity.current = lenisRef.current.velocity || 0;
            }
        }, 100);

        return () => {
            clearInterval(interval);
            delete window.__scrollVelocity;
        };
    }, []);

    return (
        <div className="scroll-smoother-container">
            {children}
        </div>
    );
};

// Hook to get current scroll velocity
export const useScrollVelocity = () => {
    const getVelocity = useCallback(() => {
        return window.__scrollVelocity?.current || 0;
    }, []);
    
    return getVelocity;
};

export default ScrollSmoother;

