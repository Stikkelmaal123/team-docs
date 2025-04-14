<script setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Vælg...",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit("update:modelValue", option);
  isOpen.value = false;
};

const closeDropdown = (event) => {
  if (!event.target.closest(".dropdown")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div class="dropdown">
    <label class="dropdown__label">{{ label }}</label>
    <div class="dropdown__container">
      <div class="dropdown__header" @click.stop="toggleDropdown">
        <span class="dropdown__selected">{{ modelValue || placeholder }}</span>
        <span class="dropdown__arrow">▼</span>
      </div>
      <div v-if="isOpen" class="dropdown__menu">
        <div
          v-for="option in options"
          :key="option"
          class="dropdown__item"
          @click="selectOption(option)"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss" as *;

.dropdown {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  &__label {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: #333;
  }

  &__container {
    position: relative;
    width: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-sm;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: #f8f9fa;
    cursor: pointer;
    height: 38px;
  }

  &__arrow {
    font-size: 10px;
    color: #666;
  }

  &__menu {
    position: absolute;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: white;
    z-index: 1003;
    margin-top: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &__item {
    padding: $spacing-sm;
    cursor: pointer;

    &:hover {
      background-color: #f1f3f5;
    }
  }

  &__selected {
    color: #666;
  }
}
</style>
