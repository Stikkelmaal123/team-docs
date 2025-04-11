<script setup>
import { ref } from "vue";
import SideNav from "@/components/SideNav.vue";
import TopBar from "@/components/TopBar.vue";
import LoginLandingPage from "@/views/LoginLandingPage.vue";

const loggedIn = ref(false);

const handleLogin = () => {
  loggedIn.value = true;
};
</script>

<template>
  <div class="app">

    <template v-if="loggedIn">
      <TopBar />
      <div class="layout">
        <SideNav />
        <main class="layout__content">
          <router-view />
        </main>
      </div>
    </template>

    <template v-else>
      <LoginLandingPage @login="handleLogin" />
    </template>
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
  overflow: hidden;
}

.layout__content {
  flex: 1;
  overflow-y: auto;
}
</style>
