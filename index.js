#!/usr/bin/env node

const argv = require('yargs')
  .usage('$0 [options]', 'Generate HTTP Basic Auth headers')
  .example('$0 -u user -p pass', 'Basic dXNlcjp1bmRlZmluZWQ=')
  .option('u', {
    alias: 'user',
    type: 'string',
    demand: 'Please specify a username',
    nargs: 1,
    describe: 'Username'
  })
  .option('p', {
    alias: 'pass',
    type: 'string',
    demand: 'Please specify a password',
    nargs: 1,
    describe: 'Password'
  })
  .option('charset', {
    type: 'string',
    default: 'UTF-8',
    nargs: 1,
    describe: 'Character set to use'
  })
  .help()
  .argv

const { user, pass, charset } = argv

if (user.match(/[:]/)) {
  process.stdout.write(`Username cannot contain a colon (':').`)
  process.exit(1)
}

let auth
if (charset === 'UTF-8') {
  auth = new Buffer(`${user}:${pass}`).toString('base64')
} else {
  process.stdout.write(`Unsupported character set '${charset}'`)
  process.exit(1)
}

process.stdout.write(`Basic ${auth}\n`)
