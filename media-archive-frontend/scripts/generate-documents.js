const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'personal');
const outputFile = path.join(baseDir, 'personal.json');

function scanDirectory(dir) {
    const result = {};

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {

        if (entry.name.startsWith('.'))
            continue;

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            result[entry.name] = scanDirectory(fullPath);
        } else {
            if (!result.files)
                result.files = [];

            result.files.push(entry.name);
        }
    }

    return result;
}

const tree = scanDirectory(baseDir);

fs.writeFileSync(outputFile, JSON.stringify(tree, null, 2));

console.log("personal.json generated");