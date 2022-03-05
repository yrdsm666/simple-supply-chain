import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/materialManagement'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/materialManagement",
                name: "materialManagement",
                meta: {
                    title: '材料管理'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Material.vue")
            }, {
                path: "/contact",
                name: "contact",
                meta: {
                    title: '联系作者'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }
        ]
    }, 
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 供应链管理系统`;
    localStorage.setItem('ms_username','Alice');
    next();
});

export default router;