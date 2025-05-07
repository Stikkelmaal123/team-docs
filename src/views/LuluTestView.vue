<script setup>
import { ref, computed } from "vue";
import LuluTestFilter from "@/components/LuluTestFilter.vue";

const selectedFilter = ref("");
const selectedValue = ref("");

// Dummy data
const allData = ref([
  { id: 1, user: "John", object: "Objekt A" },
  { id: 2, user: "Alice", object: "Objekt B" },
  { id: 3, user: "John", object: "Objekt C" },
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
          {{ item.user }} – {{ item.object }}
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