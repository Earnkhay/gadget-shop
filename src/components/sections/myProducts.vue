<template>
  <div class="bg-light p-5">
    <h1 class="text-center mb-4">Our Products</h1>
  <!-- <div class="container">
    <div class="row justify-content-center">
      <div class="col mb-2">
        <div class="card" style="width: 18rem;">
          <img src="@/assets/undraw_Add_to_cart_re_wrdo.png" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">Hp Laptop</h5>
            <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ad! Voluptatem et nesciunt enim laboriosam.</p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <carousel :breakpoints="breakpoints">
      <slide v-for="(item, id) in items" :key="id">
        <div class="card" style="width: 18rem; height: 100%;">
          <img :src="item.thumbnail" style="min-height: 50%;"  class="card-img-top" alt="">
          <div class="card-body text-start">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text">{{item.description}}</p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
          </div>
        </div>
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
  </carousel>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Options, Vue } from 'vue-class-component';
import axios from 'axios'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

@Options({
  components: { 
      Carousel,
      Slide,
      Pagination,
      Navigation, 
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
        timeout: 5000
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