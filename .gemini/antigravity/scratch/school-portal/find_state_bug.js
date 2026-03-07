const fs = require('fs');
const path = require('path');

function searchDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            searchDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            // Very naive regex: looking for setSomething(...) at the start of a line or after spaces, not inside a block or arrow function easily
            // A better way is to just grep for set[A-Z] and look for lines that don't have => or function or use[A-Z]
            const lines = content.split('\n');
            lines.forEach((line, index) => {
                if (line.match(/\bset[A-Z][a-zA-Z0-9]*\(/)) {
                    // if line has onClick, onChange, useEffect, =>, function etc, it's probably safe
                    if (!line.match(/onClick|onChange|onSubmit|useEffect|=>|function|use[A-Z]|\.then|setTimeout|setInterval/)) {
                        console.log(`${fullPath}:${index + 1}: ${line.trim()}`);
                    }
                }
            });
        }
    }
}

searchDir('./src/app');
searchDir('./src/components');
