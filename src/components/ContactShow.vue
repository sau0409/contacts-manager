<template>
  <v-card color="hsl(0, 38%, 98%)" class="dynScn" :style="{width: w, height: h}">
    <v-card-title>{{contact.item.name}}</v-card-title>
    <v-card-text>
      <div>
        <div class="mt-3">
          <div class="text-body-2 text--secondary">
            <v-icon color="#f0ad94">mdi-phone</v-icon>
            <span class="ml-4">{{contact.item.phone}}</span>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-body-2 text--secondary">
            <v-icon color="#f0ad94">mdi-email</v-icon>
            <span class="ml-4">{{contact.item.email}}</span>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions :style="{'margin-top': actMtop}">
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
              <v-icon color="#f0ad94" v-if="this.w==='350px' && inWidth > 700">mdi-arrow-right</v-icon>
              <v-icon color="#f0ad94" v-else-if="this.w==='600px'">mdi-arrow-left</v-icon>
              <v-icon color="#f0ad94" v-else-if="this.h === '250px'">mdi-arrow-down</v-icon>
              <v-icon color="#f0ad94" v-else-if="this.inWidth ">mdi-arrow-up</v-icon>
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
    inWidth() {
      return window.innerWidth
    }
  },
  data() {
    return {
      bcg: "blue",
      w: "350px",
      h: "250px",
      actMtop: ""

    };
  },
  methods: {
    contactDelete() {
      this.$emit("contactDelete", this.contact.item.id);
    },
    contactExpand() {
      console.log(window.innerWidth);
      let win = window.innerWidth;
      if (win > 700) {
        if (this.w === "350px") {
          console.log('lap');
          this.w = "600px";
        } else {
           console.log('lap2');
          this.w = "350px";
        }
      }
      else {
         if (this.h === "250px") {
           console.log('mob');
           this.h = "600px";
           this.actMtop = "380px"

        } else {
           console.log('mob2');
          this.h = "250px";
           this.actMtop = ""
        }
      }
    },
    contactEdit() {
      this.$emit("contactEdit", this.contact);
    },
  },
};
</script>

<style scoped>
@media (max-width: 750px) {
  .dynScn {
    width: 280px;
    height: 250px;
  }
}

@media (min-width: 750px) {
  .dynScn {
    width: 350px;
    height: 220px;
  }
}
</style>