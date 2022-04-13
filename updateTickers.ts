// Run to make an updated file of all us tickers in this directory.

import Alpaca from '@alpacahq/alpaca-trade-api'
import * as secrets from './secrets.js'
import * as fs from 'fs'

const alpaca = new Alpaca({
  keyId: secrets.ALPACA_KEY_ID,
  secretKey: secrets.ALPACA_SECRET_KEY,
  paper: true,
})

const allStocks = await alpaca.getAssets({
  status: 'active',
  asset_class: 'us_equity',
})

const allSymbols = allStocks.map((stock) => `"${stock.symbol}",`)

fs.writeFileSync('../symbols.ts', `// Updated as of ${new Date().toISOString()}
export default [
  ${allSymbols.join('\n\t')}
]`)
