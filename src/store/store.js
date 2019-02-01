import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { ajaxGetSelectedPrograms, ajaxFindText } from '../services/ajax'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    todaysPrograms: [],
    selectedPrograms: null,
    stations: null,
    loading: false,
  },
  getters: {
    getTodaysPrograms(state) {
      return state.todaysPrograms
    },
    getStations(state) {
      return state.stations
    },
    getLoading(state) {
      return state.loading
    },
    getSelectedPrograms(state) {
      return state.selectedPrograms
    },
  },
  mutations: {
    ADD_TODAYS_PROGRAMS(state, todaysPrograms) {
      // //console.log('ADD_TODAYS_PROGRAMS')
      // //console.log('todaysPrograms = ', JSON.stringify(todaysPrograms))
      // //console.table(todaysPrograms, ['title'])

      state.todaysPrograms = todaysPrograms || state.selectedPrograms

      if (todaysPrograms) {
        ////console.log('todaysPrograms = ', todaysPrograms)
        ////console.table(todaysPrograms, ['title'])
        state.loading = true
      }

      // state.selectedPrograms = []
    },
    SET_STATIONS(state, stations) {
      state.stations = stations
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_LOADING(state, loadingStatus) {
      state.loading = loadingStatus
    },
    ADD_SELECTED_PROGRAMS(state, selectedPrograms) {
      // //console.table(selectedPrograms, ['title'])
      state.selectedPrograms = selectedPrograms
    },
    AJAX_FIND_TEXT(state, foundPrograms) {
      //console.log('foundPrograms = ', foundPrograms)
      state.todaysPrograms = foundPrograms
    },
    ADD_SAVED_PROGRAMS(state, savedPrograms) {
      //console.log('savedPrograms = ', savedPrograms)
      state.todaysPrograms = savedPrograms
    },
  },
  actions: {
    addTodaysPrograms(context) {
      //console.log('addTodaysPrograms')
      //const nullObj = { day: null, startHour:, endHour, categories, stations }
      ajaxGetSelectedPrograms(context)
    },
    getSelectedPrograms(context, searchData) {
      ajaxGetSelectedPrograms(context, searchData)
    },
    setStations(context, stations) {
      context.commit('SET_STATIONS', stations)
    },
    setCategories(context, categories) {
      context.commit('SET_CATEGORIES', categories)
    },
    setLoading(context, loadingStatus) {
      context.commit('SET_LOADING', loadingStatus)
    },
    addSelectedPrograms(context, selectedPrograms) {
      context.commit('ADD_SELECTED_PROGRAMS', selectedPrograms)
    },
    findText(context, text) {
      context.commit('SET_LOADING', true)
      ajaxFindText(context, text)
    },
  },
})
