<script setup>
import { ref, onMounted, reactive } from "vue";
import { collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import DateInput from "@/components/DateInput.vue";
import DropdownSelector from "@/components/DropdownSelector.vue";

const isVisible = ref(false);
const isLoading = ref(false);
const isLoadingOptions = ref(true);
const errorMessage = ref("");
const emit = defineEmits(["event-saved"]);

const formData = reactive({
  startDate: "",
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

    const collections = ["schedules", "companies", "locations", "users", "objects"];
    const fetchPromises = collections.map((collectionName) =>
      getDoc(doc(db, "data", collectionName)).then((snapshot) => {
        if (snapshot.exists()) {
          options[collectionName] = Object.values(snapshot.data() || {});
        }
      })
    );

    await Promise.all(fetchPromises);
  } catch (error) {
    console.error("Error fetching options:", error);
    errorMessage.value = `Kunne ikke hente data fra databasen: ${error.message || "Ukendt fejl"}`;
  } finally {
    isLoadingOptions.value = false;
  }
}

function formatDateForFirestore(dateString) {
  if (!dateString) return null;

  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return isNaN(date.getTime()) ? null : date;
}

async function saveEvent() {
  try {
    isLoading.value = true;
    const formattedStartDate = formatDateForFirestore(formData.startDate);

    if (!formattedStartDate) {
      alert("Invalid start date format. Please use dd/mm/yyyy");
      return;
    }

    const eventData = {
      startDate: formattedStartDate,
      schedule: formData.schedule,
      company: formData.company,
      location: formData.location,
      user: formData.user,
      object: formData.object,
    };

    await addDoc(collection(db, "events"), eventData);
    alert("Event saved successfully!");
    emit("event-saved");
    closeModal();
  } catch (error) {
    console.error("Error saving event:", error);
    alert(`Error saving event: ${error.message || "Unknown error"}`);
  } finally {
    isLoading.value = false;
  }
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

        <div v-else class="event-modal__form-container">
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
              class="event-modal__button event-modal__button--save"
              @click="saveEvent"
              :disabled="isLoading"
            >
              {{ isLoading ? "Gemmer..." : "Gem" }}
            </button>
            <button
              class="event-modal__button event-modal__button--discard"
              @click="closeModal"
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
