<script setup>
import { ref, computed } from "vue";
import LuluTestFilter from "@/components/LuluTestFilter.vue";

const selectedFilter = ref("");
const selectedValue = ref("");

// Dummy data
const allData = ref([
  {
    id: 1,
    company: "Firma A",
    user: "John",
    location: "København",
    object: "Objekt A",
    schema: "Skema 1",
  },
  {
    id: 2,
    company: "Firma B",
    user: "Alice",
    location: "Aarhus",
    object: "Objekt B",
    schema: "Skema 2",
  },
  {
    id: 3,
    company: "Firma A",
    user: "John",
    location: "Odense",
    object: "Objekt C",
    schema: "Skema 3",
  },
]);

const filterOptions = computed(() => {
  if (!selectedFilter.value) return [];
  const values = allData.value.map((item) => item[selectedFilter.value]);
  return [...new Set(values)];
});

// Filter list
const filteredData = computed(() => {
  if (!selectedFilter.value || !selectedValue.value) {
    return allData.value;
  }
  return allData.value.filter(
    (item) => item[selectedFilter.value] === selectedValue.value,
  );
});

function onFilterChange(filterKey) {
  selectedFilter.value = filterKey;
  selectedValue.value = ""; // reset on new selection
}
</script>

<template>
  <div class="test-view">
    <LuluTestFilter @update:filter="onFilterChange" />
    <div v-if="selectedFilter" class="test-view__dropdown">
      <label>
        Vælg:
        <select v-model="selectedValue">
          <option disabled value="">Vælg...</option>
          <option v-for="option in filterOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </label>
    </div>
    <div class="test-view__list">
      <h3>Resultater</h3>
      <ul>
        <li v-for="item in filteredData" :key="item.id">
          {{ item.company }} – {{ item.user }} – {{ item.location }} – {{ item.object }} – {{ item.schema }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.test-view {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.test-view__dropdown {
  margin-bottom: 1rem;
}

.test-view__list ul {
  padding-left: 1rem;
}
</style>