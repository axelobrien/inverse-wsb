type sides = 'buy' | 'sell'

type orderType = 'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop'

type timeInForce = 'day' | 'gtc' | 'opg' | 'ioc'

interface createOrderParams {
  ticker: string, 
  side?: sides,
  amountShares?: number
}
