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
      class="md:col-span-3 bg-green-500 hover:bg-green-400 text-white py-2 rounded font-semibold"
    >
      {{ editId ? "Edit Charging Station" : "Add Charging Station" }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import api from "../services/api";

const emit = defineEmits(["refresh", "clearEdit"]);
const props = defineProps(["editData"]);

const name = ref("");
const latitude = ref("");
const longitude = ref("");
const status = ref("Active");
const powerOutput = ref("");
const connectorType = ref("");
const editId = ref(null);

watch(
  () => props.editData,
  (val) => {
    if (val) {
      name.value = val.name;
      latitude.value = val.latitude;
      longitude.value = val.longitude;
      status.value = val.status;
      powerOutput.value = val.powerOutput;
      connectorType.value = val.connectorType;
      editId.value = val._id;
    }
  }
);

const resetForm = () => {
  name.value = "";
  latitude.value = "";
  longitude.value = "";
  status.value = "Active";
  powerOutput.value = "";
  connectorType.value = "";
  editId.value = null;
  emit("clearEdit");
};

const submit = async () => {
  const data = {
    name: name.value,
    latitude: latitude.value,
    longitude: longitude.value,
    status: status.value,
    powerOutput: powerOutput.value,
    connectorType: connectorType.value,
  };

  if (editId.value) {
    await api.put(`/stations/${editId.value}`, data);
  } else {
    await api.post("/stations", data);
  }

  resetForm();
  emit("refresh");
};
</script>

<style scoped>
@reference "tailwindcss";

.input {
  @apply bg-gray-700 text-white p-2 rounded outline-none focus:ring-2 focus:ring-green-500;
}
</style>
