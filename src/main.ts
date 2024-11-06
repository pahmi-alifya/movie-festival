import "vuetify/styles";

import { createApp } from "vue";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import vuetifyTheme from "@/plugins/vuetify";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  theme: vuetifyTheme,
});

const app = createApp(App);

app.use(vuetify);
app.use(VueCookies);
app.use(store);
app.use(router);

app.mount("#app");
