<template>
  <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <input v-model="form.name" class="input" />
    <input v-model.number="form.latitude" class="input" />
    <input v-model.number="form.longitude" class="input" />

    <select v-model="form.status" class="input">
      <option>Active</option>
      <option>Inactive</option>
    </select>

    <input v-model.number="form.powerOutput" class="input" />
    <input v-model="form.connectorType" class="input" />

    <button
      :disabled="loading"
      class="md:col-span-3 bg-blue-500 hover:bg-blue-400 text-white py-2 rounded font-semibold disabled:opacity-50"
    >
      <span v-if="!loading">Edit Charging Station</span>
      <span v-else>Saving...</span>
    </button>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import api from "../services/api";

const props = defineProps(["station"]);
const emit = defineEmits(["done"]);

const loading = ref(false);

const form = reactive({
  name: "",
  latitude: "",
  longitude: "",
  status: "Active",
  powerOutput: "",
  connectorType: "",
});

watch(
  () => props.station,
  (val) => {
    if (val) {
      Object.assign(form, val);
    }
  },
  { immediate: true }
);

const submit = async () => {
  loading.value = true;
  try {
    await api.put(`/stations/${props.station._id}`, form);
    emit("done");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@reference "tailwindcss";

.input {
  @apply bg-gray-700 text-white p-2 rounded outline-none focus:ring-2 focus:ring-green-500;
}
</style>
