import { useState, useEffect, useRef } from 'react';

const navLinks = [
    { href: "#about", label: 'About' },
    { href: "#projects", label: 'Projects' },
    { href: "#experience", label: 'Experience' },
    { href: "#testimonials", label: 'Testimonials' },
    { href: "#contact", label: 'Contact' },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header 
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'glass py-3' : 'py-5'
            }`}
        >
            <nav className="container-custom flex items-center justify-between px-4">
                {/* Logo */}
                <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-2xl font-bold font-serif group cursor-pointer">
                    <span className="text-secondary-foreground transition-transform duration-300 group-hover:scale-110 inline-block">M.</span>
                    <span className="text-forgeround group-hover:text-secondary-foreground transition-colors duration-300">Alfin</span>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link, index) => (
                        <button 
                            key={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-secondary-foreground transition-colors duration-300 group"
                            style={{
                                transitionDelay: `${index * 50}ms`
                            }}
                        >
                            <span className="relative z-10">{link.label}</span>
                            <span className="absolute inset-0 bg-secondary-foreground/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-secondary-foreground transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-muted-foreground hover:text-secondary-foreground transition-colors p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden glass transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
                <div className="flex flex-col items-center gap-2 py-6 px-4">
                    {navLinks.map((link, index) => (
                        <button 
                            key={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className="text-muted-foreground hover:text-secondary-foreground transition-colors duration-300 text-lg font-medium py-2"
                            style={{
                                transitionDelay: `${index * 50}ms`
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};

