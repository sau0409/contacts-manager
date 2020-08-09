<template>
  <div class="contacts">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row no-gutters justify="start">
            <v-card
              v-if="getUser"
              style="width: 350px; height: 200px"
              to="/updatecontacts"
              class="ma-5"
            >
              <v-card-title class="justify-center">Add Contact</v-card-title>
            </v-card>
            <v-card
              v-for="(contact) in contacts"
              :key="contact.email"
              style="width: 350px; height: 200px"
              class="ma-5"
            >
              <ContactShow :contact="contact"></ContactShow>
            </v-card>
            <v-card
              v-for="(contact, index) in defaultContacts"
              :key="index"
              style="width: 350px; height: 200px"
              class="ma-5"
            >
              <ContactShow :contact="contact"></ContactShow>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ContactShow from "../components/ContactShow.vue";

export default {
  name: "Contacts",
  components: {
    ContactShow,
  },
  data() {
    return {
      heading: "Contacts",
      defaultContacts: [
        {
          name: "Police",
          phone: "100",
          email: "police@gov.in",
        },
        {
          name: "Ambulance",
          phone: "101",
          email: "ambulance@gov.in",
        },
        {
          name: "Fire",
          phone: "102",
          email: "fire_departemnt@gov.in",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["fetchContacts"]),
  },
  computed: {
    ...mapGetters(["getContacts", "getUser"]),
    user() {
      return this.getUser;
    },
    contacts() {
      return this.getContacts;
    },
  },
  created() {
    if (this.getUser) {
      console.log("triggeting fetch contact");
      this.fetchContacts(this.getUser.uid);
    }
  }
};
</script>