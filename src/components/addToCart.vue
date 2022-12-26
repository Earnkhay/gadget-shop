<template>
    <div id="cart">
        <button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#miniCart" @click="addToCart">Add to Cart</button>
    </div>
    <mini-cart/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import miniCart from '@/components/miniCart.vue'

@Options({
    props: {
        price: Number,
        title: String,
        itemId: Number,
        img: String
    },
    components: {
        miniCart
    }
})
export default class addToCart extends Vue {
    item = {
      name: this.title,
      price: this.price,
      itemId: this.itemId,
      img: this.img,
      quantity: 1
    }
    
    addToCart(){
        this.$store.commit('addToCart', this.item)
    }
}
</script>

<style scoped>
</style>
  