<template>
  <nav class="navbar navbar-expand-lg bg-transparent border-bottom shadow py-4 mb-3">
    <div class="container">
      <a class="navbar-brand" href="#"><h2> Gadget Shop</h2></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="d-flex ms-auto w-50 bg-secondary pe-3 rounded-4" role="search">
          <input class="form-control me-2 p-2 border-secondary rounded-start" type="search" placeholder="what are you looking for...." aria-label="Search">
          <button class="btn" type="submit"><span class="d-flex align-items-center"><i class="fa-solid fa-magnifying-glass pe-2"></i>Search</span></button>
        </form>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown p-2">
            <a class="nav-link dropdown-toggle link-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Account
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Log in</a></li>
              <li><a class="dropdown-item" href="#">My Account</a></li>
              <li><a class="dropdown-item" href="#">Orders</a></li>
              <li><hr class="dropdown-divider"></li>
              <div class="text-center">
                <li><button type="button" class="btn btn-primary"><a class="dropdown-item link-light" href="#">Logout</a></button></li>
              </div>
              
            </ul>
          </li>
          <li class="nav-item d-flex align-items-center p-2">
            <i class="fa-solid fa-cart-shopping"></i>
            <a class="nav-link link-dark" href="#">Cart</a>
          </li>
          <li class="nav-item d-flex align-items-center">
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
import login from '@/components/login.vue'

@Options({
    components: {
      login
    },
  })

export default class topnav extends Vue {

}
</script>

