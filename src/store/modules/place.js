
import * as types from '../mutation-types'

const state = {
  address: { id: 10743, name: '金风体育大学'},
  product: new Map(),
  tabindex: 0,
  placedate: '',
  resource: []
}

// getters
const getters = {
  amount: ()=>{
      return state.resource.reduce((total, p) => {
        return total + p.APrice
      }, 0);
  },
  getResource: ()=>{
    let now = new Date();
    return state.resource.filter((item)=>{
      return new Date(item.AStartDate) > new Date([now.getFullYear(), now.getMonth()+1, now.getDate()].join('/'))
    });
  },
  totalcount: ()=>{
    return state.resource.length
  }
}

// actions
const actions = {
  addSportType ({ commit }, id) {
    commit(types.ADD_SPORTTYPE, id)
  },
  changeTab ({ commit }, value) {
    commit(types.CHANGE_TAB, value);
  },
  setPosition ({ commit}, id){
    commit(types.SET_POSITION, id);
  },
  changeDate({ commit}, date){
    commit(types.CHANGE_DATE, date);
  },
  setResource({ commit}, item){
    commit(types.SET_RESOURCE, item);
  }, 
  clearResource({ commit }){
    commit(types.CLEAR_RESOURCE);
  }
}

// mutations
const mutations = {
  [types.ADD_SPORTTYPE] (state, id){
    if(!state.product.has(id)){
      state.product.set(id, [])
    }else{
      state.product.set(id, resource)
    }
  },
  [types.CHANGE_TAB] (state, value){
     state.tabindex = value
  },
  [types.SET_POSITION] (state, id){
    state.address.id = id
  },
  [types.CHANGE_DATE] (state, date){
    state.placedate = date
  },
  [types.SET_RESOURCE] (state, item){
    if(state.resource.findIndex((value)=>{
      return value == item
    })>-1){
      state.resource= state.resource.filter((it)=>{
        return it != item
      });
      item.AStatus =2;
    }else{
      item.AStatus= 1;
      state.resource.push(item);
    }
  },
  [types.CLEAR_RESOURCE] (state){
    state.resource.map((item)=>{
      state.resource= state.resource.filter((it)=>{
        return it != item
      });
      item.AStatus =2;
    });
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
