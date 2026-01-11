<template>
  <div>
    <div class="flex flex-wrap gap-4 mb-4">
      <select v-model="status" class="input">
        <option value="">All Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <input v-model="connector" placeholder="Connector Type" class="input" />
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div v-for="s in filteredStations" :key="s._id" class="p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-green-400">{{ s.name }}</h3>
        <p>Status: {{ s.status }}</p>
        <p>Power: {{ s.powerOutput }} kW</p>
        <p>Connector: {{ s.connectorType }}</p>
        <div class="grid grid-cols-2 gap-2">
          <button
            @click="editStation(s)"
            class="mt-2 mr-2 bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded"
          >
            Edit
          </button>
          <button @click="remove(s._id)" class="mt-2 bg-red-500 hover:bg-red-400 px-3 py-1 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import api from "../services/api";

const props = defineProps(["stations"]);
const emit = defineEmits(["refresh", "edit"]);

const status = ref("");
const connector = ref("");

const filteredStations = computed(() => {
  return props.stations.filter((s) => {
    return (
      (!status.value || s.status === status.value) &&
      (!connector.value || s.connectorType.toLowerCase().includes(connector.value.toLowerCase()))
    );
  });
});

const remove = async (id) => {
  await api.delete(`/stations/${id}`);
  emit("refresh");
};

const editStation = (station) => {
  emit("edit", station);
};
</script>

<style scoped>
@reference "tailwindcss";

.input {
  @apply bg-gray-700 text-white p-2 rounded outline-none focus:ring-2 focus:ring-green-500;
}
</style>
