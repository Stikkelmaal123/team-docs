<script setup>
import { ref } from 'vue'

const daysInMonth = 31
const startDay = 6
const totalCells = 42

const calendarDays = Array.from({ length: totalCells }, (_, index) => {
  const dayNum = index - startDay + 1
  return {
    label: dayNum > 0 && dayNum <= daysInMonth ? dayNum : '',
    hasEvents: dayNum === 14 || dayNum === 19,
    events: dayNum === 14 ? 21 : dayNum === 19 ? 1 : 0
  }
})
</script>

<template>
<div class="calendar-page">
    <h1 class="calendar-page__title">Marts 2025</h1>

</div>
<div class="calendar-page__container">
  <div class="calendar-page__grid">
    <div
     class="calendar-page__day"
      v-for="(day, index) in calendarDays"
     :key="index"
      :class="{ 'calendar-page__day--highlighted': day.label === 20 }"
    >
      <span class="calendar-page__day-number">{{ day.label }}</span>

     <div
       v-if="day.hasEvents"
       class="calendar-page__event"
      >
        {{ day.events }} {{ day.events === 1 ? 'Event' : 'Events' }}
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped></style>
