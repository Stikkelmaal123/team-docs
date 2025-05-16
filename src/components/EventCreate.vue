<script setup>
import { ref, onMounted, reactive } from "vue";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import DateInput from "@/components/DateInput.vue";
import DropdownSelector from "@/components/DropdownSelector.vue";

const isVisible = ref(false);
const isLoading = ref(false);
const isLoadingOptions = ref(true);
const errorMessage = ref("");
const emit = defineEmits(["event-saved"]);

const formData = reactive({
  startDate: "", // DATE HANDLING: stores the date input from user
  schedule: "",
  company: "",
  location: "",
  user: "",
  object: "",
});

const options = reactive({
  schedules: [],
  companies: [],
  locations: [],
  users: [],
  objects: [],
});

onMounted(fetchOptionsFromFirestore);

async function fetchOptionsFromFirestore() {
  try {
    isLoadingOptions.value = true;
    errorMessage.value = "";
    await fetchCollectionData();
  } catch (error) {
    handleFetchError(error);
  } finally {
    isLoadingOptions.value = false;
  }
}

async function fetchCollectionData() {
  const collections = ["schedules", "companies", "locations", "users", "objects"];
  const fetchPromises = collections.map(fetchSingleCollection);
  await Promise.all(fetchPromises);
}

function fetchSingleCollection(collectionName) {
  return getDoc(doc(db, "data", collectionName)).then((snapshot) => {
    if (snapshot.exists()) {
      options[collectionName] = Object.values(snapshot.data() || {});
    }
  });
}

function handleFetchError(error) {
  console.error("Error fetching options:", error);
  errorMessage.value = `Kunne ikke hente data fra databasen: ${error.message || "Ukendt fejl"}`;
}

// DATE HANDLING: formats date string (dd/mm/yyyy) to JS Date object for Firestore
function formatDateForFirestore(dateString) {
  if (!dateString) return null;

  const [day, month, year] = dateString.split("/").map(Number); // DATE HANDLING: split and parse
  const date = new Date(year, month - 1, day); // DATE HANDLING: create Date object

  return isNaN(date.getTime()) ? null : date; // DATE HANDLING: check for invalid date
}

// DATE HANDLING: validates the formatted date
function validateDate(date) {
  if (!date) {
    alert("Invalid date format. Please use dd/mm/yyyy");
    return false;
  }
  return true;
}

async function saveEvent() {
  try {
    isLoading.value = true;
    const formattedStartDate = formatDateForFirestore(formData.startDate); // DATE HANDLING: format before save

    if (!validateDate(formattedStartDate)) return; // DATE HANDLING: validate before save

    await saveEventToFirestore(formattedStartDate); // DATE HANDLING: pass formatted date to save
    handleSaveSuccess();
  } catch (error) {
    handleSaveError(error);
  } finally {
    isLoading.value = false;
  }
}

async function saveEventToFirestore(formattedStartDate) {
  const eventData = {
    startDate: formattedStartDate, // DATE HANDLING: save formatted date to Firestore
    schedule: formData.schedule,
    company: formData.company,
    location: formData.location,
    user: formData.user,
    object: formData.object,
  };

  await addDoc(collection(db, "events"), eventData);
}

function handleSaveSuccess() {
  alert("Event saved successfully!");
  emit("event-saved");
  closeModal();
}

function handleSaveError(error) {
  console.error("Error saving event:", error);
  alert(`Error saving event: ${error.message || "Unknown error"}`);
}

function closeModal() {
  isVisible.value = false;
}

defineExpose({ isVisible });
</script>

<template>
  <div v-if="isVisible" class="event-modal__overlay">
    <div class="event-modal__backdrop" @click="closeModal"></div>
    <div class="event-modal">
      <div class="event-modal__header">
        <h2 class="event-modal__title">Opret Event</h2>
        <img
          src="@/assets/icons/Close.png"
          alt="Close"
          class="event-modal__close-icon"
          @click="closeModal"
        />
      </div>
      <div class="event-modal__content">
        <div v-if="isLoadingOptions" class="event-modal__loading">
          <p>Indlæser data...</p>
        </div>

        <div v-else-if="errorMessage" class="event-modal__error">
          <p>{{ errorMessage }}</p>
        </div>
        <form v-else class="event-modal__form-container" @submit.prevent="saveEvent">
          <!-- DATE HANDLING: date input binding -->
          <DateInput v-model="formData.startDate" label="Dato" />

          <DropdownSelector
            v-model="formData.schedule"
            :options="options.schedules"
            label="Skema"
            placeholder="Vælg skema..."
          />
          <DropdownSelector
            v-model="formData.company"
            :options="options.companies"
            label="Virksomhed"
            placeholder="Vælg virksomhed..."
          />
          <DropdownSelector
            v-model="formData.location"
            :options="options.locations"
            label="Lokation"
            placeholder="Vælg lokation..."
          />
          <DropdownSelector
            v-model="formData.user"
            :options="options.users"
            label="Bruger"
            placeholder="Vælg bruger..."
          />
          <DropdownSelector
            v-model="formData.object"
            :options="options.objects"
            label="Objekt"
            placeholder="Vælg objekt..."
          />

          <div class="event-modal__actions">
            <button
              type="submit"
              class="event-modal__button event-modal__button--save"
              :disabled="isLoading"
            >
              {{ isLoading ? "Gemmer..." : "Gem" }}
            </button>
            <button
              type="button"
              class="event-modal__button event-modal__button--discard"
              @click="closeModal"
              :disabled="isLoading"
            >
              Annuller
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
