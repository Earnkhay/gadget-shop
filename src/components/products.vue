<template>
    <div id="app">
        Products
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    components: {
    },
  })
  export default class products extends Vue {}
  </script>
  
  <style scoped>
    #app{
      min-height: 100vh;
    }
  </style>
  