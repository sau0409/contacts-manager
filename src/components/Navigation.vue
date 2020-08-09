<template>
  <div class="navigation">
    <v-app-bar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" class="title">Contacts Manager</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>HOME</v-btn>
      <v-btn to="/login" v-if="!user" v-cloak text>LOGIN</v-btn>
      <v-btn to="/register" v-if="!user" v-cloak text>REGISTER</v-btn>
      <v-btn to="/profile" v-if="user" v-cloak text>{{user.email}}</v-btn>
      <v-btn v-if="user" @click="logOut" v-cloak text>LOGOUT</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import db from "../db.js";


export default {
  name: "Navigation",
  computed: {
    ...mapGetters(['getUser']),
    user() {
      console.log('user changed in navigation')
      return this.getUser
    }
  },
  methods: {
    ...mapActions(['updateUser']),
      logOut(){
           db.app.auth().signOut()
           .then(()=> {
              console.log('looginf out');
              this.updateUser();
              this.$router.push('/login');
           })
           .catch((error) => {
             console.log(error);
           })
      }
  }
};
</script>

<style scoped>
.title {
  color: black;
  text-decoration: none;
}

 [v-cloak]{
     display: none;
 }
</style>