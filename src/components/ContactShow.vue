<template>
  <v-container class="pa-4" style="width: 350px; height: 200px" :style="{width: w}">
    <v-row no-gutters>
      <v-col cols="10">
        <div>
          <div class="text-h6">{{contact.item.name}}</div>
          <div class="pa-2">
            <div class="mt-4">
              <div class="text-body-2 text--secondary"><v-icon color="#f0ad94">mdi-phone</v-icon><span class="ml-5">{{contact.item.phone}}</span></div>
            </div>
            <div class="mt-4">
              <div  class="text-body-2 text--secondary"><v-icon color="#f0ad94">mdi-email</v-icon><span class="ml-5">{{contact.item.email}}</span></div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col>
        <v-row justify="space-between">
          <v-col class="text-center">
            <v-btn icon @click="contactExpand">
              <v-icon color="#f0ad94" v-if="this.w==='350px'">mdi-arrow-right</v-icon>
              <v-icon color="#f0ad94" v-else>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn icon :disabled="btnDisable" @click="contactEdit">
              <v-icon color="#f0ad94">mdi-pencil</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn icon :disabled="btnDisable" @click="contactDelete">
              <v-icon hint="delete contact" color="#f0ad94">mdi-delete</v-icon>
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
  props: ["contact", "getUser"],
  computed: {
    btnDisable() {
      if (this.getUser) {
        return false;
      } else {
        return true;
      }
    },
  },
  data() {
    return {
      bcg: "blue",
      w: "350px",
    };
  },
  methods: {
    contactDelete() {
      this.$emit("contactDelete", this.contact.item.id);
    },
    contactExpand() {
      if (this.w === "350px") {
        this.w = "600px";
      } else {
        this.w = "350px";
      }
    },
    contactEdit() {
      this.$emit("contactEdit", this.contact);
    },
  },
};
</script>