<template>
  <nav class="navbar navbar-expand-lg bg-transparent border-bottom shadow py-4 mb-3">
    <div class="container">
      <a class="navbar-brand" href="#">Gadget Shop</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="d-flex ms-auto w-50 bg-secondary pe-3 rounded-4" role="search">
          <input class="form-control me-2 p-2 border-secondary rounded-start" type="search" placeholder="what are you looking for...." aria-label="Search">
          <button class="btn" type="submit"><span class="d-flex align-items-center"><i class="fa-solid fa-magnifying-glass pe-2"></i>Search</span></button>
        </form>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <!-- <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li> -->
          <li class="nav-item dropdown">
            <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              My Account
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Messages
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Orders
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Cart
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class topnav extends Vue {}
</script>

