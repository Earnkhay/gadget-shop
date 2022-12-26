<template>
<div id="cart">
    <!-- Modal -->
    <div class="modal fade" id="miniCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">My Cart</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container-fluid d-flex" v-for="(item, id) in this.$store.state.cart" :key="id">
                <div class="me-3">
                    <img :src="item.img" alt="product image" class="img-fluid" width="55" height="55"> 
                </div>
                <div>
                    <h4>{{item.name}}</h4>
                    <p>${{item.price}}</p>
                    <p>Quantity: {{item.quantity}}</p>
                </div>
                <div class="ms-auto" style="cursor: pointer;" @click="$store.commit('removeFromCart', item)">X</div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Continue shopping</button>
            <button class="btn btn-primary" @click="checkout" data-bs-dismiss="modal" aria-label="Close">
                View Cart and Checkout
            </button>
            
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {
    },
})
export default class miniCart extends Vue {
    checkout(){
        this.$router.push('/cart')
    }
}
</script>

