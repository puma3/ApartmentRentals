require('dotenv').config()

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const schemaPath = path.resolve(__dirname, '../src/apollo/schema.json')
const schemaExists = fs.existsSync(schemaPath)

const fetchSchema = require('fetch-graphql-schema')

fetchSchema(process.env.REACT_APP_API_URI, { readable: false })
  .then(result => {
    fs.writeFile(schemaPath, JSON.stringify(JSON.parse(result).data), err => {
      if (err) console.error('Error writing `schema.json` file', err)
      console.log('Schema successfully extracted!')
    })
  })
  .catch(err => {
    if (err.code === 'ECONNREFUSED') {
      if (schemaExists) {
        console.warn(
          chalk.red(
            'Error connecting to server. Falling back to existing `schema.json` file.',
          ),
        )
      } else {
        console.error(
          chalk.red(
            'Error connecting to server. Cannot extract Schema. No existing `schema.json` file to fallback on.',
          ),
        )
        process.exit(1)
      }
    } else {
      console.error(err)
      process.exit(1)
    }
  })
