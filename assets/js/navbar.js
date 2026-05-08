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
    const sections = document.querySelectorAll('section[id]');

    function updateNav() {
        if (!navbarInner) return;

        // 1. Logika Efek Transparan Navbar
        if (window.scrollY > 50) {
            navbarInner.classList.add('backdrop-blur-xl', 'bg-white/95', 'dark:bg-[#0f172a]/95', 'shadow-lg');
            navbarInner.classList.remove('backdrop-blur-md', 'bg-white/80', 'dark:bg-[#0f172a]/70');
        } else {
            navbarInner.classList.add('backdrop-blur-md', 'bg-white/80', 'dark:bg-[#0f172a]/70');
            navbarInner.classList.remove('backdrop-blur-xl', 'bg-white/95', 'dark:bg-[#0f172a]/95', 'shadow-lg');
        }

        // 2. Logika ScrollSpy (Active Menu Background)
        let currentId = 'home'; // Default ke section paling atas
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Offset 150px agar menu menyala tepat sebelum layarnya benar-benar sampai ujung
            if (scrollY >= (sectionTop - 150) && scrollY < (sectionTop + sectionHeight - 150)) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            // Hapus kelas aktif, kembalikan ke kelas pasif (abu-abu)
            link.classList.remove('bg-slate-200', 'dark:bg-white/10', 'text-slate-900', 'dark:text-white');
            link.classList.add('text-slate-600', 'dark:text-gray-300', 'hover:bg-slate-100', 'dark:hover:bg-white/5');

            // Jika link-nya cocok dengan ID section saat ini, berikan sorotan!
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.remove('text-slate-600', 'dark:text-gray-300', 'hover:bg-slate-100', 'dark:hover:bg-white/5');
                link.classList.add('bg-slate-200', 'dark:bg-white/10', 'text-slate-900', 'dark:text-white');
            }
        });
    }

    // Dengarkan event scroll
    window.addEventListener("scroll", updateNav);
    setTimeout(updateNav, 100); // Eksekusi sekali saat halaman dimuat

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