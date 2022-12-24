<template>
  <div id="app">
    <topnav/>
    <hero-section/>
    <my-products/>
    <about-us/>
    <mini-cart/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import topnav from '@/components/UI/topnav.vue';
import heroSection from '@/components/sections/heroSection.vue'
import myProducts from '@/components/sections/myProducts.vue'
import aboutUs from '@/components/sections/aboutUs.vue'
import miniCart from '@/components/miniCart.vue'

@Options({
  components: {
    topnav,
    heroSection,
    myProducts,
    aboutUs,
    miniCart
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
  #app{
    min-height: 100vh;
  }
</style>
