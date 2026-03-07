import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const ScrollSmoother = ({ children, speed = 1 }) => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    const scrollVelocity = useRef(0);
    const lastScrollTop = useRef(0);
    const ticking = useRef(false);
    const animationRef = useRef(null);

    // Calculate scroll velocity
    const updateVelocity = useCallback(() => {
        const currentScrollTop = window.scrollY || window.pageYOffset;
        const delta = currentScrollTop - lastScrollTop.current;
        
        // Smooth velocity calculation
        scrollVelocity.current = scrollVelocity.current * 0.8 + Math.abs(delta) * 0.2;
        
        lastScrollTop.current = currentScrollTop;
        ticking.current = false;
    }, []);

    const onScroll = useCallback(() => {
        if (!ticking.current) {
            window.requestAnimationFrame(updateVelocity);
            ticking.current = true;
        }
    }, [updateVelocity]);

    useEffect(() => {
        const container = containerRef.current;
        const wrapper = wrapperRef.current;
        const content = contentRef.current;

        if (!container || !wrapper || !content) return;

        // Wait for fonts and images to load
        const timer = setTimeout(() => {
            // Set initial heights
            const documentHeight = document.documentElement.scrollHeight;
            
            wrapper.style.height = `${documentHeight}px`;
            content.style.position = 'fixed';
            content.style.top = '0';
            content.style.left = '0';
            content.style.width = '100%';
            content.style.height = '100%';

            // Create smooth scroll effect using GSAP
            const scrollAmount = { value: 0 };
            
            // Custom smooth scroll animation
            const animate = () => {
                const targetScroll = window.scrollY;
                
                // Kill previous animation if exists
                if (animationRef.current) {
                    animationRef.current.kill();
                }
                
                // Create new smooth animation
                animationRef.current = gsap.to(scrollAmount, {
                    value: targetScroll,
                    duration: speed,
                    ease: 'power2.out',
                    onUpdate: () => {
                        // Move content based on scroll position
                        const yPos = -scrollAmount.value;
                        content.style.transform = `translateY(${yPos}px)`;
                    }
                });
                
                // Request next frame
                animationRef.current.requestAnimationFrameId = requestAnimationFrame(animate);
            };

            // Start animation loop
            animate();

            // Handle scroll with native scroll + GSAP smoothing
            window.addEventListener('scroll', onScroll, { passive: true });

            // Create scroll trigger for animations
            ScrollTrigger.refresh();

            // Cleanup
            return () => {
                window.removeEventListener('scroll', onScroll);
                if (animationRef.current) {
                    animationRef.current.kill();
                    if (animationRef.current.requestAnimationFrameId) {
                        cancelAnimationFrame(animationRef.current.requestAnimationFrameId);
                    }
                }
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                clearTimeout(timer);
            };
        }, 100);

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (animationRef.current) {
                animationRef.current.kill();
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            clearTimeout(timer);
        };
    }, [speed, onScroll]);

    // Expose scroll velocity for other components
    useEffect(() => {
        window.__scrollVelocity = scrollVelocity;
        
        return () => {
            delete window.__scrollVelocity;
        };
    }, []);

    return (
        <div ref={containerRef} className="scroll-smoother-container">
            <div ref={wrapperRef} className="scroll-smoother-wrapper">
                <div ref={contentRef} className="scroll-smoother-content">
                    {children}
                </div>
            </div>
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

