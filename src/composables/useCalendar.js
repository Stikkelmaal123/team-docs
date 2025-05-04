import { ref, computed } from "vue";

const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const daysInMonth = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const days = [];
  for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
    days.push(new Date(day));
  }
  return days;
});

export function useCalendar() {
  return {
    currentYear,
    currentMonth,
    nextMonth,
    prevMonth,
    daysInMonth,
  };
};
