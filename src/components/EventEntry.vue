<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  timeRange: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="event-item">
    <div class="event-item__content">
      <div class="event-item__header">
        <div class="event-item__title">{{ title }}</div>
        <div class="event-item__right-group">
          <div class="event-item__time">{{ timeRange }}</div>
          <div class="event-item__actions">
            <button class="event-item__edit-btn">
              <img src="@/assets/icons/Edit.png" alt="Edit" />
            </button>
          </div>
        </div>
      </div>
      <div class="event-item__divider-container">
        <div class="event-item__divider"></div>
        <div class="event-item__divider-spacer"></div>
      </div>
      <div class="event-item__location">{{ location }}</div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/main.scss" as *;

.event-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm;
  border-radius: 0.5rem;
  background-color: var(--primary-grey);
  margin: $spacing-sm $spacing-md;

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__title {
    font-weight: $font-weight-medium;
    font-size: $font-size-base;
  }

  &__right-group {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__time {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
  }

  &__divider-container {
    display: flex;
    align-items: center;
    margin: $spacing-xs 0;
    width: 100%;
  }

  &__divider {
    height: 1px;
    background-color: #000;
    opacity: 0.3;
    flex-grow: 1;
  }

  &__divider-spacer {
    width: 2rem;
  }

  &__location {
    font-size: $font-size-small;
    width: 100%;
  }

  &__actions {
    position: relative;
  }

  &__edit-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-xs;

    img {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
