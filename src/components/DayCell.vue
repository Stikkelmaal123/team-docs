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
    <div v-if="eventCount > 0" class="event-count-badge">
      {{ eventCount }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss";

.event-count-badge {
    border: 1px solid #446A5A;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0 0.2rem 2rem 0.2rem;
  }
</style>
