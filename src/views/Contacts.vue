<template>
  <div class="contacts">
    <v-container class="searchBs">
      <v-card color="#f0ad94" style="height: 65px">
        <v-autocomplete
          color="#f0ad94"
          solo
          class="pa-2"
          :search-input.sync="search"
          hide-no-data
          placeholder="Start typing to Search"
        ></v-autocomplete>
      </v-card>
    </v-container>
    <v-container class="ml-md-7 ml-xs-0" fluid>
      <v-row>
        <v-col cols="12">
          <v-row no-gutters justify="start">
            <v-card
              color="hsl(0, 38%, 98%)"
              v-if="getUser"
              style="width: 320px; height: 200px"
              :to="'/updatecontacts/'+user.uid"
              class="ma-4"
            >
              <v-container class="text-center mt-14">
                <v-row>
                  <v-col>
                    <v-btn icon text>
                      <v-icon color="#f0ad94" size="100">mdi-plus-circle</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            <v-card
              color="hsl(0, 38%, 98%)"
              v-for="(contact) in filteredContacts"
              :key="contact.item.id"
              style="width: 320px; height: 200px"
              class="ma-4"
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
import Fuse from "fuse.js";

export default {
  name: "Contacts",
  components: {
    ContactShow,
  },
  data() {
    return {
      heading: "Contacts",
      bcg: "blue",
      search: ".",
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
        name: contact.item.name,
        email: contact.item.email,
        phone: contact.item.phone,
      });
      this.$router.push(
        "/updatecontacts/" + this.user.uid + "/" + contact.item.id
      );
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
    filteredContacts() {
      let fuseOptions = {
        keys: ["name", "phone", "email"],
      };
      if (this.search != undefined) {
        const fuse = new Fuse(this.contacts, fuseOptions);
        const res = fuse.search(this.search);
        return res;
      } else {
        let nsearch = ".";
        const fuse = new Fuse(this.contacts, fuseOptions);
        const res = fuse.search(nsearch);
        return res;
      }
    },
  },
  watch: {
    search(newValue) {
      if (newValue == "") {
        this.search = ".";
      }
    },
  },
  created() {
    if (this.getUser) {
      this.fetchContacts(this.getUser.uid);
    }
  },
};
</script>

<style scoped>
@media (max-width: 700px) {
  .searchBs {
    width: 300px;
  }
}
@media (min-width: 700px) {
  .searchBs {
    width: 500px;
  }
}
</style>