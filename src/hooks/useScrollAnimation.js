import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (!options.repeat) {
                            observer.unobserve(entry.target);
                        }
                    } else if (options.repeat) {
                        setIsVisible(false);
                    }
                });
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px'
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
    }, [options.threshold, options.rootMargin, options.repeat]);

    return [ref, isVisible];
};

export const useStaggerAnimation = (itemCount, options = {}) => {
    const containerRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate items with stagger delay
                        for (let i = 0; i < itemCount; i++) {
                            setTimeout(() => {
                                setVisibleItems(prev => [...prev, i]);
                            }, i * (options.delay || 100));
                        }
                        if (!options.repeat) {
                            observer.unobserve(entry.target);
                        }
                    } else if (options.repeat) {
                        setVisibleItems([]);
                    }
                });
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px'
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [itemCount, options.delay, options.threshold, options.rootMargin, options.repeat]);

    return [containerRef, visibleItems];
};

