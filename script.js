document.addEventListener('DOMContentLoaded', () => {

   
    const WA_NUMBER = '5493487216316'; 
    const DEFAULT_MESSAGE = 'Hola, me gustaría consultar por los productos de Flores Eternas.';

    // ==========================================================================
    // 1. AÑO DINÁMICO EN EL FOOTER
    // ==========================================================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // 2. MENÚ HAMBURGUESA (MÓVIL)
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Accesibilidad
            const isExpanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================================================
    // 3. HEADER STICKY (Efecto al hacer scroll)
    // ==========================================================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 4. ANIMACIONES DE APARICIÓN (Intersection Observer)
    // ==========================================================================
    const fadeElements = document.querySelectorAll('.fade-in');

    // Verificar si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && fadeElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Se activa cuando el 15% del elemento es visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        }, observerOptions);

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Si prefiere movimiento reducido, mostrar todo inmediatamente
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    // ==========================================================================
    // 5. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
    // ==========================================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Cerrar todos los demás
            accordionHeaders.forEach(otherHeader => {
                otherHeader.setAttribute('aria-expanded', 'false');
                otherHeader.nextElementSibling.style.maxHeight = null;
            });

            // Alternar el actual
            if (!isExpanded) {
                this.setAttribute('aria-expanded', 'true');
                const body = this.nextElementSibling;
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // ==========================================================================
    // 6. BOTONES DE WHATSAPP CON MENSAJES DINÁMICOS
    // ==========================================================================
    
    // Función para crear el enlace de WhatsApp
    const createWaLink = (message) => {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${WA_NUMBER}?text=${encodedMessage}`;
    };

    // Botones generales (Hero, Personalización, Footer, Flotante)
    const generalWaButtons = document.querySelectorAll('.btn-wa-general');
    generalWaButtons.forEach(btn => {
        btn.setAttribute('href', createWaLink(DEFAULT_MESSAGE));
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener noreferrer');
    });

    // Botones de productos específicos
    const productWaButtons = document.querySelectorAll('.btn-wa-product');
    productWaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.getAttribute('data-product');
            const message = `Hola, me interesa consultar por el producto: *${productName}*. ¿Me podrías dar más información?`;
            const url = createWaLink(message);
            window.open(url, '_blank');
        });
    });

    // ==========================================================================
    // 7. SCROLL SUAVE (Smooth Scroll) - Mejora para navegadores que no lo soportan por CSS
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajuste para el header fijo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });

});