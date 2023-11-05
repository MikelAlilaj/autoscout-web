<template>
    <Navbar :cartItems="cartItems"/>
    <div class="container mt-2">
        <form class="d-flex mt-2 mb-2" @submit.prevent="searchData">
            <input class="form-control me-2" type="search" placeholder="Name" aria-label="Search" v-model="params.name" />
            <input class="form-control me-2" type="search" placeholder="Engine Size" aria-label="Search" v-model="params.engine_size" />
            <select class="form-select me-2" v-model="params.price" @change="searchData">
                <option value="" selected>Price Range</option>
                <option value="0-5000">0 - 5,000</option>
                <option value="5000-10000">5,000 - 10,000</option>
                <option value="10000-20000">10,000 - 20,000</option>
                <option value="20000-50000">20,000 - 50,000</option>
                <option value="50000-100000">50,000 - 100,000</option>
                <option value="100000-200000">100,000 - 200,000</option>
            </select>
            <button class="btn btn-outline-success">Search</button>
        </form>
    
        <div class="row" v-if="data.cars.length > 0">
            <div class="col-md-2" v-for="car in data.cars">
                <div class="card mb-3">
                    <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Product 1" />
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ car.model.name }} {{ car.engine_size }} ({{ car.model.brand.name }})
                        </h5>
                        <p class="card-text">
                            <i v-for="(tag, index) in car.tags">
                                <span v-if="index !== 0">, </span> {{ tag.name }}</i>
                        </p>
                        <p class="card-text">{{ formatNumber(car.price) }}</p>
                        <a href="#" class="btn btn-primary" @click="addToCart(car)" v-if="!existingCartItem(car)">Add To Cart</a>
                        <a class="btn btn-primary no-underline" v-else>Added to Cart ✓</a>
                    </div>
                </div>
            </div>
            <vue-awesome-paginate :total-items="data.total" :items-per-page="12" :max-pages-shown="12" v-model="params.currentPage" :on-click="getData" />
        </div>
        <div v-else>
            <p class="mt-4 text-center display-2">No cars found.</p>
        </div>
    </div>
    </template>
    
    <script>
    import Navbar from '@/components/NavBarComponent.vue'; // Adjust the path to your Navbar componen
    import { mapState } from 'vuex';
    export default {
        components: {
            Navbar,
        },
        computed: {
            ...mapState(['cartItems']),
        },
        data() {
            return {
                data: {
                    cars: [],
                    total: null
                },
                params: {
                    currentPage: 1,
                    name: '',
                    engine_size: '',
                    price: ''
                },
            }
        },
        async mounted() {
            await this.getData()
        },
    
        methods: {
            async searchData() {
                this.params.currentPage = 1;
                await this.getData()
            },
    
            async getData() {
                const params = this.params
                const {
                    data
                } = await window.axios.get(process.env.VUE_APP_API_URL + 'cars', {
                    params
                })
                this.data = data.data
            },
    
            formatNumber(number) {
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(number)
            },
    
            async addToCart(car) {
                this.$store.commit('addToCart', car);
            },
    
            existingCartItem(car) {
                return this.cartItems.find((item) => item.car.id === car.id);
            },
    
    
        }
    }
    </script>
    
    <style scoped>
    .card-title {
        min-height: 50px;
    }
    
    .no-underline {
        background: transparent;
        border: none;
        box-shadow: none;
        color: green;
        pointer-events: none;
    }
    </style>
    