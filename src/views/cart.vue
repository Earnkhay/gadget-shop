<template>
  <div class="app">
    <topnav/>
    <div class="container text-center mt-5 fw-bold p-5 lh-lg" style="padding-top: 120px !important;" v-if="!this.$store.state.cart.length">
      <i class="fa-solid fa-cart-shopping fs-1 bg-secondary rounded-circle p-4 mb-3"></i>
      <h4>Your Cart is empty</h4>
      <p>Browse and explore our products</p>
      <router-link class="btn btn-lg btn-primary" to="/products">Start Shopping</router-link>
    </div>
    <div style="padding-top: 120px !important;" v-else>
      <div class="container mt-3 table-responsive">
        <h1 class="text-center my-4">Cart</h1>
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
              <th scope="row" class="text-danger" style="cursor: pointer;" @click="$store.commit('removeFromCart', item)">X</th>
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

@Options({
  components: {
    topnav,
    miniCart,
    myFooter
  },
})
export default class cart extends Vue {
  get cartTotal() {
      return this.$store.getters.cartTotal
  }
}
</script>

<style scoped>
    /* #app{
        min-height: 100vh;
    } */
</style>