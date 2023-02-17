<template>
  <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
  <nav class="navbar navbar-expand-lg fixed-top border-bottom shadow py-4" style="background-color: rgb(248, 243, 244);">
    <div class="container">
      <router-link class="navbar-brand" to="/"><h2> Gadget Shop</h2></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fw-bold">
          <!-- <form class="d-flex h-50 w-50 mt-2 bg-secondary rounded-3 align-items-center" role="search">
            <input class="form-control border-secondary rounded-start" type="search" placeholder="what are you looking for...." aria-label="Search">
            <button class="btn" type="submit"><span class="d-flex align-items-center"><i class="fa-solid fa-magnifying-glass me-2"></i>Search</span></button>
          </form> -->
          
          <li class="nav-item d-flex align-items-center me-3 p-2">
            <router-link to="/" class="text-decoration-none link-dark" active-class="text-primary">Home</router-link>
          </li>
          <li class="nav-item d-flex align-items-center me-3 p-2">
            <router-link to="/products" class="text-decoration-none link-dark" active-class="text-primary">Products</router-link>
          </li>
          <li class="nav-item d-flex align-items-center me-3 p-2">
            <router-link to="/cart" class="link-dark p-1 text-decoration-none"  active-class="text-primary">
              <i class="fa-solid fa-cart-shopping position-relative fs-5 me-1">
                <span class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 10px;" v-if="cartQuantity">
                  {{cartQuantity}}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </i>
              Cart
            </router-link>
            
          </li>
          <li class="nav-item dropdown p-2" v-if="isLoggedIn">
            <a class="nav-link dropdown-toggle link-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Hi, {{name}}
            </a>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" :to="{name: 'overview'}">My Account</router-link></li>
              <li><router-link class="dropdown-item" :to="{name: 'orders'}">Orders</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <div class="text-center">
                <li><a class="dropdown-item link-dark fw-bold" href="#" @click="logOutAction">Logout</a></li>
              </div>
            </ul>
          </li>
          <li class="nav-item d-flex align-items-center" v-else>
            <button type="button" class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Get started</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <login/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import toast from '@/components/UI/toast.vue'
import login from '@/components/login.vue'

@Options({
    components: {
      toast,
      login
    },
  })

export default class topnav extends Vue {
  auth = getAuth()
  isLoggedIn = false
  name = ""
  toastIcon = ''
  toastTitle = ''
  toastShow = false
  // eslint-disable-next-line
  $store: any;
  created(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.$store.dispatch('getDetails')
        .then(() => {
            this.name = this.$store.state.name
        })
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  get cartQuantity() {
    return this.$store.getters.cartQuantity
  }

  logOutAction(){
    signOut(this.auth).then(() => {
      this.toastShow = true
      this.toastIcon = 'success'
      this.toastTitle = 'Logged out successfully'
      this.$router.push("/")
    })
    .catch(() => {
      // console.error(error, 'what is the error')
    });
  }
}
</script>

<style scoped>
li a:hover{
  color: blue !important;
}
</style>