<script setup>
import { computed } from "vue";
import { useCalendar } from "@/composables/useCalendar";

const { currentMonth, currentYear, nextMonth, prevMonth } = useCalendar();

const monthName = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value);
  const name = date.toLocaleString("default", { month: "long" });
  return name.charAt(0).toUpperCase() + name.slice(1);
});
</script>


<template>
  <div class="calendar__header">
    <h1 class="calendar__header--title">
      {{ monthName }} {{ currentYear }}
    </h1>
    <div class="calendar__nav-button--container">
    <button @click="prevMonth" class="calendar__nav-button">❮</button>
    <button @click="nextMonth" class="calendar__nav-button">❯</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss";
</style>
