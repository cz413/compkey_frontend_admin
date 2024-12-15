import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/pages/HomePage.vue";

const routes = [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
