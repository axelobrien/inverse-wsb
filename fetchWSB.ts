import fetch from 'node-fetch'
import nonTickers  from './nonTickers.js'

async function fetchTitles() {
  // funky looking await syntax because only the text is needed
  const reddit = await (await fetch("https://old.reddit.com/r/wallstreetbets/top/", {
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-GPC": "1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    },
    "method": "GET",
  })).text()

  //get elements with titles
  const titleElements = reddit.match(/<a class="title(.*?)" data-event-action="title" href="(.*?)"(.*?)>(.*?)<\/a>/g)

  //get titles from elements
  const titles = titleElements.map(title => {
      let cleanTitle = title.replace(
      /<a class="title(.*?)" data-event-action="title" href="(.*?)"(.*?)>/g, '') // remove <a> tags
      cleanTitle = cleanTitle.substring(0, cleanTitle.length - 4) // remove </a>
      return cleanTitle
  })

  return titles
}

async function findTickers(titles: string[]) {
  // Words that could be in the title that should not be considered a ticker
  const tickers: string[] = []

  titles.forEach(title => {
    // accounts for dollar signs
    const ticker = title.match(/ [A-Z]{1,5} /g) || title.match(/^\$[A-Z]{1,5}/g)

    if (ticker && ticker.toLocaleString().length <= 5) {
      const cleanedTicker = ticker.join('').replace(/( )|(\$)/g, '')

      if (!nonTickers.includes(cleanedTicker)) {

        tickers.push(cleanedTicker)
      }
    }
  })

  return tickers
}

async function fetchAndParseTickers() {
  const titles = await fetchTitles()
  const tickers = await findTickers(titles)
  console.log(`Inversing these stonks: ${tickers}`)
  return tickers
}

export { fetchTitles, findTickers, fetchAndParseTickers }
