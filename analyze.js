const fs = require('fs');
const path = require('path');

const ignoredDirectories = [
    'node_modules', '.git', '__pycache__', 'venv', 'build', 'dist',
    '.idea', '.vscode', 'coverage', 'target', 'out', '.env', '.gitignore'
];

const popularExtensions = [
    '.js', '.ts', '.py', '.cpp', '.java', '.c', '.go', '.rb', '.php'
];

const commentSymbols = {
    '.js': '//', '.ts': '//', '.py': '#', '.cpp': '//', '.java': '//',
    '.c': '//', '.go': '//', '.rb': '#', '.php': '//'
};

function extractFileDetails(content, extension) {
    const commentSymbol = commentSymbols[extension] || '//';
    const comments = [...content.matchAll(new RegExp(`^\\s*${commentSymbol}.*`, 'gm'))].map(m => m[0].trim());
    const functions = [...content.matchAll(/(function|def|const|async|public|private|static|void|func|class).*?\(/g)].map(m => m[0].trim());
    const routes = [...content.matchAll(/(app|router|expressRouter|flask|FastAPI|Django).(get|post|put|delete|patch)\([^)]*\)/g)].map(m => m[0].trim());
    const apiCalls = [...content.matchAll(/(fetch|axios.(get|post|put|delete)|requests.(get|post|put|delete)|http.(get|post|put|delete))\([^)]*\)/g)].map(m => m[0].trim());

    return { comments, functions, routes, apiCalls };
}

function extractDependencies() {
    try {
        if (fs.existsSync('package.json')) {
            const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
            return { dependencies: packageJson.dependencies, devDependencies: packageJson.devDependencies };
        } else if (fs.existsSync('requirements.txt')) {
            const requirements = fs.readFileSync('requirements.txt', 'utf-8').split('\n').filter(Boolean);
            return { dependencies: requirements };
        } else if (fs.existsSync('pom.xml')) {
            return { dependencies: 'Detected Maven project (Check pom.xml)' };
        } else if (fs.existsSync('composer.json')) {
            const composerJson = JSON.parse(fs.readFileSync('composer.json', 'utf-8'));
            return { dependencies: composerJson.require };
        } else if (fs.existsSync('go.mod')) {
            return { dependencies: 'Detected Go modules (Check go.mod)' };
        }
    } catch (error) {
        console.error('Failed to read dependencies:', error.message);
    }
    return {};
}

function extractEntryPoints() {
    const mainFiles = [
        'index.js', 'main.js', 'app.js', 'server.js',
        'index.ts', 'main.ts', 'app.ts', 'server.ts',
        'main.py', 'app.py',
        'index.php', 'server.php',
        'main.rb', 'app.rb',
        'main.java', 'App.java',
        'main.c', 'main.cpp',
        'main.go', 'server.go'
    ];

    return mainFiles.filter(file => fs.existsSync(file));
}

function extractLicense() {
    const licenseFile = ['LICENSE', 'LICENSE.txt'].find(file => fs.existsSync(file));
    if (licenseFile) {
        return fs.readFileSync(licenseFile, 'utf-8').split('\n')[0];
    }
    return 'No license found';
}

function analyzeFolder(folderPath) {
    const projectInfo = {
        dependencies: extractDependencies(),
        entryPoints: extractEntryPoints(),
        license: extractLicense(),
        files: {}
    };

    function readDirectory(dir) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory() && !ignoredDirectories.includes(entry.name)) {
                readDirectory(fullPath);
            } else if (entry.isFile() && popularExtensions.includes(path.extname(entry.name))) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    projectInfo.files[fullPath] = extractFileDetails(content, path.extname(entry.name));
                } catch (error) {
                    console.error(`Failed to read file ${fullPath}:`, error.message);
                }
            }
        }
    }

    readDirectory(folderPath);
    return projectInfo;
}


module.exports = { analyzeFolder }