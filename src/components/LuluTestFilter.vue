<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:filter"]);
const selected = ref("");

const options = [
  { label: "Virksomhed", value: "company" },
  { label: "Bruger", value: "user" },
  { label: "Lokation", value: "location" },
  { label: "Objekt", value: "object" },
  { label: "Skema", value: "schema" },
];

function select(value) {
  selected.value = selected.value === value ? "" : value;
  emit("update:filter", selected.value);
}
</script>

<template>
     <div class="filter">
    <div
      v-for="option in options"
      :key="option.value"
      :class="['filter__card', { 'filter__card--active': selected === option.value }]"
      @click="select(option.value)"
    >
      <!-- Icon Placeholder (replace with real icons if needed) -->
      <div class="filter__icon"></div>
      <div class="filter__label">{{ option.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 80px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filter__card--active {
  border-color: #3391ff;
}

.filter__icon {
  width: 18px;
  height: 18px;
  background-color: #c4c4c4;
  border-radius: 4px;
  margin-bottom: 0.4rem;
}

.filter__label {
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}
</style>