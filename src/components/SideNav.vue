<script setup>
import "@/assets/main.scss";

</script>

<template>
   <nav class="sidenav">
    <router-link to="/" class="sidenav__link">Startside</router-link>
    <router-link to="/reports" class="sidenav__link">Rapporter & Dokumenter</router-link>
    <router-link to="/deadlines" class="sidenav__link">Overskredet Deadline</router-link>
    <router-link to="/users" class="sidenav__link">Brugere & Grupper</router-link>
    <router-link to="/forms" class="sidenav__link">Skemaer</router-link>
    <router-link to="/objects" class="sidenav__link">Objekter</router-link>
    <router-link to="/calendar" class="sidenav__link">Kalender</router-link>
    <router-link to="/settings" class="sidenav__link">Indstillinger</router-link>
  </nav>
</template>