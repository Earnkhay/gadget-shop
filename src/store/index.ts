import { createStore, ActionContext, Mutation, } from 'vuex'

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
  cart: items[],
}

// type Context = {
//   commit: (name: string) => void;
// };

const cart = window.localStorage.getItem('cart');
const item = window.localStorage.getItem('item');

export default createStore({
  state: {
    cart: cart ? JSON.parse(cart) : [],
    item: item ? JSON.parse(item) : {}
  } as CartState,
  getters: {
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    },
  },
  mutations: {
    //mutations accept 2 parameter; state and the data you're passing
    addToCart(state: CartState, item: items): void{
      const itemExists = state.cart.find(product => product.itemId == item.itemId)
      if(itemExists){
        itemExists.quantity++;
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
    setItem(state: any, item: any) {
      state.item = item;
      window.localStorage.setItem('item', JSON.stringify(state.item))
    },

  },
  actions: {
  },
  modules: {
  }
})
