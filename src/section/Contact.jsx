import { useState, useEffect, useRef } from 'react';

export const Contact = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animatedItems, setAnimatedItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Stagger animation for contact elements
                        setTimeout(() => setAnimatedItems(prev => [...prev, 0]), 0);
                        setTimeout(() => setAnimatedItems(prev => [...prev, 1]), 100);
                        setTimeout(() => setAnimatedItems(prev => [...prev, 2]), 200);
                        setTimeout(() => setAnimatedItems(prev => [...prev, 3]), 300);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });
            alert('Message sent successfully!');
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const socialLinks = [
        { name: 'Instagram', icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
        ), href: 'https://instagram.com/yourprofile' },
        { name: 'GitHub', icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        ), href: 'https://github.com/yourprofile' },
        { name: 'LinkedIn', icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        ), href: 'https://linkedin.com/in/yourprofile' },
        { name: 'Facebook', icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
        ), href: 'https://facebook.com/yourprofile' }
    ];

    return (
        <section id="contact" className="section-padding bg-card/30 relative overflow-hidden" ref={sectionRef}>
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-foreground/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-highlight/5 rounded-full blur-3xl"></div>

            <div className="container-custom relative z-10">
                {/* Section Title */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <div className="w-20 h-1 bg-secondary-foreground mx-auto rounded-full"></div>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Have a project in mind or want to collaborate? Feel free to reach out!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Info */}
                    <div className={`space-y-8 transition-all duration-700 ${animatedItems.includes(0) ? 'animate-fade-in-left opacity-100' : 'opacity-0'}`}>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-forgeround mb-4">
                                Let's <span className="gradient-text">Connect</span>
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to contact me through any of the platforms below.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className={`space-y-4 transition-all duration-700 delay-100 ${animatedItems.includes(1) ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                            <h4 className="font-semibold text-forgeround flex items-center gap-2">
                                <span className="w-2 h-2 bg-secondary-foreground rounded-full"></span>
                                Follow Me
                            </h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a 
                                        key={index}
                                        href={social.href}
                                        className="w-12 h-12 bg-card/50 border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-background hover:bg-secondary-foreground hover:border-secondary-foreground hover:scale-110 hover:shadow-lg hover:shadow-secondary-foreground/20 transition-all duration-300 group"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className={`space-y-4 pt-4 transition-all duration-700 delay-200 ${animatedItems.includes(2) ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}>
                            {[
                                { 
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    ),
                                    text: 'alfin.gamedev@gmail.com',
                                    label: 'Email'
                                },
                                { 
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ),
                                    text: 'Nganjuk, Indonesia',
                                    label: 'Location'
                                }
                            ].map((item, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-4 p-4 bg-card/50 border border-border rounded-xl hover:border-secondary-foreground/30 hover:shadow-lg hover:shadow-secondary-foreground/10 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-secondary-foreground/10 rounded-xl flex items-center justify-center text-secondary-foreground group-hover:bg-secondary-foreground group-hover:text-background transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                                        <p className="text-forgeround font-medium group-hover:text-secondary-foreground transition-colors">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={`bg-card/80 border border-border rounded-2xl p-8 backdrop-blur-sm transition-all duration-700 delay-300 ${animatedItems.includes(3) ? 'animate-zoom-in-up opacity-100' : 'opacity-0'}`}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                                        Name
                                    </label>
                                    <input 
                                        type="text" 
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-secondary-foreground/20 transition-all text-forgeround placeholder:text-muted-foreground/50"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                                        Email
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-secondary-foreground/20 transition-all text-forgeround placeholder:text-muted-foreground/50"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
                                    Message
                                </label>
                                <textarea 
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-secondary-foreground/20 transition-all text-forgeround placeholder:text-muted-foreground/50 resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-primary group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

