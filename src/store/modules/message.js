const state = {
  message: 'hello'

}
const getters = {
  getMsg: state => state.message
}
const mutations = {
  changeMessage (state, newMsg) {
    state.message = newMsg
  }
}
const actions = {
  callMutation ({commit}, newMsg){
    commit('changeMessage', newMsg)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
