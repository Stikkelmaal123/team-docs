import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CalendarView from "@/views/CalendarView.vue";
import TestView from "@/views/TestView.vue";
import LuluTestView from "@/views/LuluTestView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/calendar",
      name: "calendar",
      component: CalendarView,
    },
    {
      path: "/test", // URL path to access TestView
      name: "TestView",
      component: TestView,
    },
    {
      path: "/LuluTest",
      name: "LuluTest",
      component: LuluTestView,
    },
  ],
});

export default router;
