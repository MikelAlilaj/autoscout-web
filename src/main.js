import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
window.axios = require('axios');
import Toaster from "@meforma/vue-toaster";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import store from './store/cart';
library.add(fas);

createApp(App).use(router).use(Toaster, {
    position: "top-right",
}).use(VueAwesomePaginate).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app')