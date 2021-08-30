const state = {
  searchOpts: 'all',
  message: 'hello'

}
const getters = {
  getSearchOpts: state => state.searchOpts,
}
const mutations = {
  setSearchOpts (state, data){
    state.searchOpts = data
  },
}
const actions = {
  actionSearchOpts ({commit}, value){
    commit('setSearchOpts', value)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
