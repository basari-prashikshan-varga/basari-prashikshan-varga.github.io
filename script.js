document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isActive = nav.classList.contains('active');
            
            if (isActive) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            } else {
                nav.classList.add('active');
                mobileMenuToggle.classList.add('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close mobile menu when clicking on nav links
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

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
    // Populate full international country list and dial codes independently
    const countrySelect = document.getElementById('country');
    const dialSelect = document.getElementById('dial_code');
    const phoneInput = document.getElementById('phone');
    if (countrySelect && dialSelect) {
        // Use intl-tel-input data utils if available; otherwise fetch a static list
        const fallbackCountries = [
            { name: 'India', dialCode: '+91' }
        ];
        const populate = (list) => {
            const byName = [...list].sort((a,b)=>a.name.localeCompare(b.name));
            byName.forEach(c => {
                const o = document.createElement('option');
                o.value = c.name; o.textContent = c.name;
                countrySelect.appendChild(o);
            });
            const byDial = [...list].sort((a,b)=>a.dialCode.localeCompare(b.dialCode));
            byDial.forEach(c => {
                const o = document.createElement('option');
                o.value = c.dialCode; o.textContent = `${c.name} (${c.dialCode})`;
                dialSelect.appendChild(o);
            });
            // Ensure defaults: India and +91
            const indiaOption = Array.from(countrySelect.options).find(o => (o.textContent || '').toLowerCase().startsWith('india'));
            if (indiaOption) indiaOption.selected = true;
            const dialOption = Array.from(dialSelect.options).find(o => o.value === '+91');
            if (dialOption) dialOption.selected = true;
        };
        const loadFromCDN = () => {
            // Pull country data from intl-tel-input internal data
            try {
                // eslint-disable-next-line no-undef
                const all = window.intlTelInputGlobals?.getCountryData?.() || [];
                if (all.length) {
                    const mapped = all.map(c => ({ name: c.name, dialCode: `+${c.dialCode}` }));
                    populate(mapped);
                    return;
                }
            } catch {}
            populate(fallbackCountries);
        };
        loadFromCDN();

        // Restrict phone input to digits only (no auto-prefix)
        const maybePrefixPhone = () => {
            if (!phoneInput) return;
            const digits = phoneInput.value.replace(/[^0-9]/g, '');
            phoneInput.value = digits;
        };
        if (phoneInput) {
            phoneInput.addEventListener('input', () => {
                const raw = phoneInput.value;
                const digits = raw.replace(/[^0-9]/g, '');
                phoneInput.value = digits;
            });
        }
        // Enforce digits-only while typing
        // (no default dial-code text prefilled)
    }

    // Basic client-side email validation on submit
    const form = document.querySelector('form.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const email = document.getElementById('email');
            if (email && !/^\S+@\S+\.\S+$/.test(email.value)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                email.focus();
            }
        });
    }

    // Digits-only for age field as well
    const ageInput = document.getElementById('age');
    if (ageInput) {
        ageInput.addEventListener('input', () => {
            let digits = ageInput.value.replace(/[^0-9]/g, '');
            digits = digits.replace(/^0+/, '');
            ageInput.value = digits;
        });
    }

    // Image modal functionality
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.image-modal-close');
    const clickableImages = document.querySelectorAll('.clickable-image');

    if (imageModal && modalImage && modalClose) {
        // Open modal when clicking on images
        clickableImages.forEach(img => {
            img.addEventListener('click', () => {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close modal when clicking close button
        modalClose.addEventListener('click', () => {
            imageModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        // Close modal when clicking outside the image
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                imageModal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }
});


