import Alpaca from '@alpacahq/alpaca-trade-api'
import * as secrets from './secrets.js'

const alpaca = new Alpaca({
  keyId: secrets.ALPACA_KEY_ID,
  secretKey: secrets.ALPACA_SECRET_KEY,
  paper: true,
})

const getPercentReturnsOfOpenPositions = async (rounded? : boolean) => {

  const positions: any[] = await alpaca.getPositions()

  const totalOpenOrderReturns = positions.reduce((acc, val) => {
    return { 
      totalMarketValue: acc.totalMarketValue + parseFloat(val.market_value),
      totalCostBasis: acc.totalCostBasis + parseFloat(val.cost_basis)
    }

  }, {
    totalCostBasis: 0,
    totalMarketValue: 0,
  })

  const totalDollarReturn = Math.abs(totalOpenOrderReturns.totalCostBasis - totalOpenOrderReturns.totalMarketValue)
  const totalPercentReturn = Math.abs(totalDollarReturn / totalOpenOrderReturns.totalCostBasis) * 100
  const totalPercentReturnRounded = Math.round((totalPercentReturn + Number.EPSILON) * 100) / 100

  return rounded ? totalPercentReturnRounded : totalPercentReturn
}

getPercentReturnsOfOpenPositions(true).then(console.log)
