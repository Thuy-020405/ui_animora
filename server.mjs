import { spawn } from 'node:child_process';

const child = spawn('npx', ['vite', ...process.argv.slice(2)], {
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
