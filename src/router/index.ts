import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/kings-in-the-corners",
      name: "kings-in-the-corners",
      component: () => import("../views/KingsInTheCornersView.vue"),
    },
    {
      path: "/spit",
      name: "spit",
      component: () => import("../views/SpitView.vue"),
    },
    {
      path: "/pitch",
      name: "pitch",
      component: () => import("../views/PitchView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
