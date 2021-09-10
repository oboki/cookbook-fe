import * as httpApi from '@/api/httpApi';

const state = {
  username: '',
  bookmark: [],
  searchOpts: {},
  recentSearchKeywords: [],
}
const getters = {
}
const mutations = {
  setUserInfo(state, data) {
    state.username = data.username;
    state.bookmark = data.bookmark;
    state.searchOpts = data.search_opts;
    state.recentSearchKeywords = data.recent_search_keywords;
  },
  setSearchOpts(state, value) {
    state.searchOpts = value;
  },
  setSearchKeyword(state, value) {
    state.recentSearchKeywords = value;
  },
  setBookmark(state, value) {
    state.bookmark = value;
  }
}
const actions = {
  loadUserInfo ({commit}, /**/){
    httpApi.get('/whoami').then((res) => {
      const username = res.data.username;
      httpApi.getDocument('users', username.toLowerCase()).then((res) => {
        commit('setUserInfo', res.data);
      }).catch(error=>{
        window.location.href = '/login?next=/cookbook';
      })
    });
  },
  updateSearchOpts ({ commit, state }, value){
    httpApi.updateDocument('users', state.username, {
      "search_opts": state.searchOpts
    }).then((res) => {
      commit('setSearchOpts', state.searchOpts);
    });
  },
  appendSearchKeyword ({ commit, state }, value){
    if (!value || /^\s*$/.test(value)) {
      return 0
    }

    let tmp = [];
    try {
      tmp = state.recentSearchKeywords.filter(
        function(x) { return x !== value }
      )
    } catch (error) {
      tmp = [];
    }
    tmp.push(value);
    tmp = tmp.reverse().slice(0, 10).reverse();

    commit('setSearchKeyword', tmp);
    httpApi.updateDocument('users', state.username, {
      "recent_search_keywords": tmp
    });
  },
  appendBookmark ({commit}, data){
    let tmp = [];
    tmp.push(data);
    for (let i = 0;i < state.bookmark.length; i++){
      if (state.bookmark[i].id !== data.id) {
        tmp.push(state.bookmark[i]);
      }
    }
    tmp = tmp.reverse().slice(0,20);

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
