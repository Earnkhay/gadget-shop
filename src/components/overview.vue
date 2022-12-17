<template>
    <div id="app">
        Overview
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    components: {
    },
  })
  export default class overview extends Vue {}
  </script>
  
  <style scoped>
    #app{
      min-height: 100vh;
    }
  </style>
  