module.exports = {
  apps : [{
    name: 'gs',
    script: 'api.js',
    watch: true,
    error_file: 'err.log',
    time: true,
    env_development: {
      NODE_ENV: "development",
      "PORT": 2017,
      
    },
    env_production: {
      NODE_ENV: "production",
    }
  },],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
