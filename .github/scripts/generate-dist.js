// @ts-check
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PKG_DIR = path.join(ROOT, 'packages');
fs.mkdirSync("dist");

const allExports = {};
const rootDeps = {};
const rootPeerDeps = {};

let majorVersion = 0;
let minorVersion = 0;
let patchVersion = 0;

function readJSON(p) {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function writeJSON(p, obj) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify(obj, null, 2));
}

const packageNames = fs.readdirSync(PKG_DIR).filter((name) => {
    return fs.existsSync(path.join(PKG_DIR, name, 'package.json'));
});

let indexTs = `// Auto-generated entrypoint\n`;
for (const name of packageNames) {
    const pkgJson = readJSON(path.join(PKG_DIR, name, 'package.json'));
    const [major, minor, patch] = pkgJson.version.split('.');
    majorVersion += parseInt(major);
    minorVersion += parseInt(minor);
    patchVersion += parseInt(patch);

    // Re-export
    indexTs += `export * as ${name.replaceAll('-', '_')} from './packages/${name}/index.js';\n`;

    // Exports
    allExports[`./${name}`] = `./packages/${name}/index.js`;

    // Dependencies
    if (pkgJson.dependencies) {
        for (const [dep, ver] of Object.entries(pkgJson.dependencies)) {
            if (!rootDeps[dep] || rootDeps[dep] < ver) {
                rootDeps[dep] = ver;
            }
        }
    }

    if (pkgJson.peerDependencies) {
        for (const [dep, ver] of Object.entries(pkgJson.peerDependencies)) {
            if (!rootPeerDeps[dep] || rootPeerDeps[dep] < ver) {
                rootPeerDeps[dep] = ver;
            }
        }
    }
}

// Exports root
allExports['.'] = './index.js';

fs.writeFileSync('index.ts', indexTs);

const combinedPkg = {
    name: "@wxn0brp/wts",
    version: `${majorVersion}.${minorVersion}.${patchVersion}`,
    description: "wxn0brP TS shared/utils library",
    license: "MIT",
    type: "module",
    main: "index.js",
    exports: allExports,
    dependencies: rootDeps,
    peerDependencies: rootPeerDeps
};

writeJSON('dist/package.json', combinedPkg);

// copy all packages.json to dist
for (const name of packageNames) {
    fs.mkdirSync(path.join('dist', 'packages', name), { recursive: true });
    fs.copyFileSync(
        path.join(PKG_DIR, name, 'package.json'),
        path.join('dist', 'packages', name, 'package.json')
    );
}

console.log('✅ Generated dist/index.ts and dist/package.json');
