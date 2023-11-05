<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <div class="ms-auto me-4">
                <button type="button" class="btn btn-primary position-relative me-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <font-awesome-icon icon="shopping-cart" class="fa-xl" />
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {{ cartItems.length !== 0 ? cartItems.length : ''  }}
                            </span>
                        </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Cart</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card mb-3" style="max-width: 540px;" v-for="cart in cartItems">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="https://via.placeholder.com/300x255" class="card-img-top" alt="Product 1" />
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body pt-1">
                                                <h5 class="card-title mb-0">{{ cart.car.model.name }} {{ cart.car.engine_size }} ({{ cart.car.model.brand.name }})</h5>
                                                <p class="card-text mb-0">
                                                    <i v-for="(tag, index) in cart.car.tags">
                                                                <span v-if="index !== 0">, </span> {{ tag.name }}</i>
                                                </p>
                                                <p class="card-text mb-1">${{ cart.car.price }}</p>
                                                <div class="item-actions">
                                                    <button class="btn btn-success" @click="cart.quantity++">+</button>
                                                    <span class="ms-1 me-1">{{ cart.quantity }}</span>
                                                    <button class="btn btn-danger" @click="cart.quantity > 1 ? cart.quantity-- : ''">-</button>
                                                    <button class="btn btn-danger remove-from-cart" @click="removeFromCart(cart)">
                                                                <font-awesome-icon icon="trash" class="fa-x" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="buy" v-if="cartItems.length !== 0">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
    
                <button class="btn btn-light" type="submit" @click="logOut" v-if="authUser">Logout</button>
    
            </div>
        </div>
    </nav>
</template>

<script>
import Auth from '../Auth.js'
export default {
    props: {
        cartItems: Array,
    },

    data() {
        return {
            authUser: null,
        }
    },
    async mounted() {
        this.authUser = Auth.check();
    },
    methods: {
        removeFromCart(cart) {
            this.$store.commit('removeFromCart', cart);
        },

        async logOut() {
            try {
                await window.axios.post(process.env.VUE_APP_API_URL + "logout");
                Auth.logOut();
                this.$router.push("/login");
            } catch (error) {
                return this.$toast.error(
                    "An unspecified error occurred. Please contact us for assistance."
                );
            }
        },

        async buy() {
            try {
                if (this.authUser) {
                    const {
                        data
                    } = await window.axios.post(process.env.VUE_APP_API_URL + "cars/buy");
                    this.cartItems.length = 0
                    return this.$toast.success(data.message)
                } else {
                    this.$router.push("/login");
                }
            } catch (error) {
                console.log(error);
                return this.$toast.error(
                    "An unspecified error occurred. Please contact us for assistance."
                );
            }
        },

    }
}
</script>

<style scoped>
.remove-from-cart {
    float: right;
}
</style>
