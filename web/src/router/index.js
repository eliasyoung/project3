import { createRouter, createWebHashHistory } from "vue-router";
const Main = () => import("@/views/Main.vue");
const Home = () => import("@/views/Home.vue");
const StrategyCenter = () => import("@/views/StrategyCenter");
const Article = () => import("@/views/Article");

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      { path: "/", name: "home", component: Home },
      {
        path: "/strategycenter",
        name: "strategycenter",
        component: StrategyCenter,
      },
      {
        path: "/articles/:id",
        name: "article",
        component: Article,
        props: true,
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
