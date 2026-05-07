// Tema Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    if (htmlElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
});

// Animasi Scroll
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 120;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
setTimeout(reveal, 100);

// FUNGSI MODAL ARSITEKTUR SISTEM
const archModal = document.getElementById('arch-modal');
const archModalPanel = document.getElementById('arch-modal-panel');

function openArchModal() {
    archModal.classList.remove('hidden');
    void archModal.offsetWidth; // trigger reflow for transition
    archModal.classList.add('opacity-100');
    archModalPanel.classList.replace('scale-95', 'scale-100');
    document.body.style.overflow = 'hidden';
}

function closeArchModal() {
    archModal.classList.remove('opacity-100');
    archModalPanel.classList.replace('scale-100', 'scale-95');
    setTimeout(() => {
        archModal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

archModal.addEventListener('click', (e) => {
    if (e.target === archModal) closeArchModal();
});

// FUNGSI MODAL GAMBAR (TINJAU ANTARMUKA)
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

function openImageModal(imageSrc) {
    modalImg.src = imageSrc;
    modal.classList.remove('hidden');
    // Trigger reflow agar transisi CSS berjalan
    void modal.offsetWidth;
    modal.classList.add('opacity-100');
    modalImg.classList.replace('scale-95', 'scale-100');
    document.body.style.overflow = 'hidden'; // Kunci scroll background
}

function closeImageModal() {
    modal.classList.remove('opacity-100');
    modalImg.classList.replace('scale-100', 'scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Buka scroll background
    }, 300);
}

// Tutup modal jika area luar gambar diklik
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeImageModal();
});

/* =============================================
   HIDDEN TERMINAL — HACKER MODE EASTER EGG
   ============================================= */
(function () {
    const terminal = document.getElementById('hacker-terminal');
    const output = document.getElementById('terminal-output');
    const inputEl = document.getElementById('terminal-input');
    const tildeHint = document.getElementById('tilde-hint');

    let isOpen = false;

    // ── Command registry ──────────────────────────────────────────
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

    // ── Render helpers ────────────────────────────────────────────
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

    // ── Open / close ──────────────────────────────────────────────
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

    // ── Keyboard triggers ─────────────────────────────────────────
    document.addEventListener('keydown', (e) => {
        // Toggle on backtick/tilde key (key '`' or '~')
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

    // ── Command execution ─────────────────────────────────────────
    inputEl.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const raw = inputEl.value.trim();
        const cmd = raw.toLowerCase();
        inputEl.value = '';

        if (!raw) return;

        // Echo the typed command
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

    // Auto-hide hint after 6 seconds
    setTimeout(() => {
        if (tildeHint) tildeHint.style.opacity = '0';
    }, 6000);
})();

/* =============================================
   CUSTOM INTERACTIVE CURSOR — Spring Physics
   ============================================= */
(function () {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    // Raw mouse position
    let mouseX = -100, mouseY = -100;
    // Ring spring position (lags behind mouse)
    let ringX = -100, ringY = -100;

    // Spring constants — tune these for feel
    const STIFFNESS = 0.13;   // how aggressively the ring chases the dot

    // Track actual mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    // Hide when pointer leaves the window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });

    // Detect interactive elements for hover state
    const HOVER_SELECTOR = 'a, button, [role="button"], .glass-card, input, textarea, select, label, [tabindex]';

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

    // Press feedback: scale dot down slightly on click
    document.addEventListener('mousedown', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(0.6)';
        ring.style.transform = 'translate(-50%, -50%) scale(0.85)';
    });
    document.addEventListener('mouseup', () => {
        dot.style.transform = '';
        ring.style.transform = '';
    });

    // Animation loop — spring physics for the ring
    function tick() {
        // Dot follows mouse instantly
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';

        // Ring eases toward mouse (Euler integration spring)
        ringX += (mouseX - ringX) * STIFFNESS;
        ringY += (mouseY - ringY) * STIFFNESS;

        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
})();

// End of script
