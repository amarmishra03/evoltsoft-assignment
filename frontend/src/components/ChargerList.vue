<template>
  <div>
    <div class="grid gap-4 md:grid-cols-3">
      <div v-for="s in stations" :key="s._id" class="bg-gray-800 p-4 rounded-lg shadow-2xl">
        <h3 class="text-lg font-semibold text-green-400">{{ s.name }}</h3>
        <p>Status: {{ s.status }}</p>
        <p>Power: {{ s.powerOutput }} kW</p>
        <p>Connector: {{ s.connectorType }}</p>

        <div class="grid grid-cols-2 gap-2 mt-2">
          <button
            @click="$emit('edit', s)"
            class="mr-2 bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            @click="remove(s._id)"
            :disabled="deletingId === s._id"
            class="bg-red-500 hover:bg-red-400 px-3 py-1 rounded flex items-center justify-center disabled:opacity-50"
          >
            <span v-if="deletingId !== s._id">Delete</span>
            <span v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";

defineProps(["stations"]);
const emit = defineEmits(["refresh", "edit"]);

const deletingId = ref(null);

const remove = async (id) => {
  deletingId.value = id;
  try {
    await api.delete(`/stations/${id}`);
    emit("refresh");
  } finally {
    deletingId.value = null;
  }
};
</script>
