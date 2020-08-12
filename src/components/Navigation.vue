<template>
  <div class="navigation">
    <v-app-bar color="#f0ad94" dark dense>
      <v-toolbar-title class="ml-4">
        <router-link to="/" class="title">
          <v-icon>mdi-contacts</v-icon><span>Contacts Manager</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>HOME</v-btn>
      <v-btn to="/login" v-if="!user" v-cloak text>LOGIN</v-btn>
      <v-btn to="/register" v-if="!user" v-cloak text>REGISTER</v-btn>
      <v-menu v-if="user" offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn v-bind="attrs" v-on="on" v-cloak text>{{username}}</v-btn>
        </template>
        <v-list>
          <v-list-item :to="'/profile/'+user.uid" link>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="user" @click="logOut" link>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import db from "../db.js";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters(["getUser", "getUsername"]),
    user() {
      return this.getUser;
    },
    username() {
      return this.getUsername;
    },
  },
  methods: {
    ...mapActions(["updateUser", "onMounted", "updateContacts"]),
    logOut() {
      db.app
        .auth()
        .signOut()
        .then(() => {
          this.updateUser();
          this.updateContacts([
            {
              name: "Police",
              phone: "100",
              email: "police@gov.in",
              id: "1",
            },
            {
              name: "Ambulance",
              phone: "101",
              email: "ambulance@gov.in",
              id: "2",
            },
            {
              name: "Fire",
              phone: "102",
              email: "fire_departemnt@gov.in",
              id: "3",
            },
          ]);
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.title {
  color: white;
  text-decoration: none;
}

[v-cloak] {
  display: none;
}

</style>