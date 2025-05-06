<script setup>
import { ref } from "vue";
import FilterComponent from "@/components/FilterComponent.vue";
import companyIcon from "@/assets/icons/Company.png";
import usersIcon from "@/assets/icons/users.png";

// Mocky mock mock
const events = ref([
  {
    id: 1,
    title: "Check Døre",
    location: "UCL Niels Bohrs Allé",
    timeRange: "11:15 - 11:30",
  },
]);

const eventEditRef = ref(null);
const eventCreateRef = ref(null);
const openEditor = (eventID) => {
  eventEditRef.value.isVisible = true;
};
const openCreator = () => {
  eventCreateRef.value.isVisible = true;
};
</script>

<template>
  <div class="filter-options">
    <FilterComponent label="Virksomhed" :iconSrc="companyIcon" :initialActive="true" />

    <FilterComponent label="Bruger" :iconSrc="usersIcon" />
  </div>

</template>

<style lang="scss">
.filter-options {
  display: flex;
  gap: 16px;
  padding: 20px;
}
</style>
