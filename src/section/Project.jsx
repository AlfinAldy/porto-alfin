import { useEffect, useRef, useState } from 'react';

export const Project = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animatedItems, setAnimatedItems] = useState([]);

    const projects = [
        {
            title: "E-Commerce Platform",
            description: "A full-featured online shopping platform with cart, checkout, and payment integration.",
            tags: ["React", "Node.js", "MongoDB", "Stripe"],
            image: "/src/assets/project1.jpg"
        },
        {
            title: "Portfolio Website",
            description: "Personal portfolio showcasing projects and skills with modern design.",
            tags: ["React", "Tailwind", "Framer Motion"],
            image: "/src/assets/project2.jpg"
        },
        {
            title: "Task Management App",
            description: "Collaborative task management tool with real-time updates and team features.",
            tags: ["React", "Firebase", "Redux"],
            image: "/src/assets/project3.jpg"
        },
        {
            title: "Social Media Dashboard",
            description: "Analytics dashboard for social media management with beautiful visualizations.",
            tags: ["React", "Chart.js", "API"],
            image: "/src/assets/project4.jpg"
        },
        {
            title: "Weather Application",
            description: "Weather forecasting app with location-based predictions and beautiful UI.",
            tags: ["React", "OpenWeather API", "CSS"],
            image: "/src/assets/project5.jpg"
        },
        {
            title: "Blog Platform",
            description: "Content management system for creating and publishing blog posts.",
            tags: ["Next.js", "Prisma", "PostgreSQL"],
            image: "/src/assets/project6.jpg"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Stagger animation for each project card
                        projects.forEach((_, index) => {
                            setTimeout(() => {
                                setAnimatedItems(prev => [...prev, index]);
                            }, index * 100);
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
        <section id="projects" className="section-padding relative overflow-hidden" ref={sectionRef}>
            {/* Background decoration */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-secondary-foreground/3 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-highlight/3 rounded-full blur-3xl"></div>

            <div className="container-custom relative z-10">
                {/* Section Title */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <div className="w-20 h-1 bg-secondary-foreground mx-auto rounded-full"></div>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Here are some of the projects I've worked on, showcasing my skills and experience.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <div 
                            key={index}
                            className={`group bg-card/50 border border-border rounded-2xl overflow-hidden card-hover transition-all duration-700 ${
                                animatedItems.includes(index) 
                                    ? 'animate-zoom-in-up opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-12'
                            }`}
                            style={{ 
                                transitionDelay: animatedItems.includes(index) ? `${index * 100}ms` : '0ms'
                            }}
                        >
                            {/* Project Image/Icon */}
                            <div className="relative h-48 bg-gradient-to-br from-primary to-card overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* View project button on hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="px-4 py-2 bg-secondary-foreground text-background rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        View Project
                                    </button>
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-forgeround mb-2 group-hover:text-secondary-foreground transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span 
                                            key={tagIndex}
                                            className="px-2.5 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full hover:bg-secondary-foreground/20 hover:text-secondary-foreground transition-colors duration-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                                    <a 
                                        href="#" 
                                        className="text-sm text-secondary-foreground hover:underline flex items-center gap-1.5 group/link"
                                    >
                                        <svg className="w-4 h-4 group-hover/link:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                        Code
                                    </a>
                                    <a 
                                        href="#" 
                                        className="text-sm text-secondary-foreground hover:underline flex items-center gap-1.5 group/link"
                                    >
                                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                    <a href="/project" className="btn-outline inline-flex items-center gap-2 group">
                        View More Projects
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

