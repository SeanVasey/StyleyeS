const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const readFile = (filePath) => fs.readFileSync(path.join(rootDir, filePath), 'utf8');

const errors = [];

const requiredFiles = [
  'LICENSE',
  'README.md',
  'CHANGELOG.md',
  'SECURITY.md',
  'index.html',
  'js/config.js',
  'css/responsive.css'
];

requiredFiles.forEach((filePath) => {
  if (!fs.existsSync(path.join(rootDir, filePath))) {
    errors.push(`Missing required file: ${filePath}`);
  }
});

let packageVersion = '';
try {
  const pkg = JSON.parse(readFile('package.json'));
  packageVersion = pkg.version;
} catch (error) {
  errors.push(`Failed to read package.json: ${error.message}`);
}

const extractVersion = (pattern, source, label) => {
  const match = source.match(pattern);
  if (!match) {
    errors.push(`Unable to find version in ${label}.`);
    return '';
  }
  return match[1];
};

if (packageVersion) {
  const configSource = readFile('js/config.js');
  const indexSource = readFile('index.html');
  const readmeSource = readFile('README.md');

  const configVersion = extractVersion(/VERSION:\s*'([^']+)'/, configSource, 'js/config.js');
  const VERSION_REGEX = /StyleyeS v([\d.]+)/;
  const indexVersion = extractVersion(VERSION_REGEX, indexSource, 'index.html');
  const readmeVersion = extractVersion(VERSION_REGEX, readmeSource, 'README.md');

  if (configVersion && configVersion !== packageVersion) {
    errors.push(`Config version (${configVersion}) does not match package.json (${packageVersion}).`);
  }

  if (indexVersion && indexVersion !== packageVersion) {
    errors.push(`index.html version (${indexVersion}) does not match package.json (${packageVersion}).`);
  }

  if (readmeVersion && readmeVersion !== packageVersion) {
    errors.push(`README.md version (${readmeVersion}) does not match package.json (${packageVersion}).`);
  }
}

const indexSource = readFile('index.html');
if (!indexSource.includes('css/responsive.css')) {
  errors.push('index.html is missing the responsive.css stylesheet link.');
}

if (errors.length) {
  console.error('Validation failed:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Validation passed.');
