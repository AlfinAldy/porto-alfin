import { useEffect, useRef, useState } from 'react';

export const Experience = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animatedItems, setAnimatedItems] = useState([]);

    const experiences = [
        {
            year: "2023 - Present",
            title: "Full Stack Developer",
            company: "Tech Company",
            description: "Developing and maintaining web applications using React, Node.js, and MongoDB. Collaborating with cross-functional teams to deliver high-quality products.",
            skills: ["React", "Node.js", "MongoDB", "TypeScript"]
        },
        {
            year: "2022 - 2023",
            title: "Frontend Developer",
            company: "Digital Agency",
            description: "Built responsive and user-friendly websites for various clients. Implemented modern UI/UX designs and optimized application performance.",
            skills: ["React", "JavaScript", "Tailwind", "Figma"]
        },
        {
            year: "2021 - 2022",
            title: "Junior Developer",
            company: "Startup Inc",
            description: "Assisted in the development of customer-facing web applications. Gained experience with agile methodologies and version control.",
            skills: ["HTML/CSS", "JavaScript", "Git", "REST API"]
        },
        {
            year: "2020 - 2021",
            title: "Internship",
            company: "Tech Institute",
            description: "Completed internship focused on web development fundamentals. Learned best practices and collaborated on open-source projects.",
            skills: ["HTML", "CSS", "JavaScript", "React"]
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Stagger animation for each experience item
                        experiences.forEach((_, index) => {
                            setTimeout(() => {
                                setAnimatedItems(prev => [...prev, index]);
                            }, index * 150);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="experience" className="section-padding bg-card/30 relative overflow-hidden" ref={sectionRef}>
            {/* Background decoration */}
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-secondary-foreground/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-highlight/5 rounded-full blur-3xl"></div>

            <div className="container-custom relative z-10">
                {/* Section Title */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <div className="w-20 h-1 bg-secondary-foreground mx-auto rounded-full"></div>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        My professional journey and the experiences that shaped my career.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2"></div>

                    {/* Timeline progress line (animated) */}
                    <div 
                        className={`absolute left-4 md:left-1/2 top-0 w-0.5 bg-secondary-foreground transform md:-translate-x-1/2 transition-all duration-1000 ${isVisible ? 'h-full' : 'h-0'}`}
                        style={{ transitionDelay: '300ms' }}
                    ></div>

                    {/* Experience Cards */}
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div 
                                key={index}
                                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} transition-all duration-700 ${
                                    animatedItems.includes(index) 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-8'
                                }`}
                                style={{ 
                                    transitionDelay: animatedItems.includes(index) ? `${index * 150 + 200}ms` : '0ms'
                                }}
                            >
                                {/* Timeline dot */}
                                <div className={`absolute left-4 md:left-1/2 w-4 h-4 bg-secondary-foreground rounded-full transform -translate-x-1/2 z-10 ${
                                    animatedItems.includes(index) ? 'animate-bounce-in' : ''
                                }`}>
                                    <div className="absolute inset-0 w-4 h-4 bg-secondary-foreground rounded-full animate-ping opacity-30"></div>
                                </div>

                                {/* Card */}
                                <div className="ml-12 md:ml-0 md:w-5/12 group">
                                    <div className="bg-card/80 border border-border rounded-xl p-6 hover:border-secondary-foreground/50 hover:shadow-lg hover:shadow-secondary-foreground/10 transition-all duration-300 backdrop-blur-sm">
                                        {/* Year badge */}
                                        <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary-foreground/10 text-secondary-foreground rounded-full mb-3 group-hover:bg-secondary-foreground/20 transition-colors">
                                            {exp.year}
                                        </span>

                                        {/* Content */}
                                        <h3 className="text-lg font-semibold text-forgeround group-hover:text-secondary-foreground transition-colors">
                                            {exp.title}
                                        </h3>
                                        <p className="text-secondary-foreground text-sm mb-3 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-secondary-foreground rounded-full"></span>
                                            {exp.company}
                                        </p>
                                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                            {exp.description}
                                        </p>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map((skill, skillIndex) => (
                                                <span 
                                                    key={skillIndex}
                                                    className="px-2.5 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full hover:bg-secondary-foreground/20 hover:text-secondary-foreground transition-colors duration-200"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block md:w-5/12"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Download Resume Button */}
                <div className={`text-center mt-16 transition-all duration-700 delay-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                    <button className="btn-outline inline-flex items-center gap-2 group">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Resume
                    </button>
                </div>
            </div>
        </section>
    );
};

