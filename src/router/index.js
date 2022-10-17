import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store';

import PageHome from "@/pages/PageHome";
import PageDetail from "@/pages/PageDetail";
import PageFind from "@/pages/PageFind";
import PageLogin from "@/pages/PageLogin";
import PageRegister from "@/pages/PageRegister";
import PageNotFound from "@/pages/PageNotFound";
import PageSecret from '@/pages/PageSecret';
import PageNotAuthenticated from '@/pages/PageNotAuthenticated';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "PageHome",
      component: PageHome,
    },
    {
      path: "/find",
      name: "PageFind",
      component: PageFind,
    },
    {
      path: "/meetups/secret",
      name: "PageSecret",
      component: PageSecret,
      meta: {onlyAuthUser: true}
    },
    {
      path: "/meetups/:id",
      name: "PageDetail",
      component: PageDetail,
    },
    {
      path: "/login",
      name: "PageLogin",
      component: PageLogin,
      meta: { onlyGuestUser: true }
    },
    {
      path: "/register",
      name: "PageRegister",
      component: PageRegister,
      meta: { onlyGuestUser: true }
    },
    {
      path: "/401",
      name: "PageNotAuthenticated",
      component: PageNotAuthenticated,
    },
    {
      path: "*",
      name: "PageNotFound",
      component: PageNotFound,
    },
  ],
  mode: "history",
});

router.beforeEach((to, from, next) => {
  store.dispatch('auth/getAuthUser')
  .then(() => {
    const isAuthenticated = store.getters['auth/isAuthenticated']
    if (to.meta.onlyAuthUser) {
      if (isAuthenticated) {
        next()
      } else {
        next({name: 'PageNotAuthenticated'})
      }
    } else if (to.meta.onlyGuestUser) {
      if (isAuthenticated) {
        next({name: 'PageHome'})
      } else {
        next()
      }
    } else {
      next()
    }

    next()
  })
})

export default router;
