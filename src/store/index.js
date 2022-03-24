import { createStore } from 'vuex'
import login from './login'

export default createStore({
  state: {
    sideType:false
  },
  mutations: {
    changeSideType(state){
        state.sideType = !state.sideType
    }
  },
  actions: {
  },
  modules: {
    login
  }
})
