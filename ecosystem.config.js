module.exports = {
  apps: [{
    name: process.env.LANG === 'en' ? "docuo-docs-en" : "docuo-docs-zh",
    cwd: process.env.LANG === 'en' ? "/data/webroot/docuo-docs-en" : "/data/webroot/docuo-docs-zh",
    script: "server.js",
    interpreter: "/root/.nvm/versions/node/v20.12.1/bin/node",
    exec_mode: "cluster",
    instances: 2,
    watch: false,
    max_memory_restart: "1500M",
    env: {
      NODE_ENV: "production",
      PORT: 3000,
    },
  }],
};