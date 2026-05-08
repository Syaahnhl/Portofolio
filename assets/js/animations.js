// assets/js/animations.js
let animationsInitialized = false;

function initAnimations(e) {
    // 1. Scroll Reveal Logic (Optimized with IntersectionObserver)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Memory leak prevention
            }
        });
    }, observerOptions);

    const reveals = document.querySelectorAll(".reveal:not(.active)");
    reveals.forEach(el => observer.observe(el));

    // The rest of the events should only be bound once
    if (animationsInitialized) return;
    animationsInitialized = true;

    // 2. Modals (Architecture & Image)
    const archModal = document.getElementById('arch-modal');
    const archModalPanel = document.getElementById('arch-modal-panel');

    window.openArchModal = function() {
        if(archModal && archModalPanel) {
            archModal.classList.remove('hidden');
            void archModal.offsetWidth;
            archModal.classList.add('opacity-100');
            archModalPanel.classList.replace('scale-95', 'scale-100');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeArchModal = function() {
        if(archModal && archModalPanel) {
            archModal.classList.remove('opacity-100');
            archModalPanel.classList.replace('scale-100', 'scale-95');
            setTimeout(() => {
                archModal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    };

    if (archModal) {
        archModal.addEventListener('click', (e) => {
            if (e.target === archModal) window.closeArchModal();
        });
    }

    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');

    window.openImageModal = function(imageSrc) {
        if(imageModal && modalImg) {
            modalImg.src = imageSrc;
            imageModal.classList.remove('hidden');
            void imageModal.offsetWidth;
            imageModal.classList.add('opacity-100');
            modalImg.classList.replace('scale-95', 'scale-100');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeImageModal = function() {
        if(imageModal && modalImg) {
            imageModal.classList.remove('opacity-100');
            modalImg.classList.replace('scale-100', 'scale-95');
            setTimeout(() => {
                imageModal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    };

    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) window.closeImageModal();
        });
    }

    // 3. Custom Interactive Cursor (Optimized for Mobile/Touch)
    (function () {
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        if (!dot || !ring) return;

        // Battery / Performance check: Disable cursor logic under 768px
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (isMobile) {
            dot.style.display = 'none';
            ring.style.display = 'none';
            return; 
        }

        let mouseX = -100, mouseY = -100;
        let ringX = -100, ringY = -100;
        const STIFFNESS = 0.13;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        document.addEventListener('mouseleave', () => {
            dot.style.opacity = '0';
            ring.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        });

        const HOVER_SELECTOR = 'a, button, [role="button"], .glass-card, input, textarea, select, label, [tabindex], .lang-btn';

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(HOVER_SELECTOR)) {
                document.body.classList.add('cursor-hover');
            }
        }, { passive: true });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(HOVER_SELECTOR)) {
                document.body.classList.remove('cursor-hover');
            }
        }, { passive: true });

        document.addEventListener('mousedown', () => {
            dot.style.transform = 'translate(-50%, -50%) scale(0.6)';
            ring.style.transform = 'translate(-50%, -50%) scale(0.85)';
        });
        document.addEventListener('mouseup', () => {
            dot.style.transform = '';
            ring.style.transform = '';
        });

        function tick() {
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';

            ringX += (mouseX - ringX) * STIFFNESS;
            ringY += (mouseY - ringY) * STIFFNESS;

            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';

            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    })();

    // 4. Hacker Terminal Easter Egg
    (function () {
        const terminal = document.getElementById('hacker-terminal');
        const output = document.getElementById('terminal-output');
        const inputEl = document.getElementById('terminal-input');
        const tildeHint = document.getElementById('tilde-hint');

        if (!terminal || !output || !inputEl) return;

        let isOpen = false;

        const COMMANDS = {
            help: () => [
                '┌─────────────────────────────────────────┐',
                '│         AVAILABLE COMMANDS               │',
                '└─────────────────────────────────────────┘',
                '',
                '  <span class="t-cmd">whoami</span>      — Tampilkan bio & spesialisasi',
                '  <span class="t-cmd">skills</span>      — Stack teknologi yang saya kuasai',
                '  <span class="t-cmd">kaching</span>     — Arsitektur proyek Kaching POS',
                '  <span class="t-cmd">projects</span>    — Daftar proyek yang pernah saya bangun',
                '  <span class="t-cmd">contact</span>     — Cara terbaik menghubungi saya',
                '  <span class="t-cmd">clear</span>       — Bersihkan layar terminal',
                '  <span class="t-cmd">exit</span>        — Tutup terminal',
                '',
                '<span class="t-dim">[ Pro tip: tekan ~ kapan saja untuk toggle terminal ]</span>',
            ],

            whoami: () => [
                '┌─────────────────────────────────────────┐',
                '│              SYAHNAHL DILAREXA          │',
                '└─────────────────────────────────────────┘',
                '',
                '  <span class="t-cmd">Role       :</span> Full-Stack Developer',
                '  <span class="t-cmd">Speciality :</span> Laravel Backend &amp; Kotlin Jetpack Compose',
                '  <span class="t-cmd">Focus      :</span> Offline-First Architecture, SaaS Products,',
                '             Real-Time Sync via WebSockets',
                '  <span class="t-cmd">Education  :</span> Sistem Informasi — Active Student',
                '  <span class="t-cmd">Status     :</span> <span style="color:#00ff00">● Available for new projects</span>',
                '',
                '<span class="t-dim">"Bukan sekadar menulis kode. Saya menyusun solusi."</span>',
            ],

            skills: () => [
                '┌─────────────────────────────────────────┐',
                '│               TECH ARSENAL              │',
                '└─────────────────────────────────────────┘',
                '',
                '  <span class="t-cmd">[Backend]</span>',
                '    ● Laravel (PHP) — API Design, Multi-Tenant SaaS',
                '    ● MySQL · Room DB · Query Optimisation',
                '',
                '  <span class="t-cmd">[Mobile]</span>',
                '    ● Kotlin + Jetpack Compose',
                '    ● Offline-First · MVVM · StateFlow',
                '',
                '  <span class="t-cmd">[Infrastructure]</span>',
                '    ● DigitalOcean VPS · Nginx',
                '    ● WebSockets · Real-Time Data Sync',
                '',
                '  <span class="t-cmd">[Frontend]</span>',
                '    ● Tailwind CSS · Vanilla JS',
                '    ● UI/UX Design Principles',
            ],

            projects: () => [
                '┌─────────────────────────────────────────┐',
                '│               FEATURED PROJECTS         │',
                '└─────────────────────────────────────────┘',
                '',
                '  <span class="t-cmd">1. Kaching! SaaS POS Ecosystem</span>',
                '     Offline-first kasir digital dengan WebSocket sync',
                '     → <a href="https://kaching.id" target="_blank" style="color:#38bdf8">kaching.id</a>',
                '',
                '  <span class="t-cmd">2. MBG ERP System</span>',
                '     Sistem manajemen manufaktur/konveksi end-to-end',
                '     → Internal / On-Premise',
                '',
                '  <span class="t-cmd">3. SmartSAW Decision Logic</span>',
                '     Implementasi algoritma SAW untuk keputusan multi-kriteria',
                '     → <a href="https://smartsaw.netlify.app/" target="_blank" style="color:#38bdf8">smartsaw.netlify.app</a>',
                '',
                '  <span class="t-cmd">4. Natgrey Business Profile</span>',
                '     Premium brand showcase for architectural lighting',
                '     → <a href="https://incandescent-conkies-0a6b9e.netlify.app/" target="_blank" style="color:#38bdf8">netlify.app</a>',
            ],

            contact: () => [
                '┌─────────────────────────────────────────┐',
                '│              GET IN TOUCH               │',
                '└─────────────────────────────────────────┘',
                '',
                '  <span class="t-cmd">Email  :</span> <a href="mailto:syahnahl25@gmail.com" style="color:#38bdf8">syahnahl25@gmail.com</a>',
                '  <span class="t-cmd">GitHub :</span> <a href="https://github.com/Syaahnhl" target="_blank" style="color:#38bdf8">github.com/Syaahnhl</a>',
                '  <span class="t-cmd">LinkedIn:</span> <a href="https://linkedin.com/in/Syaahnhl" target="_blank" style="color:#38bdf8">linkedin.com/in/Syaahnhl</a>',
                '',
                '<span class="t-dim">Best response time: email or GitHub issues.</span>',
            ],

            kaching: () => [
                '┌─────────────────────────────────────────┐',
                '│          KACHING! — ARCHITECTURE        │',
                '└─────────────────────────────────────────┘',
                '',
                '  <span class="t-cmd">Pattern    :</span> Offline-First Architecture',
                '  <span class="t-cmd">Mobile     :</span> Android (Kotlin + Jetpack Compose)',
                '  <span class="t-cmd">Backend    :</span> Laravel REST API (Multi-Tenant SaaS)',
                '  <span class="t-cmd">Local DB   :</span> Room DB — transaksi tetap jalan tanpa internet',
                '  <span class="t-cmd">Sync       :</span> WebSockets — sinkronisasi ke dapur real-time',
                '  <span class="t-cmd">Server DB  :</span> MySQL — source of truth saat koneksi pulih',
                '  <span class="t-cmd">Live       :</span> <a href="https://kaching.id" target="_blank" style="color:#38bdf8">kaching.id</a>',
                '',
                '<span class="t-dim">"Offline bukan masalah — itu adalah fitur."</span>',
            ],

            clear: () => { output.innerHTML = ''; return []; },
            exit: () => { setTimeout(() => closeTerminal(), 200); return ['Closing terminal... goodbye! 👋']; },
        };

        function appendLines(lines, cssClass = 't-line') {
            lines.forEach(line => {
                const div = document.createElement('div');
                div.className = cssClass;
                div.innerHTML = line;
                output.appendChild(div);
            });
            output.scrollTop = output.scrollHeight;
        }

        function printBoot() {
            output.innerHTML = '';
            appendLines([
                '<span class="t-dim">╔══════════════════════════════════════════╗</span>',
                '<span class="t-dim">║</span>  <span style="color:#fff;font-weight:bold">PORTFOLIO TERMINAL v1.0.0</span>              <span class="t-dim">║</span>',
                '<span class="t-dim">║</span>  <span class="t-dim">Syahnahl Dilarexa — Full-Stack Dev</span>     <span class="t-dim">║</span>',
                '<span class="t-dim">╚══════════════════════════════════════════╝</span>',
                '',
                'Type <span class="t-cmd">help</span> to see available commands.',
                '<span class="t-dim">Press ~ or type exit to close.</span>',
                '',
            ]);
        }

        function openTerminal() {
            printBoot();
            terminal.classList.add('active');
            isOpen = true;
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputEl.focus(), 100);
            if (tildeHint) tildeHint.style.opacity = '0';
        }

        function closeTerminal() {
            terminal.classList.remove('active');
            isOpen = false;
            document.body.style.overflow = '';
            if (tildeHint) tildeHint.style.opacity = '1';
        }

        document.addEventListener('keydown', (e) => {
            if ((e.key === '`' || e.key === '~') && !isOpen) {
                e.preventDefault();
                openTerminal();
                return;
            }
            if ((e.key === '`' || e.key === '~') && isOpen) {
                e.preventDefault();
                closeTerminal();
                return;
            }
            if (e.key === 'Escape' && isOpen) {
                closeTerminal();
            }
        });

        inputEl.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const raw = inputEl.value.trim();
            const cmd = raw.toLowerCase();
            inputEl.value = '';

            if (!raw) return;

            const echoDiv = document.createElement('div');
            echoDiv.className = 't-line';
            echoDiv.innerHTML = `<span class="t-dim">syahnahl@portfolio:~$</span> <span class="t-cmd">${raw.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
            output.appendChild(echoDiv);

            if (COMMANDS[cmd]) {
                const result = COMMANDS[cmd]();
                if (result && result.length) appendLines(result);
                if (cmd !== 'clear') appendLines(['']);
            } else {
                appendLines([
                    `<span class="t-error">bash: ${raw.replace(/</g, '&lt;')}: command not found</span>`,
                    `<span class="t-dim">Hint: type <span class="t-cmd">help</span> to see available commands.</span>`,
                    '',
                ]);
            }

            output.scrollTop = output.scrollHeight;
        });

        setTimeout(() => {
            if (tildeHint) tildeHint.style.opacity = '0';
        }, 6000);
    })();
}

document.addEventListener('componentsLoaded', initAnimations);
