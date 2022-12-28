// import { createStore, ActionContext, Mutation, } from 'vuex'
import { createStore } from 'vuex'

interface items{
  price: number,
  title: string,
  itemId: string,
  img: string,
  quantity: number
}

interface CartState{
  product: any;
  cart: items[],
}

// type Context = {
//   commit: (name: string) => void;
// }; 

const cart = window.localStorage.getItem('cart');
const product = window.localStorage.getItem('product');

export default createStore({
  state: {
    cart: cart ? JSON.parse(cart) : [],
    product: product ? JSON.parse(product) : {}
  } as CartState,
  getters: {
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    cartQuantity(state) {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    }
  },
  mutations: {
    //mutations accept 2 parameter; state and the data you're passing
    addToCart(state: CartState, item: items): void{
      const itemExists = state.cart.find(product => product.itemId == item.itemId)
      if(itemExists){
        itemExists.quantity++;
        // itemExists.quantity += item.quantity
      }else{
        state.cart.push(item);
      }
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
      // this.dispatch('saveData')
    },

    // saveData(state: CartState){
    //   window.localStorage.setItem('cart', JSON.stringify(state.cart))
    // }

    removeFromCart(state:CartState, item:items){
      const index = state.cart.indexOf(item);
      state.cart.splice(index, 1)
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setItem(state, product) {
      state.product = product;
      window.localStorage.setItem('product', JSON.stringify(state.product))
    },

  },
  actions: {
  },
  modules: {
  }
})
