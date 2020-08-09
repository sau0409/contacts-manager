import db from '../../db.js';


const state = {
    user: null,
    username: null
}

const getters = {
    getUser: (state) => state.user,
    getUsername: (state) => state.username,
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
        if (user !== undefined && user.displayName) {
            console.log('username changed in mutation');
            state.username = user.displayName;
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}