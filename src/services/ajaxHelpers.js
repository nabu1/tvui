import { LITERALS } from './constants'

export default context => {
  let query = ''
  let startHour = null
  const startOfDay = context.getters.getDay || new Date().setUTCHours(0, 0, 0, 0)

  console.clear()

  if (!context.getters.getStartHour && (!context.getters.getDay || new Date(context.getters.getDay).getDate() === new Date().getDate())) {
    startHour = new Date().getHours()
    console.log('%c startHour 1 = '+ startHour, 'color: white')
  }
  else {
    startHour = context.getters.getStartHour || 3
    console.log('%c startHour 2 = '+ startHour, 'color: white')
  }

  //console.log('%c startHour = '+ startHour, 'color: white')

  const endHour = context.getters.getEndHour || 24
  const start = startOfDay + startHour * 60 * 60 * 1000
  const end = startOfDay + endHour * 60 * 60 * 1000

  console.log('%c start = '+ new Date(start), 'color: yellow')
  console.log('%c end = '+ new Date(end), 'color: yellow')


  const categories = context.getters.getCategories && context.getters.getCategories.length ? JSON.stringify(context.getters.getCategories) : null

  let stations = context.getters.getStations
  stations = stations ? encodeURIComponent(JSON.stringify(stations)) : null

  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && stations) {
    query = queryCategoriesStations
  }
  else if (categories) {
    query = queryCategories
  }
  else if (stations && stations.length) {
    query = queryStations
  }
  else {
    query = `${queryHours}]}`
  }

  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX
  console.log('%c urlString = '+ urlString, 'color: lime')

  return urlString
}
