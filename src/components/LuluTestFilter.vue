<script setup>
import { ref } from "vue";
import buildingIcon from "@/assets/icons/Company.png";
import userIcon from "@/assets/icons/users.png";
import locationIcon from "@/assets/icons/Folder.png";
import objectIcon from "@/assets/icons/Objects.png";
import scheduleIcon from "@/assets/icons/schedule.png";

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
    value: "schedule",
    icon: scheduleIcon,
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

<style scoped lang="scss">
.filter {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  &__card {
    position: relative;
    width: 7.5rem;
    height: 6.875rem;
    border: 0.094rem solid #4f9dd1;
    border-radius: 0.25rem;
    background-color: #ffffff;
    cursor: pointer;
    transition: all 0.2s ease;

    &--active {
      background-color: #dceaf6;
    }
  }

  &__radio {
    position: absolute;
    top: 0.375rem;
    right: 0.375rem;
    width: 0.875rem;
    height: 0.875rem;
    border: 0.125rem solid #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__card--active &__radio-dot {
    width: 0.375rem;
    height: 0.375rem;
    background-color: #333;
    border-radius: 50%;
  }

  &__content {
    position: absolute;
    bottom: 0.625rem;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__icon {
    width: 1.75rem;
    height: 1.75rem;
    object-fit: contain;
    margin-bottom: 0.3rem;
  }

  &__label {
    font-size: 0.85rem;
    font-weight: 600;
  }
}
</style>
