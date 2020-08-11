import db from '../../db.js';


const state = {
    user: null,
    username: null,
    contacts: [{
            name: "Police",
            phone: "100",
            email: "police@gov.in",
            id: "1"
        },
        {
            name: "Ambulance",
            phone: "101",
            email: "ambulance@gov.in",
            id: "2"
        },
        {
            name: "Fire",
            phone: "102",
            email: "fire_departemnt@gov.in",
            id: "3"
        }
    ],
    formData: {
        name: "",
        email: "",
        phone: ""
    },
}

const getters = {
    getUser: (state) => state.user,
    getUsername: (state) => state.username,
    getContacts: (state) => state.contacts,
    getFormData: (state) => state.formData,
}

const actions = {
    onMounted({
        commit,
        dispatch
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
                contactsArr.push({
                    name: el.data().name,
                    phone: el.data().phone,
                    email: el.data().email,
                    id: el.id
                });
            })
        })
        commit('setContacts', contactsArr);
    },

    updateContacts({
        commit
    }, contacts) {
        console.log('action commiting contacts');
        commit('setContacts', contacts);
    },

    updateFormData({commit}, formData) {
        commit('setFormData', formData);
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
    },

    setFormData: (state, formData) => {
        console.log('form changed in mutation');
        state.formData = formData;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}