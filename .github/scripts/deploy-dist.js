import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const DIST_PACKAGES = path.join(ROOT, "dist", "packages");
const ORIGIN_URL = "https://github.com/wxn0brP/ts-shared.git";

const packages = fs.readdirSync(DIST_PACKAGES).filter(pkg =>
    fs.statSync(path.join(DIST_PACKAGES, pkg)).isDirectory()
);

for (const pkg of packages) {
    const dir = path.join(DIST_PACKAGES, pkg);
    const branch = `dist-${pkg}`;

    console.log(`\n[+] Deploying ${pkg} → ${branch}`);

    // Init new repo inside package dir
    execSync("git init", { cwd: dir });
    execSync('git config user.name "github-actions[bot]"', { cwd: dir });
    execSync('git config user.email "github-actions[bot]@users.noreply.github.com"', { cwd: dir });

    // Stage and commit all
    execSync("git add -A", { cwd: dir });
    execSync(`git commit -m "Deploy ${pkg}"`, { cwd: dir });

    // Add remote and push to proper branch
    execSync(`git remote add origin ${ORIGIN_URL}`, { cwd: dir });
    execSync(`git branch -M ${branch}`, { cwd: dir });
    execSync(`git push origin ${branch} --force`, { cwd: dir });
}
