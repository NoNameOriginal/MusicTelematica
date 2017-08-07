var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'proyectotelematica'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root@localhost/musica'
  },
};

module.exports = config[env];
