const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function extractTag(htmlStr, startRegex, tagName) {
    const match = startRegex.exec(htmlStr);
    if (!match) return null;
    
    let startIndex = match.index;
    let index = startIndex;
    let depth = 0;
    const openTagRegex = new RegExp('<' + tagName + '\\b', 'g');
    const closeTagRegex = new RegExp('</' + tagName + '>', 'g');
    openTagRegex.lastIndex = startIndex;
    closeTagRegex.lastIndex = startIndex;
    
    let nextOpen = openTagRegex.exec(htmlStr);
    let nextClose = closeTagRegex.exec(htmlStr);
    
    if (!nextOpen) return null;
    depth++;
    index = nextOpen.index + nextOpen[0].length;
    
    while (depth > 0 && nextClose) {
        openTagRegex.lastIndex = index;
        let nextOpenIter = openTagRegex.exec(htmlStr);
        if (nextOpenIter && nextOpenIter.index < nextClose.index) {
            depth++;
            index = nextOpenIter.index + nextOpenIter[0].length;
            nextClose.lastIndex = index;
        } else {
            depth--;
            index = nextClose.index + nextClose[0].length;
            if (depth > 0) {
                nextClose = closeTagRegex.exec(htmlStr);
            }
        }
    }
    
    if (depth === 0) {
        return { content: htmlStr.substring(startIndex, index), start: startIndex, end: index };
    }
    return null;
}

// User specified list:
// navbar.html
// hero.html
// tech-stack.html
// process.html
// projects.html
// why-me.html
// contact.html
// footer.html

const comps = [
    { file: 'navbar.html', regex: /<nav\b[^>]*>/, tag: 'nav', id: 'navbar-component' },
    { file: 'hero.html', regex: /<section\s+id="home"[^>]*>/, tag: 'section', id: 'hero-component' },
    { file: 'about.html', regex: /<section\s+id="about"[^>]*>/, tag: 'section', id: 'about-component' },
    { file: 'tech-stack.html', regex: /<section\s+id="skills"[^>]*>/, tag: 'section', id: 'tech-stack-component' },
    { file: 'how-i-build.html', regex: /<section\s+id="how-i-build"[^>]*>/, tag: 'section', id: 'how-i-build-component' },
    { file: 'process.html', regex: /<section\s+id="activity"[^>]*>/, tag: 'section', id: 'process-component' },
    { file: 'projects.html', regex: /<section\s+id="projects"[^>]*>/, tag: 'section', id: 'projects-component' },
    { file: 'why-me.html', regex: /<section\s+id="why-work-with-me"[^>]*>/, tag: 'section', id: 'why-me-component' },
    { file: 'contact.html', regex: /<section\s+id="contact"[^>]*>/, tag: 'section', id: 'contact-component' },
    { file: 'footer.html', regex: /<footer\b[^>]*>/, tag: 'footer', id: 'footer-component' }
];

let remainingHtml = html;

// We replace from bottom to top to preserve indices
for (let i = comps.length - 1; i >= 0; i--) {
    let comp = comps[i];
    let extracted = extractTag(remainingHtml, comp.regex, comp.tag);
    if (extracted) {
        fs.writeFileSync('components/' + comp.file, extracted.content);
        remainingHtml = remainingHtml.substring(0, extracted.start) + '<div id="' + comp.id + '"></div>' + remainingHtml.substring(extracted.end);
        console.log('Extracted ' + comp.file);
    } else {
        console.log('Failed ' + comp.file);
    }
}

fs.writeFileSync('index.html', remainingHtml);
console.log('index.html updated successfully.');
