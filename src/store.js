import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authState: false,
    loginInfo: {
      thumb: '',
      hasThumb: false,
      memberId: '',
      role: ''
    }
  },
  mutations: {
    authState: (state, payload) => {
      state.authState = payload
    },
    authTime: (state, payload) => {
      if (payload === '') {
        state.authState = false
      } else {
        state.authState = true
      }
    },
    loginInfo: (state, payload) => {
      state.loginInfo.memberId = payload.memberId
      state.loginInfo.role = payload.role
    },
    hasThumb: (state, payload) => {
      state.loginInfo.hasThumb = payload
    },
    setThumb: (state, payload) => {
      state.loginInfo.thumb = payload
    }
  },
  actions: {
    signin: ({ commit }, payload) => {
      commit('authState', true)
      commit('loginInfo', payload)
      window.localStorage.setItem('TOKEN', payload.token)
      window.localStorage.setItem('AUTHTIME', new Date().getTime())
    },
    logout: ({ commit }) => {
      commit('authState', false)
      commit('authTime', '')
      window.localStorage.clear()
    }
  }
})
