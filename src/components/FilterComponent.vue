<script setup>
import { ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
    required: true,
  },
  initialActive: {
    type: Boolean,
    default: false,
  },
});

const isActive = ref(props.initialActive);

const toggleActive = () => {
  isActive.value = !isActive.value;
};

defineExpose({
  isActive,
});
</script>

<template>
  <div class="filter-option" :class="{ 'filter-option--active': isActive }" @click="toggleActive">
    <div class="filter-option__indicator">
      <div v-if="isActive" class="filter-option__indicator-dot"></div>
    </div>

    <div class="filter-option__content">
      <div class="filter-option__icon">
        <img :src="iconSrc" :alt="label" />
      </div>

      <div class="filter-option__label">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/main.scss" as *;

.filter-option {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  border-radius: 8p.5rem;
  border: 1px solid var(--primary-blue3);
  padding: $spacing-md;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  background-color: var(--background-white);

  &--active {
    background-color: var(--primary-blue1);
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: $spacing-4xl;
  }

  &__indicator {
    position: absolute;
    top: $spacing-md;
    right: $spacing-md;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__indicator-dot {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: #000;
  }

  &__icon {
    margin-bottom: $spacing-md;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 2.5rem;
      height: 2.5rem;
      object-fit: contain;
    }
  }

  &__label {
    font-size: $font-size-large;
    font-weight: $font-weight-medium;
    text-align: center;
  }
}
</style>
