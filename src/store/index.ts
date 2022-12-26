import { createStore, ActionContext, Mutation } from 'vuex'

interface items{
  // [x: string]: any;
  // splice(item: items, arg1: number): unknown;
  price: number,
  title: string,
  itemId: number,
  img: string,
  quantity: number
}

interface CartState{
  cart: items[] 
}

// type Context = {
//   commit: (name: string) => void;
// };

const cart = window.localStorage.getItem('cart');

export default createStore({
  state: {
    cart: cart ? JSON.parse(cart) : []
  } as CartState,
  getters: {
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    },
  },
  mutations: {
    //mutations accept 2 parameter; state and the data you're passing
    //mutations are methods
    addToCart(state: CartState, item: items): void{
      const itemExists = state.cart.find(product => product.itemId == item.itemId)

      if(itemExists){
        itemExists.quantity++;
        // const price = itemExists.price * itemExists.quantity
        // console.log(price);
      }else{
        state.cart.push(item);
      }
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
      // this.dispatch('saveData')
      // console.log(item);
    },
    // saveData(state: CartState){
    //   window.localStorage.setItem('cart', JSON.stringify(state.cart))
    // }
    removeFromCart(state:CartState, item:items){
      const index = state.cart.indexOf(item);
      state.cart.splice(index, 1)
      console.log(index);
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  actions: {
  },
  modules: {
  }
})
