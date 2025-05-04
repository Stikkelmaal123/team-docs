<script setup>
import { computed } from "vue";
import { useCalendar } from "../composables/useCalendar";

const { currentMonth, currentYear, nextMonth, prevMonth } = useCalendar();

const monthName = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value);
  return date.toLocaleString("default", { month: "long" });
});
</script>


<template>
  <div class="calendar">
    <button @click="prevMonth" class="calendar-nav-button">←</button>
    <h2 class="calendar__header">
      {{ monthName }} {{ currentYear }}
    </h2>
    <button @click="nextMonth" class="calendar-nav-button">→</button>
  </div>
</template>

<style lang="sass" scoped>
@use "@/assets/main.scss";
</style>
