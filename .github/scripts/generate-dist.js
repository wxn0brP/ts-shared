import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const PKG_DIR = path.join(ROOT, 'packages');

const allExports = {};
const rootDeps = {};

function readJSON(p) {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function writeJSON(p, obj) {
    fs.writeFileSync(p, JSON.stringify(obj, null, 2));
}

// 1. Create fresh dist folder
fs.rmSync(DIST_DIR, { recursive: true, force: true });
fs.mkdirSync(DIST_DIR, { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'packages'), { recursive: true });

// 2. For each package:
for (const name of fs.readdirSync(PKG_DIR)) {
    const src = path.join(PKG_DIR, name);
    const out = path.join(DIST_DIR, 'packages', name);

    // Copy index.js and d.ts (assuming output is already in dist/)
    fs.mkdirSync(out, { recursive: true });
    fs.copyFileSync(path.join('dist', 'packages', name, 'index.js'), path.join(out, 'index.js'));
    fs.copyFileSync(path.join('dist', 'packages', name, 'index.d.ts'), path.join(out, 'index.d.ts'));

    // Copy and merge package.json
    const pkgJson = readJSON(path.join(src, 'package.json'));
    writeJSON(path.join(out, 'package.json'), pkgJson);

    // Collect exports and dependencies
    allExports[`./${name}`] = `./packages/${name}/index.js`;
    if (pkgJson.dependencies) {
        for (const [dep, version] of Object.entries(pkgJson.dependencies)) {
            if (!rootDeps[dep] || rootDeps[dep] < version) {
                rootDeps[dep] = version;
            }
        }
    }
}

// 3. Root exports
allExports['.'] = './index.js';

let indexTs = `// Auto-generated exports\n`;
for (const name of fs.readdirSync(PKG_DIR)) {
    indexTs += `export * as ${name} from './packages/${name}/index.js';\n`;
}
fs.writeFileSync(path.join(DIST_DIR, 'index.ts'), indexTs);

// 5. Copy compiled index.js/d.ts
fs.copyFileSync(path.join('dist', 'index.js'), path.join(DIST_DIR, 'index.js'));
fs.copyFileSync(path.join('dist', 'index.d.ts'), path.join(DIST_DIR, 'index.d.ts'));

// 6. Create main package.json
const basePkg = {
    name: "@master/ts-utils",
    version: "0.1.0",
    main: "index.js",
    type: "module",
    exports: allExports,
    dependencies: rootDeps
};
writeJSON(path.join(DIST_DIR, 'package.json'), basePkg);

console.log('✅ dist ready');

