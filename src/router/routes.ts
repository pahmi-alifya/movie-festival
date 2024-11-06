const routes = [
  {
    path: "/login",
    name: "login",
    meta: { authorized: false },
    component: () => import("../views/auth/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { authorized: false },
    component: () => import("../views/auth/register.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: { authorized: false },
    component: () => import("../views/home/list.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { authorized: false },
    component: () => import("../views/home/detail.vue"),
  },
];
export default routes;
