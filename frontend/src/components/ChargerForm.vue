<template>
  <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <input v-model="name" placeholder="Station Name" class="input" />
    <input v-model.number="latitude" placeholder="Latitude" class="input" />
    <input v-model.number="longitude" placeholder="Longitude" class="input" />

    <select v-model="status" class="input">
      <option>Active</option>
      <option>Inactive</option>
    </select>

    <input v-model.number="powerOutput" placeholder="Power (kW)" class="input" />
    <input v-model="connectorType" placeholder="Connector Type" class="input" />

    <button
      :disabled="loading"
      class="md:col-span-3 bg-green-500 hover:bg-green-400 text-white py-2 rounded font-semibold disabled:opacity-50"
    >
      <span v-if="!loading">Add Charging Station</span>
      <span v-else>Adding...</span>
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";

const emit = defineEmits(["refresh"]);

const name = ref("");
const latitude = ref("");
const longitude = ref("");
const status = ref("Active");
const powerOutput = ref("");
const connectorType = ref("");
const loading = ref(false);

const resetForm = () => {
  name.value = "";
  latitude.value = "";
  longitude.value = "";
  status.value = "Active";
  powerOutput.value = "";
  connectorType.value = "";
};

const submit = async () => {
  loading.value = true;
  try {
    await api.post("/stations", {
      name: name.value,
      latitude: latitude.value,
      longitude: longitude.value,
      status: status.value,
      powerOutput: powerOutput.value,
      connectorType: connectorType.value,
    });
    resetForm();
    emit("refresh");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.input {
  @apply bg-gray-700 text-white p-2 rounded outline-none focus:ring-2 focus:ring-green-500;
}
</style>
