<template>
  <div class="app">
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
    <topnav/>
    <div class="container text-center mt-5 fw-bold p-5 lh-lg" style="padding-top: 120px !important;" v-if="!this.$store.state.cart.length">
      <i class="fa-solid fa-cart-shopping fs-1 bg-secondary rounded-circle p-4 mb-3"></i>
      <h4>Your Cart is empty</h4>
      <p>Browse and explore our products</p>
      <router-link class="btn btn-lg btn-primary" to="/products">Start Shopping</router-link>
    </div>
    <div style="padding-top: 120px !important;" v-else>
      <div class="container table-responsive">
        <h1 class="text-center my-3">Cart</h1>
        <div class="d-flex justify-content-end mb-3">
          <button class="btn btn-primary" @click="clearCart">Clear cart</button>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, id) in this.$store.state.cart" :key="id">
              <th scope="row" class="text-danger" style="cursor: pointer;" @click="deleteProduct(item)">X</th>
              <td>
                <div class="d-flex">
                  <img :src="item.img" alt="product image" class="me-3" width="55" height="40">
                  {{item.name}}
                </div>
              </td>
              <td>${{item.price}}</td>
              <td>{{item.quantity}}</td>
              <td>${{item.price * item.quantity}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container d-flex justify-content-end my-2">
        <table class="table-sm table-bordered">
            <tbody>
              <tr>
                <th>Total:</th>
                <td>${{cartTotal}}</td>
              </tr>
            </tbody>
        </table>
      </div>
      <div class="container d-flex justify-content-end">
        <router-link to="/checkout" class="btn btn-primary">Checkout</router-link>
      </div>
    </div>
    <my-footer/>
  </div>
  <mini-cart/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import topnav from '@/components/UI/topnav.vue';
import miniCart from '@/components/miniCart.vue'
import myFooter from '@/components/UI/myFooter.vue'
import toast from '@/components/UI/toast.vue'


@Options({
  components: {
    topnav,
    miniCart,
    myFooter,
    toast
  },
})
export default class cart extends Vue {
  toastIcon = ''
  toastTitle = ''
  toastShow = false
  get cartTotal() {
      return this.$store.getters.cartTotal
  }
  clearCart(){
    this.toastIcon = 'success'
    this.toastTitle = 'Cart cleared successfully'
    this.toastShow = true
    this.$store.commit('clearCart');
  }
  deleteProduct(item){
    this.toastIcon = 'success'
    this.toastTitle = 'Product deleted successfully'
    this.toastShow = true
    this.$store.commit('removeFromCart', item)
  }
}
</script>

<style scoped>
    /* #app{
        min-height: 100vh;
    } */
</style>