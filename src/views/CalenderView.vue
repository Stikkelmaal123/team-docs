<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
    required: true,
  },
  initialActive: {
    type: Boolean,
    default: false,
  },
});

const isActive = ref(props.initialActive);

const toggleActive = () => {
  isActive.value = !isActive.value;
};

defineExpose({
  isActive,
});

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
<div class="filter-option" :class="{ 'filter-option--active': isActive }" @click="toggleActive">
    <div class="filter-option__indicator">
      <div v-if="isActive" class="filter-option__indicator-dot"></div>
    </div>

    <div class="filter-option__content">
      <div class="filter-option__icon">
        <img :src="iconSrc" :alt="label" />
      </div>

      <div class="filter-option__label">
        {{ label }}
      </div>
    </div>
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

.filter-option {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  border-radius: 8p.5rem;
  border: 1px solid var(--primary-blue3);
  padding: $spacing-md;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  background-color: var(--background-white);

  &--active {
    background-color: var(--primary-blue1);
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: $spacing-4xl;
  }

  &__indicator {
    position: absolute;
    top: $spacing-md;
    right: $spacing-md;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__indicator-dot {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: #000;
  }

  &__icon {
    margin-bottom: $spacing-md;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 2.5rem;
      height: 2.5rem;
      object-fit: contain;
    }
  }

  &__label {
    font-size: $font-size-large;
    font-weight: $font-weight-medium;
    text-align: center;
  }
}
</style>
