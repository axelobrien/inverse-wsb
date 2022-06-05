import * as functions from "firebase-functions"
import { inverse } from './inverseWSB'
import { fetchAndParseTickers } from './fetchWSB'
import { isMarketDay } from './isMarketDay'

export const inverseWSB = functions.pubsub.schedule('0 1 * * *')
.timeZone('America/New_York')
.onRun(async () => {
  const todayIsMarketDay = await isMarketDay()

  if (!todayIsMarketDay) {
    console.log('Not a market day, skipping')
    return
  }

  const WallStreetBets = await fetchAndParseTickers()
  await inverse(WallStreetBets)
})

// export const inverseWSBOnRequest = functions.https.onRequest(async (req, res) => {
//   const todayIsMarketDay = await isMarketDay()

//   if (!todayIsMarketDay) {
//     console.log('Not a market day, skipping')
//     res.status(200).send('Not a market day, skipping')
//     return
//   }

//   const WallStreetBets = await fetchAndParseTickers()
//   await inverse(WallStreetBets)
//   res.send('Done')
// })