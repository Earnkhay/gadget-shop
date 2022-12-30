<template>
  <div class="container pb-5 my-5" style="padding-top: 120px !important;">
    <div class="row align-items-center">
      <div class="col-md-5 mb-3 hero-text">
        <h1>Gadget shop for Devs</h1>
        <p>Welcome to Gadget Shop, your one-stop destination for all the latest and greatest gadgets on the market! 
          We've got everything you need to stay connected, productive, and entertained, no matter where you are.</p>
        <div class="d-flex flex-wrap flex-btn">
          <button type="button" v-if="isLoggedIn" class="btn btn-lg btn-primary me-3 mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Get started</button>
          <router-link to="/products" class="btn btn-lg btn-outline-primary mb-2">{{ isLoggedIn == true ? "Products" : "Browse Products" }}</router-link>
        </div>
      </div>
      <div class="col-md-7">
        <img src="@/assets/21727022_6505894.jpg" class="img-fluid" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { Vue } from 'vue-class-component';
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default class heroSection extends Vue {
  auth = getAuth()
  isLoggedIn = true
  created(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    })
  }
}
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .hero-text{
    text-align: center;
    
  }
  .flex-btn{
    justify-content: center;
  }
}
@media screen and (max-width: 358px) {
  .hero-text{
    font-size: 14px;
  }
  .flex-btn button{
    margin-right: 9px !important;
  }
}
</style>


