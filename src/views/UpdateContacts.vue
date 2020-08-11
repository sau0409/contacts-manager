<template>
  <div class="updateContacts">
    <v-container class="text-center">
      <v-row justify="center">
        <v-col cols="4">
          <v-card v-if="!contactId" :loading="loading">
            <v-card-title class="justify-center" v-text="heading1"></v-card-title>
            <v-snackbar :color="snackbarBcg" v-model="snackbar">
              {{message}}
              <template v-slot:action="{ attrs }">
                <v-btn v-bind="attrs" @click="snackbar = false">Close</v-btn>
              </template>
            </v-snackbar>
            <v-form ref="form" @submit.prevent="addContact">
              <v-card-text>
                <v-text-field :type="'text'" v-model="name" label="Name" :rules="nameRules" />
                <v-text-field :type="'email'" label="Email Id" v-model="email" :rules="emailRules" />
                <v-text-field
                  :type="'text'"
                  label="Phone Numer"
                  v-model="phone"
                  :rules="phoneRules"
                />
              </v-card-text>
              <v-card-actions>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-btn class="ma-1" :type="'submit'" depressed>Submit</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-form>
          </v-card>
          <v-card v-else :loading="loading">
            <v-card-title class="justify-center" v-text="heading2"></v-card-title>
            <v-snackbar :color="snackbarBcg" v-model="snackbar">
              {{message}}
              <template v-slot:action="{ attrs }">
                <v-btn v-bind="attrs" @click="snackbar = false">Close</v-btn>
              </template>
            </v-snackbar>
            <v-form ref="form" @submit.prevent="updateContact">
              <v-card-text>
                <v-text-field
                  :type="'text'"
                  v-model="formData.name"
                  label="Name"
                  :rules="nameRules"
                />
                <v-text-field
                  :type="'email'"
                  label="Email Id"
                  v-model="formData.email"
                  :rules="emailRules"
                />
                <v-text-field
                  :type="'text'"
                  label="Phone Numer"
                  v-model="formData.phone"
                  :rules="phoneRules"
                />
              </v-card-text>
              <v-card-actions>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-btn class="ma-1" :type="'submit'" depressed>Submit</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import db from "../db.js";
import { mapGetters } from "vuex";

export default {
  name: "UpdateContacts",
  data() {
    return {
      heading1: "Add Contacts",
      heading2: "Update Contacts",
      name: "",
      email: "",
      phone: "",
      loading: false,
      snackbar: false,
      snackbarBcg: "black",
      message: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) =>
          (v.length > 1 && v.length < 20) ||
          "Name must be between 2 to 20 characters",
      ],
      phoneRules: [
        (v) => !!v || "Phone Number is required",
        (v) => /^[0-9-]+$/.test(v) || "Phone number is not valid",
      ],
    };
  },
  computed: {
    ...mapGetters(["getUser", "getFormData"]),
    user() {
      return this.getUser;
    },
    contactId() {
      return this.$route.params.contactid;
    },
    userId() {
      return this.$route.params.userid;
    },
    formData() {
      return this.getFormData;
    },
  },
  methods: {
    addContact() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        db.collection("users")
          .doc(this.user.uid)
          .collection("contacts")
          .add({
            name: this.name,
            email: this.email,
            phone: this.phone,
          })
          .then(() => {
            this.name = "";
            this.email = "";
            this.phone = "";
            this.loading = false;
            this.$router.push("/contacts");
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            this.message = error.message;
            this.snackbar = true;
            this.snackbarBcg = "orange";
          });
      }
    },
    updateContact() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        db.collection("users")
          .doc(this.userId)
          .collection("contacts")
          .doc(this.contactId)
          .update({
            name: this.formData.name,
            email: this.formData.email,
            phone: this.formData.phone,
          })
          .then(() => {
            this.name = "";
            this.email = "";
            this.phone = "";
            this.loading = false;
            this.$router.push("/contacts");
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            this.message = error.message;
            this.snackbar = true;
            this.snackbarBcg = "orange";
          });
      }
    },
  },
};
</script>

<style>
</style>