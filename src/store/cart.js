import { createStore } from 'vuex'

export default createStore({
    state: {
        cartItems: []
    },
    mutations: {
        addToCart(state, car) {
            state.cartItems.push({
                car,
                quantity: 1
            })
        },

        removeFromCart(state, cartItem) {
            state.cartItems = state.cartItems.filter((item) => item !== cartItem)
        }
    },
    actions: {},
    getters: {}
})
