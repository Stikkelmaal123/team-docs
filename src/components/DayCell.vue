<script setup>
import { computed } from "vue";

const props = defineProps({
  day: {
    type: Date,
    default: null,
  },
  events: {
    type: Array,
    default: () => [],
  },
  isCurrentMonth: {
    type: Boolean,
    default: true,
  },
  selectedDay: {
    type: Date,
    default: null,
  },
});

const eventCount = computed(() => {
  if (!props.day) return 0;
  return props.events.filter((event) => {
    const eventDate = event.startDate?.toDate
      ? event.startDate.toDate()
      : new Date(event.startDate);
    return (
      eventDate.getFullYear() === props.day.getFullYear() &&
      eventDate.getMonth() === props.day.getMonth() &&
      eventDate.getDate() === props.day.getDate()
    );
  }).length;
});


const emit = defineEmits(["select"]);

function handleClick() {
  if (props.day) {
    emit("select", props.day);
  }
}

const isActive = computed(() => {
  return (
    props.day &&
    props.selectedDay &&
    props.day.getFullYear() === props.selectedDay.getFullYear() &&
    props.day.getMonth() === props.selectedDay.getMonth() &&
    props.day.getDate() === props.selectedDay.getDate()
  );
});

</script>

<template>
 <div
    class="calendar__cell"
    :class="{
      empty: !day,
      'calendar__cell--grey': day && !isCurrentMonth
    }"
    @click="handleClick"
  >
    <span v-if="day">{{ day.getDate() }}</span>
    <div v-if="eventCount > 0" :class="['calendar__cell--event-count',  { active: isActive }]">
      {{ eventCount }} Events
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss";
</style>
