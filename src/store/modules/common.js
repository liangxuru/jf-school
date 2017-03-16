
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  isLoading: false,
  user: {}
}

// getters
const getters = {
  
}

// actions
const actions = {
  // 改变是否正在加载状态
  setLoading ({commit}, platform) {
    commit(types.SET_LOADING, platform);
  },
  setUser ({commit}, platform) {
    commit(types.SET_USER, platform);
  }
}

// mutations
const mutations = {
  //设置是否在加载
  [types.SET_LOADING] (state, platform){
    state.isLoading = platform;
  },
  //设置当前用户
  [types.SET_USER] (state, platform){
    state.user = platform;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
