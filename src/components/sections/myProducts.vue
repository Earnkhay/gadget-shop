<template>
  <div class="bg-light p-5">
    <h1 class="text-center mb-4">Our Products</h1>
    <!-- <h2 class="my-3 text-center p-3">Phones</h2> -->
    <!-- <carousel :breakpoints="breakpoints">
        <slide v-for="(item, id) in items" :key="id">
          <div class="card" style="width: 18rem; height: 100%;">
            <img :src="item.thumbnail" width="100" height="190" @click="itemDetail(item)" class="card-img-top" alt="Product image">
            <div class="card-body text-start">
              <div @click="itemDetail(item)" class="mb-3">
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text">${{item.price}}</p>
              </div>
              <add-to-cart :itemId="item.id" :price="item.price" :title="item.title" :img="item.thumbnail"/>
            </div>
          </div>
        </slide>
        <template #addons>
          <navigation class="text-light bg-dark rounded-4"/>
          <pagination />
        </template>
    </carousel> -->
    <h2 class="my-3 text-center p-3">Laptops</h2>
    <carousel :breakpoints="breakpoints" :autoplay="2000" :wrap-around="true">
        <slide v-for="(product, id) in products" :key="id">
          <div class="card" style="width: 18rem; height: 100%;">
            <img :src="product.image" width="100" height="190" @click="itemDetail(product)" class="card-img-top" alt="Product image">
            <div class="card-body text-start">
              <div @click="itemDetail(product)" class="mb-3">
                <h5 class="card-title">{{product.name}}</h5>
                <p class="card-text">${{product.price}}</p>
              </div>
              <add-to-cart :itemId="product.id" :price="product.price" :title="product.name" :img="product.image"/>
            </div>
          </div>
        </slide>
        <template #addons>
          <navigation class="text-light bg-dark rounded-4"/>
          <pagination />
        </template>
    </carousel>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Options, Vue } from 'vue-class-component';
// import axios from 'axios'
import addToCart from '@/components/addToCart.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { db } from "@/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

@Options({
  components: { 
      Carousel,
      Slide,
      Pagination,
      Navigation, 
      addToCart,
  },
  })
export default class myProducts extends Vue {
    // items = []
    products = []
    auth = getAuth()
    productsCollectionRef = collection(db, `products`)
    productsCollectionQuery = query(this.productsCollectionRef, orderBy('date', 'desc'));

    breakpoints = {
    200: {
      itemsToShow: 1,
    },
    700: {
      itemsToShow: 2,
    },
    1024: {
      itemsToShow: 3,
    },
  }

  created(){
    // axios.get('https://dummyjson.com/products/category/smartphones', {
    //     // timeout: 5000
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