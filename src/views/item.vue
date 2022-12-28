<template>
    <topnav/>
  <div class="container mt-5" style="padding-top: 120px !important;">
    <div class="row justify-content-between align-items-center">
        <div class="col-md-6 mb-3">
            <img :src="this.$store.state.product.image" width="500" height="350" class="img-fluid" alt="">
        </div>
        <div class="col-md-6">
            <h1 class="mb-4">{{ this.$store.state.product.name }}</h1>
            <p class="card-text">${{this.$store.state.product.price}}</p>
            <p class="card-text">{{this.$store.state.product.desc}}</p>
            <div class="d-flex">
                <!-- <input type="number" class="me-2" style="width: 10%;" v-model="quantity"> -->
                <add-to-cart :itemId="this.$store.state.product.id" :price="this.$store.state.product.price" :title="this.$store.state.product.name" :img="this.$store.state.product.image"/>
            </div>
        </div>
    </div>
  </div>
  <my-footer/>
  <mini-cart/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import topnav from '@/components/UI/topnav.vue'
import addToCart from '@/components/addToCart.vue'
import miniCart from '@/components/miniCart.vue'
import myFooter from '@/components/UI/myFooter.vue'
@Options({
    components: {
        topnav,
        addToCart,
        miniCart,
        myFooter
    },
})
export default class item extends Vue {
    // quantity = 1
}
</script>