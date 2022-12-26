<template>
  <topnav/>
  <div class="product">
    <h1 class="text-center mb-4">Our Products</h1>
    <div class="container d-flex justify-content-between">
      <div class="row justify-content-center">
        <div class="col-md-4 mb-3 col-sm-6" v-for="(item, id) in items" :key="id">
          <div class="card" style="width: 18rem; height: 100%;">
            <img :src="item.thumbnail" style="min-height: 60%;" @click="itemDetail(item)" class="card-img-top" alt="Product image">
            <div class="card-body text-start">
              <div @click="itemDetail(item)" class="mb-3">
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text">${{item.price}}</p>
              </div>
              <add-to-cart :itemId="item.id" :price="item.price" :title="item.title" :img="item.thumbnail"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Options, Vue } from 'vue-class-component';
import axios from 'axios'
import addToCart from '@/components/addToCart.vue'
import topnav from '@/components/UI/topnav.vue'

@Options({
  components: { 
      addToCart,
      topnav
  },
  })
export default class allProducts extends Vue {
    items = []

  created(){
    axios.get('https://dummyjson.com/products/category/smartphones', {
        // timeout: 5000
    })
      .then((res) => {
        this.items = res.data.products
      })
      .catch(err => console.error(err));
  }

  itemDetail(item){
    this.$store.commit('setItem', item);
    this.$router.push({
      name: 'item',
    });
  }
}
  
</script>