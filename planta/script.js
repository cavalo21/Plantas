// Navegação suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animação do botão CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Aqui você pode adicionar a lógica para redirecionar para a página de registro
        console.log('Botão CTA clicado');
    });
}

// Menu mobile
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Criar botão do menu mobile
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Adicionar botão ao navbar
    navbar.insertBefore(mobileMenuBtn, navLinks);
    
    // Toggle menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
};

// Inicializar menu mobile em telas pequenas
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Adicionar classe 'scrolled' ao navbar quando rolar a página
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animação dos cards de features
const animateFeatures = () => {
    const features = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    features.forEach(feature => {
        observer.observe(feature);
    });
};

// Inicializar animações
document.addEventListener('DOMContentLoaded', () => {
    animateFeatures();
}); 