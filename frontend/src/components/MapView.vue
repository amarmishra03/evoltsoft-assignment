<template>
  <div class="bg-gray-800 rounded-xl p-4 mt-6">
    <h2 class="text-green-400 font-semibold mb-2">Charging Stations Map</h2>
    <l-map style="height: 400px" :zoom="5" :center="center">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <l-marker v-for="s in stations" :key="s._id" :lat-lng="[s.latitude, s.longitude]">
        <l-popup>
          <b>{{ s.name }}</b
          ><br />
          Status: {{ s.status }}<br />
          Power: {{ s.powerOutput }} kW<br />
          Connector: {{ s.connectorType }}
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  shadowUrl,
});

import { ref } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

defineProps(["stations"]);

const center = ref([20.5937, 78.9629]); // India
</script>
