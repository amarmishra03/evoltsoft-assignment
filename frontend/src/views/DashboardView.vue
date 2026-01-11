<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-green-400 mb-6">EV Charging Stations</h1>

      <div class="bg-gray-800 p-4 rounded-xl shadow mb-6">
        <ChargerForm :editData="editData" @refresh="loadStations" @clearEdit="clearEdit" />
      </div>

      <div class="bg-gray-800 p-4 rounded-xl shadow">
        <ChargerList :stations="stations" @refresh="loadStations" @edit="startEdit" />
      </div>
    </div>
    <MapView :stations="stations" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import ChargerForm from "../components/ChargerForm.vue";
import ChargerList from "../components/ChargerList.vue";
import MapView from "../components/MapView.vue";

const stations = ref([]);

const loadStations = async () => {
  const res = await api.get("/stations");
  stations.value = res.data;
};

const editData = ref(null);

const startEdit = (station) => {
  editData.value = station;
};

const clearEdit = () => {
  editData.value = null;
};

onMounted(loadStations);
</script>
