<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:filter"]);
const selected = ref("");

const options = [
  { label: "Virksomhed", value: "company"},
  { label: "Bruger", value: "user" },
  { label: "Lokation", value: "location"},
  { label: "Objekt", value: "object" },
  { label: "Skema", value: "schema"},
];

function select(value) {
  selected.value = value;
  emit("update:filter", value);
}
</script>

<template>
  <div class="filter">
    <button
      v-for="option in options"
      :key="option.value"
      :class="['filter__button', { 'filter__button--active': selected === option.value }]"
      @click="select(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.filter__button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
.filter__button--active {
  background-color: #e0f0ff;
  border-color: #007bff;
}
</style>