<script setup>
import { ref, computed, onMounted } from "vue";
import { useCalendar } from "@/composables/useCalendar";
import DayCell from "@/components/DayCell.vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const props = defineProps({
  selectedFilter: String,
  selectedValue: String,
});

const { daysInMonth } = useCalendar();
const emit = defineEmits(["select-day"]);

function handleSelectDay(day) {
  emit("select-day", day);
};

const allEvents = ref([]);

const fetchAllEvents = async () => {
  try {
    const snapshot = await getDocs(collection(db, "events"));
    allEvents.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Failed to fetch events:", err);
  }
};

onMounted(fetchAllEvents);

const filteredEvents = computed(() => {
  if (!props.selectedFilter || !props.selectedValue) return allEvents.value;
  return allEvents.value.filter((event) => {
    const value = event[props.selectedFilter];
    if (!value || typeof value !== "string") return false;
    return value.toLowerCase().includes(props.selectedValue.toLowerCase());
  });
});
</script>

<template>
  <div class="calendar__grid">
    <DayCell
       v-for="(day, index) in daysInMonth"
  :key="index"
  :day="day.date"
  :events="filteredEvents"
  :isCurrentMonth="day.isCurrentMonth"
  @select="handleSelectDay"
/>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss";
</style>

