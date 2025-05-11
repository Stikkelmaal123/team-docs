<script setup>
import { ref } from "vue";
import buildingIcon from "@/assets/icons/Company.png";
import userIcon from "@/assets/icons/users.png";
import locationIcon from "@/assets/icons/Folder.png";
import objectIcon from "@/assets/icons/Objects.png";
import schemaIcon from "@/assets/icons/schedule.png";

const emit = defineEmits(["update:filter"]);
const selected = ref("");

const options = [
  {
    label: "Virksomhed",
    value: "company",
    icon: buildingIcon,
  },
  {
    label: "Bruger",
    value: "user",
    icon: userIcon,
  },
  {
    label: "Lokation",
    value: "location",
    icon: locationIcon,
  },
  {
    label: "Objekt",
    value: "object",
    icon: objectIcon,
  },
  {
    label: "Skema",
    value: "schema",
    icon: schemaIcon,
  },
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
      <span class="filter__radio">
        <span class="filter__radio-dot" />
      </span>
      <div class="filter__content">
        <img :src="option.icon" alt="Icons" class="filter__icon" />
        <div class="filter__label">{{ option.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  margin-left: 1.5rem;
}

.filter__card {
  position: relative;
  width: 120px;
  height: 110px;
  border: 1.5px solid #4f9dd1;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1.5rem;
}

.filter__card--active {
  background-color: #dceaf6;
}

/* RADIO OUTLINE CIRCLE */
.filter__radio {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 14px;
  height: 14px;
  border: 2px solid #333;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* SMALL inner dot (only visible when active) */
.filter__card--active .filter__radio-dot {
  width: 6px;
  height: 6px;
  background-color: #333;
  border-radius: 50%;
}

/* Holds icon + label, pushes them to lower center */
.filter__content {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Icon placeholder */
.filter__icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  margin-bottom: 0.3rem;
}

.filter__label {
  font-size: 0.85rem;
  font-weight: 600;
}
</style>