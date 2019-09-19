module.exports = {
  apps : [{
    name: 'gotc-app',
    script: 'app.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
