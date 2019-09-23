import Client from 'cheerio-httpcli'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import path from 'path'

type ImageSize = "large" | "medium" | "icon"

interface DownloadOptions {
  keyword: string
  parallel?: number
  safeSearch?: boolean
  size?: ImageSize
  path?: string
}

Client.set('followMetaRefresh', false)

let dir: string = path.join(process.cwd(), Date.now().toString())
let count: number = 0
let page: number = 1

export default function downloadImages(options: DownloadOptions) {
  Client.download.parallel = options.parallel || 5
  if (options.path) dir = options.path
  if (!existsSync(dir)) mkdirSync(dir)
  const url = `http://www.google.com/search?q=${encodeURIComponent(options.keyword)}&ijn=${encodeURIComponent(page)}&tbm=isch${ParameterBuilder(options) !== null ? `&${ParameterBuilder(options)}` : ''}`
  Client.fetch(url)
    .then((result) => {
      result.$("img[class='rg_ic rg_i']").download()
      page++
      downloadImages(options)
    })
    .catch((error) => {
      if (error.message !== 'no content') console.error(error)
    })
}

function ParameterBuilder(options: DownloadOptions) {
  const array: string[] = []
  if (options.safeSearch) array.push('safe=active')
  if (options.size) {
    if (options.size === 'large') array.push('tbs=isz:l')
    if (options.size === 'medium') array.push('tbs=isz:m')
    if (options.size === 'icon') array.push('tbs=isz:i')
  }

  if (array.length !== 0) return array.join('&')
  else return null
}

Client.download.on('ready', (stream) => {
  if (stream.type !== 'image/jpeg') return
  count++
  const pathname = path.join(dir, count.toString()) + '.png'
  stream.pipe(createWriteStream(pathname))
  console.info(`Saved ${pathname}`)
})

Client.download.on('error', (error) => {
  console.error(error)
})