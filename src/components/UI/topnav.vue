<template>
  <nav class="navbar navbar-expand-lg bg-transparent border-bottom shadow py-4 mb-3">
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
          
          <li class="nav-item d-flex align-items-center">
            <router-link to="/products" class="text-decoration-none link-dark">Products</router-link>
          </li>
          <li class="nav-item d-flex align-items-center mx-3">
            <router-link to="/cart" class="link-dark p-1 text-decoration-none">
              <i class="fa-solid fa-cart-shopping position-relative fs-5 me-1">
                <span class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 10px;" v-if="this.$store.state.cart.length">
                  {{this.$store.state.cart.length}}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </i>
              Cart
            </router-link>
            
          </li>
          <li class="nav-item dropdown" v-if="isLoggedIn">
            <a class="nav-link dropdown-toggle link-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Hi, {{name}}
            </a>
            <!-- <a v-else class="nav-link dropdown-toggle link-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Account
            </a> -->
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/admin">My Account</router-link></li>
              <!-- <li v-else><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">My Account</a></li> -->
              <li><a class="dropdown-item" href="#">Orders</a></li>
              <li><hr class="dropdown-divider"></li>
              <div class="text-center">
                <li><a class="dropdown-item link-dark fw-bold" href="#" @click="logOutAction">Logout</a></li>
                <!-- <li v-else><a class="dropdown-item link-dark fw-bold" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</a></li> -->
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
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { db } from "@/firebase"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";

@Options({
    components: {
    },
  })

export default class topnav extends Vue {
  auth = getAuth()
  // user = this.auth.currentUser
  // id = this.user.uid
  isLoggedIn = false
  name = ""
 created(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        if(user.displayName != null && user.photoURL != null){
          this.name = user.displayName
        }else{
          onSnapshot(doc(db, `profiles/${user.uid}`, ), (doc) => {
              this.name = doc.data().name
          })
        }
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  logOutAction(){
    signOut(this.auth).then(() => {
      this.$router.push("/")
    })
    .catch(() => {
      // console.error(error, 'what is the error')
    });
  }
}
</script>

