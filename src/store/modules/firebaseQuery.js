import db from '../../db.js';


const state = {
    contacts: [],
    user: null,
    username: null
}

const getters = {
    getContacts: (state) => state.contacts,
    getUser: (state) => state.user,
    getUsername: (state) => state.username,
}

const actions = {
    onMounted({
        commit, dispatch
    }) {
        console.log('updating user on mount')
        db.app.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch('fetchContacts', user.uid);
                commit('setUser', user);
                
            }

        })
    },

    updateUser({
        commit
    }, user) {
        console.log('action commiting user');
        commit('setUser', user);
    },

    fetchContacts({
        commit
    }, userId) {
        let contactsArr = [];
        console.log('contact action triggered');
        db.collection("users").doc(userId).collection("contacts").onSnapshot((snapshot) => {
            snapshot.forEach((el) => {
                contactsArr.push(el.data());
            })
        })
        commit('setContacts', contactsArr);
    }
};

const mutations = {
    setContacts: (state, contacts) => {
        console.log('muatating contact');
        state.contacts = contacts;
    },

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