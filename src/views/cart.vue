<template>
  <div class="app">
    <topnav/>
    <div class="container text-center mt-5 fw-bold p-5 lh-lg" v-if="!this.$store.state.cart.length">
      <i class="fa-solid fa-cart-shopping fs-1 bg-secondary rounded-circle p-4 mb-3"></i>
      <h4>Your Cart is empty</h4>
      <p>Browse our products and pick your choice</p>
      <router-link class="btn btn-lg btn-primary" to="/">Start Shopping</router-link>
    </div>
    <div v-else>
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
              <td>{{item.name}}</td>
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
        <button type="button" class="btn btn-primary">Checkout</button>
      </div>
      
    </div>
  </div>
  <mini-cart/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import topnav from '@/components/UI/topnav.vue';
import miniCart from '@/components/miniCart.vue'

@Options({
  components: {
    topnav,
    miniCart
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