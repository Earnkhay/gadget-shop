<template>
  <topnav/>
  <div class="product" style="overflow: hidden; padding-top: 130px !important;">
    <h1 class="text-center mb-4">Our Products</h1>
    <div>
      <h3 class="text-center mb-4">Laptops</h3>
      <laptops/>
    </div>
    <div>
      <h3 class="text-center mb-4">Phones</h3>
      <phones/>
    </div>
  </div>
  <mini-cart/>
  <my-footer/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
// import axios from 'axios'
import miniCart from '@/components/miniCart.vue'
import phones from '@/components/sections/phones.vue'
import laptops from '@/components/sections/laptops.vue'
import addToCart from '@/components/addToCart.vue'
import topnav from '@/components/UI/topnav.vue'
import myFooter from '@/components/UI/myFooter.vue'

@Options({
  components: { 
      addToCart,
      topnav,
      myFooter,
      miniCart,
      phones,
      laptops
  },
  })
export default class allProducts extends Vue {
    // items = []
    products = []

  created(){
    // axios.get('https://dummyjson.com/products/category/smartphones', {
    // })
    //   .then((res) => {
    //     this.items = res.data.products
    //   })
    //   .catch(err => console.error(err));

  }

  // itemDetail(product){
  //   this.$store.commit('setItem', product);
  //   this.$router.push({
  //     name: 'item',
  //   });
  // }
}
</script>

<style scoped>
@media screen and (max-width: 1199px) {
  .flex-wrapper{
    justify-content: center;
  }
}
</style>