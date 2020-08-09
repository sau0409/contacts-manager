import Vue from 'vue'
import Vuex from 'vuex'
import firebaseQuery from './modules/firebaseQuery'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    firebaseQuery
  }
})
