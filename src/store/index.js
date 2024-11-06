import { encrypt } from "@/utils/services";
import { createStore } from "vuex";

const store = createStore({
  state: {
    currentUser: {},
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      return (state.currentUser = currentUser);
    },
  },
  actions: {
    setCurrentUser(context, currentUser) {
      window.$cookies.set("uauth", encrypt(currentUser));
      if (context.currentUser === currentUser) return;
      context.commit("setCurrentUser", currentUser);
    },
    resetState() {},
  },
  getters: {
    currentUser: (state) => state.currentUser,
  },
});

export default store;
