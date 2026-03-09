import { useState, useEffect } from 'react';

export const Loading = ({ onLoadingComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Start exit animation after minimum display time
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
        }, 1500);

        // Complete loading after exit animation
        const completeTimer = setTimeout(() => {
            setIsVisible(false);
            if (onLoadingComplete) {
                onLoadingComplete();
            }
        }, 2000);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onLoadingComplete]);

    if (!isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f1418] transition-all duration-500 ${
                isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            {/* Animated Logo/Brand */}
            <div className="relative mb-8">
                {/* Outer ring */}
                <div className="w-24 h-24 rounded-full border-2 border-[#20b2a6]/30 flex items-center justify-center">
                    {/* Middle ring */}
                    <div className="w-16 h-16 rounded-full border-2 border-[#f5a623]/50 animate-ping-slow flex items-center justify-center">
                        {/* Inner ring */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#20b2a6] to-[#f5a623] animate-pulse">
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading text with dots */}
            <div className="text-[#f0f2f5] text-lg font-medium tracking-wider">
                <span className="inline-block animate-fade-in-up">L</span>
                <span className="inline-block animate-fade-in-up delay-100">O</span>
                <span className="inline-block animate-fade-in-up delay-150">A</span>
                <span className="inline-block animate-fade-in-up delay-200">D</span>
                <span className="inline-block animate-fade-in-up delay-250">I</span>
                <span className="inline-block animate-fade-in-up delay-300">N</span>
                <span className="inline-block animate-fade-in-up delay-350">G</span>
                <span className="inline-block animate-fade-in-up delay-400">
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse delay-100">.</span>
                    <span className="animate-pulse delay-200">.</span>
                </span>
            </div>

            {/* Animated line at bottom */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#20b2a6] via-[#f5a623] to-[#20b2a6] animate-shimmer" style={{ width: '100%' }}></div>
        </div>
    );
};

