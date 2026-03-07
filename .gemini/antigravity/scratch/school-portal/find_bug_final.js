const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // We are looking for something like    setMobile(false) 
    // at the root level of the component (not inside useEffect or a callback)
    // A simple heuristic: find lines with setXYZ( that are NOT inside a block
    let inFunction = 0;

    lines.forEach((line, index) => {
        // Simple search for obvious bad patterns
        if (line.match(/^\s*set[A-Z][a-zA-Z0-9]*\(/)) {
            // if it doesn't have an arrow, function keyword, etc.
            if (!line.includes('=>') && !line.includes('function') && !line.includes('onClick')) {
                console.log(`FOUND IN ${filePath}:${index + 1} -> ${line.trim()}`);
            }
        }
    });
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else {
            checkFile(fullPath);
        }
    }
}

console.log('--- SCHOOL PORTAL ---');
walk('c:/Users/crack/.gemini/antigravity/scratch/school-portal/src');
console.log('--- AMRIT TECH ---');
walk('c:/Users/crack/.gemini/antigravity/scratch/amrit-tech-solution/src');
