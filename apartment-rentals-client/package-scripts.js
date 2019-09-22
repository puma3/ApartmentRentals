const { concurrent, series, crossEnv, open } = require('nps-utils')

module.exports = {
  scripts: {
    default: 'nps dev',
    dev: {
      default: series('nps introspection', 'react-scripts start'),
    },
    introspection: 'node scripts/introspectionQuery.js',
  },
}
