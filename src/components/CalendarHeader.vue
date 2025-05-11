<script setup>
import { computed } from "vue";
import { useCalendar } from "@/composables/useCalendar";

const { currentMonth, currentYear, nextMonth, prevMonth } = useCalendar();

const monthName = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value);
  return date.toLocaleString("default", { month: "long" });
});
</script>


<template>
  <div class="calendar">
    <button @click="prevMonth" class="calendar__nav-button">←</button>
    <h2 class="calendar__header">
      {{ monthName }} {{ currentYear }}
    </h2>
    <button @click="nextMonth" class="calendar__nav-button">→</button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss";
.calendar{

  display: flex;
  &__nav-button {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    margin: 0 1rem;
  }
}
</style>
