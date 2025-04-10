<script setup>
import { ref } from "vue";
import EventList from "@/components/EventList.vue";
import EventEntry from "@/components/EventEntry.vue";
import EventEntryAdd from "@/components/EventEntryAdd.vue";
import FilterComponent from "@/components/FilterComponent.vue";

import companyIcon from "@/assets/icons/Company.png";
import usersIcon from "@/assets/icons/users.png";

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

<template>
  <div class="filter-options">
    <FilterComponent label="Virksomhed" :iconSrc="companyIcon" :initialActive="true" />

    <FilterComponent label="Bruger" :iconSrc="usersIcon" />
  </div>
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

<style lang="scss">
.filter-options {
  display: flex;
  gap: 16px;
  padding: 20px;
}
</style>
