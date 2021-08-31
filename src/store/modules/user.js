import * as httpApi from '@/api/httpApi';

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
    httpApi.get('/user').then((res) => {
      const username = res.data.username;
      httpApi.getDocument('users', username).then((res) => {
        commit('setUserInfo', res.data);
      }).catch(error=>{
        window.location.href = '/login?next=/cookbook';
      })
    });
  },
  updateSearchOpt ({ commit, state }, value){
    commit('setSearchOpt', value);

    httpApi.updateDocument('users', state.username, {
      "search_opt": value
    });
  },
  appendSearchKeyword ({ commit, state }, value){
    let tmp = state.recent_search_keywords.filter(function(x) { return x !== value})
    tmp.push(value);
    tmp = tmp.reverse().slice(0, 10).reverse();

    commit('setSearchKeyword', tmp);
    httpApi.updateDocument('users', state.username, {
      "recent_search_keywords": tmp
    });
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
    httpApi.updateDocument('users', state.username, {
      "bookmark": tmp
    });
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
