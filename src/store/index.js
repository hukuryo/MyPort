import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist'

// Vuex-persistを使えるようにするための記述
const vuexPersist = new VuexPersistence({
  storage: localStorage
})

export default createStore({
  state: {
    users: []
  },
  getters: {
    loggedIn: (state) => {
      return Boolean(state.id)
    },
  },
  mutations: {
     // Vuex-persistを使えるようにするための記述
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    
    delete(state, id){
      state.messages = state.messages.filter(message => message.id !== id)
    },
    setUsername(state, username) {
      state.username = username
    },
    setUserId(state, id){
      state.id = id
    },
    setPass(state, pass) {
      state.pass = pass
    }
  },
  actions: {
  },
  modules: {
  },
  // Vuex-persistを使えるようにするための記述
  plugins: [vuexPersist.plugin]
})
