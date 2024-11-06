<template>
  <v-app-bar color="#121212" app dense flat>
    <v-card-title class="mt-1 text-h5 font-weight-bold"
      >Movie Festival</v-card-title
    >
    <v-spacer></v-spacer>
    <span
      @click="showClock = true"
      v-if="$vuetify.breakpoint.mdAndUp"
      class="subtitle-1"
      style="cursor: pointer"
      >{{ dateTime.hours }}:{{ dateTime.minutes }}{{ " "
      }}{{ dateTime.ampm }}</span
    >
    <!-- <appBarMenu /> -->
    <div v-if="showClock">
      <!-- <clockDialog
        :showClock="showClock"
        :dateTime="dateTime"
        @hideClock="showClock = false"
      /> -->
    </div>
  </v-app-bar>
</template>

<script>
// import clockDialog from "../clock/clockDialog.vue";
// import appBarMenu from "./appBarMenu.vue";
export default {
  components: {
    // appBarMenu,
    // clockDialog,
  },
  data: () => ({
    showClock: false,
    dateTime: {
      hours: "--",
      minutes: "--",
      ampm: "",
    },
    timer: undefined,
  }),
  beforeMount() {
    this.timer = setInterval(this.setDateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    setDateTime() {
      const date = new Date();
      this.dateTime = {
        hours: date.getHours() % 12,
        minutes: (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(),
        ampm: date.getHours() >= 12 ? "PM" : "AM",
        date: new Date().toDateString(),
      };
    },
  },
};
</script>
