// assets/js/component-loader.js
async function loadComponents() {
    const components = [
        { id: 'navbar-component', file: 'components/navbar.html', priority: 'critical' },
        { id: 'hero-component', file: 'components/hero.html', priority: 'critical' },
        { id: 'about-component', file: 'components/about.html', priority: 'lazy' },
        { id: 'tech-stack-component', file: 'components/tech-stack.html', priority: 'lazy' },
        { id: 'how-i-build-component', file: 'components/how-i-build.html', priority: 'lazy' },
        { id: 'process-component', file: 'components/process.html', priority: 'lazy' },
        { id: 'projects-component', file: 'components/projects.html', priority: 'lazy' },
        { id: 'why-me-component', file: 'components/why-me.html', priority: 'lazy' },
        { id: 'contact-component', file: 'components/contact.html', priority: 'lazy' },
        { id: 'footer-component', file: 'components/footer.html', priority: 'lazy' }
    ];

    function fetchComponent(comp) {


        return fetch(comp.file + '?v=' + new Date().getTime())
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load ${comp.file}`);
                return res.text();
            })
            .then(html => {
                return { id: comp.id, html };
            })
            .catch(err => {
                console.error(`[Component Loader] Error loading ${comp.file}:`, err);

                // Graceful fallback snippet
                const fallbackHtml = `
                    <div class="p-8 my-8 text-center border border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 flex flex-col items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-slate-400 dark:text-slate-500 text-2xl mb-3"></i>
                        <h4 class="text-slate-600 dark:text-slate-400 font-medium text-sm" data-i18n="fallback.title">Section Temporarily Unavailable</h4>
                        <p class="text-slate-400 dark:text-slate-500 text-xs mt-1" data-i18n="fallback.desc">Please refresh the page or check your connection.</p>
                    </div>
                `;

                return { id: comp.id, html: fallbackHtml };
            });
    }

    function injectComponents(results) {
        results.forEach(({ id, html }) => {
            if (html) {
                const el = document.getElementById(id);
                if (el) {
                    el.innerHTML = html;

                    // Trigger i18n update specifically for this component if i18next is ready
                    if (window.i18next && window.i18next.isInitialized && typeof updateContent === 'function') {
                        updateContent(el);
                    }
                }
            }
        });
    }

    try {
        const criticalComponents = components.filter(c => c.priority === 'critical');
        const lazyComponents = components.filter(c => c.priority === 'lazy');

        // 1. Load critical components first (Navbar + Hero)
        const criticalResults = await Promise.all(criticalComponents.map(fetchComponent));
        injectComponents(criticalResults);

        // Dispatch event for critical components so initial scripts (like navbar, loader) can run
        document.dispatchEvent(new CustomEvent('componentsLoaded', { detail: { type: 'critical' } }));

        // 2. Load lazy components without blocking the main thread painting
        setTimeout(async () => {
            const lazyResults = await Promise.all(lazyComponents.map(fetchComponent));
            injectComponents(lazyResults);

            // Dispatch event for remaining components so animations, scroll reveals can attach
            document.dispatchEvent(new CustomEvent('componentsLoaded', { detail: { type: 'lazy' } }));
        }, 50);

    } catch (error) {
        console.error('[Component Loader] Critical error during component loading:', error);
    }
}

// Guarantee all other scripts have been parsed and have attached their 
// 'componentsLoaded' event listeners before we start fetching and firing events.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
