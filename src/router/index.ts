import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import admin from '@/views/admin.vue'
import overview from '@/components/overview.vue'
import products from '@/components/products.vue'
import profile from '@/components/profile.vue'
import orders from '@/components/orders.vue'
import cart from '@/views/cart.vue'
import notFoundPage from '@/views/notFoundPage.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: overview 
      },
      {
        path: 'products',
        name: 'products',
        component: products ,
      },
      {
        path: 'profile',
        name: 'profile',
        component: profile 
      },
      {
        path: 'orders',
        name: 'orders',
        component: orders 
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/item',
    name: 'item',
    component: () => import('../views/item.vue')
  },
  {
    path: '/products',
    name: 'allProducts',
    component: () => import('../views/allProducts.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/checkout.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/404",
    name: "notFound",
    component: notFoundPage
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404"
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// const auth = getAuth();

//to keep user logged in on reload
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
        (user) => {
          removeListener();
          resolve(user);
        },
      reject
    )
  })
}

//navigation guard
// router.beforeEach(async (to) => {
//   // instead of having to check every route record with
//   // to.matched.some(record => record.meta.requiresAuth)
//   const currentUser = auth.currentUser
//   if (to.meta.requiresAuth && !currentUser) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     // alert("You do not have access!")
//     if (await getCurrentUser()) {
//       return {
//         path: '/',
//         // save the location we were at to come back later
//         query: { redirect: to.fullPath },
//       }
//     }
    
//   }
// })
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    }else{
      // alert("You do not have access!")
      next("/")
    }
  } else {
    next();
  }
})

export default router
