<template>
  <v-card dark>
    <v-card-title class="justify-center py-8">
      Sign up with your email address
    </v-card-title>
    <v-card-text>
      <v-form
        ref="signUpForm"
        v-model="valid"
        lazy-validation
        class="px-8 mt-3"
      >
        <v-text-field
          type="text"
          prepend-inner-icon="mdi-account"
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Profile Name"
          required
          solo-inverted
          rounded
          color="black"
        ></v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-key"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="password"
          :rules="passwordRules"
          label="Create a password"
          required
          solo-inverted
          rounded
          color="black"
          @click:append="togglePasswordVisibility"
        ></v-text-field>
      </v-form>
      <v-card-actions class="justify-center pb-5 mt-n2">
        <v-btn
          rounded
          color="accent"
          @click="goToLoginPage"
          dark
          elevation="0"
          class="mr-5 px-4 white--text"
        >
          Cancel
        </v-btn>
        <v-btn
          rounded
          color="accent"
          @click="createUser"
          dark
          elevation="0 px-4 white--text"
        >
          Sign up
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { checkUser, postCreateUser } from "@/api/auth";
import { useMutation } from "@tanstack/vue-query";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SignUpComponent",
  data() {
    return {
      valid: true,
      name: "",
      password: "",
      showPassword: false,
      userDatabase: JSON.parse(localStorage.getItem("userDatabase")) || [],
    };
  },
  computed: {
    nameRules() {
      return [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ];
    },
    passwordRules() {
      return [
        (value) => !!value || "Password is required.",
        (value) => (value && value.length >= 8) || "Minimum 8 characters",
      ];
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async isUserValid() {
      const userExists = await checkUser(this.name);
      return !userExists;
    },
    goToLoginPage() {
      this.$refs.signUpForm.resetValidation();
      this.$refs.signUpForm.reset();
      this.$emit("closeForm");
    },
    async createUser() {
      if (this.$refs.signUpForm.validate()) {
        if (this.isUserValid()) {
          const newUser = {
            name: this.name,
            password: this.password,
          };
          this.createUserMutation.mutate(newUser);

          this.goToLoginPage();
        } else {
          alert("Username already exists.");
        }
      }
    },
  },
  setup() {
    const createUserMutation = useMutation({
      mutationFn: async (newUser) => {
        const response = await postCreateUser(newUser);

        return response;
      },
      onSuccess: () => {
        alert("User created successfully!");
        let userDatabase = JSON.parse(
          localStorage.getItem("userDatabase") || "[]"
        );
        localStorage.setItem("userDatabase", JSON.stringify(userDatabase));
      },
      onError: (error) => {
        console.error("Error creating user:", error);
        alert("Failed to create user.");
      },
    });

    return {
      createUserMutation,
    };
  },
});
</script>
