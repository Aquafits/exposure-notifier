import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/scan/:locationId?',
    name: 'Scan',
    component: () => import(/* webpackChunkName: "scan" */ '../views/Scan.vue'),
  },
  {
    path: '/apply',
    name: 'Apply',
    component: () => import(/* webpackChunkName: "scan" */ '../views/Apply.vue'),
  },
  {
    path: '/case',
    name: 'Case',
    component: () => import(/* webpackChunkName: "scan" */ '../views/Case.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
