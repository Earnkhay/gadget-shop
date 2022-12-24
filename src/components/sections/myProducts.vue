<template>
  <div class="bg-light p-5">
    <h1 class="text-center mb-4">Our Products</h1>
    <carousel :breakpoints="breakpoints">
        <slide v-for="(item, id) in items" :key="id">
          <div class="card" style="width: 18rem; height: 100%;">
            <img :src="item.thumbnail" style="min-height: 60%;"  class="card-img-top" alt="">
            <div class="card-body text-start">
              <h5 class="card-title">{{item.title}}</h5>
              <p class="card-text">${{item.price}}</p>
              <!-- <a href="#" class="btn btn-primary">Add to Cart</a> -->
              <add-to-cart :itemId="item.id" :price="item.price" :title="item.title" :img="item.images[0]"/>
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
import axios from 'axios'
import addToCart from '@/components/addToCart.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

@Options({
  components: { 
      Carousel,
      Slide,
      Pagination,
      Navigation, 
      addToCart
  },
  })
export default class testimonial extends Vue {
    items = []

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
    axios.get('https://dummyjson.com/products/category/smartphones', {
        // timeout: 5000
    })
      .then((res) => {
        // console.log(res.data.products)
        this.items = res.data.products
        // console.log(this.items);
      })
      .catch(err => console.error(err));
  }
}
  
</script>