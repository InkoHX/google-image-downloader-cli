const commander = require('commander')
const client = require('cheerio-httpcli')
const fs = require('fs')

let keyword = null
let url = null
let count = 0
let failed = 0
let page = 0

commander
  .version('1.0.0')
  .option('-q, --query <keyword>', 'download image')

commander.parse(process.argv)

if (commander.query) {
  keyword = commander.query
  if (!fs.existsSync('./downloads')) fs.mkdirSync('./downloads')
  client.set('followMetaRefresh', false)
  client.download.parallel = 5

  fetch()
}

function getQuery() {
  url = `http://www.google.co.jp/search?q=${encodeURIComponent(keyword)}&tbm=isch&ijn=${encodeURIComponent(page)}&tbs=ift:png`
  page++

  return url
}

function SaveImg(buffer) {
  fs.writeFile(`./downloads/${count}.png`, buffer, 'binary', (err => {
    if (err) {
      console.log(err.message)
    }
  }))
  count++
  console.log(`Saved ${count}.png`)
}

function fetch() {
  client.fetch(getQuery(), (error, $, response, body) => {
    if (typeof $ === 'undefined') {
      console.log([
        '',
        '=== Downloaded ===',
        `Success: ${count} images.`,
        `Failed ${failed} images.`
      ].join('\n'))
      process.exit(1)
    }
    $("img[class='rg_ic rg_i']").download()
  })
}

client.download
  .on('ready', (stream => {
    stream.toBuffer((err, buffer) => {
      if (err) console.log(err.message)
      if (stream.type === 'image/jpeg') SaveImg(buffer)
    })
  }))

  .on('error', (error) => {
    failed++
    console.log(`Could not download the image. URL: ${error.url}`)
  })

  .on('end', () => {
    fetch()
  })

