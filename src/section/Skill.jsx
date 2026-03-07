import { useEffect, useRef, useState } from 'react';

const skills = [
    { name: 'HTML', icon: '/html.svg' },
    { name: 'CSS', icon: '/css.svg' },
    { name: 'JavaScript', icon: '/javascript.svg' },
    { name: 'React', icon: '/react.svg' },
    { name: 'Next.js', icon: '/next-js.svg' },
    { name: 'PHP', icon: '/php.svg' },
    { name: 'Laravel', icon: '/laravel.svg' },
    { name: 'Python', icon: '/python.svg' },
    { name: 'C#', icon: '/c-sharp.svg' },
    { name: 'MySQL', icon: '/mysql.png' },
    { name: 'Unity', icon: '/unity.svg' },
    { name: 'Adobe Illustrator', icon: '/adobe-ilustrator.svg' },
    { name: 'CorelDRAW', icon: '/crel-draw.svg' },
    { name: 'Construct 3', icon: '/construct-3.png' },
    { name: 'GitHub', icon: '/github.svg' },
];

export const Skill = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animatedItems, setAnimatedItems] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Stagger the animation for each skill item
                        skills.forEach((_, index) => {
                            setTimeout(() => {
                                setAnimatedItems(prev => [...prev, index]);
                            }, index * 50);
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
        <section id="skills" className="section-padding bg-surface/30 relative overflow-hidden" ref={sectionRef}>
            {/* Background decoration */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-secondary-foreground/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-highlight/5 rounded-full blur-3xl"></div>

            <div className="container-custom relative z-10">
                {/* Section Title */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <div className="w-20 h-1 bg-secondary-foreground mx-auto rounded-full"></div>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Technologies and tools I work with to bring ideas to life.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 md:gap-6">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className={`group relative bg-card/50 border border-border rounded-xl p-4 md:p-6 flex flex-col items-center justify-center card-hover cursor-pointer transition-all duration-500 ${
                                animatedItems.includes(index) 
                                    ? 'animate-zoom-in-up opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-8'
                            }`}
                            style={{ 
                                transitionDelay: animatedItems.includes(index) ? `${index * 50}ms` : '0ms'
                            }}
                        >
                            {/* Skill Icon */}
                            <div className="w-12 h-12 md:w-16 md:h-16 mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                                <img 
                                    src={skill.icon} 
                                    alt={skill.name}
                                    className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_15px_rgba(32,178,166,0.8)] transition-all duration-300"
                                />
                            </div>
                            
                            {/* Skill Name */}
                            <span className="text-xs md:text-sm text-muted-foreground group-hover:text-secondary-foreground group-hover:drop-shadow-[0_0_10px_rgba(32,178,166,0.5)] transition-all duration-300 font-medium">
                                {skill.name}
                            </span>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary-foreground/10 via-highlight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Border glow on hover with neon effect */}
                            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-secondary-foreground/60 group-hover:shadow-[0_0_20px_rgba(32,178,166,0.4),0_0_40px_rgba(32,178,166,0.2)] transition-all duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Skills Summary Cards */}
                <div className={`grid md:grid-cols-3 gap-6 mt-16 transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                    {[
                        { title: 'Frontend', skills: 'React, Next.js, HTML/CSS, JavaScript', icon: '🎨' },
                        { title: 'Backend', skills: 'Node.js, PHP, Laravel, Python', icon: '⚙️' },
                        { title: 'Tools', skills: 'Git, Docker, MySQL, Unity', icon: '🛠️' }
                    ].map((category, index) => (
                        <div 
                            key={index}
                            className="bg-card/50 border border-border rounded-xl p-6 text-center hover:border-secondary-foreground/60 hover:shadow-[0_0_25px_rgba(32,178,166,0.3)] transition-all duration-300 group"
                        >
                            <div className="text-3xl mb-3 group-hover:drop-shadow-[0_0_15px_rgba(32,178,166,0.5)] transition-all duration-300">{category.icon}</div>
                            <h4 className="text-lg font-semibold text-forgeround mb-2 group-hover:text-secondary-foreground group-hover:drop-shadow-[0_0_10px_rgba(32,178,166,0.5)] transition-all duration-300">
                                {category.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                {category.skills}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

