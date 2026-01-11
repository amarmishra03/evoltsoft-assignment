<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 bg-gray-900 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-12 w-auto"
        src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
        alt="EV Logo"
      />
      <h2 class="mt-8 text-center text-2xl font-bold tracking-tight text-green-400">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="login">
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
            :disabled="loading"
            class="flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400 disabled:opacity-50"
          >
            <span v-if="!loading">Sign in</span>
            <span v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
          </button>
        </div>

        <p v-if="error" class="text-red-400 text-center text-sm">
          {{ error }}
        </p>
      </form>

      <p class="mt-10 text-center text-sm text-gray-400">
        Don’t have an account?
        <router-link to="/register" class="font-semibold text-green-400 hover:text-green-300">
          Register Now
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const loading = ref(false);

const login = async () => {
  loading.value = true;
  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", res.data.token);
    router.push("/dashboard");
  } catch {
    error.value = "Invalid credentials";
  } finally {
    loading.value = false;
  }
};
</script>
