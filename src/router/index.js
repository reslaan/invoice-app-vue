import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import InvoiceView from "../views/InvoiceView.vue";
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
  
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/invoice/:invoiceId",
      name: "Invoice",
      component: InvoiceView,
    },
    {
      path: "/:path*",
      component: NotFound,
    },
  ],
});

export default router;
