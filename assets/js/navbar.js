let navbarInitialized = false;
function initNavbar() {
    if (navbarInitialized) return;
    const nav = document.querySelector('.portfolio-nav');
    if (!nav) return;
    navbarInitialized = true;
    const button = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-dropdown');
    const root = document.documentElement;
    root.classList.toggle('dark', localStorage.theme === 'dark' || (!localStorage.theme && matchMedia('(prefers-color-scheme: dark)').matches));
    function setMenu(open, restoreFocus = false) {
        button.setAttribute('aria-expanded', String(open));
        menu.hidden = !open;
        menu.inert = !open;
        if (restoreFocus) button.focus();
    }
    button.addEventListener('click', () => setMenu(menu.hidden));
    document.addEventListener('click', event => {
        if (!event.composedPath().includes(nav) || event.target.closest('a[href^="#"]')) setMenu(false);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !menu.hidden) setMenu(false, true);
    });
    nav.addEventListener('focusout', () => {
        setTimeout(() => { if (!nav.contains(document.activeElement)) setMenu(false); }, 0);
    });
    document.getElementById('theme-toggle').addEventListener('click', () => {
        root.classList.toggle('dark');
        localStorage.theme = root.classList.contains('dark') ? 'dark' : 'light';
    });
}
document.addEventListener('componentsLoaded', initNavbar);
