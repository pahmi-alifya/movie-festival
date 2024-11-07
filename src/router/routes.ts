const routes = [
  {
    path: "/login",
    name: "login",
    meta: { authorized: false },
    component: () => import("../views/auth/login.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: { authorized: false },
    component: () => import("../views/home/list.vue"),
  },
];
export default routes;
