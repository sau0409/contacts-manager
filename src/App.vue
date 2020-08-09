<template>
  <v-app>
    <Navigation></Navigation>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Navigation,
  },
  methods: {
    ...mapActions(['onMounted'])
  },
  mounted() {
    console.log('on mounted');
    this.onMounted();
  }
};
</script>
