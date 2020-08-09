import db from '../../db.js';


const state = {
    user: null
}

const getters = {
    getUser: (state) => state.user
}

const actions = {
    onMounted({
        commit
    }) {
        console.log('updating user on mount')
        db.app.auth().onAuthStateChanged((user) => {
            if (user) {
                commit('setUser', user);
            }
            
        })
    },

    updateUser({
        commit
    }, user) {
        console.log('action commiting user');
        commit('setUser', user);
    }
};

const mutations = {
    setUser: (state, user) => {
        console.log('user changed in mutation');
        state.user = user;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}