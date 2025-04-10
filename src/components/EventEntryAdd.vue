<script setup></script>

<template>
  <div class="event-list__add">
    <button class="event-list__add-btn">
      <img src="@/assets/icons/Add.png" alt="Add new event icon" />
    </button>
  </div>
</template>

<style lang="scss">
@use "@/assets/main.scss" as *;

.event-list {
  &__add {
    display: flex;
    justify-content: right;
    margin: $spacing-sm $spacing-md;
    background-color: var(--primary-grey);
    border-radius: 0.5rem;
    padding: $spacing-sm;
  }

  &__add-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &:hover {
      background-color: var(--primary-grey);
    }

    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
