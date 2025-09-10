document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-cta]');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const contact = document.getElementById('contact');
            contact?.scrollIntoView({ behavior: 'smooth' });
        });
    });
    // Smooth scroll for internal nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = (link.getAttribute('href') || '').slice(1);
            if (!targetId) return;
            const el = document.getElementById(targetId);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});


