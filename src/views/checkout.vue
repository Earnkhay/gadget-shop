<template>
    <topnav/>
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
    <div class="container p-3">
      <div class="row g-3" style="padding-top: 120px !important;">
        <h1 class="text-center">Checkout</h1>
        <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Order Summary</span>
            <span class="badge bg-secondary rounded-pill">{{cartQuantity}}</span>
            </h4>
            <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-sm" v-for="(item, id) in $store.state.cart" :key="id">
                <div>
                    <h6 class="my-0">{{item.name}}</h6>
                    <small class="text-muted">Quantity: {{item.quantity}}</small>
                </div>
                <span class="text-muted">${{item.price * item.quantity}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${{cartTotal}}</strong>
            </li>
            </ul>
        </div>
        <div class="col-md-7 col-lg-8">
            <h4 class="mb-3">Billing address</h4>
            <form class="needs-validation">
            <div class="row g-3">
                <div class="col-12">
                    <label for="username" class="form-label">Name</label>
                    <div class="input-group has-validation">
                        <input type="text" class="form-control" id="username" v-model="name" required readonly>
                    </div>
                </div>

                <div class="col-12">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="email" readonly>
                </div>

                <div class="col-12">
                    <label for="address" class="form-label">Your address</label>
                    <input type="text" class="form-control" id="address" v-model="address" required>
                </div>

                <div class="col-md-5">
                    <label for="country" class="form-label">Country</label>
                    <select class="form-select" id="country" v-model="selectedCountry" required>
                        <option value="">Select a Country</option>
                        <option v-for="(country, index) in countries" :key="index" class="text-dark">{{ country.name.common }}</option>
                    </select>
                </div>

                <div class="col-md-4">
                    <label for="address" class="form-label">Your state</label>
                    <input type="text" class="form-control" id="state" v-model="state" placeholder="Lagos" required>
                </div>

                <div class="col-md-3">
                    <label for="zip" class="form-label">Postal code</label>
                    <input type="text" class="form-control" id="zip" placeholder="" required>
                </div>
            </div>

            <hr class="my-4">

            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="same-address"  value="same-address" v-model="sameAddress"  @change="setAddress">
                <label class="form-check-label" for="same-address">The shipping address is the same as my billing address</label>
            </div>

            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="save-info">
                <label class="form-check-label" for="save-info">Save this information for next time</label>
            </div>

            <hr class="my-4">

            <h4 class="mb-3">Payment method</h4>

            <div class="my-3">
                <div class="form-check">
                    <input id="debit" name="paymentMethod" type="radio" class="form-check-input" value="debitcard" v-model="selectedOption" checked required>
                    <label class="form-check-label" for="debit">Debit card</label>
                </div>
                <div class="form-check">
                    <input id="cash" name="paymentMethod" type="radio" class="form-check-input" value="cash" v-model="selectedOption" required>
                    <label class="form-check-label" for="cash">Pay on delivery</label>
                </div>
                <!-- <div class="form-check">
                    <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" value="paypal" v-model="selectedOption" required>
                    <label class="form-check-label" for="paypal">PayPal</label>
                </div> -->
            </div>

            <div class="row gy-3" v-if="selectedOption === 'debitcard'">
                <div class="col-md-6">
                    <label for="cc-name" class="form-label">Name on the card</label>
                    <input type="text" class="form-control" id="cc-name" placeholder="" required>
                    <small class="text-muted">Full name as displayed on the card</small>
                </div>

                <div class="col-md-6">
                    <label for="cc-number" class="form-label">Card number</label>
                    <input type="number" maxlength="16" class="form-control" id="cc-number" required>
                </div>

                <div class="col-md-3">
                    <label for="cc-expiration" class="form-label">Expiration date</label>
                    <input type="text" class="form-control" id="cc-expiration" placeholder="MM/YY" required>
                </div>

                <div class="col-md-3">
                    <label for="cc-cvv" class="form-label">CVV</label>
                    <input type="number" maxlength="3" class="form-control" id="cc-cvv" required>
                <div class="invalid-feedback">
                    رمز الحماية مطلوب
                </div>
                </div>
            </div>

            <hr class="my-4">

            <button class="w-100 btn btn-primary btn-lg" type="submit" @click.prevent="placeOrder">Pay (${{cartTotal}})</button>
            </form>
        </div>
     </div>  
    </div>
  <my-footer/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import topnav from '@/components/UI/topnav.vue'
import myFooter from '@/components/UI/myFooter.vue'
import { db } from "@/firebase"
import axios from 'axios'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc, addDoc, collection, query, orderBy } from "firebase/firestore";
import toast from '@/components/UI/toast.vue'

@Options({
    components: {
        topnav,
        myFooter,
        toast
    },
})
export default class checkout extends Vue {
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user?.uid
    selectedOption = ''
    // date = ""
    toastIcon = ''
    toastTitle = ''
    toastShow = false
    selectedCountry = ''
    sameAddress = false
    name = ""
    email: string|null = ""
    address = ""
    state = ""
    status = 'pending'
    // eslint-disable-next-line
    countries: any = []
    ordersCollectionRef = collection(db, `profiles/${this.id}/orders`)
    ordersCollectionQuery = query(this.ordersCollectionRef, orderBy('date', 'desc'));
    // eslint-disable-next-line
    $store: any;
    created(){
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.email = user.email;
                if(user.displayName != null){
                    this.name = user.displayName
                }else{
                    onSnapshot(doc(db, `profiles/${user.uid}`, ), (doc) => {
                        this.name = doc.data()?.name
                    })
                }
            }
        })
        this.selectedOption = 'debitcard'

        axios.get('https://restcountries.com/v3.1/region/africa', {
        })
        .then((res) => {
            this.countries = res.data
        })
        .catch(err => console.error(err));
    }
    setAddress(){
        if(this.sameAddress == true){
            onSnapshot(doc(db, `profiles/${this.id}`, ), (doc) => {
                this.address = doc.data()?.address
            })
        }else{
            this.address = ''
        }
    }
    get cartTotal() {
        return this.$store.getters.cartTotal
    }
    get cartQuantity() {
        return this.$store.getters.cartQuantity
    }
    
    placeOrder(){
        if (this.address != '' && this.state != '' && this.selectedCountry) {
            addDoc(this.ordersCollectionRef, { 
              address: this.address,
              state: this.state,
              country: this.selectedCountry,
              cart: this.$store.state.cart,
              PaymentMethod: this.selectedOption,
              cartTotal: this.cartTotal,
              cartQuantity: this.cartQuantity,
              status: this.status,
              date: Date.now(),
            })
            this.toastIcon = 'success'
            this.toastTitle = 'Order placed successfully'
            this.toastShow = true
            this.$router.push('/admin/orders')
            this.$store.commit('clearCart');
        }else{
            this.toastIcon = 'error'
            this.toastTitle = 'please input required details'
            this.toastShow = true
        }
    }
}
</script>
