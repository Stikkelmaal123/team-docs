<script setup>
import { ref } from "vue";
import DateInput from "@/components/DateInput.vue";
import DropdownSelector from "@/components/DropdownSelector.vue";

const isVisible = ref(false);
const startDate = ref("");
const endDate = ref("");
const selectedSchedule = ref("");
const selectedLocation = ref("");
const selectedUser = ref("");
const selectedObject = ref("");

//Mocky-mocks for now
const scheduleOptions = ["Schedule-test-1", "Schedule-test-2"];
const locationOptions = ["UCL", "Pound Town"];
const userOptions = ["Users-1", "User-2"];
const objectOptions = ["Woman-1", "Woman-2"];

const closeContainer = () => {
  isVisible.value = false;
};

const saveChanges = () => {
  // Coming April 2024
  closeContainer();
};

const discardChanges = () => {
  // Coming this spring
  closeContainer();
};

defineExpose({
  isVisible,
  closeContainer,
});
</script>

<template>
  <div v-if="isVisible" class="event-edit__overlay">
    <div class="event-edit__backdrop" @click="closeContainer"></div>
    <div class="event-edit">
      <div class="event-edit__header">
        <h2 class="event-edit__title">Rediger Event</h2>
        <img
          src="@/assets/icons/Close.png"
          alt="Close"
          class="event-edit__close-icon"
          @click="closeContainer"
        />
      </div>
      <div class="event-edit__content">
        <div class="form-container">
          <DateInput v-model="startDate" label="Start dato" />

          <DateInput v-model="endDate" label="Slut dato" />

          <DropdownSelector v-model="selectedSchedule" :options="scheduleOptions" label="Skema" />

          <DropdownSelector
            v-model="selectedLocation"
            :options="locationOptions"
            label="Lokation"
          />

          <DropdownSelector v-model="selectedUser" :options="userOptions" label="Bruger" />

          <DropdownSelector v-model="selectedObject" :options="objectOptions" label="Objekt" />

          <div class="event-edit__actions">
            <button class="event-edit__button event-edit__button--save" @click="saveChanges">
              Gem
            </button>
            <button class="event-edit__button event-edit__button--discard" @click="discardChanges">
              Annuller
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/main.scss" as *;
@use "sass:color";

.event-edit {
  position: relative;
  width: 100%;
  max-width: 30rem;
  max-height: 95vh;
  border-radius: 4px;
  border: 1px solid var(--primary-blue3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  background-color: var(--background-white);
  z-index: 1002;

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
    max-height: calc(95vh - 60px); /* Adjust based on header height */
    overflow-y: auto;
    padding: $spacing-md;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  &__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 1001;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: $spacing-md;
    margin-top: $spacing-lg;
  }

  &__button {
    padding: $spacing-sm $spacing-lg;
    border-radius: 4px;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;

    &--save {
      background-color: var(--button-green);
      color: var(--background-white);

      &:hover {
        background-color: color.adjust(#97ce75, $lightness: -10%);
      }
    }

    &--discard {
      background-color: var(--background-white);
      border: 1px solid #e0e0e0;
      color: #666;

      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}
</style>
