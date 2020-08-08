<template>
  <div class="navigation">
    <v-app-bar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" class="title">Contacts Manager</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>HOME</v-btn>
      <v-btn to="/login" v-if="!user" text>LOGIN</v-btn>
      <v-btn to="/register" v-if="!user" text>REGISTER</v-btn>
      <v-btn to="/profile" v-if="user" text>{{user.displayName}}</v-btn>
      <v-btn to="/login" v-if="user" text>LOGOUT</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters(['getUser']),
    user() {
      console.log('user changed in navigation')
      return this.getUser
    }
  }
};
</script>

<style scoped>
.title {
  color: black;
  text-decoration: none;
}
</style>