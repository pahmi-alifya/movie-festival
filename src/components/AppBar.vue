<template>
  <v-app-bar color="#121212" app dense flat>
    <v-card-title class="mt-1 text-h5 font-weight-bold" @click="redirectToHome"
      >Movie Festival</v-card-title
    >
    <v-spacer></v-spacer>
    <AppBarMenu />
  </v-app-bar>
</template>

<script>
import { defineComponent } from "vue";
import AppBarMenu from "./AppBarMenu.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    AppBarMenu,
  },
  setup() {
    const router = useRouter();
    const redirectToHome = () => {
      router.push("/");
    };

    return {
      redirectToHome,
    };
  },
});
</script>
