<script setup>
import { RouterLink, RouterView } from "vue-router";
import { Sidebar } from "./components/SideNav.vue";
</script>

<template>
    <div class="app">
        <Sidebar />
        <router-view />
    </div>    
</template>

<style scoped></style>
