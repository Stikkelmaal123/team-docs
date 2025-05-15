<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import EventEntry from "@/components/EventEntry.vue";
import EventEntryAdd from "@/components/EventEntryAdd.vue";
import EventEdit from "@/components/EventEdit.vue";
import EventCreate from "@/components/EventCreate.vue";
import { watch } from "vue";

const props = defineProps({
  day: Date,
});

watch(() => props.day, (newDay) => {
  if (newDay) {
    isVisible.value = true;
    fetchEvents();
  }
});

const events = ref([]);
const eventEditRef = ref(null);
const eventCreateRef = ref(null);
const isVisible = ref(true);

const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    events.value = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.schedule || "No Title",
        location: data.location || "",
        timeRange: formatDate(data.startDate),
        date: data.startDate?.toDate ? data.startDate.toDate() : new Date(data.startDate),
      };
    })
      .filter((event) => {
        return (
          event.date.getFullYear() === props.day.getFullYear() &&
          event.date.getMonth() === props.day.getMonth() &&
          event.date.getDate() === props.day.getDate()
        );
      });
  } catch (err) {
    console.error("Error fetching events:", err);
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString();
};

const openEditor = (eventId) => {
  if (eventEditRef.value) {
    eventEditRef.value.openModal(eventId);
  }
};

const openCreator = () => {
  if (eventCreateRef.value) {
    eventCreateRef.value.isVisible = true;
  }
};

const closeContainer = () => {
  isVisible.value = false;
};

// Custom event handler to refresh events
const handleEventSaved = () => {
  fetchEvents();
};

onMounted(fetchEvents);

defineExpose({
  isVisible,
  closeContainer,
});
</script>

<template>
  <div v-if="isVisible" class="event-list">
    <div class="event-list__header">
      <h2 class="event-list__title" v-if="day">Events for {{ day.toDateString() }}</h2>
      <h2 class="event-list__title" v-else>All Events</h2>
      <img
        src="@/assets/icons/Close.png"
        alt="Close"
        class="event-list__close-icon"
        @click="closeContainer"
      />
    </div>
    <div class="event-list__content">
      <EventEntry
        v-for="event in events"
        :key="event.id"
        :title="event.title"
        :location="event.location"
        :timeRange="event.timeRange"
        :onEdit="() => openEditor(event.id)"
      />
      <EventEntryAdd :onCreate="openCreator" />
      <EventEdit ref="eventEditRef" @event-saved="handleEventSaved" />
      <EventCreate ref="eventCreateRef" @event-saved="handleEventSaved" />
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/main.scss" as *;

.event-list {
  width: 100%;
  max-width: 30rem;
  height: 100%;
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
    height: calc(100% - 52px);
    overflow-y: auto;
    padding: $spacing-xs 0;
  }
}
</style>
