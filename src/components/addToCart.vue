<template>
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
    <div id="cart">
        <button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#miniCart" @click="addToCart">Add to Cart</button>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import toast from '@/components/UI/toast.vue'

@Options({
    props: {
        price: Number,
        title: String,
        itemId: String,
        img: String,
    },
    components:{
        toast
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
    toastIcon = ''
    toastTitle = ''
    toastShow = false

    addToCart(){
        this.toastIcon = 'success'
        this.toastTitle = 'Product added to cart successfully'
        this.toastShow = true
        this.$store.commit('addToCart', this.item)
        // console.log(this.item, ' add to cart itrm');
    }
}
</script>

<style scoped>
</style>
  