<template>
  <div class="flex gap-4">
    <select
      :value="status"
      @change="$emit('updateStatus', $event.target.value)"
      class="bg-gray-700 text-white p-2 rounded"
    >
      <option value="">All Status</option>
      <option>Active</option>
      <option>Inactive</option>
    </select>

    <input
      :value="connector"
      @input="$emit('updateConnector', $event.target.value)"
      placeholder="Connector Type"
      class="bg-gray-700 text-white p-2 rounded"
    />
  </div>
</template>

<script setup>
defineProps(["status", "connector"]);
</script>
