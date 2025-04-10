<template>
  <EventList>
    <EventEntry
      v-for="event in events"
      :key="event.id"
      :title="event.title"
      :location="event.location"
      :timeRange="event.timeRange"
    />
    <EventEntryAdd />
  </EventList>
</template>

<script setup>
import { ref } from "vue";
import EventList from "@/components/EventList.vue";
import EventEntry from "@/components/EventEntry.vue";
import EventEntryAdd from "@/components/EventEntryAdd.vue";

// Some mocky data for now
const events = ref([
  {
    id: 1,
    title: "Check Døre",
    location: "UCL Niels Bohrs Allé",
    timeRange: "11:15 - 11:30",
  },
]);
</script>

<style lang="scss"></style>
