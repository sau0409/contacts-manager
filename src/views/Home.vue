<template>
  <div class="home mt-15">
    <v-container class="text-center">
      <v-row justify="center">
        <v-col cols="6">
          <v-card>
            <v-card-title class="justify-center" v-text="heading"></v-card-title>
            <v-card-text v-text="description"></v-card-text>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col>
                    <v-btn class="ma-1" depressed to="/contacts">Contacts</v-btn>
                    <v-btn class="ma-1" depressed to="/login">Login</v-btn>
                    <v-btn class="ma-1" depressed to="/register">Register</v-btn>
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
export default {
  name: "Home",
  data() {
    return {
      heading: "Contacts Manager",
      description:
        "This simple app manages contacts, allows people to add, update or delete contacts. It's a good example of a Single Page Application which includes connection to a database and routing. It's a practical way to learn VueJs and Firebase.",
    };
  },
};
</script>
