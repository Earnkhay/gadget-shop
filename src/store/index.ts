import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: []
  },
  getters: {
  },
  mutations: {
    //mutations accept 2 parameter; state and the data you're passing
    //mutations are methods
    addToCart(state, item){
      // const found = state.cart.find(product => product.itemId == item.ItemId)

      // if(found){
      //   found.quantity++;
      // }else{
      //   state.cart.push(item);
      // }
      state.cart.push(item as never);
      console.log(item);
    }
  },
  actions: {
  },
  modules: {
  }
})
