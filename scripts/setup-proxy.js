import fs from 'fs';

const target = process.env.API_PROXY_TARGET || process.env.VITE_API_PROXY_TARGET;
if (!target) {
  console.log('No proxy target set');
  process.exit(0);
}

// Clean the target by removing any trailing /api/v1 or /api or /
const cleanTarget = target
  .replace(/\/api\/v1\/?$/, '')
  .replace(/\/api\/?$/, '')
  .replace(/\/$/, '');

console.log(`Setting backend URL placeholder to: ${cleanTarget}`);

const tomlPath = 'netlify.toml';
let toml = fs.readFileSync(tomlPath, 'utf8');
toml = toml.replace(/BACKEND_URL_PLACEHOLDER/g, cleanTarget);
fs.writeFileSync(tomlPath, toml);
