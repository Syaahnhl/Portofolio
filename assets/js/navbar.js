// assets/js/navbar.js
let navbarInitialized = false;

function initNavbar() {
    if (navbarInitialized) return;
    navbarInitialized = true;

    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const htmlElement = document.documentElement;

    function applyTheme() {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }
    applyTheme();

    function toggleTheme() {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

    const navbarInner = document.querySelector('nav > div');

    // --- 🎯 ELEMEN UNTUK SCROLLSPY (ACTIVE MENU) ---
    const navLinks = document.querySelectorAll('.nav-link');

    // Fungsi untuk memperbarui efek blur/warna navbar (tanpa scrollspy manual)
    function updateNavStyle() {
        if (!navbarInner) return;
        if (window.scrollY > 50) {
            navbarInner.classList.add('backdrop-blur-xl', 'bg-white/95', 'dark:bg-[#0f172a]/95', 'shadow-lg');
            navbarInner.classList.remove('backdrop-blur-md', 'bg-white/80', 'dark:bg-[#0f172a]/70');
        } else {
            navbarInner.classList.add('backdrop-blur-md', 'bg-white/80', 'dark:bg-[#0f172a]/70');
            navbarInner.classList.remove('backdrop-blur-xl', 'bg-white/95', 'dark:bg-[#0f172a]/95', 'shadow-lg');
        }
    }

    window.addEventListener("scroll", updateNavStyle);
    setTimeout(updateNavStyle, 100);

    // --- 🚀 INTERSECTION OBSERVER (Bulletproof ScrollSpy) ---
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Aktif saat elemen masuk 20% dari atas
        threshold: 0 // Tidak perlu menunggu full elemen
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    // Reset kelas semua link
                    link.classList.remove('bg-slate-200', 'dark:bg-white/10', 'text-slate-900', 'dark:text-white');
                    link.classList.add('text-slate-600', 'dark:text-gray-300', 'hover:bg-slate-100', 'dark:hover:bg-white/5');

                    // Set aktif link yang sesuai
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.remove('text-slate-600', 'dark:text-gray-300', 'hover:bg-slate-100', 'dark:hover:bg-white/5');
                        link.classList.add('bg-slate-200', 'dark:bg-white/10', 'text-slate-900', 'dark:text-white');
                    }
                });
            }
        });
    }, observerOptions);

    // Observasi elemen-elemen setelah di-inject
    setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }, 500); // Tunggu 500ms untuk memastikan semua komponen sudah dirender DOM


    // --- Logika Deteksi Tinggi Navbar ---
    const updateNavHeight = () => {
        const nav = document.querySelector('nav') || document.getElementById('navbar-component');
        if (nav) {
            const height = nav.offsetHeight;
            document.documentElement.style.setProperty('--nav-height', `${height}px`);
        }
    };
    window.addEventListener('resize', updateNavHeight);
    updateNavHeight();
}

document.addEventListener('componentsLoaded', initNavbar);