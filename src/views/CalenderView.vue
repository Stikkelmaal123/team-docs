<script setup>
import { ref, computed } from "vue";
import FilterComponent from "@/components/FilterComponent.vue";
import companyIcon from "@/assets/icons/Company.png";
import usersIcon from "@/assets/icons/users.png";
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const monthName = computed(() =>
  today.toLocaleString("default", { month: "long" }),
);

function generateCalendar(year, month) {
  const days = [];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // Previous month filler
  const prevLastDate = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    days.push({ date: prevLastDate - i, isCurrentMonth: false });
  };

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      isCurrentMonth: true,
      isToday:
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear(),
    });
  };

  // Fill to 6 full weeks (42 cells)
  while (days.length < 42) {
    days.push({
      date: days.length - daysInMonth - startDayOfWeek + 1,
      isCurrentMonth: false,
    });
  };

  return days;
};

const calendarDays = ref(generateCalendar(year, month));
</script>


<template>
  <div class="filter-options">
    <FilterComponent label="Virksomhed" :iconSrc="companyIcon" :initialActive="true" />

    <FilterComponent label="Bruger" :iconSrc="usersIcon" />
  </div>

  <div class="calendar">
    <h2 class="calendar__header">{{ monthName }} {{ year }}</h2>
    <div class="calendar__grid">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="[
          'calendar__cell',
          !day.isCurrentMonth && 'calendar__cell--grey',
          day.isToday && 'calendar__cell--today'
        ]"
      >
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss" as *;

.filter-options {
  display: flex;
  gap: 16px;
  padding: 20px;
  import companyIcon from "@/assets/icons/Company.png";
  import usersIcon from "@/assets/icons/users.png";}
</style>
