<script setup>
import SideNav from '@/components/SideNav.vue'
import TopBar from '@/components/TopBar.vue'
</script>

<template>
    <div class="layout">
      <SideNav />
      <div class="layout__main">
        <TopBar />
        <div class="layout__content">
          <router-view />
        </div>
      </div>
    </div>
  </template>

<style scoped>

.layout {
  display: flex;
  height: 100vh;

  &__main {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: var(--background-color);
  }

  &__content {
    flex: 1;
    padding: var(--padding);
    overflow-y: auto;
  }
}
</style>
