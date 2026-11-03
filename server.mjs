import { spawn } from 'node:child_process';

// Strip out --host or invalid Next.js flags passed by environment supervisor
const rawArgs = process.argv.slice(2);
const filteredArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--host') {
    // Skip --host and its value if provided next
    if (i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith('-')) {
      i++;
    }
    continue;
  }
  if (arg.startsWith('--host=')) {
    continue;
  }
  filteredArgs.push(arg);
}

const child = spawn('npx', ['next', 'dev', '-H', '0.0.0.0', '-p', '3000', ...filteredArgs], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PORT: '3000',
  },
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
