const state = {
    user: null
}

const getters = {
    getUser: (state) => state.user 
}

const actions = {
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