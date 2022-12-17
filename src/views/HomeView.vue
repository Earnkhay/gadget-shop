<template>
  <div id="app">
    <topnav/>
    <hero-section/>
    <my-products/>
    <about-us/>
    <!-- <login/> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import topnav from '@/components/UI/topnav.vue';
import heroSection from '@/components/sections/heroSection.vue'
import myProducts from '@/components/sections/myProducts.vue'
import aboutUs from '@/components/sections/aboutUs.vue'
// import login from '@/components/login.vue'

@Options({
  components: {
    topnav,
    heroSection,
    myProducts,
    aboutUs,
    // login
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped>
  #app{
    min-height: 100vh;
  }
</style>
