import Alpaca from '@alpacahq/alpaca-trade-api'
import { fetchAndParseTickers } from './fetchWSB.js'
import * as secrets from './secrets.js'

const alpaca = new Alpaca({
  keyId: secrets.ALPACA_KEY_ID,
  secretKey: secrets.ALPACA_SECRET_KEY,
  paper: true,
})


const order = async ({ ticker, side, amountShares }: createOrderParams) => await alpaca.createOrder({
  symbol: ticker, // any valid ticker symbol
  side: side || 'sell',
  qty: amountShares || 10,
  type: 'market',
  time_in_force: 'day',
}).catch(async (e) => {
    const message: string = e.response.data.message

    if (message.match(/asset "(.*?)" cannot be sold short/)) {
      console.log(`${ticker} cannot be sold short`)
      return await order({ ticker, side: 'buy', amountShares })

    } else if (!message.match(/^could not find asset /)) {
      console.log(e)
    }
})

const Wallstreetbets = await fetchAndParseTickers()

async function inverse(tickers: string[]) {
  
  // fill array with orders and promise.all to wait for all to finish
  tickers.forEach(ticker => order({ ticker }).catch(e => console.log(e)))

}

inverse(Wallstreetbets)

//keeping this code for reference, specifically for the timestamp format

// const orders = await alpaca.getOrders({
//   status: 'all',
//   after: '2022-03-10T00:00:00Z',
//   until: '2022-05-10T23:59:59Z',
//   limit: 1,
//   direction: 'asc',
// })
