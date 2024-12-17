import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import DataPage from "@/pages/DataPage.vue"
import CommentsPage from "@/pages/CommentsPage.vue";

const routes = [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage },
    { path: "/dataManage", component: DataPage },
    { path: "/commentsManage", component: CommentsPage}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
