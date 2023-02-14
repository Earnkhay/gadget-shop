<template>
    <topnav/>
  <div class="container mt-5" style="padding-top: 120px !important;">
    <div class="row justify-content-between align-items-center">
        <div class="col-md-6 mb-3">
            <img :src="$store.state.product.image" width="500" height="350" class="img-fluid" alt="">
        </div>
        <div class="col-md-6">
            <h1 class="mb-4">{{ $store.state.product.name }}</h1>
            <p class="card-text">${{$store.state.product.price}}</p>
            <p class="card-text">{{$store.state.product.desc}}</p>
            <div class="d-flex">
                <!-- <input type="number" class="me-2" style="width: 10%;" v-model="quantity"> -->
                <add-to-cart :itemId="$store.state.product.id" :price="$store.state.product.price" :title="$store.state.product.name" :img="$store.state.product.image"/>
            </div>
        </div>
    </div>
  </div>
  <my-footer/>
  <mini-cart/>
</template>

<script lang="ts">
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
    // eslint-disable-next-line
    $store: any;
    // quantity = 1
}
</script>