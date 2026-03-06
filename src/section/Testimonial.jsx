import { useEffect, useRef, useState } from 'react';

export const Testimonial = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animatedItems, setAnimatedItems] = useState([]);

    const testimonials = [
        {
            name: "John Smith",
            role: "CEO, TechCorp",
            image: "👨‍💼",
            quote: "Working with this developer was an absolute pleasure. Their attention to detail and ability to translate ideas into reality is remarkable."
        },
        {
            name: "Sarah Johnson",
            role: "Product Manager, StartupX",
            image: "👩‍💼",
            quote: "Exceptional skills in both frontend and backend development. Delivered the project on time and exceeded our expectations."
        },
        {
            name: "Michael Chen",
            role: "Founder, DigitalHub",
            image: "👨‍💻",
            quote: "Professional, responsive, and talented. The website they built has significantly improved our online presence and user engagement."
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Stagger animation for each testimonial card
                        testimonials.forEach((_, index) => {
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
        <section id="testimonials" className="section-padding relative overflow-hidden" ref={sectionRef}>
            {/* Background decoration */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-secondary-foreground/3 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-highlight/3 rounded-full blur-3xl"></div>

            <div className="container-custom relative z-10">
                {/* Section Title */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Client <span className="gradient-text">Testimonials</span>
                    </h2>
                    <div className="w-20 h-1 bg-secondary-foreground mx-auto rounded-full"></div>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        What people say about working with me.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index}
                            className={`group bg-card/50 border border-border rounded-2xl p-6 md:p-8 card-hover transition-all duration-700 ${
                                animatedItems.includes(index) 
                                    ? 'animate-zoom-in-up opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-12'
                            }`}
                            style={{ 
                                transitionDelay: animatedItems.includes(index) ? `${index * 150}ms` : '0ms'
                            }}
                        >
                            {/* Quote Icon */}
                            <div className="text-5xl text-secondary-foreground/20 mb-4 font-serif group-hover:text-secondary-foreground/30 transition-colors">
                                "
                            </div>

                            {/* Quote */}
                            <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-forgeround transition-colors">
                                {testimonial.quote}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                                <div className="w-14 h-14 bg-gradient-to-br from-secondary-foreground/20 to-highlight/20 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                    {testimonial.image}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-forgeround group-hover:text-secondary-foreground transition-colors">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>

                            {/* Rating Stars */}
                            <div className="flex gap-1 mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg 
                                        key={i} 
                                        className="w-4 h-4 text-yellow-500 fill-current" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation dots (decorative) */}
                <div className={`flex justify-center gap-2 mt-10 transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                    {testimonials.map((_, index) => (
                        <div 
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                animatedItems.includes(index) 
                                    ? 'bg-secondary-foreground w-8' 
                                    : 'bg-muted hover:bg-muted-foreground'
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

