import Alpaca from '@alpacahq/alpaca-trade-api'
import * as secrets from './secrets.js'

const alpaca = new Alpaca({
  keyId: secrets.ALPACA_KEY_ID,
  secretKey: secrets.ALPACA_SECRET_KEY,
  paper: true,
})

export const isMarketDay = async () => {
  const date = new Date()
  const todayString = date.toISOString().split('T')[0]

  const nextMarketDay = await alpaca.getCalendar({start: todayString, end: todayString}) // returns the next market day if you ask for the current day

  if (nextMarketDay !== todayString) {
    console.log(`${nextMarketDay[0].date} does not match today\'s date, ${todayString}`)
  }

  return nextMarketDay[0].date === todayString

}