<template>
  <div class="login">
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
            <v-form ref="form" @submit.prevent="authenticate">
              <v-card-text>
                <v-text-field :type="'email'" v-model="email" label="Email" :rules="emailRules" />
                <v-text-field
                  :type="'password'"
                  v-model="password"
                  label="Password"
                  :rules="passwordRules"
                />
              </v-card-text>
              <v-card-actions>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-btn class="ma-1" dark color="#f0ad94" :type="'submit'" depressed>Login</v-btn>
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
  name: "Login",
  data() {
    return {
      heading: "Log In",
      email: "",
      password: "",
      snackbar: false,
      message: "",
      snackbarBcg: "black",
      emailRules: [(v) => !!v || "E-mail is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      loading: false,
      error: ""
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    authenticate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        db.app
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            this.updateUser(user);
            this.email = "";
            this.password = "";
            this.loading = false;
            this.$router.push("/");
          })
          .catch((error) => {
            this.loading = false;
            //console.log(error);
            this.error = error;
            this.message = error.message;
            this.snackbar = true;
            this.snackbarBcg = "orange";
          });
      }
    },
  },
};
</script>