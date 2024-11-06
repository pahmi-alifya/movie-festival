<template>
  <v-app-bar color="#121212" app dense flat>
    <v-card-title class="mt-1 text-h5 font-weight-bold"
      >Movie Festival</v-card-title
    >
    <v-spacer></v-spacer>
    <AppBarMenu />
  </v-app-bar>
</template>

<script>
import { defineComponent } from "vue";
import AppBarMenu from "./AppBarMenu.vue";

export default defineComponent({
  components: {
    AppBarMenu,
  },
});
</script>
