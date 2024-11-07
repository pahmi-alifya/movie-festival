<template>
  <div>
    <v-menu offset-y :nudge-width="1000">
      <template v-slot:activator="{ props }">
        <v-chip v-bind="props" class="ml-2 mr-2 font-weight-bold">
          {{ currentUser.name || "Guest" }}
        </v-chip>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-action>
            <button @click="handleAuth">Login</button>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    showProfile: false,
  }),
  computed: {
    currentUser() {
      return this.$store.getters.currentUser || { name: "Guest", avatar: null };
    },
  },
  methods: {
    handleAuth() {
      this.$router.push("/login");
      console.log("User signed out");
    },
  },
});
</script>

<style scoped>
.v-chip {
  cursor: pointer;
}
</style>
