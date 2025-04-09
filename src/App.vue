<script setup>
import SideNav from '@/components/SideNav.vue'
</script>

<template>
    <div class="layout">
      <SideNav />
      <div class="layout__content">
        <router-view />
      </div>
    </div>
  </template>

<style scoped>
</style>
