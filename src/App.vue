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
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout {
  display: flex;
  flex: 1;
  background-color: var(--background-color);
  overflow: hidden;
}

.layout__content {
  flex: 1;
  padding: var(--padding);
  overflow-y: auto;
}
</style>
