<template>
  <div id="app">
    <div class="container p-5">
      <div class="row align-items-center">
        <div class="col">
          <h1>Overview</h1>
          <p>VIew all your stats here.</p>
        </div>
        <div class="col">
          <img src="../assets/undraw_Features_overview_re_2w78.png" alt="" class="img-fluid">
        </div>
      </div>
    </div>

    <div class="container mb-5">
      <div class="row ">
          <div class="col-md-3 mb-3">
              <div class="card border-primary shadow">
              <div class="card-body text-center">
                  <h4 class="card-title fw-bold">Items in Cart</h4>
                  <h1 class="card-text fw-bold data text-primary">{{ this.$store.state.cart.length }}</h1>
              </div>
              </div>
          </div>
          <div class="col-md-3 mb-3">
              <div class="card border-warning shadow">
              <div class="card-body text-center">
                  <h4 class="card-title fw-bold">Pending orders</h4>
                  <h1 class="card-text fw-bold data text-warning">{{ orders.length }}</h1>
              </div>
              </div>
          </div>
          <div class="col-md-3 mb-3">
              <div class="card border-success shadow">
              <div class="card-body text-center">
                  <h4 class="card-title fw-bold">Fulfilled orders</h4>
                  <h1 class="card-text fw-bold data text-success">0</h1>
              </div>
              </div>
          </div>
          <div class="col-md-3 mb-3">
              <div class="card border-danger shadow">
              <div class="card-body text-center">
                  <h4 class="card-title fw-bold">Cancelled orders</h4>
                  <h1 class="card-text fw-bold data text-danger">0</h1>
              </div>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { db } from "@/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

@Options({
  components: {
  },
})
export default class overview extends Vue {
  auth = getAuth()
  user = this.auth.currentUser
  id = this.user?.uid
  orders = []
  ordersCollectionRef = collection(db, `profiles/${this.id}/orders`)
  ordersCollectionQuery = query(this.ordersCollectionRef, orderBy('date', 'desc'));

  created(){
    onAuthStateChanged(this.auth, (user) => {
    if (user) {
      onSnapshot(this.ordersCollectionQuery, (querySnapshot) => {
      const fborders = []
      querySnapshot.forEach((doc) => {
          const order = {
            id: doc.id,
            cart: doc.data().cart,
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
