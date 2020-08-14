<template>
  <v-app class="vapp">
    <div>
      <Navigation></Navigation>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div class="mt-10">
      <v-footer height="50" absolute class="font-weight-medium">
        <div class="smC">
          <v-btn text target="_blank" href="https://github.com/sau0409">
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn text target="_blank" href="https://www.linkedin.com/in/saurabh-jha-21606b143">
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" href="tel:9044098575" text>
                <v-icon>mdi-phone</v-icon>
              </v-btn>
            </template>
            <span>9044098575</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" href="mailto:jhasaurabh.9504@gmail.com" v-on="on" text>
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </template>
            <span>jhasaurabh.9504@gmail.com</span>
          </v-tooltip>
        </div>
        <v-col class="text-center animClass" cols="12">
          <strong>Saurabh Jha</strong>
        </v-col>
      </v-footer>
    </div>
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
  data() {
    return {
      myColor: "black",
      colorChange: false,
    };
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
  background-color: #fceee9;
}
.animClass {
  animation-name: change-color;
  animation-duration: 10s;
  animation-iteration-count: infinite;
}

@media (max-width: 700px) {
  .smC {
    margin-left: 20px;
  }
}
@keyframes change-color {
  0% {
    color: black;
  }
  20% {
    color: red;
  }
  40% {
    color: blue;
  }
  60% {
    color: green;
  }
  80% {
    color: brown;
  }
  100% {
    color: orange;
  }
}
</style>