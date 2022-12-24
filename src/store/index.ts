import { createStore, ActionContext } from 'vuex'

type items = {
  price: number,
  title: string,
  itemId: number,
  img: string,
  quantity: number
};

type CartState = {
  cart: items[]
}

export default createStore({
  state: {
    cart: []
  } as CartState,
  getters: {
  },
  mutations: {
    //mutations accept 2 parameter; state and the data you're passing
    //mutations are methods
    addToCart(state: CartState, item: items){
      const itemExists = state.cart.find(product => product.itemId == item.itemId)

      if(itemExists){
        itemExists.quantity++;
        const price = itemExists.price * itemExists.quantity
        console.log(price);
      }else{
        state.cart.push(item);
      }
      // state.cart.push(item);
      console.log(item);
    }
  },
  actions: {
  },
  modules: {
  }
})
