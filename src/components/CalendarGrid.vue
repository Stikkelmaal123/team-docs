<script setup>
import { ref, onMounted } from "vue";
import { useCalendar } from "@/composables/useCalendar";
import DayCell from "@/components/DayCell.vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

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

</script>



<template>
  <div class="calendar__grid">
    <DayCell
      v-for="(day, index) in daysInMonth"
      :key="index"
      :day="day"
      :events="allEvents"
      @select="handleSelectDay"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss";
</style>

