<script setup>
import "@/assets/main.scss";

</script>

<template>
  <nav class="sidenav">
    <router-link to="/" class="sidenav__link">
      <img src="@/assets/icons/Overview.png" alt="Startside" class="sidenav__icon" />
      Startside
    </router-link>
    <router-link to="/reports" class="sidenav__link">
      <img src="@/assets/icons/Folder.png" alt="Rapporter" class="sidenav__icon" />
      Rapporter & Dokumenter
    </router-link>
    <router-link to="/deadlines" class="sidenav__link">
      <img src="@/assets/icons/Warning.png" alt="Overskredet Deadline" class="sidenav__icon" />
      Overskredet Deadline
    </router-link>
    <router-link to="/users" class="sidenav__link">
      <img src="@/assets/icons/Groups.png" alt="Brugere & Grupper" class="sidenav__icon" />
      Brugere & Grupper
    </router-link>
    <router-link to="/forms" class="sidenav__link">
      <img src="@/assets/icons/Schedule.png" alt="Skemaer" class="sidenav__icon" />
      Skemaer
    </router-link>
    <router-link to="/objects" class="sidenav__link">
      <img src="@/assets/icons/Objects.png" alt="Objekter" class="sidenav__icon" />
      Objekter
    </router-link>
    <router-link to="/calendar" class="sidenav__link">
      <img src="@/assets/icons/Calendar.png" alt="Kalender" class="sidenav__icon" />
      Kalender
    </router-link>
    <router-link to="/settings" class="sidenav__link">
      <img src="@/assets/icons/Settings.png" alt="Indstillinger" class="sidenav__icon" />
      Indstillinger
    </router-link>
  </nav>
</template>