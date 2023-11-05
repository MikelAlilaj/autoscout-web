<template>
<section class="background-radial-gradient overflow-hidden">
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
            <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
                <img src="../../public/autoscout.png" class="logo" />
            </div>
            <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div class="card">
                    <router-link  :to="{ name: 'register' }" class="btn btn-outline-primary ms-auto" >
                                Register
                        </router-link>
                    <form class="card-body px-4 py-2 px-md-5" @submit.prevent="login">
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <label class="form-label">Email address</label>
                            <input type="email" class="form-control" v-model="form.email" />
                            <span class="text-danger" v-if="v$.form.email.$error">
                                {{ v$.form.email.$errors[0].$message }}
                            </span>
                        </div>
                        <!-- Password input -->
                        <div class="form-outline mb-4">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" v-model="form.password" />
                            <span class="text-danger" v-if="v$.form.password.$error">
                                {{ v$.form.password.$errors[0].$message }}
                            </span>
                        </div>
                        <button type="submit" class="btn btn-outline-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import Auth from '../Auth.js'
import useValidate from '@vuelidate/core'
import {
    required,
    email,
    minLength
} from '@vuelidate/validators'
export default {
    data() {
        return {
            v$: useValidate(),
            form: {
                email: '',
                password: ''
            }
        }
    },
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            }
        }
    },
    methods: {
        async login() {
            this.v$.$validate()
            if (this.v$.$error) return
            try {
                const {
                    data
                } = await window.axios.post(process.env.VUE_APP_API_URL + 'login', this.form)
                Auth.login(data.token, data.user)
                this.$router.push('/')
            } catch (error) {
                const {
                    data
                } = error.response
                return this.$toast.error(data.message)
            }
        },

    }
}
</script>

<style scoped>
.btn-outline-primary {
    margin: 15px 20px 0px 0px;
    border-color: #1a75bb;
    color: #1a75bb;
}

.btn-outline-primary:hover {
    color: #fff;
    background-color: #1a75bb;
    border-color: #1a75bb;
}

.logo {
    max-width: 100%;
    height: auto;
}

.bg-glass {
    background-color: hsla(0, 0%, 100%, 0.9) !important;
    backdrop-filter: saturate(200%) blur(25px);
}
</style>
