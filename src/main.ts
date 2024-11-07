import "vuetify/styles";

import { createApp } from "vue";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VueQueryPlugin } from "@tanstack/vue-query";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App);

app.use(vuetify);
app.use(VueCookies);
app.use(VueQueryPlugin);
app.use(store);
app.use(router);

app.mount("#app");
