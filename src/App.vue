<template>
  <v-app>
    <!-- <v-main><AppBar /> <RouterView /> </v-main> -->
    <v-main><appBar /><RouterView /> </v-main>
  </v-app>
</template>

<script lang="ts">
import { RouterView } from "vue-router";
import appBar from "./components/AppBar.vue";

export default {
  name: "App",
  components: {
    appBar,
  },
  data: () => ({
    //
  }),
  beforeCreate() {
    // initializeSession();
  },
};
</script>
