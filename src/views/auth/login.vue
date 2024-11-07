<template>
  <v-container
    fluid
    fill-height
    style="
      background: black;
      height: 100%;
      justify-items: center;
      align-content: center;
    "
  >
    <div style="width: 30rem">
      <v-flex xs8 sm8 md4>
        <v-card class="rounded-xl" dark>
          <v-card-title class="pa-5" style="justify-self: center"
            >Login</v-card-title
          >

          <v-form class="px-8 mb-n2" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              color="black"
              prepend-inner-icon="mdi-account"
              label="Username"
              type="text"
              solo-inverted
              v-model="name"
              :counter="10"
              :rules="nameRules"
              rounded
              @keypress.enter="performAction('login')"
            />
            <v-text-field
              color="black"
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              solo-inverted
              v-model="password"
              :rules="passwordRules"
              rounded
              @click:append="togglePasswordVisibility"
              @keypress.enter="performAction('login')"
            />
          </v-form>

          <v-card-actions class="justify-center pb-5">
            <v-btn
              rounded
              color="accent"
              @click.stop="performAction('signup')"
              dark
              elevation="0"
              class="mr-5 px-4 white--text"
            >
              Sign Up
            </v-btn>
            <v-btn
              rounded
              color="accent"
              @click.stop="performAction('login')"
              dark
              elevation="0"
              class="px-4 white--text"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </div>
    <!-- <v-dialog v-model="showSignUpForm" fullscreen>
      <signUpForm @closeForm="showSignUpForm = false" />
    </v-dialog> -->
  </v-container>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { postLogin } from "@/api/auth";

// import signUpForm from "../components/userManagement/signUpForm.vue";

export default defineComponent({
  name: "UserAuthComponent",
  // components: { signUpForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const showSignUpForm = ref(false);
    const showPassword = ref(false);
    const valid = ref(true);
    const name = ref("");
    const password = ref("");

    const nameRules = [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ];
    const passwordRules = [
      (value) => !!value || "Password is required.",
      (value) => (value && value.length >= 8) || "Minimum 8 characters",
    ];

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const performAction = async (action) => {
      if (action === "signup") return (showSignUpForm.value = true);

      const response = await postLogin(name.value, password.value);
      if (response) {
        store.dispatch("setCurrentUser", {
          name: response.name,
        });

        router.replace({ path: "/" });
      }
    };

    onBeforeMount(() => {
      if (Object.keys(store.getters.currentUser).length) {
        router.push({ path: "/" });
      }
    });

    return {
      showSignUpForm,
      showPassword,
      valid,
      name,
      password,
      nameRules,
      passwordRules,
      togglePasswordVisibility,
      performAction,
    };
  },
});
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
