<template>
  <topnav/>
  <div class="product" style="overflow: hidden; padding-top: 130px !important;">
    <h1 class="text-center mb-4">Our Products</h1>
    <div class="d-flex flex-wrap container flex-wrapper">
      <div class="card mb-3 me-1" style="width: 17rem; min-height: 100%;" v-for="(product, id) in products" :key="id">
        <img :src="product.image" width="100" height="150" @click="itemDetail(product)" class="card-img-top" alt="Product image">
        <div class="card-body text-start">
          <div @click="itemDetail(product)" class="mb-3">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">${{product.price}}</p>
          </div>
          <add-to-cart :itemId="product.id" :price="product.price" :title="product.name" :img="product.image"/>
        </div>
      </div>
    </div>
  </div>
  <mini-cart/>
  <my-footer/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
// import axios from 'axios'
import miniCart from '@/components/miniCart.vue'
import addToCart from '@/components/addToCart.vue'
import topnav from '@/components/UI/topnav.vue'
import myFooter from '@/components/UI/myFooter.vue'
import { db } from "@/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

@Options({
  components: { 
      addToCart,
      topnav,
      myFooter,
      miniCart
  },
  })
export default class allProducts extends Vue {
    // items = []
    products = []
    auth = getAuth()
    productsCollectionRef = collection(db, `products`)
    productsCollectionQuery = query(this.productsCollectionRef, orderBy('date', 'desc'));


  created(){
    // axios.get('https://dummyjson.com/products/category/smartphones', {
    // })
    //   .then((res) => {
    //     this.items = res.data.products
    //   })
    //   .catch(err => console.error(err));

      onAuthStateChanged(this.auth, (user) => {
      if (user) {
        onSnapshot(this.productsCollectionQuery, (querySnapshot) => {
        const fbProducts = []
        querySnapshot.forEach((doc) => {
            const product = {
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                desc: doc.data().desc,
                image: doc.data().image,
                imgName: doc.data().imgName,
            }
            fbProducts.push(product)
        })
            this.products = fbProducts
        })
      }
    })
  }

  itemDetail(product){
    this.$store.commit('setItem', product);
    this.$router.push({
      name: 'item',
    });
  }
}
</script>

<style scoped>
@media screen and (max-width: 1199px) {
  .flex-wrapper{
    justify-content: center;
  }
}
</style>