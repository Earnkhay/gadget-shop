<template>
    <div class="d-flex flex-wrap container flex-wrapper">
    <div class="card mb-3 me-1" style="width: 17rem; min-height: 100%;" v-for="(product, id) in products" :key="id">
        <img :src="product.image" width="100" height="150" @click="itemDetail(product)" class="card-img-top" alt="Product image">
        <div class="card-body text-start">
        <div @click="itemDetail(product)" class="mb-3">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">${{product.price}}</p>
        </div>
        <add-to-cart :itemId="product.id" :price="product.price" :title="product.name" :img="product.image"/>
        </div>
    </div>
    </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import addToCart from '@/components/addToCart.vue'
import { db } from "@/firebase"
import { getAuth } from "firebase/auth"
import { collection, onSnapshot, where, query } from "firebase/firestore";

@Options({
components: { 
    addToCart,
},
})
export default class phones extends Vue {
    products = []
    auth = getAuth()
    productsCollectionRef = collection(db, `products`)
    productsCollectionQuery = query(this.productsCollectionRef, where('category', '==', 'Phone'));


created(){
        onSnapshot(this.productsCollectionQuery, (querySnapshot) => {
        const fbProducts = []
        querySnapshot.forEach((doc) => {
            const product = {
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                desc: doc.data().desc,
                image: doc.data().image,
                imgName: doc.data().imgName,
            }
            fbProducts.push(product)
        })
            this.products = fbProducts
        })
}

itemDetail(product){
    this.$store.commit('setItem', product);
    this.$router.push({
    name: 'item',
    });
}
}
</script>

<style scoped>
@media screen and (max-width: 1199px) {
.flex-wrapper{
    justify-content: center;
}
}
</style>