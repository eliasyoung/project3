import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";

const Main = () => import("views/Main");
const CategoryEdit = () => import("views/category/CategoryEdit");
const CategoryList = () => import("views/category/CategoryList");
const ItemEdit = () => import("views/item/ItemEdit");
const ItemList = () => import("views/item/ItemList");
const HeroEdit = () => import("views/hero/HeroEdit");
const HeroList = () => import("views/hero/HeroList");

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
      { path: "items/create", component: ItemEdit },
      { path: "items/list", component: ItemList },
      { path: "items/edit/:id", component: ItemEdit, props: true },
      { path: "heroes/create", component: HeroEdit },
      { path: "heroes/list", component: HeroList },
      { path: "heroes/edit/:id", component: HeroEdit, props: true },
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
