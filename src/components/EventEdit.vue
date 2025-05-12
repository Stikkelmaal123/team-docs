<script setup>
import { ref, onMounted, reactive } from "vue";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import DateInput from "@/components/DateInput.vue";
import DropdownSelector from "@/components/DropdownSelector.vue";

const emit = defineEmits(["event-saved"]);
const isVisible = ref(false);
const isLoading = ref(false);
const isLoadingOptions = ref(true);
const errorMessage = ref("");
const eventId = ref(null);

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
    errorMessage.value = `Kunne ikke hente data: ${error.message}`;
  } finally {
    isLoadingOptions.value = false;
  }
}

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function parseDate(dateString) {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

async function loadEvent(id) {
  if (!id) return;

  try {
    isLoading.value = true;
    eventId.value = id;

    const eventDoc = await getDoc(doc(db, "events", id));
    if (eventDoc.exists()) {
      const data = eventDoc.data();

      if (data.startDate) {
        const date = data.startDate.toDate ? data.startDate.toDate() : new Date(data.startDate);
        formData.startDate = formatDate(date);
      }

      Object.keys(formData).forEach((key) => {
        if (key !== "startDate") {
          formData[key] = data[key] || "";
        }
      });
    }
  } catch (error) {
    console.error("Error loading event:", error);
    alert(`Error loading event: ${error.message}`);
  } finally {
    isLoading.value = false;
  }
}

async function saveEvent() {
  try {
    if (!eventId.value) {
      alert("No event ID found. Cannot update event.");
      return;
    }

    isLoading.value = true;
    const formattedStartDate = parseDate(formData.startDate);

    if (!formattedStartDate) {
      alert("Invalid date format. Use dd/mm/yyyy");
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

    await updateDoc(doc(db, "events", eventId.value), eventData);
    alert("Event updated successfully!");
    emit("event-saved");
    closeModal();
  } catch (error) {
    console.error("Error updating event:", error);
    alert(`Error: ${error.message}`);
  } finally {
    isLoading.value = false;
  }
}

function resetForm() {
  Object.keys(formData).forEach((key) => {
    formData[key] = "";
  });
  eventId.value = null;
}

function closeModal() {
  resetForm();
  isVisible.value = false;
}

function openModal(id) {
  if (!id) {
    alert("No event ID provided. Cannot edit event.");
    return;
  }
  loadEvent(id);
  isVisible.value = true;
}

defineExpose({ isVisible, openModal });
</script>

<template>
  <div v-if="isVisible" class="event-modal__overlay">
    <div class="event-modal__backdrop" @click="closeModal"></div>
    <div class="event-modal">
      <div class="event-modal__header">
        <h2 class="event-modal__title">Rediger Event</h2>
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
