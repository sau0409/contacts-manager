<template>
  <v-card color="hsl(0, 38%, 98%)" style="width: 350px; height:220px" :style="{width: w}">
    <v-card-title>{{contact.item.name}}</v-card-title>
    <v-card-text>
      <div class="pa-2">
        <div class="mt-2">
          <div class="text-body-2 text--secondary">
            <v-icon color="#f0ad94">mdi-phone</v-icon>
            <span class="ml-4">{{contact.item.phone}}</span>
          </div>
        </div>
        <div class="mt-2">
          <div class="text-body-2 text--secondary">
            <v-icon color="#f0ad94">mdi-email</v-icon>
            <span class="ml-4">{{contact.item.email}}</span>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-container fluid class="pa-1">
        <v-row justify="space-around">
          <div>
            <v-btn icon :disabled="btnDisable" @click="contactEdit">
              <v-icon color="#f0ad94">mdi-pencil</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn icon :disabled="btnDisable" @click="contactDelete">
              <v-icon hint="delete contact" color="#f0ad94">mdi-delete</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn icon @click="contactExpand">
              <v-icon color="#f0ad94" v-if="this.w==='350px'">mdi-arrow-right</v-icon>
              <v-icon color="#f0ad94" v-else>mdi-arrow-left</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
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
      h: "220px"
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

<style scoped>
</style>