<script setup>
import { ref, onMounted } from "vue";
import { collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
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

const options = ref({
  schedules: [],
  locations: [],
  users: [],
  objects: [],
});
const isLoadingOptions = ref(true);
const errorMessage = ref("");

const fetchOptionsFromFirestore = async () => {
  try {
    isLoadingOptions.value = true;
    errorMessage.value = "";

    const collections = ["schedules", "locations", "users", "objects"];

    await Promise.all(
      collections.map(async (collectionName) => {
        const docSnapshot = await getDoc(doc(db, "data", collectionName));
        if (docSnapshot.exists()) {
          options.value[collectionName] = Object.values(docSnapshot.data() || {});
        } else {
          options.value[collectionName] = [];
        }
      })
    );
  } catch (error) {
    console.error("Error fetching options:", error);
    errorMessage.value = "Kunne ikke hente data fra databasen: " + (error.message || "Ukendt fejl");
  } finally {
    isLoadingOptions.value = false;
  }
};

onMounted(fetchOptionsFromFirestore);

const formatDateForFirestore = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return isNaN(date.getTime()) ? null : date;
};

const saveChanges = async () => {
  try {
    isLoading.value = true;
    const formattedStartDate = formatDateForFirestore(startDate.value);

    if (!formattedStartDate) {
      alert("Invalid start date format. Please use dd/mm/yyyy");
      return;
    }

    await addDoc(collection(db, "events"), {
      startDate: formattedStartDate,
      endDate: formatDateForFirestore(endDate.value),
      schedule: selectedSchedule.value,
      location: selectedLocation.value,
      user: selectedUser.value,
      object: selectedObject.value,
      createdAt: serverTimestamp(),
    });

    alert("Event saved successfully!");
    isVisible.value = false;
  } catch (error) {
    console.error("Error saving event:", error);
    alert("Error saving event: " + (error.message || "Unknown error"));
  } finally {
    isLoading.value = false;
  }
};

defineExpose({ isVisible });
</script>

<template>
  <div v-if="isVisible" class="event-create__overlay">
    <div class="event-create__backdrop" @click="isVisible = false"></div>
    <div class="event-create">
      <div class="event-create__header">
        <h2 class="event-create__title">Opret Event</h2>
        <img
          src="@/assets/icons/Close.png"
          alt="Close"
          class="event-create__close-icon"
          @click="isVisible = false"
        />
      </div>
      <div class="event-create__content">
        <div v-if="isLoadingOptions" class="event-create__loading">
          <p>Indlæser data...</p>
        </div>
        <div v-else-if="errorMessage" class="event-create__error">
          <p>{{ errorMessage }}</p>
        </div>
        <div v-else class="form-container">
          <DateInput v-model="startDate" label="Start dato" />
          <DateInput v-model="endDate" label="Slut dato" />

          <DropdownSelector
            v-model="selectedSchedule"
            :options="options.schedules"
            label="Skema"
            placeholder="Vælg skema..."
          />
          <DropdownSelector
            v-model="selectedLocation"
            :options="options.locations"
            label="Lokation"
            placeholder="Vælg lokation..."
          />
          <DropdownSelector
            v-model="selectedUser"
            :options="options.users"
            label="Bruger"
            placeholder="Vælg bruger..."
          />
          <DropdownSelector
            v-model="selectedObject"
            :options="options.objects"
            label="Objekt"
            placeholder="Vælg objekt..."
          />

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
              @click="isVisible = false"
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
    max-height: calc(95vh - 60px);
    overflow-y: auto;
    padding: $spacing-md;
  }

  &__loading,
  &__error {
    padding: $spacing-md;
    display: flex;
    justify-content: center;
  }

  &__error {
    color: #d32f2f;
    background-color: #ffebee;
    border-radius: 4px;
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
