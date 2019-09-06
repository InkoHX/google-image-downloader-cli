#!/usr/bin/env node

'use strict'

const program = require('commander')
const gidl = require('../dist/index').default

program
  .version('v2.0.0')
  .arguments('<keyword>')
  .description('download images.')
  .option('-p --parallel <number>', 'parallel count (1~5)', 5)
  .option('--safe', 'safeSearch', false)
  .option('-s --size <large|medium|icon>', 'image size.')
  .action((keyword, options) => {
    gidl({
      keyword: keyword,
      parallel: options.parallel ? parseInt(options.parallel) : 5,
      safeSearch: Boolean(options.safe),
      size: options.size
    })
  })
  .parse(process.argv)