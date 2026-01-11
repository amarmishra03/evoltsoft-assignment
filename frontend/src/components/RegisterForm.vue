<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 bg-gray-900 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-12 w-auto"
        src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
        alt="EV Logo"
      />
      <h2 class="mt-8 text-center text-2xl font-bold tracking-tight text-green-400">
        Create your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="register">
        <div>
          <label class="block text-sm font-medium text-gray-200">Name</label>
          <div class="mt-2">
            <input
              v-model="name"
              type="text"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-green-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-200">Email address</label>
          <div class="mt-2">
            <input
              v-model="email"
              type="email"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-green-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-200">Password</label>
          <div class="mt-2">
            <input
              v-model="password"
              type="password"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-green-500"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            Register
          </button>
        </div>

        <p v-if="error" class="text-red-400 text-center text-sm">
          {{ error }}
        </p>
        <p v-if="success" class="text-green-400 text-center text-sm">
          {{ success }}
        </p>
      </form>

      <p class="mt-10 text-center text-sm text-gray-400">
        Already have an account?
        <router-link to="/login" class="font-semibold text-green-400 hover:text-green-300">
          Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");
const router = useRouter();

const register = async () => {
  try {
    await api.post("/auth/register", {
      name: name.value,
      email: email.value,
      password: password.value
    });

    success.value = "Registered successfully! Redirecting to login...";
    error.value = "";

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (e) {
    error.value = e.response?.data?.message || "Registration failed";
    success.value = "";
  }
};
</script>
