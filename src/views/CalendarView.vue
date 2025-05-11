<script setup>
import { ref } from "vue";
import CalendarHeader from "@/components/CalendarHeader.vue";
import CalendarGrid from "@/components/CalendarGrid.vue";
import EventList from "@/components/EventList.vue";

const selectedDay = ref(null);

function openModal(day) {
  selectedDay.value = day;
}

function closeEventList() {
  selectedDay.value = null;
}

</script>

<template>
  <div class="calendar-view">
    <div class="calendar-view__left-content">
      <CalendarHeader />
      <CalendarGrid @select-day="openModal" />
    </div>
    <div class="calendar-view__right-content">
      <EventList v-if="selectedDay" :day="selectedDay" @close="closeEventList" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
@use "@/assets/main.scss";

.calendar-view {
  display: flex;
  justify-content: space-between;

  &__left-content {
    width: 60vw;
  }

  &__right-content {
    width: 30vw;
  }
}
</style>
