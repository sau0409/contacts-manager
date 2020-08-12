<template>
  <div class="register">
    <v-container class="text-center">
      <v-row justify="center">
        <v-col cols="4">
          <v-card color="hsl(0, 38%, 98%)">
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              top
              color="deep-purple accent-4"
            ></v-progress-linear>
            <v-card-title class="justify-center text--secondary font-weight-bold" v-text="heading"></v-card-title>
            <v-snackbar :color="snackbarBcg" v-model="snackbar">
              {{message}}
              <template v-slot:action="{ attrs }">
                <v-btn v-bind="attrs" @click="snackbar = false">Close</v-btn>
              </template>
            </v-snackbar>
            <v-form class="mt-n5" ref="form" @submit.prevent="registerUser">
              <v-card-text>
                <v-text-field :type="'text'" v-model="username" label="Name" :rules="nameRules" />
                <v-text-field :type="'email'" label="Email Id" v-model="email" :rules="emailRules" />
                <v-text-field
                  :type="'password'"
                  label="Password"
                  v-model="password"
                  :rules="passwordRules"
                />
                <v-text-field :type="'password'" label="Confirm Password" :rules="matchPassword" />
              </v-card-text>
              <v-card-actions class="mt-n3">
                <v-container>
                  <v-row no-gutters>
                    <v-col>
                      <v-btn dark color="#f0ad94"  class="ma-1" :type="'submit'" depressed>Register</v-btn>
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
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      heading: "Register",
      username: "",
      email: "",
      password: "",
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
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 8 || "Password length shoul be greater than 8.",
      ],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) =>
          (v.length > 1 && v.length < 20) ||
          "Name must be between 2 to 20 characters",
      ],
      matchPassword: [(v) => v === this.password || "Password is not matching"],
    };
  },
  methods: {
    ...mapActions(["updateUser", 'onMounted']),
    registerUser() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        db.app
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((userCred) => {
            userCred.user
              .updateProfile({
                displayName: this.username
              })
              .then(() => {
                this.updateUser(userCred.user);
                this.loading = false;
                this.$router.push("/");
              })
              .catch((error) => {
                this.loading = false;
                console.log(error);
                this.message = error.message;
                this.snackbar = true;
                this.snackbarBcg = "orange";
              });
          })
          .catch((error) => {
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

<style scoped>

</style>