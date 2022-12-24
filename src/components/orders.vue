<template>
    <div id="app">
      <div class="container p-5">
        <div class="row align-items-center">
          <div class="col">
            <h1>Orders</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, inventore id. Tenetur, eligendi. Amet magnam ducimus accusantium dolor, vel eos.</p>
          </div>
          <div class="col">
            <img src="../assets/undraw_Features_overview_re_2w78.png" alt="" class="img-fluid">
          </div>
        </div>
      </div>
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
  