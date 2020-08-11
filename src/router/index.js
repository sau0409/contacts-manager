import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Contacts from '../views/Contacts.vue'
import UpdateContacts from '../views/UpdateContacts.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile/:userid',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/updatecontacts/:userid/:contactid',
    name: 'UpdateContacts',
    component: UpdateContacts
  },
  {
    path: '/updatecontacts/:userid',
    name: 'UpdateContacts',
    component: UpdateContacts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
