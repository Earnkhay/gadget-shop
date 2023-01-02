<template>
  <div class="bg-light p-5">
    <h1 class="text-center mb-4">Our Products</h1>
    <div v-if="spinnerShow">
      <spinner/>
    </div>
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
import addToCart from '@/components/addToCart.vue'
import spinner from '@/components/UI/spinner.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { db } from "@/firebase"
import { getAuth, } from "firebase/auth"
import { collection, onSnapshot, query } from "firebase/firestore";

@Options({
  components: { 
      Carousel,
      Slide,
      Pagination,
      Navigation, 
      addToCart,
      spinner
  },
  })
export default class myProducts extends Vue {
    products = []
    auth = getAuth()
    spinnerShow = false
    productsCollectionRef = collection(db, `products`)
    productsCollectionQuery = query(this.productsCollectionRef);

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

  mounted(){
    this.spinnerShow = true
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
          this.spinnerShow = false
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