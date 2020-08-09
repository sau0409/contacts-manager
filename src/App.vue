<template>
  <v-app>
    <Navigation></Navigation>
    <router-view></router-view>
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
    console.log("on mounted");
    this.onMounted();
  },
};
</script>
