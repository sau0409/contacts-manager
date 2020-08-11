<template>
  <div class="contacts">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row no-gutters justify="start">
            <v-card
              v-if="getUser"
              style="width: 350px; height: 200px"
              :to="'/updatecontacts/'+user.uid"
              class="ma-5"
            >
              <v-container class="text-center mt-14">
                <v-row>
                  <v-col>
                    <v-btn icon text>
                      <v-icon size="100">mdi-plus-circle</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            <v-card
              v-for="(contact) in contacts"
              :key="contact.id"
              
              
              class="ma-5"
            >
              <div>
                <ContactShow
                
                  :contact="contact"
                  @contactEdit="contactEdit"
                  @contactDelete="contactDelete"
                  :getUser="getUser"
                ></ContactShow>
              </div>
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
import db from "../db.js";

export default {
  name: "Contacts",
  components: {
    ContactShow,
  },
  data() {
    return {
      heading: "Contacts",
      bcg: "blue",
    };
  },
  methods: {
    ...mapActions(["fetchContacts", "onMounted", "updateFormData"]),
    contactDelete(id) {
      db.collection("users")
        .doc(this.getUser.uid)
        .collection("contacts")
        .doc(id)
        .delete();
      this.onMounted();
    },
    contactEdit(contact) {
      this.updateFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone
      })
      this.$router.push('/updatecontacts/'+this.user.uid+'/'+contact.id);
    },
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
  },
};
</script>