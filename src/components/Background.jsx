import { useEffect, useRef } from 'react';

export const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create glow spots
        const glowSpots = [
            { x: 0, y: 0, vx: 0.5, vy: 0.3, radius: 300, color: 'rgba(32, 178, 166, 0.15)' },
            { x: 0, y: 0, vx: -0.4, vy: 0.5, radius: 250, color: 'rgba(245, 166, 35, 0.12)' },
            { x: 0, y: 0, vx: 0.3, vy: -0.4, radius: 200, color: 'rgba(32, 178, 166, 0.1)' },
            { x: 0, y: 0, vx: -0.3, vy: -0.3, radius: 280, color: 'rgba(245, 166, 35, 0.08)' },
        ];

        // Initialize glow spots positions
        glowSpots.forEach(spot => {
            spot.x = Math.random() * canvas.width;
            spot.y = Math.random() * canvas.height;
        });

        // Create grid particles
        const createParticles = () => {
            particles = [];
            const spacing = 60;
            
            // Create particles at grid intersections
            for (let x = 0; x < canvas.width; x += spacing) {
                for (let y = 0; y < canvas.height; y += spacing) {
                    if (Math.random() > 0.7) { // Only show some grid points
                        particles.push({
                            x,
                            y,
                            baseX: x,
                            baseY: y,
                            size: Math.random() * 2 + 1,
                            opacity: Math.random() * 0.3 + 0.1,
                            color: Math.random() > 0.5 ? '#20b2a6' : '#f5a623'
                        });
                    }
                }
            }
        };

        createParticles();

        // Mouse interaction
        let mouse = { x: null, y: null, radius: 150 };
        
        const handleMouseMove = (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient background
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width
            );
            gradient.addColorStop(0, '#0f1418');
            gradient.addColorStop(1, '#0a0e12');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw glow spots
            glowSpots.forEach(spot => {
                spot.x += spot.vx;
                spot.y += spot.vy;

                // Bounce off edges
                if (spot.x < -spot.radius || spot.x > canvas.width + spot.radius) spot.vx *= -1;
                if (spot.y < -spot.radius || spot.y > canvas.height + spot.radius) spot.vy *= -1;

                // Draw glow
                const glowGradient = ctx.createRadialGradient(
                    spot.x, spot.y, 0,
                    spot.x, spot.y, spot.radius
                );
                glowGradient.addColorStop(0, spot.color);
                glowGradient.addColorStop(1, 'transparent');
                ctx.fillStyle = glowGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            // Draw grid pattern
            ctx.strokeStyle = 'rgba(32, 178, 166, 0.03)';
            ctx.lineWidth = 1;
            const spacing = 60;
            
            for (let x = 0; x < canvas.width; x += spacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            for (let y = 0; y < canvas.height; y += spacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Update and draw particles
            particles.forEach(particle => {
                // Mouse interaction
                if (mouse.x !== null) {
                    const dx = mouse.x - particle.x;
                    const dy = mouse.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const maxDistance = mouse.radius;
                        const directionX = forceDirectionX * force * maxDistance * 0.1;
                        const directionY = forceDirectionY * force * maxDistance * 0.1;
                        
                        particle.x -= directionX;
                        particle.y -= directionY;
                    }
                }

                // Return to base position
                particle.x += (particle.baseX - particle.x) * 0.05;
                particle.y += (particle.baseY - particle.y) * 0.05;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
};

