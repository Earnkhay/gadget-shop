<template>
  <div class="app">
    <topnav/>
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <h4 class="py-4">Checkout page</h4>
                <div class="container d-flex" v-for="(item, id) in this.$store.state.cart" :key="id">
                    <div class="me-3">
                    <img :src="item.img" alt="product image" class="img-fluid" width="65" height="75"> 
                    </div>
                    <div>
                        <h4>{{item.name}}</h4>
                        <p>${{item.price}}</p>
                        <p>Quantity: {{item.quantity}}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <h4>Total Price</h4>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import topnav from '@/components/UI/topnav.vue';

@Options({
  components: {
    topnav
  },
})
export default class checkout extends Vue {}
</script>

<style scoped>
    /* #app{
        min-height: 100vh;
    } */
</style>