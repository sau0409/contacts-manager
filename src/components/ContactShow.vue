<template>
  <v-container class="pa-4" style="width: 350px; height: 200px" :style="{width: w}">
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
        <v-row justify="space-between">
          <v-col class="text-center">
            <v-btn icon @click="contactExpand">
              <v-icon v-if="this.w==='350px'">mdi-arrow-right</v-icon>
              <v-icon v-else>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn icon :disabled="btnDisable" @click="contactEdit">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn icon :disabled="btnDisable" @click="contactDelete">
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
      this.$emit("contactDelete", this.contact.id);
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