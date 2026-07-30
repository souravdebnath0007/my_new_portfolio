/* =========================================================
   Sourav Debnath — Portfolio interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    /* --- Boot Loader --- */
    const bootLoader = document.getElementById('boot-loader');
    const bootProgress = document.getElementById('boot-progress');
    const terminalLines = document.querySelectorAll('#terminal-content p');
    const mainHeader = document.getElementById('main-header');
    const mainContent = document.getElementById('main-content');
    const mainFooter = document.getElementById('main-footer');

    let lineIndex = 0;
    const showLine = () => {
        if (lineIndex < terminalLines.length) {
            terminalLines[lineIndex].classList.add('active');
            lineIndex++;
            setTimeout(showLine, 400);
        }
    };

    setTimeout(() => {
        showLine();
        bootProgress.style.width = '100%';
    }, 500);

    setTimeout(() => {
        if (bootLoader) {
            bootLoader.style.opacity = '0';
            bootLoader.style.visibility = 'hidden';
        }
        mainHeader && mainHeader.classList.remove('opacity-0');
        mainContent && mainContent.classList.remove('opacity-0');
        mainFooter && mainFooter.classList.remove('opacity-0');

        startHeroTyping();
        initScrollObserver();
        startLaptopTerminal();
    }, 3000);

    /* --- Hero Typing Effect --- */
    function startHeroTyping() {
        const typingText = document.getElementById('typing-text');
        if (!typingText) return;

        const roles = [
            'Software Engineer',
            'AI/ML Engineer',
            'Full Stack Developer',
            'Flask Developer',
            'Machine Learning Enthusiast'
        ];

        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentRole = roles[roleIdx];

            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 45;
            } else {
                typingText.textContent = currentRole.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIdx === currentRole.length) {
                isDeleting = true;
                typingSpeed = 1800;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                typingSpeed = 450;
            }

            setTimeout(type, typingSpeed);
        }
        type();
    }

    /* --- Laptop Screen: looping terminal animation --- */
    function startLaptopTerminal() {
        const screen = document.getElementById('laptop-screen');
        if (!screen) return;

        // Each frame: { text (supports prompt/cmd/out markup), hold (ms after line) }
        const frames = [
            { html: '<span class="term-prompt">sourav@dev</span>:<span class="term-dim">~</span>$ <span class="term-cmd">git log --oneline -3</span>', hold: 700 },
            { html: '<span class="term-dim">a1b2c3d</span> <span class="term-out">feat: integrate ML model into Flask API</span>', hold: 500 },
            { html: '<span class="term-dim">e4f5g6h</span> <span class="term-out">feat: add CGPA prediction module</span>', hold: 500 },
            { html: '<span class="term-dim">i7j8k9l</span> <span class="term-out">fix: async task queue with Celery</span>', hold: 900 },
            { html: '<span class="term-prompt">sourav@dev</span>:<span class="term-dim">~</span>$ <span class="term-cmd">python train_model.py</span>', hold: 800 },
            { html: '<span class="term-out">Epoch 1/10  loss=0.42  acc=0.81</span>', hold: 450 },
            { html: '<span class="term-out">Epoch 5/10  loss=0.18  acc=0.92</span>', hold: 450 },
            { html: '<span class="term-out">Epoch 10/10 loss=0.07  acc=0.97</span>', hold: 700 },
            { html: '<span class="term-ok">✓ Model saved → mentora_model.pkl</span>', hold: 900 },
            { html: '<span class="term-prompt">sourav@dev</span>:<span class="term-dim">~</span>$ <span class="term-cmd">flask run --port 5000</span>', hold: 700 },
            { html: '<span class="term-out">* Serving Flask app "mentora"</span>', hold: 400 },
            { html: '<span class="term-out">* Running on http://127.0.0.1:5000</span>', hold: 700 },
            { html: '<span class="term-ok">✓ GET /api/predict  200 OK</span>', hold: 600 },
            { html: '<span class="term-ok">✓ POST /api/recommend  201 Created</span>', hold: 1000 },
            { html: '<span class="term-prompt">sourav@dev</span>:<span class="term-dim">~</span>$ <span class="term-cursor"></span>', hold: 1200 }
        ];

        const MAX_LINES = 7;
        let frameIdx = 0;

        function render() {
            const frame = frames[frameIdx % frames.length];

            // Append a new line
            const line = document.createElement('span');
            line.className = 'term-line';
            line.innerHTML = frame.html;
            screen.appendChild(line);

            // Trim to last MAX_LINES
            while (screen.children.length > MAX_LINES) {
                screen.removeChild(screen.firstChild);
            }

            frameIdx++;
            setTimeout(render, frame.hold);
        }
        render();
    }

    /* --- Scroll Reveal Observer --- */
    function initScrollObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Assign stagger index to grouped cards
        document.querySelectorAll('[data-stagger-group]').forEach(group => {
            group.querySelectorAll('.stagger-card').forEach((card, i) => {
                card.style.setProperty('--stagger', i);
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-element').forEach(el => observer.observe(el));
    }

    /* --- Mobile Menu --- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    const openMenu = () => {
        mobileMenu && mobileMenu.classList.add('open');
        mobileMenuBackdrop && mobileMenuBackdrop.classList.add('open');
    };
    const closeMenu = () => {
        mobileMenu && mobileMenu.classList.remove('open');
        mobileMenuBackdrop && mobileMenuBackdrop.classList.remove('open');
    };

    menuToggle && menuToggle.addEventListener('click', openMenu);
    mobileMenuClose && mobileMenuClose.addEventListener('click', closeMenu);
    mobileMenuBackdrop && mobileMenuBackdrop.addEventListener('click', closeMenu);
    mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    /* --- Back to Top --- */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});