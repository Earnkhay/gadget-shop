<template>
  <div id="app">
    <div class="container p-5">
      <div class="row align-items-center">
        <div class="col">
          <h1>Orders</h1>
          <p>View all orders here.</p>
        </div>
        <div class="col">
          <img src="../assets/undraw_web_shopping_re_owap.png" alt="" class="img-fluid">
        </div>
      </div>
    </div>

    <div class="container p-5 bg-light mb-3">
      <div v-if="!orders.length" class="text-center">
        <h2>You currently have no orders.</h2>
        <p>Browse and explore our products to order.</p>
        <router-link class="btn btn-lg btn-primary" to="/products">Start Shopping</router-link>
      </div>
      <div v-else>
        <h2>All orders</h2>
        <div class="card mb-3" v-for="(order, id) in orders" :key="id" >
          <div class="card-body" v-for="(cart, index) in order.cart" :key="index">
              <div class="d-flex align-items-center justify-content-between">
                <img :src="cart.img" width="80" height="50" alt="Product image">
                <div>
                  <h5 class="card-title">{{cart.name}}</h5>
                  <p class="card-text">${{cart.price * cart.quantity}}</p>
                </div>
                <p class="badge text-bg-info text-light">{{order.status}}</p>
              </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { db } from "@/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

export default class overview extends Vue {
  auth = getAuth()
  user = this.auth.currentUser
  // ? means a property is optional. a property can either have a value based on the type defined or its value can be undefined 
  id = this.user!.uid
  orders: any = []
  ordersCollectionRef = collection(db, `profiles/${this.id}/orders`)
  ordersCollectionQuery = query(this.ordersCollectionRef, orderBy('date', 'desc'));

  created(){
    onAuthStateChanged(this.auth, (user) => {
    if (user) {
      onSnapshot(this.ordersCollectionQuery, (querySnapshot) => {
      const fborders: { id: string; address: string; state: string; country: string; cart: any; paymentMethod: string; cartTotal: number; cartQuantity: number; status: string; date: number; }[] = []
      querySnapshot.forEach((doc) => {
          const order = {
              id: doc.id,
              address: doc.data().address,
              state: doc.data().state,
              country: doc.data().country,
              cart: doc.data().cart,
              paymentMethod: doc.data().PaymentMethod,
              cartTotal: doc.data().cartTotal,
              cartQuantity: doc.data().cartQuantity,
              status: doc.data().status,
              date: Date.now(),
          }
          fborders.push(order)
      })
          this.orders = fborders
      })
    }
  })
  }
}
</script>

<style scoped>
  #app{
    min-height: 100vh;
  }
</style>
