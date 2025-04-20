<script setup>
import { ref, computed } from 'vue'

const currentMonth = ref(2) // March (0-based index)
const currentYear = ref(2025)

const monthNames = [
  'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'December'
]
const currentMonthName = computed(() => monthNames[currentMonth.value])

const daysInMonth = computed(() => {
  const days = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  return Array.from({ length: days }, (_, i) => i + 1)
})

const startDayOffset = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1)
  const day = date.getDay()
  return day === 0 ? 6 : day - 1 // convert so Mon=0, Sun=6
})
</script>


<template>
  <div class="calendar-page">
    <h2 class="calendar-page__title">{{ currentMonthName }} {{ currentYear }}</h2>

    <div class="calendar-page__calendar">
      <div class="calendar-page__calendar-grid">
        <!-- Empty cells before day 1 -->
        <div
          v-for="n in startDayOffset"
          :key="'empty-' + n"
          class="calendar-page__day calendar-page__day--empty"
        ></div>

        <!-- Days of the month -->
        <div
          v-for="day in daysInMonth"
          :key="day"
          class="calendar-page__day"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
