import db from '../../db.js';


const state = {
    contacts: []
}

const getters = {
    getContacts: (state) => state.contacts
}

const actions = {
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}