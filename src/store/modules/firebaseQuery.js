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
        console.log('updating user')
        commit('setUser', user);
    },

    fetchContacts({
        commit
    }, userId) {
        let contactsArr = [];
        db.collection("users").doc(userId).collection("contacts").onSnapshot((snapshot) => {
            snapshot.forEach((el) => {
                contactsArr.push({
                    name: el.data().name,
                    phone: el.data().phone,
                    email: el.data().email,
                    id: el.id
                });
            })
            contactsArr = contactsArr.sort((a, b) => {
                const n1 = a.name.toLowerCase();
                const n2 = b.name.toLowerCase();
                if (n1 > n2) {
                    return 1;
                } else if (n2 > n1) {
                    return -1;
                } else {
                    return 0;
                }
            });
        })
        commit('setContacts', contactsArr);
    },

    updateContacts({
        commit
    }, contacts) {
        commit('setContacts', contacts);
    },

    updateFormData({
        commit
    }, formData) {
        commit('setFormData', formData);
    }
};

const mutations = {
    setContacts: (state, contacts) => {
        state.contacts = contacts;
    },

    setUser: (state, user) => {
        state.user = user;
        if (user !== undefined && user.displayName) {
            state.username = user.displayName;
        }
        else {
            state.username = null;
        }
    },

    setFormData: (state, formData) => {
        state.formData = formData;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}