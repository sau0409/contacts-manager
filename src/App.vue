<template>
  <v-app class="vapp">
    <Navigation></Navigation>
    <router-view></router-view>
    <v-footer height="50" absolute class="font-weight-medium">
      <v-btn text target="_blank" href="https://github.com/sau0409">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn text target="_blank" href="https://www.linkedin.com/in/saurabh-jha-21606b143">
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text><v-icon>mdi-phone</v-icon></v-btn>
        </template>
        <span>9044098575</span>
      </v-tooltip>
       <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text><v-icon>mdi-email</v-icon></v-btn>
        </template>
        <span>jhasaurabh.9504@gmail.com</span>
      </v-tooltip>
      <v-col class="text-center" cols="12">
        <strong>Saurabh Jha</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Navigation,
  },
  methods: {
    ...mapActions(["onMounted", "fetchContacts"]),
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  mounted() {
    this.onMounted();
  },
};
</script>

<style>
#app {
  background-color: #f7eeed;
}
</style>