module.exports = {
  apps: [
    {
      name: 'cv-mark-frontend',
      cwd: '/Users/markgrenville/Projects/markgrenville',
      script: 'pnpm',
      args: 'dev --port 8520',
      watch: false,
      autorestart: true,
      max_restarts: 5,
      env: {
        NODE_ENV: 'development',
        PORT: 8520
      }
    },
    {
      name: 'cv-mark-emulator',
      cwd: '/Users/markgrenville/Projects/markgrenville',
      script: 'firebase',
      args: 'emulators:start --project cv-mark-grenville',
      watch: false,
      autorestart: true,
      max_restarts: 3,
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
};
