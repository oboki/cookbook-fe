import * as httpApi from '@/api/httpApi';

const state = {
  username: '',
  bookmark: [],
  search_opts: {
    target: "all",
    pagesize_for_all: 4,
    pagesize_for_single: 10,
    advanced: {
      enabled: false,
    }
  },
  recent_search_keywords: [],
}
const getters = {
}
const mutations = {
  setUserInfo(state, data) {
    state.username = data.username;
    state.bookmark = data.bookmark;
    state.search_opts = data.search_opts;
    console.log(state.search_opts);
    state.recent_search_keywords = data.recent_search_keywords;
  },
  setSearchOpts(state, value) {
    state.search_opts = value;
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
        console.log("fetching userinfo.");
        console.log(res.data);
        commit('setUserInfo', res.data);
      }).catch(error=>{
        window.location.href = '/login?next=/cookbook';
      })
    });
  },
  updateSearchOpts ({ commit, state }, value){
    // commit('setSearchOpts', state.search_opts);

    httpApi.updateDocument('users', state.username, {
      "search_opts": state.search_opts
    });
  },
  appendSearchKeyword ({ commit, state }, value){
    let tmp = [];
    try {
      tmp = state.recent_search_keywords.filter(function(x) { return x !== value})
    } catch (error) {
      console.log(error);
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
