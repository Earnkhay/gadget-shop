<template>
    <topnav/>
  <div class="container mt-5">
    <div class="row justify-content-between align-items-center">
        <div class="col-md-6">
            <img :src="this.$store.state.item.thumbnail"  class="img-fluid" alt="">
        </div>
        <div class="col-md-6">
            <h1 class="mb-4">{{ this.$store.state.item.title }}</h1>
            <p class="card-text">${{this.$store.state.item.price}}</p>
            <p class="card-text">${{this.$store.state.item.description}}</p>
            <add-to-cart :itemId="this.$store.state.item.id" :price="this.$store.state.item.price" :title="this.$store.state.item.title" :img="this.$store.state.item.thumbnail"/>
        </div>
    </div>
  </div>
  <mini-cart/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import topnav from '@/components/UI/topnav.vue'
import addToCart from '@/components/addToCart.vue'
import miniCart from '@/components/miniCart.vue'
@Options({
    components: {
        topnav,
        addToCart,
        miniCart
    },
})
export default class item extends Vue {
}

</script>