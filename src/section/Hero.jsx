import { useEffect, useRef } from 'react';

export const Hero = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
        animatedElements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary-foreground/5 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-highlight/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-foreground/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(32,178,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(32,178,166,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="container-custom relative z-10 text-center px-4">
                {/* Profile Photo */}
                <div className="mb-8 animate-on-scroll opacity-0 animate-zoom-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                    <div className="relative inline-block">
                        <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-secondary-foreground/30 shadow-lg animate-pulse-glow">
                            <img 
                                src="YOUR_PHOTO_HREF_HERE" 
                                alt="Putra Manggala" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Status indicator */}
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-background animate-pulse"></div>
                    </div>
                </div>

                {/* Subtitle */}
                <p className="text-secondary-foreground font-medium mb-4 tracking-widest uppercase text-sm animate-on-scroll opacity-0 animate-fade-in-down" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    Hello, I'm
                </p>

                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-on-scroll opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                    <span className="text-forgeround">M. </span>
                    <span className="gradient-text">Alfin</span>
                </h1>

                {/* Typing effect subtitle */}
                <div className="animate-on-scroll opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-2">
                        A passionate 
                        <span className="text-secondary-foreground font-semibold"> Full Stack Developer</span>
                    </p>
                    <p className="text-muted-foreground/60 text-md">
                        crafting elegant digital experiences with modern technologies.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-on-scroll opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                    <button 
                        onClick={() => scrollToSection('#projects')}
                        className="btn-primary group relative overflow-hidden"
                    >
                        <span className="relative z-10">View My Work</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                    <button 
                        onClick={() => scrollToSection('#contact')}
                        className="btn-outline group"
                    >
                        <span className="flex items-center gap-2">
                            Contact Me
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 mt-12 animate-on-scroll opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                    {[
                        { name: 'GitHub', icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        )},
                        { name: 'LinkedIn', icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        )},
                        { name: 'Twitter', icon: (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        )}
                    ].map((social, index) => (
                        <a 
                            key={index}
                            href="#"
                            className="w-12 h-12 bg-card/50 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-secondary-foreground hover:border-secondary-foreground hover:scale-110 hover:shadow-lg hover:shadow-secondary-foreground/20 transition-all duration-300"
                            aria-label={social.name}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
                        <svg className="w-5 h-5 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

