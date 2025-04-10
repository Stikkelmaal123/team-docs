import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CalenderView from "@/views/CalenderView.vue";
import TestView from "@/views/TestView.vue";

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
      component: CalenderView,
    },
    {
      path: "/test", // URL path to access TestView
      name: "TestView",
      component: TestView,
    },
  ],
});

export default router;
