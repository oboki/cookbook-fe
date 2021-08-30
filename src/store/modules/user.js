import http from '@/api/http';

const state = {
  username: '',
  bookmark: [],
  search_opt: 'all',
  recent_search_keywords: [],
}
const getters = {
}
const mutations = {
  setUserInfo(state, data) {
    state.username = data.username;
    state.bookmark = data.bookmark;
    state.search_opt = data.search_opt;
    state.recent_search_keywords = data.recent_search_keywords;
  },
  setSearchOpt(state, value) {
    state.search_opt = value;
  },
  setSearchKeyword(state, value) {
    state.recent_search_keywords = value;
  },
  setBookmark(state, value) {
    state.bookmark = value;
  }
}
const actions = {
  loadUserInfo ({commit}, /**/){
    http.get('/user').then((res) => {
      const username = res.data.username;
      http.get('/users/'+username).then((res) => {
        commit('setUserInfo', res.data);
      })
    })
  },
  updateSearchOpt ({commit}, value){
    commit('setSearchOpt', value);
    // update user doc
  },
  appendSearchKeyword ({commit}, value){
    const tmp = state.recent_search_keywords.filter(function(x) { return x !== value})
    tmp.push(value)
    commit('setSearchKeyword', tmp);
  },
  appendBookmark ({commit}, data){
    const tmp = [];
    for (let i = 0;i < state.bookmark.length; i++){
      if (state.bookmark[i].id !== data.id) {
        tmp.push(state.bookmark[i]);
      }
    }
    tmp.push(data);
    commit('setBookmark', tmp);
  },
  popBookmark ({commit}, data){
    const tmp = [];
    for (let i = 0;i < state.bookmark.length; i++){
      if (state.bookmark[i].id !== data.id) {
        tmp.push(state.bookmark[i]);
      }
    }
    commit('setBookmark', tmp);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
