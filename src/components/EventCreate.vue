<script setup>
import { ref } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase"; // Make sure path is correct
import DateInput from "@/components/DateInput.vue";
import DropdownSelector from "@/components/DropdownSelector.vue";

const isVisible = ref(false);
const startDate = ref("");
const endDate = ref("");
const selectedSchedule = ref("");
const selectedLocation = ref("");
const selectedUser = ref("");
const selectedObject = ref("");
const isLoading = ref(false);

//Mocky-mocks for now
const scheduleOptions = ["Schedule-test-1", "Schedule-test-2"];
const locationOptions = ["UCL", "Pound Town"];
const userOptions = ["Users-1", "User-2"];
const objectOptions = ["Woman-1", "Woman-2"];

const closeContainer = () => {
  isVisible.value = false;
};

const formatDateForFirestore = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/").map(Number);
  // (months are 0-indexed in JS)
  const date = new Date(year, month - 1, day);
  return isNaN(date.getTime()) ? null : date;
};

const saveChanges = async () => {
  try {
    isLoading.value = true;
    const formattedStartDate = formatDateForFirestore(startDate.value);
    const formattedEndDate = formatDateForFirestore(endDate.value);
    if (!formattedStartDate) {
      alert("Invalid start date format. Please use dd/mm/yyyy");
      return;
    }

    const eventData = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      schedule: selectedSchedule.value,
      location: selectedLocation.value,
      user: selectedUser.value,
      object: selectedObject.value,
      createdAt: serverTimestamp(),
    };

    const eventsRef = collection(db, "events");
    await addDoc(eventsRef, eventData);

    alert("Event saved successfully!");
    closeContainer();
  } catch (error) {
    console.error("Error saving event:", error);
    alert("Error saving event: " + (error.message || "Unknown error"));
  } finally {
    isLoading.value = false;
  }
};

const discardChanges = () => {
  closeContainer();
};

defineExpose({
  isVisible,
  closeContainer,
});
</script>

<template>
  <div v-if="isVisible" class="event-create__overlay">
    <div class="event-create__backdrop" @click="closeContainer"></div>
    <div class="event-create">
      <div class="event-create__header">
        <h2 class="event-create__title">Opret Event</h2>
        <img
          src="@/assets/icons/Close.png"
          alt="Close"
          class="event-create__close-icon"
          @click="closeContainer"
        />
      </div>
      <div class="event-create__content">
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

          <div class="event-create__actions">
            <button
              class="event-create__button event-create__button--save"
              @click="saveChanges"
              :disabled="isLoading"
            >
              {{ isLoading ? "Gemmer..." : "Gem" }}
            </button>
            <button
              class="event-create__button event-create__button--discard"
              @click="discardChanges"
              :disabled="isLoading"
            >
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

.event-create {
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

      &:hover:not(:disabled) {
        background-color: color.adjust(#97ce75, $lightness: -10%);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    &--discard {
      background-color: var(--background-white);
      border: 1px solid #e0e0e0;
      color: #666;

      &:hover:not(:disabled) {
        background-color: #f3f3f3;
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
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
