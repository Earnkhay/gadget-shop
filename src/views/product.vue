<template>
    <div class="card" style="width: 18rem; height: 100%;">
        <img :src="item.thumbnail" style="min-height: 60%;"  class="card-img-top" alt="">
        <div class="card-body text-start">
        <h5 class="card-title">{{item.title}}</h5>
        <p class="card-text">${{item.price}}</p>
        <add-to-cart :itemId="item.id" :price="item.price" :title="item.title" :img="item.images[0]"/>
        </div>
    </div>
</template>
  
  <script>
  import 'vue3-carousel/dist/carousel.css'
  import { Options, Vue } from 'vue-class-component';
  import axios from 'axios'
  import addToCart from '@/components/addToCart.vue'
  
  @Options({
    components: { 
        addToCart
    },
    })
  export default class product extends Vue {
      items = []
  
    created(){
      axios.get('https://dummyjson.com/products/category/smartphones', {
          // timeout: 5000
      })
        .then((res) => {
          // console.log(res.data.products)
          this.items = res.data.products
          console.log(this.items);
        })
        .catch(err => console.error(err));
    }
  }
    
  </script>