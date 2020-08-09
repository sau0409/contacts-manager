<template>
  <v-container class="pa-4">
    <v-row no-gutters>
      <v-col cols="10">
        <div>
          <div class="text-h6">{{contact.name}}</div>
          <div class="pa-2">
            <div>
              <div class="text-subtitle-2">Phone Number</div>
              <div class="text-body-2">{{contact.phone}}</div>
            </div>
            <div>
              <div class="text-subtitle-2">Email Id</div>
              <div class="text-body-2">{{contact.email}}</div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col>
        <v-row>
          <v-col class="text-center">
            <v-btn icon>
              <v-icon>mdi-arrow-expand-all</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ContactVue",
  props: ["contact"],
};
</script>