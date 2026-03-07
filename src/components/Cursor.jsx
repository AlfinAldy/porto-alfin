import { useEffect, useRef, useState, useCallback } from 'react';

export const Cursor = () => {
    const cursorRef = useRef(null);
    const trailRefs = useRef([]);
    const [isVisible, setIsVisible] = useState(false);
    const [cursorState, setCursorState] = useState('default'); // default, interactive, input, link
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const positionRef = useRef({ x: 0, y: 0 });
    const trailPositions = useRef(
        Array.from({ length: 15 }, () => ({ x: 0, y: 0 }))
    );
    const scrollTicking = useRef(false);

    // Initialize refs array
    const trailElements = Array.from({ length: 15 }, (_, i) => i);

    // Detect cursor state based on element
    const detectCursorState = useCallback((target) => {
        // Check for input elements first (highest priority)
        const isInput = 
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT' ||
            target.isContentEditable ||
            target.getAttribute('contenteditable') === 'true' ||
            target.closest('input') ||
            target.closest('textarea') ||
            target.closest('[contenteditable="true"]');
        
        if (isInput) {
            return 'input';
        }
        
        // Check for links (hyperlinks)
        const isLink = 
            target.tagName === 'A' ||
            target.closest('a') ||
            target.classList.contains('cursor-link');
        
        if (isLink) {
            return 'link';
        }
        
        // Check for interactive elements
        const isInteractive = 
            target.tagName === 'BUTTON' ||
            target.classList.contains('cursor-pointer') ||
            target.classList.contains('card-hover') ||
            target.closest('[role="button"]') ||
            target.closest('button') ||
            target.classList.contains('btn-primary') ||
            target.classList.contains('btn-outline') ||
            target.closest('.btn-primary') ||
            target.closest('.btn-outline');
        
        if (isInteractive) {
            return 'interactive';
        }
        
        // Default background cursor
        return 'default';
    }, []);

    // Get cursor colors based on state
    const getCursorColors = useCallback((state) => {
        switch (state) {
            case 'interactive':
                return {
                    primary: '#f5a623', // Golden/Orange
                    glow: '#f5a623',
                    trail: '#f5a623'
                };
            case 'input':
                return {
                    primary: '#ffffff', // White
                    glow: '#20b2a6',
                    trail: '#20b2a6'
                };
            case 'link':
                return {
                    primary: '#20b2a6', // Teal
                    glow: '#20b2a6',
                    trail: '#20b2a6'
                };
            default:
                return {
                    primary: '#20b2a6', // Teal
                    glow: '#20b2a6',
                    trail: '#20b2a6'
                };
        }
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const trails = trailRefs.current;

        const initPosition = (e) => {
            positionRef.current = { x: e.clientX, y: e.clientY };
            trailPositions.current.forEach(pos => {
                pos.x = e.clientX;
                pos.y = e.clientY;
            });
        };

        const handleMouseMove = (e) => {
            positionRef.current = { x: e.clientX, y: e.clientY };
            setIsVisible(true);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
            document.body.classList.add('hide-default-cursor');
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
            document.body.classList.remove('hide-default-cursor');
        };

        const handleMouseOver = (e) => {
            const newState = detectCursorState(e.target);
            setCursorState(newState);
        };

        let animationFrameId;
        
        const animate = () => {
            if (cursor) {
                cursor.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
            }

            trails.forEach((trail, index) => {
                if (trail) {
                    const targetX = positionRef.current.x;
                    const targetY = positionRef.current.y;
                    
                    trailPositions.current[index].x += (targetX - trailPositions.current[index].x) * (0.15 - index * 0.008);
                    trailPositions.current[index].y += (targetY - trailPositions.current.y) * (0.15 - index * 0.008);
                    
                    const opacity = 1 - (index / trails.length);
                    const scale = 1 - (index / trails.length) * 0.5;
                    trail.style.opacity = opacity * (isVisible ? 1 : 0);
                    trail.style.transform = `translate(${trailPositions.current[index].x}px, ${trailPositions.current[index].y}px) scale(${scale})`;
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseover', handleMouseOver);
        
        document.addEventListener('mousemove', initPosition, { once: true });

        // Handle scroll velocity effect
        const handleScroll = () => {
            if (!scrollTicking.current) {
                window.requestAnimationFrame(() => {
                    const velocity = window.__scrollVelocity?.current || 0;
                    setScrollVelocity(velocity);
                    scrollTicking.current = false;
                });
                scrollTicking.current = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });

        animate();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isVisible, cursorState, detectCursorState, getCursorColors]);

    const colors = getCursorColors(cursorState);
    
    // Calculate scroll velocity effects outside of switch
    const velocityScale = cursorState === 'default' ? Math.min(1 + scrollVelocity / 50, 2) : 1;
    const velocityGlow = cursorState === 'default' ? Math.min(scrollVelocity / 5, 20) : 0;
    
    // Render different cursor based on state
    const renderCursor = () => {
        switch (cursorState) {
            case 'input':
                return (
                    // I-beam cursor style for inputs
                    <div className="relative flex items-center">
                        <div 
                            className="w-0.5 h-6 bg-white rounded-full animate-pulse"
                            style={{
                                boxShadow: `0 0 8px ${colors.glow}, 0 0 16px ${colors.glow}80`,
                            }}
                        />
                    </div>
                );
            case 'link':
                return (
                    // Link indicator with arrow
                    <div className="flex items-center gap-1">
                        <div 
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: colors.primary,
                                boxShadow: `0 0 10px ${colors.glow}, 0 0 20px ${colors.glow}40`,
                            }}
                        />
                        <svg 
                            className="w-3 h-3" 
                            fill="none" 
                            stroke={colors.primary} 
                            viewBox="0 0 24 24"
                            style={{ marginLeft: '-2px' }}
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                            />
                        </svg>
                    </div>
                );
            case 'interactive':
                return (
                    // Larger interactive cursor with ring
                    <div className="relative flex items-center justify-center">
                        <div 
                            className="absolute w-8 h-8 rounded-full border-2 animate-ping"
                            style={{
                                borderColor: colors.primary,
                                opacity: 0.5,
                            }}
                        />
                        <div 
                            className="w-4 h-4 rounded-full transition-all duration-150"
                            style={{
                                backgroundColor: colors.primary,
                                boxShadow: `0 0 15px ${colors.glow}, 0 0 30px ${colors.glow}60`,
                                transform: 'scale(1.3)',
                            }}
                        />
                    </div>
                );
            default:
                // Default small dot cursor - with scroll velocity effect
                return (
                    <div 
                        className="w-3 h-3 rounded-full transition-all duration-150"
                        style={{
                            backgroundColor: colors.primary,
                            boxShadow: `0 0 ${10 + velocityGlow}px ${colors.glow}, 0 0 ${20 + velocityGlow * 2}px ${colors.glow}40`,
                            transform: `scale(${velocityScale})`,
                        }}
                    />
                );
        }
    };

    return (
        <>
            {/* Main Cursor */}
            <div
                ref={cursorRef}
                className={`fixed pointer-events-none z-[9999] transition-opacity duration-200 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                    left: 0,
                    top: 0,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {renderCursor()}
            </div>

            {/* Trail particles */}
            {trailElements.map((i) => {
                const isLast = i === 14;
                const size = isLast ? 8 : 6 - i * 0.3;
                
                // Different trail behavior for different states
                const isInputState = cursorState === 'input';
                const isInteractiveState = cursorState === 'interactive';
                
                let trailColor;
                if (isInputState) {
                    trailColor = isLast ? '#ffffff' : `rgba(255, 255, 255, ${0.4 - i * 0.03})`;
                } else if (isInteractiveState) {
                    trailColor = isLast ? '#f5a623' : `rgba(245, 166, 35, ${0.5 - i * 0.035})`;
                } else {
                    trailColor = isLast ? colors.trail : `rgba(32, 178, 166, ${0.6 - i * 0.04})`;
                }
                
                return (
                    <div
                        key={i}
                        ref={el => trailRefs.current[i] = el}
                        className="fixed pointer-events-none z-[9998] rounded-full transition-opacity duration-100"
                        style={{
                            left: 0,
                            top: 0,
                            width: `${size}px`,
                            height: `${size}px`,
                            backgroundColor: trailColor,
                            boxShadow: `0 0 ${6 - i * 0.3}px ${trailColor}`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                );
            })}
        </>
    );
};

