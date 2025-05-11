<script setup>
import { useCalendar } from "@/composables/useCalendar";
import DayCell from "@/components/DayCell.vue";

const { daysInMonth } = useCalendar();
const emit = defineEmits(["select-day"]);

function handleSelectDay(day) {
  emit("select-day", day);
}
</script>



<template>
  <div class="calendar__grid">
    <DayCell
      v-for="(day, index) in daysInMonth"
      :key="index"
      :day="day"
      @select="handleSelectDay"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss";
</style>

