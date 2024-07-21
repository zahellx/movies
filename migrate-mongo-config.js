const configuration = require('config');

const config = {
  mongodb: {
    url: configuration.get('database').url,
    databaseName: configuration.get('database').databaseName,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
