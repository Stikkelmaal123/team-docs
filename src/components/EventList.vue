<script setup>
import { ref } from "vue";
const isVisible = ref(true);

const closeContainer = () => {
  isVisible.value = false;
};

defineExpose({
  isVisible,
  closeContainer,
});

</script>

<template>
  <div v-if="isVisible" class="event-list">
    <div class="event-list__header">
      <h2 class="event-list__title">Events for</h2>
      <img
        src="@/assets/icons/Close.png"
        alt="Close"
        class="event-list__close-icon"
        @click="closeContainer"
      />
    </div>
    <div class="event-list__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/main.scss" as *;

.event-list {
  width: 100%;
  max-width: 30rem;
  height: 95%;
  border-radius: 4px;
  border: 1px solid var(--primary-blue3);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: var(--background-white);

  &__header {
    background-color: var(--topmenu-blue);
    padding: $spacing-sm $spacing-md;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    color: var(--background-white);
    margin: 0;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
  }

  &__close-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  &__content {
    //Coming April 2024
  }
}
</style>
