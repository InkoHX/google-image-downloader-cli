#!/usr/bin/env node

import program from 'commander'
import gidl from './index'

program
  .version('v2.0.0')
  .arguments('<keyword> [dir]')
  .description('download images.')
  .option('-p --parallel <number>', 'parallel count (1~5)', 5)
  .option('-s --size <large|medium|icon>', 'image size.')
  .option('--safe', 'safeSearch', false)
  .action((keyword: string, dir?: string, options?) => {
    gidl({
      keyword: String(keyword),
      parallel: options.parallel ? parseInt(options.parallel) : 5,
      safeSearch: Boolean(options.safe),
      size: options.size,
      path: dir
    })
  })
  .parse(process.argv)