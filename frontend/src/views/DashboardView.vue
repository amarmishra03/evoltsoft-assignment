<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-green-400 mb-6">EV Charging Stations</h1>

      <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
        <!-- Filters -->
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select v-model="status" class="bg-gray-700 text-white p-2 rounded w-full sm:w-auto">
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <input
            v-model="connector"
            placeholder="Connector Type"
            class="bg-gray-700 text-white p-2 rounded w-full sm:w-auto"
          />

          <input
            v-model="power"
            type="number"
            placeholder="Min Power (kW)"
            class="bg-gray-700 text-white p-2 rounded w-full sm:w-36"
          />
        </div>

        <!-- Add Button -->
        <button
          @click="openAddModal"
          class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded font-semibold w-full md:w-auto"
        >
          Add Station
        </button>
      </div>

      <div class="bg-gray-800 p-4 rounded-xl shadow">
        <div v-if="loading" class="flex justify-center items-center py-10">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-green-400"></div>
        </div>

        <div v-else-if="filteredStations.length === 0" class="text-center py-10 text-gray-400">
          No matching results...
        </div>

        <ChargerList
          v-else
          :stations="filteredStations"
          @refresh="loadStations"
          @edit="openEditModal"
        />
      </div>

      <!-- ADD MODAL -->
      <div
        v-if="showAddModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      >
        <div class="bg-gray-800 pt-10 p-6 rounded-xl w-full max-w-2xl relative">
          <button
            @click="closeAddModal"
            class="absolute top-1 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
          <ChargerForm @refresh="afterAdd" />
        </div>
      </div>

      <!-- EDIT MODAL -->
      <div
        v-if="showEditModal"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      >
        <div class="bg-gray-800 pt-10 p-6 rounded-xl w-full max-w-2xl relative">
          <button
            @click="closeEditModal"
            class="absolute top-1 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
          <EditChargerForm :station="editStation" @done="afterEdit" />
        </div>
      </div>
    </div>
    <MapView :stations="stations" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../services/api";
import ChargerForm from "../components/ChargerForm.vue";
import ChargerList from "../components/ChargerList.vue";
import EditChargerForm from "../components/EditChargerForm.vue";
import MapView from "../components/MapView.vue";

const stations = ref([]);
const status = ref("");
const connector = ref("");
const power = ref("");

const showAddModal = ref(false);
const showEditModal = ref(false);
const editStation = ref(null);
const loading = ref(false);

const loadStations = async () => {
  loading.value = true;
  try {
    const res = await api.get("/stations");
    stations.value = res.data;
  } finally {
    loading.value = false;
  }
};

const filteredStations = computed(() => {
  return stations.value.filter((s) => {
    const matchStatus = !status.value || s.status === status.value;
    const matchConnector =
      !connector.value || s.connectorType.toLowerCase().includes(connector.value.toLowerCase());
    const matchPower = !power.value || Number(s.powerOutput) >= Number(power.value);

    return matchStatus && matchConnector && matchPower;
  });
});

const openAddModal = () => (showAddModal.value = true);
const closeAddModal = () => (showAddModal.value = false);

const openEditModal = (station) => {
  editStation.value = station;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editStation.value = null;
};

const afterAdd = () => {
  loadStations();
  closeAddModal();
};

const afterEdit = () => {
  loadStations();
  closeEditModal();
};

onMounted(loadStations);
</script>
