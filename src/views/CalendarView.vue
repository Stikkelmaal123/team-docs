<script setup>
import { ref } from "vue";
import CalendarHeader from "@/components/CalendarHeader.vue";
import CalendarGrid from "@/components/CalendarGrid.vue";
import EventList from "@/components/EventList.vue";

const selectedDay = ref(null);

function openModal(day) {
  selectedDay.value = day;
}
</script>

<template>
  <div>
    <CalendarHeader />
    <CalendarGrid @select-day="openModal" />
    <EventList v-if="selectedDay" :day="selectedDay" @close="selectedDay = null" />
  </div>
</template>


<style lang="sass" scoped>
@use "@/assets/main.scss";
</style>
