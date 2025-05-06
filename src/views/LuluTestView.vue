<script setup>
import { ref } from "vue";
import LuluTestFilter from "@/components/LuluTestFilter.vue";

const selectedFilters = ref([]);
const selectedOptions = ref({});

const dummyList = [
  "Option A",
  "Option B",
  "Option C",
];

function handleFiltersChange(values) {
  selectedFilters.value = values;

  for (const key of Object.keys(selectedOptions.value)) {
    if (!values.includes(key)) {
      delete selectedOptions.value[key];
    }
  }
}

function getLabel(filter) {
  switch (filter) {
  case "company":
    return "Virksomhed";
  case "user":
    return "Bruger";
  case "location":
    return "Lokation";
  case "object":
    return "Objekt";
  case "schema":
    return "Skema";
  default:
    return filter;
  }
}
</script>

<template>
    <div class="test-view">
      <LuluTestFilter @update:filters="handleFiltersChange" />
      <div
        v-if="selectedFilters.length > 0"
        class="test-view__dropdowns"
      >
        <div
          v-for="filter in selectedFilters"
          :key="filter"
          class="test-view__dropdown"
        >
          <label :for="`select-${filter}`">{{ getLabel(filter) }}:</label>
          <select
            :id="`select-${filter}`"
            v-model="selectedOptions[filter]"
          >
            <option disabled value="">Vælg...</option>
            <option
              v-for="item in dummyList"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.test-view__dropdowns {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.test-view__dropdown {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  select {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
}
</style>
