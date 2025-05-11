<script setup>
import { ref, computed } from "vue";
import LuluTestFilter from "@/components/LuluTestFilter.vue";

const selectedFilter = ref("");
const selectedValue = ref("");
const searchQuery = ref("");
const showSuggestions = ref(false);

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

const dropdownOptions = computed(() => {
  if (!selectedFilter.value) return [];

  const all = allData.value.map((item) => item[selectedFilter.value]);
  const unique = [...new Set(all)];

  if (!searchQuery.value) return unique;

  return unique.filter((val) =>
    val.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filteredData = computed(() => {
  if (!selectedFilter.value || !selectedValue.value) {
    return allData.value;
  }

  return allData.value.filter(
    (item) => item[selectedFilter.value] === selectedValue.value
  );
});

function onFilterChange(filterKey) {
  selectedFilter.value = filterKey;
  selectedValue.value = "";
  searchQuery.value = "";
  showSuggestions.value = false;
}

function selectOption(option) {
  selectedValue.value = option;
  searchQuery.value = option;
  showSuggestions.value = false;
}

function onSearchInput() {
  selectedValue.value = ""; // Clear previous selection while typing
  showSuggestions.value = true; // Ensure dropdown stays visible
}
</script>

<template>
  <div class="test-view">
    <!-- Filter buttons component -->
    <LuluTestFilter @update:filter="onFilterChange" />

    <!-- Searchable dropdown shown when a filter is selected -->
    <div v-if="selectedFilter" class="test-view__dropdown">
  <label>
    Vælg:
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Søg..."
      @focus="showSuggestions = true"
      @input="onSearchInput"
      @blur="() => setTimeout(() => (showSuggestions = false), 150)"
    />
  </label>

  <ul v-if="showSuggestions" class="suggestion-list">
    <li
      v-if="dropdownOptions.length"
      v-for="option in dropdownOptions"
      :key="option"
      @click="selectOption(option)"
    >
      {{ option }}
    </li>
    <li v-else class="suggestion-list__empty">
      Ingen resultater
    </li>
  </ul>
</div>

    <!-- Filtered data results -->
    <div class="test-view__list">
      <h3>Resultater</h3>
      <ul>
        <li v-for="item in filteredData" :key="item.id">
          {{ item.company }} – {{ item.user }} – {{ item.location }} – {{ item.object }} – {{ item.schema }}
        </li>
      </ul>
      <p v-if="filteredData.length === 0">Ingen resultater fundet.</p>
    </div>
  </div>
</template>

<style scoped>
.test-view__dropdown {
  max-width: 600px; /* Matches width of filter row */
  width: 100%;
  margin-bottom: 1.5rem;
}

.test-view__dropdown label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
  margin-left: 1.5rem;
}

.test-view__dropdown input {
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  width: 42rem;
  box-sizing: border-box;
}
.suggestion-list {
  position: absolute;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0.2rem 0 0;
  margin-left: 1.5rem;
  border: 1px solid #ccc;
  background: white;
  max-height: 150px;
  overflow-y: auto;
  width: 42rem;
}

.suggestion-list li {
  padding: 0.4rem 0.6rem;
  cursor: pointer;
}

.suggestion-list li:hover {
  background-color: #f0f0f0;
}

.test-view__dropdown {
  position: relative;
  margin-bottom: 1rem;
}

.suggestion-list__empty {
  padding: 0.4rem 0.6rem;
  color: #888;
  font-style: italic;
}
</style>