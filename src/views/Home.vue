<template>
  <div class="home mt-15">
    <v-container class="text-center">
      <v-row justify="center">
        <v-col cols="6">
          <v-card color="hsl(0, 38%, 98%)">
            <v-card-title class="justify-center text--secondary font-weight-bold" v-text="heading"></v-card-title>
            <v-card-text>
              This simple app manages contacts, allows people to add, update or delete contacts. It's a good example of a Single Page Application which includes connection to a database and routing. It's a practical way to learn
              <a href="https://vuejs.org/" target="_blank" style="text-decoration: none">
                <strong>VueJs</strong>
              </a>, <a href="https://vuex.vuejs.org/" target="_blank" style="text-decoration: none">
                <strong>Vuex</strong>
              </a>, <a href="https://vuetifyjs.com/en/" target="_blank" style="text-decoration: none">
                <strong>Vuetify</strong>
              </a> and <a href="https://firebase.google.com/" target="_blank" style="text-decoration: none">
                <strong>Firebase</strong>
              </a>.
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col>
                    <v-btn class="ma-1" dark color="#f0ad94" depressed to="/contacts">Contacts</v-btn>
                    <v-btn class="ma-1" dark color="#f0ad94" depressed href="https://github.com/sau0409/contacts-manager" target="_blank">Github Repo<v-icon right>mdi-github</v-icon></v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      heading: "Contacts Manager",
      description:
        "This simple app manages contacts, allows people to add, update or delete contacts. It's a good example of a Single Page Application which includes connection to a database and routing. It's a practical way to learn <strong>VueJs</strong>, Vuex, Vuetify and Firebase.",
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    user() {
      return this.getUser;
    },
  },
};
</script>


<style scoped>
.home {
  background-color: #fceee9;
}
</style>