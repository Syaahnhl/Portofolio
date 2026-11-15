document.addEventListener('componentsLoaded', event => {
    if (event.detail?.type !== 'lazy') return;
    document.querySelectorAll('#projects [onclick^="openImageModal"]').forEach(control => {
        control.setAttribute('role', 'button');
        control.tabIndex = 0;
        control.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                control.click();
            }
        });
    });
    document.querySelectorAll('#projects a[target]').forEach(link => {
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', link.parentElement.querySelector('h4').textContent.trim());
    });
    document.querySelectorAll('#contact a').forEach(link => {
        if (!link.textContent.trim()) link.setAttribute('aria-label', link.href.includes('github') ? 'GitHub' : 'LinkedIn');
    });
    for (const type of ['Arch', 'Image']) {
        const modal = document.getElementById(type === 'Arch' ? 'arch-modal' : 'image-modal');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', type === 'Arch' ? 'Kaching architecture' : 'Project screenshot');
        modal.tabIndex = -1;
        const originalOpen = window['open' + type + 'Modal'];
        const originalClose = window['close' + type + 'Modal'];
        let opener;
        window['open' + type + 'Modal'] = (...args) => {
            opener = document.activeElement;
            originalOpen(...args);
            modal.focus();
        };
        window['close' + type + 'Modal'] = () => {
            originalClose();
            opener?.focus();
        };
        modal.addEventListener('keydown', event => {
            if (event.key === 'Escape') window['close' + type + 'Modal']();
            if (event.key === 'Tab') {
                const controls = [...modal.querySelectorAll('button, a[href]')];
                const first = controls[0], last = controls[controls.length - 1];
                if (!first || (event.shiftKey && (document.activeElement === first || document.activeElement === modal)) || (!event.shiftKey && document.activeElement === last)) {
                    event.preventDefault();
                    (event.shiftKey ? last : first)?.focus();
                }
            }
        });
    }
});
