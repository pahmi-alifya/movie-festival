<template>
  <div>
    <v-menu offset-y :nudge-width="200">
      <template v-slot:activator="{ on, attrs }">
        <v-chip v-bind="attrs" v-on="on" class="ml-2 mr-2 font-weight-bold">
          {{ currentUser.name || "Guest" }}
        </v-chip>
      </template>

      <v-list>
        <v-list-item>
          <v-hover v-slot:default="{ isHovering }">
            <v-list-item-avatar>
              <v-img :src="currentUser.avatar || logo" alt="User Avatar" />
              <v-fade-transition>
                <v-overlay
                  v-if="isHovering"
                  absolute
                  style="cursor: pointer"
                  @click="toggleProfile"
                >
                  <v-icon size="20">mdi-pencil</v-icon>
                </v-overlay>
              </v-fade-transition>
            </v-list-item-avatar>
          </v-hover>
          <v-list-item-content>
            <v-list-item-title>{{
              currentUser.name || "Guest"
            }}</v-list-item-title>
            <v-list-item-subtitle>Logged in</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="signOut">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Dialog Profile (Jika ada) -->
    <!-- <profile :showProfile="showProfile" @closeProfileDialog="showProfile = false" /> -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import logo from "@/assets/logo.svg"; //
// import { signOut } from "../../services/sessionManagement";
// import profile from "../userManagement/profile.vue";

export default defineComponent({
  data: () => ({
    showProfile: false,
  }),
  computed: {
    currentUser() {
      // Asumsi bahwa store tersedia di dalam this.$store, sesuaikan dengan store Vuex
      return this.$store.getters.currentUser || { name: "Guest", avatar: null };
    },
  },
  methods: {
    toggleProfile() {
      this.showProfile = !this.showProfile;
    },
    signOut() {
      // signOut();
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
