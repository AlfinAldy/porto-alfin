import { useEffect, useRef } from 'react';

export const About = () => {
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

    const skills = [
        "React", "JavaScript", "TypeScript", "Node.js", 
        "HTML/CSS", "Tailwind", "Git", "MongoDB",
        "PostgreSQL", "REST API", "GraphQL", "Docker"
    ];

    return (
        <section id="about" className="section-padding bg-card/30 relative overflow-hidden" ref={sectionRef}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-foreground/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-highlight/5 rounded-full blur-3xl"></div>

            <div className="container-custom relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16 animate-on-scroll opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-secondary-foreground mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image/Avatar Section */}
                    <div className="flex justify-center animate-on-scroll opacity-0 animate-zoom-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                        <div className="relative">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary-foreground/30 to-highlight/30 blur-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
                            
                            {/* Main avatar container */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-secondary-foreground/20 to-highlight/20 flex items-center justify-center animate-pulse-glow">
                                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-card border-2 border-border flex items-center justify-center overflow-hidden">
                                    <span className="text-6xl md:text-7xl font-bold gradient-text">A</span>
                                </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary-foreground/20 rounded-full animate-float"></div>
                            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-highlight/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute top-1/2 -right-8 w-6 h-6 bg-secondary-foreground/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                            
                            {/* Floating skill badges */}
                            <div className="absolute -left-12 top-1/4 bg-card border border-border px-3 py-1 rounded-full text-xs text-muted-foreground animate-fade-in-left" style={{ animationDelay: '800ms', animationFillMode: 'forwards', opacity: 0 }}>
                                🎨 Design
                            </div>
                            <div className="absolute -right-12 bottom-1/4 bg-card border border-border px-3 py-1 rounded-full text-xs text-muted-foreground animate-fade-in-right" style={{ animationDelay: '900ms', animationFillMode: 'forwards', opacity: 0 }}>
                                ⚡ Fast
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-semibold text-forgeround animate-on-scroll opacity-0 animate-fade-in-left" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                            Passionate Developer <span className="text-secondary-foreground">&</span> Problem Solver
                        </h3>
                        
                        <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed animate-on-scroll opacity-0 animate-fade-in-left" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                                I am a dedicated <span className="text-secondary-foreground font-medium">Full Stack Developer</span> with a passion for creating beautiful, 
                                functional, and user-centered digital experiences. With a strong foundation 
                                in both front-end and back-end technologies, I strive to build applications 
                                that not only meet technical requirements but also provide exceptional user experiences.
                            </p>
                            <p className="text-muted-foreground leading-relaxed animate-on-scroll opacity-0 animate-fade-in-left" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                                My journey in web development has equipped me with a diverse skill set and the 
                                ability to work on every aspect of a project, from design conception to deployment. 
                                I believe in continuous learning and staying updated with the latest technologies.
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="pt-4 animate-on-scroll opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                            <h4 className="text-lg font-semibold mb-4 text-forgeround flex items-center gap-2">
                                <span className="w-2 h-2 bg-secondary-foreground rounded-full"></span>
                                Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1.5 text-sm bg-muted/50 text-muted-foreground rounded-full hover:bg-secondary-foreground hover:text-background hover:shadow-lg hover:shadow-secondary-foreground/20 transition-all duration-300 cursor-default transform hover:scale-105"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6 animate-on-scroll opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                            {[
                                { value: '2+', label: 'Years Exp.', icon: '⏱️' },
                                { value: '20+', label: 'Projects', icon: '🚀' },
                                { value: '10+', label: 'Clients', icon: '🤝' }
                            ].map((stat, index) => (
                                <div 
                                    key={index}
                                    className="text-center p-4 bg-card/50 rounded-xl border border-border hover:border-secondary-foreground/50 hover:shadow-lg hover:shadow-secondary-foreground/10 transition-all duration-300 group"
                                >
                                    <div className="text-2xl mb-1">{stat.icon}</div>
                                    <h5 className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</h5>
                                    <p className="text-xs text-muted-foreground group-hover:text-secondary-foreground transition-colors">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

