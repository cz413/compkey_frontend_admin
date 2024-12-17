import Vuex from "vuex"

export default new Vuex.Store({
    state:{
        userId:localStorage.getItem('userId'),
    },
    mutations:{
        setUserId(state,userId){
            state.userId = userId
        }
    },
    actions:{
        setUsername(context,userId) {
            context.commit('setUserId', userId)
        }
    },
})
