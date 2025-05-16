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
  const firstDayNextMonth = new Date(year, month + 1, 1);
  const lastDayOfMonth = new Date(firstDayNextMonth - 1);

  let startDayIndex = firstDayOfMonth.getDay();
  if (startDayIndex === 0) startDayIndex = 7;

  const prevDays = [];
  for (let i = startDayIndex - 1; i > 0; i--) {
    const d = new Date(firstDayOfMonth);
    d.setDate(d.getDate() - i);
    prevDays.push({
      date: new Date(d),
      isCurrentMonth: false,
    });
  };

  const currentDays = [];
  const totalDays = lastDayOfMonth.getDate();
  for (let i = 1; i <= totalDays; i++) {
    currentDays.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  };

  const days = [...prevDays, ...currentDays];
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(firstDayNextMonth.getFullYear(), firstDayNextMonth.getMonth(), i),
      isCurrentMonth: false,
    });
  };

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
