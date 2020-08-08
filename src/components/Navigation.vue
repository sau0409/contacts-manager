<template>
  <div class="navigation">
    <v-app-bar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" class="title">Contacts Manager</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>HOME</v-btn>
      <v-btn to="/login" text>LOGIN</v-btn>
      <v-btn to="/register" text>REGISTER</v-btn>
      <v-btn to="/profile" text>USER</v-btn>
      <v-btn to="/login" text>LOGOUT</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  components: {},
};
</script>

<style scoped>
.title {
  color: black;
  text-decoration: none;
}
</style>