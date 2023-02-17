import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Gadget Shop',
    },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/account.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: () => import('../components/overview.vue'),
        meta: {
          title: 'Dashboard',
        },
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../components/products.vue'),
        meta: {
          title: 'Products',
        },
      },
      {
        path: 'profile/:name?',
        name: 'profile',
        component: () => import('../components/profile.vue'),
        meta: {
          title: 'Profile',
        },
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../components/orders.vue'),
        meta: {
          title: 'Orders',
        },
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart.vue'),
    meta: {
      title: 'Cart',
    },
  },
  {
    path: '/item',
    name: 'item',
    component: () => import('../views/item.vue'),
    meta: {
      title: 'Product details',
    },
  },
  {
    path: '/products',
    name: 'allProducts',
    component: () => import('../views/allProducts.vue'),
    meta: {
      title: 'Products',
    },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/checkout.vue'),
    meta: {
      requiresAuth: true,
      title: 'Checkout'
    },
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import('../views/notFoundPage.vue'),
    meta: {
      title: '404',
    },
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
  document.title = `${to.meta.title}`;
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
