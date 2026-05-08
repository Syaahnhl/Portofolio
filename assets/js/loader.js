// assets/js/loader.js
let loaderInitialized = false;

function initLoader() {
    if (loaderInitialized) return;
    loaderInitialized = true;

    const overlay = document.getElementById('profile-verification-overlay');
    const silhouette = document.getElementById('profile-silhouette');
    const textEl = document.getElementById('profile-v-text');
    const percentEl = document.getElementById('profile-v-percent');
    if (!overlay || !silhouette || !textEl || !percentEl) return;

    function runSequence() {
        silhouette.style.opacity = '0';
        overlay.style.opacity = '1';
        textEl.innerText = window.i18next && window.i18next.isInitialized ? window.i18next.t('hero.loader.auth') : 'AUTHENTICATING...';
        textEl.className = 'text-[10px] font-bold text-sky-500 uppercase tracking-widest mb-1';
        percentEl.className = 'text-3xl font-extrabold text-slate-800 dark:text-white';
        percentEl.innerText = '0%';

        let percent = 0;
        const countInterval = setInterval(() => {
            percent += Math.floor(Math.random() * 15) + 1;
            if (percent >= 92) {
                percent = 92;
                clearInterval(countInterval);

                setTimeout(() => {
                    textEl.className = 'text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1';
                    textEl.innerText = window.i18next && window.i18next.isInitialized ? window.i18next.t('hero.loader.err_title') : 'ERROR: VERIFICATION INTERRUPTED';
                    percentEl.className = 'text-sm font-medium text-red-400 mt-2';
                    percentEl.innerText = window.i18next && window.i18next.isInitialized ? window.i18next.t('hero.loader.err_desc') : 'Re-authenticating...';

                    setTimeout(() => {
                        textEl.className = 'text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1';
                        textEl.innerText = window.i18next && window.i18next.isInitialized ? window.i18next.t('hero.loader.success_title') : 'ACCESS GRANTED';
                        percentEl.className = 'text-sm font-bold text-emerald-400 mt-2';
                        percentEl.innerText = window.i18next && window.i18next.isInitialized ? window.i18next.t('hero.loader.success_desc') : 'Tech Architect Verified';

                        setTimeout(() => {
                            overlay.style.opacity = '0';
                            silhouette.style.opacity = '1';
                            setTimeout(runSequence, 5000);
                        }, 2000);
                    }, 1500);
                }, 800);
            } else {
                percentEl.innerText = percent + '%';
            }
        }, 80);
    }

    setTimeout(runSequence, 1000);
}

document.addEventListener('componentsLoaded', initLoader);
