import axios from 'axios'
import url from './ajaxHelpers'
import { LITERALS } from './constants'

export const ajaxGetSelectedPrograms = context => {
  axios
    .get(url(context))
    .then(res => {
      if (res.data.length > 999) alert(LITERALS.EXCESSIVE_DATA_MSG)
      context.commit('GET_DOCUMENTS_COUNT', res.data.length)
      context.commit('START_STATIONS', res.data)
      console.log('%c res.data.length = ' + res.data.length, 'color: violet')
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}

export const ajaxFindText = (context, text) => {
  const query = `s={timestamp:1}&q={"title":{"$regex":".*${text}.*",$options:"i"}}`
  const urlFindText = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  axios
    .get(urlFindText)
    .then(res => {
      context.commit('AJAX_FIND_TEXT', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}
