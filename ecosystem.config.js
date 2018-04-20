module.exports = {
  apps: [{
    name: 'Haircut',
    script: './express.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-236-166-106.us-west-2.compute.amazonaws.com',
      key: '~/.ssh/MyKeyPair.pem',
      ref: 'origin/master',
      repo: 'git@github.com:Yaniv-Y/Haircut.git',
      path: '/home/ubuntu/Haircut',
      'post-deploy': 'pm2 startOrRestart ~/Haircut/source/express.js'
    }
  }
}