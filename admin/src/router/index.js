import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";

const Main = () => import("views/Main");
const CategoryEdit = () => import("views/CategoryEdit");
const CategoryList = () => import("views/CategoryList");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Main,
    children: [
      { path: "categories/create", component: CategoryEdit },
      { path: "categories/list", component: CategoryList },
      // { path: "categories/edit", component: CategoryEdit },
      { path: "categories/edit/:id", component: CategoryEdit, props: true },
    ],
  },
  /*   {
    path: "/categories/create",
    name: "CategoryCreate",
    component: CategoryEdit,
  }, */
  /*   {
    path: "/main",
    name: "Main",
    component: Main,
  }, */
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
