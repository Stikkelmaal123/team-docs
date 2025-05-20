<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";

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
  searchable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const searchTerm = ref("");
const searchMode = ref(false);
const inputRef = ref(null);

const filteredOptions = computed(() => {
  if (!searchTerm.value) return props.options;
  const term = searchTerm.value.toLowerCase();
  return props.options.filter((option) => option.toLowerCase().includes(term));
});

const displayValue = computed(() => {
  if (searchMode.value) return searchTerm.value;
  return props.modelValue || props.placeholder;
});

const toggleDropdown = () => {
  if (!isOpen.value) {
    openDropdown();
  } else {
    closeDropdown();
  }
};

const openDropdown = () => {
  isOpen.value = true;
  if (props.searchable) {
    searchMode.value = true;
    searchTerm.value = "";
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    });
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  searchMode.value = false;
  searchTerm.value = "";
};

const selectOption = (option) => {
  emit("update:modelValue", option);
  closeDropdown();
};

const handleClickOutside = (event) => {
  if (!event.target.closest(".dropdown")) {
    closeDropdown();
  }
};

const handleKeydown = (event) => {
  if (!isOpen.value) return;

  if (event.key === "Escape") {
    closeDropdown();
  } else if (event.key === "Enter" && filteredOptions.value.length === 1) {
    selectOption(filteredOptions.value[0]);
  }
};

const handleInputClick = (event) => {
  event.stopPropagation();
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="dropdown">
    <label class="dropdown__label">{{ label }}</label>
    <div class="dropdown__container">
      <div class="dropdown__header" @click.stop="toggleDropdown">
        <div class="dropdown__input-container">
          <input
            v-if="searchMode"
            ref="inputRef"
            type="text"
            v-model="searchTerm"
            class="dropdown__search-input"
            placeholder="Søg..."
            @click="handleInputClick"
          />
          <span v-else class="dropdown__selected">{{ displayValue }}</span>
        </div>
        <span class="dropdown__arrow" :class="{ 'dropdown__arrow--open': isOpen }">▼</span>
      </div>
      <div v-if="isOpen" class="dropdown__menu">
        <div class="dropdown__items">
          <div
            v-for="option in filteredOptions"
            :key="option"
            class="dropdown__item"
            :class="{ 'dropdown__item--selected': option === modelValue }"
            @click="selectOption(option)"
          >
            {{ option }}
          </div>
          <div v-if="filteredOptions.length === 0" class="dropdown__no-results">
            Ingen resultater fundet
          </div>
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

  &__input-container {
    flex-grow: 1;
    overflow: hidden;
  }

  &__search-input {
    width: 100%;
    padding: 0;
    border: none;
    background: transparent;
    font-size: $font-size-base;
    color: #333;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #666;
    }
  }

  &__arrow {
    font-size: 10px;
    color: #666;
    transition: transform 0.2s ease;
    flex-shrink: 0;
    margin-left: $spacing-sm;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__menu {
    position: absolute;
    width: 100%;
    max-height: 250px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: white;
    z-index: 1003;
    margin-top: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }

  &__items {
    overflow-y: auto;
    max-height: 200px;
  }

  &__item {
    padding: $spacing-sm;
    cursor: pointer;

    &:hover {
      background-color: #f1f3f5;
    }

    &--selected {
      background-color: #e6f7ff;
      font-weight: $font-weight-medium;
    }
  }

  &__no-results {
    padding: $spacing-sm;
    color: #666;
    font-style: italic;
    text-align: center;
  }

  &__selected {
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
