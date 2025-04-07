import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const packagesDir = path.join(process.cwd(), 'dist', 'packages');
const packageDirs = fs.readdirSync(packagesDir).filter(pkg =>
    fs.statSync(path.join(packagesDir, pkg)).isDirectory()
);

for (const pkgName of packageDirs) {
    const targetDir = path.join(packagesDir, pkgName);
    const branch = `dist-${pkgName}`;

    console.log(`\nDeploying ${pkgName} to branch ${branch}...`);

    execSync(`git config --global user.name "github-actions[bot]"`);
    execSync(`git config --global user.email "github-actions[bot]@users.noreply.github.com"`);

    // Checkout orphan branch
    execSync(`git checkout --orphan ${branch}`);

    // Clear current index
    execSync(`git reset -q HEAD --`);

    // Remove everything and copy only that package
    fs.rmSync('.', { recursive: true, force: true });
    fs.mkdirSync('temp', { recursive: true });
    execSync(`cp -r ${targetDir}/* ./`);

    // Force add and commit
    execSync(`git add -f -A`);
    execSync(`git commit -m "Deploy ${pkgName} to ${branch}"`);
    execSync(`git push origin ${branch} --force`);
}
