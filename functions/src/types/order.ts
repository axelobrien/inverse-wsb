export type sides = 'buy' | 'sell'

export type orderType = 'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop'

export type timeInForce = 'day' | 'gtc' | 'opg' | 'ioc'

export interface createOrderParams {
  ticker: string, 
  side?: sides,
  amountShares?: number
  limitPrice?: number
}
