<script setup>
import { ref } from "vue";
import CalendarHeader from "@/components/CalendarHeader.vue";
import CalendarGrid from "@/components/CalendarGrid.vue";
import EventList from "@/components/EventList.vue";
import FilterComponent from "@/components/FilterComponent.vue";

const selectedDay = ref(null);

const selectedFilter = ref("");
const selectedValue = ref("");

function openModal(day) {
  selectedDay.value = day;
}

function closeEventList() {
  selectedDay.value = null;
}

function handleFilterChange(filter) {
  selectedFilter.value = filter;
}

function handleValueChange(value) {
  selectedValue.value = value;
}
</script>

<template>
  <div class="calendar-view">
    <div class="calendar-view__left-content">
      <FilterComponent
      @update:filter="handleFilterChange"
      @update:value="handleValueChange" />
      <CalendarHeader />
      <CalendarGrid
      @select-day="openModal"
      :selected-filter="selectedFilter"
      :selected-value="selectedValue"/>
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
  margin: 1.5rem;

  &__left-content {
    width: 800px;
  }

  &__right-content {
    width: 500px;
    margin-right: 3rem;
  }
}
</style>
