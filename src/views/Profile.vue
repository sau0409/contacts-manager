<template>
  <div class="profile mt-15">
    <v-container class="text-center">
      <v-row justify="center">
        <v-col cols="md-6">
          <v-card color="hsl(0, 38%, 98%)">
            <v-card-title class="justify-center text--secondary font-weight-bold">{{name}}</v-card-title>
            <div>
              <div class="mb-5">
                <div class="mb-2">
                  <v-icon color="#f0ad94">mdi-email</v-icon>
                </div>
                <div class="text-body-2 text--secondary">{{email}}</div>
              </div>
            </div>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col>
                    <v-btn class="ma-1" @click="deleteUser" style="width: 100%" dark color="#f0ad94" depressed>Delete Profile</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import db from '../db.js';

export default {
  name: "Profile",
  data() {
    return {
       error: "",
    };
  },
  computed: {
    ...mapGetters(["getUser", "getUsername"]),
    user() {
      return this.getUser;
    },
    email() {
      if (this.getUser.email) {
        return this.getUser.email;
      } else {
        return "NA";
      }
    },
    name() {
      if (this.getUsername) {
        return this.getUsername;
      } else {
        return "NA";
      }
    },
    uid() {
      return this.$route.params.userid
    }
  },
  methods: {
    ...mapActions(['updateUser', 'updateContacts']),
    deleteUser() {
        db.collection("users").doc(this.uid).delete()
        .then(() => {
        })
        .catch((err) => {
          //console.log(err);
          this.error = err;
        })
        db.app.auth().currentUser.delete()
        .then(() => {
        })
        .catch((err) => {
          //console.log(err);
          this.error = err;
        })
        this.updateUser();
        this.updateContacts();
        this.$router.push("/");
    }
  }
};
</script>