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

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import miniCart from '@/components/miniCart.vue'
import phones from '@/components/sections/phones.vue'
import laptops from '@/components/sections/laptops.vue'
import topnav from '@/components/UI/topnav.vue'
import myFooter from '@/components/UI/myFooter.vue'

@Options({
  components: { 
      topnav,
      myFooter,
      miniCart,
      phones,
      laptops
  },
  })
export default class allProducts extends Vue {
}
</script>