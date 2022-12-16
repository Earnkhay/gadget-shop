<template>
  <div id="app">
    <topnav/>
    <hero-section/>
    <my-products/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import topnav from '@/components/UI/topnav.vue';
import heroSection from '@/components/UI/heroSection.vue'
import myProducts from '@/components/UI/myProducts.vue'

@Options({
  components: {
    topnav,
    heroSection,
    myProducts
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped>
  #app{
    background-color: rgb(248, 243, 244);
    min-height: 100vh;
  }
</style>
