<script setup></script>

<template>
    <h1 class="calendar-page__title">Marts 2025</h1>

<div class="calendar-page__grid">
  <!-- We'll render calendar days here -->
  <div class="calendar-page__day" v-for="day in 31" :key="day">
    <!-- Later fill real date numbers here -->
    <span class="calendar-page__day-number">{{ day }}</span>
  </div>
</div>
</template>

<style lang="scss" scoped></style>
