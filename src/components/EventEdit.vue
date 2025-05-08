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
  <div v-if="isVisible" class="event-modal__overlay">
    <div class="event-modal__backdrop" @click="closeContainer"></div>
    <div class="event-modal">
      <div class="event-modal__header">
        <h2 class="event-modal__title">Rediger Event</h2>
        <img
          src="@/assets/icons/Close.png"
          alt="Close"
          class="event-modal__close-icon"
          @click="closeContainer"
        />
      </div>
      <div class="event-modal__content">
        <div class="event-modal__form-container">
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

          <div class="event-modal__actions">
            <button class="event-modal__button event-modal__button--save" @click="saveChanges">
              Gem
            </button>
            <button
              class="event-modal__button event-modal__button--discard"
              @click="discardChanges"
            >
              Annuller
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
