<script setup>
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import SideNav from "@/components/SideNav.vue";
import TopBar from "@/components/TopBar.vue";
import LoginView from "@/views/LoginView.vue";

const loggedIn = ref(false);
const role = ref(null);

onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedIn.value = true;
    if (user.email === "john@doe.com") {
      role.value = "admin";
    } else {
      role.value = "viewer";
    }
  } else {
    loggedIn.value = false;
    role.value = null;
  }
});
</script>

<template>
  <div class="app">
    <template v-if="loggedIn">
      <TopBar />
      <div class="layout">
        <SideNav v-if="role === 'admin'" />
        <main class="layout__content">
          <router-view />
        </main>
      </div>
    </template>

    <template v-else>
      <LoginView @login="handleLogin" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/main.scss" as *;
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout {
  display: flex;
  flex: 1;
  overflow: hidden;

  &__content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
