<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:filters"]);

const selected = ref([]);

const options = [
  { label: "Virksomhed", value: "company" },
  { label: "Bruger", value: "user" },
  { label: "Lokation", value: "location" },
  { label: "Objekt", value: "object" },
  { label: "Skema", value: "schema" },
];

function toggle(value) {
  if (selected.value.includes(value)) {
    selected.value = selected.value.filter((v) => v !== value);
  } else {
    selected.value.push(value);
  }
  emit("update:filters", selected.value);
}
</script>
<template>
    <div class="filter">
      <div
        v-for="option in options"
        :key="option.value"
        class="filter__card"
        :class="{ 'filter__card--selected': selected.includes(option.value) }"
        @click="toggle(option.value)"
      >
        <input
          type="checkbox"
          class="filter__checkbox"
          :value="option.value"
          :checked="selected.includes(option.value)"
          readonly
        />
        <span class="filter__label">{{ option.label }}</span>
      </div>
    </div>
  </template>
  <style scoped lang="scss">
  .filter {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;

    &__card {
      border: 2px solid #ccc;
      border-radius: 10px;
      padding: 1rem 1.5rem;
      cursor: pointer;
      background-color: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: 0.2s;

      &--selected {
        border-color: #007bff;
        background-color: #e6f0ff;
      }
    }

    &__checkbox {
      pointer-events: none;
      accent-color: #007bff;
    }

    &__label {
      font-weight: 500;
    }
  }
  </style>
