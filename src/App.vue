<script setup>
import SideNav from '@/components/SideNav.vue'
import TopBar from '@/components/TopBar.vue'
</script>

<template>
    <div class="app">
      <TopBar />
      <div class="layout">
        <SideNav />
        <div class="layout__content">
          <router-view />
        </div>
      </div>
    </div>
  </template>

<style scoped>

.app {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
