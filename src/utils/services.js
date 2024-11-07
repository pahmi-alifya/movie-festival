import store from "@/store/index";
import router from "../router";

export function signOut() {
  window.$cookies.remove("uauth");
  store.dispatch("setCurrentUser", {});
  if (router.currentRoute.path !== "/") {
    router.push({
      path: "/",
    });
  }
}

export function initializeSession() {
  if (
    window.$cookies.get("uauth") !== null &&
    JSON.stringify(window.$cookies.get("uauth")) !== JSON.stringify({})
  ) {
    var decrypted = decrypt(window.$cookies.get("uauth"));
    store.dispatch("setCurrentUser", decrypted);
  }
  let currentUserSession = store.getters.currentUser;
  if (JSON.stringify(currentUserSession) === JSON.stringify({})) {
    if (router.currentRoute.path !== "/") {
      router.push({
        path: "/",
      });
    }
  }
}

export function encrypt(o) {
  var salt = "lmao";
  o = JSON.stringify(o).split("");
  for (var i = 0, l = o.length; i < l; i++)
    if (o[i] == "{") o[i] = "}";
    else if (o[i] == "}") o[i] = "{";
  return encodeURI(salt + o.join(""));
}

export function decrypt(o) {
  var salt = "lmao";
  o = decodeURI(o);
  if (salt && o.indexOf(salt) != 0)
    throw new Error("object cannot be decrypted");
  o = o.substring(salt.length).split("");
  for (var i = 0, l = o.length; i < l; i++)
    if (o[i] == "{") o[i] = "}";
    else if (o[i] == "}") o[i] = "{";
  return JSON.parse(o.join(""));
}
