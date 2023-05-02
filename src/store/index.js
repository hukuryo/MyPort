import { createStore } from 'vuex'

export default createStore({
  state: {
    users: []
  },
  getters: {
    loggedIn: (state) => {
      return Boolean(state.username)
    },
  },
  mutations: {
    delete(state, id){
      state.messages = state.messages.filter(message => message.id !== id)
    },
    setUsername(state, username) {
      state.username = username
    },
    setPass(state, pass) {
      state.pass = pass
    }
  },
  actions: {
  },
  modules: {
  }
})
