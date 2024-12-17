import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import DataPage from "@/pages/DataPage.vue"
import CommentsPage from "@/pages/CommentsPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import {ElMessage} from "element-plus";

const routes = [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage },
    { path: "/dataManage", component: DataPage },
    { path: "/commentsManage", component: CommentsPage},
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    if(to.path === '/login' || to.path === '/register'){
        next()
        return
    }
    if (localStorage.getItem('userId') && localStorage.getItem('userId') !== undefined) {
        next()
    }
    else {
        next({ name: 'login' })
        ElMessage.warning('请先登录')
    }
})

export default router;
