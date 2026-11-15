// assets/js/i18n.js
let i18nInitialized = false;

function initI18n() {
    if (i18nInitialized) {
        if (window.i18next && i18next.isInitialized) updateContent();
        return;
    }
    i18nInitialized = true;

    const savedLang = localStorage.getItem('i18nextLng') || 'id';

    i18next
        .use(window.i18nextHttpBackend)
        .use(window.i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: 'en',
            lng: savedLang,
            debug: false,
            backend: {
                loadPath: 'assets/locales/{{lng}}.json?v=mobile-hiring-1'
            }
        }, function (err, t) {
            if (err) return console.error('Error loading i18next:', err);

            updateContent();
            setupLanguageSwitcher();

            document.documentElement.classList.add('i18n-ready');
            document.documentElement.lang = i18next.language;
        });

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(function (element) {
            const keys = element.getAttribute('data-i18n').split(';');
            keys.forEach(keyStr => {
                let attr = null;
                let key = keyStr;
                if (keyStr.startsWith('[')) {
                    const match = keyStr.match(/^\[(.*?)\](.*)/);
                    if (match) {
                        attr = match[1];
                        key = match[2];
                    }
                }

                if (attr) {
                    element.setAttribute(attr, i18next.t(key));
                } else {
                    element.innerHTML = i18next.t(key);
                }
            });
        });

        document.title = i18next.t('seo.title', { defaultValue: 'Syahnahl Dilarexa | Tech Architect' });
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", i18next.t('seo.desc', { defaultValue: 'Tech Architect' }));
        }
    }

    function setupLanguageSwitcher() {
        const btns = document.querySelectorAll('.lang-btn');

        btns.forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === i18next.language;
            if (isActive) {
                btn.setAttribute('data-active', 'true');
            } else {
                btn.removeAttribute('data-active');
            }

            const hadFocus = document.activeElement === btn;
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            if (hadFocus) newBtn.focus();

            newBtn.addEventListener('click', (e) => {
                const lang = e.currentTarget.getAttribute('data-lang');
                if (lang === i18next.language) return;

                i18next.changeLanguage(lang, () => {
                    localStorage.setItem('i18nextLng', lang);
                    document.documentElement.lang = lang;
                    updateContent();
                    setupLanguageSwitcher(); 
                });
            });
        });
    }
}

document.addEventListener('componentsLoaded', initI18n);
