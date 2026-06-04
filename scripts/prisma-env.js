const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

function loadEnv(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) {
    throw new Error(`Env file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const splitIndex = trimmed.indexOf('=');
    if (splitIndex === -1) continue;
    const key = trimmed.slice(0, splitIndex);
    let value = trimmed.slice(splitIndex + 1);
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const rootEnvPath = path.resolve(__dirname, '..', '.env.local');
const loadedEnv = loadEnv(rootEnvPath);
Object.assign(process.env, loadedEnv);

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(JSON.stringify(loadedEnv, null, 2));
  process.exit(0);
}

const isWindows = process.platform === 'win32';
const prismaBin = path.resolve(__dirname, '..', 'node_modules', '.bin', `prisma${isWindows ? '.cmd' : ''}`);
const program = args[0] === 'prisma' ? prismaBin : args[0];
const programArgs = args[0] === 'prisma' ? args.slice(1) : args.slice(1);

const proc = child_process.spawn(program, programArgs, {
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
});

proc.on('exit', (code) => process.exit(code));
proc.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
