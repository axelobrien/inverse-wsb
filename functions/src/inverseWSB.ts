import Alpaca from '@alpacahq/alpaca-trade-api'
import * as secrets from './secrets.js'
import { createOrderParams } from './types/order'

const alpaca = new Alpaca({
  keyId: secrets.ALPACA_KEY_ID,
  secretKey: secrets.ALPACA_SECRET_KEY,
  paper: true,
})

async function order({ ticker, side, amountShares, limitPrice }: createOrderParams) {
  try {
    await alpaca.createOrder({
      symbol: ticker, // any valid ticker symbol
      side: side || 'sell',
      qty: amountShares || 10,
      type: limitPrice ? 'limit' : 'market',
      limit_price: limitPrice || undefined,
      time_in_force: 'day',
    })

  } catch (e) {
    const message: string = e.response.data.message

    if (message.match(/asset "(.*?)" cannot be sold short/)) {
      console.log(`${ticker} cannot be sold short, skipping`)
      // return await order({ ticker, side: 'buy', amountShares }) // uncomment to buy instead

    } else if (!message.match(/^could not find asset /)) {
      console.log(e)
    }

  }
}

async function getPrice(ticker: string) {
  let price: number

  try {
    const trade = await alpaca.getLatestTrade(ticker)
    price = trade.Price

  } catch (e) {
    if (!e.toString().startsWith('Error: code: 404, message:')) {
      console.log(e)
    }
    return null
  }
  return price
}

export async function inverse(tickers: string[]) {
  const orders = tickers.map(async (ticker) => {
    const price = await getPrice(ticker)

    const dollarLimit = 1000 // max dollar amount to spend on each order
    const amountShares = Math.floor(dollarLimit / price)

    if (price && amountShares) {
      console.log(`Shorting ${ticker}: ${amountShares} shares, ${price} per share`)
      order({ ticker, amountShares })
    } else if (price > dollarLimit) {
      console.log(`Shorting ${ticker}: 1 share, ${price} per share`)
      order({ticker, amountShares: 1})
    } else {
      console.log(`Skipping ${ticker}: ${price} per share`)
    } 
  })
  await Promise.all(orders)
}
