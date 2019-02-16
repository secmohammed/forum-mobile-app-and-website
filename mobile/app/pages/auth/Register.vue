<template>
    <Page class="page">
        <ActionBar title="Register">
          <GridLayout width="100%" columns="auto, *">
            <Label  :text="'fa-align-justify' | fonticon" fontSize="24"  class="fa" @tap="openDrawer()" col="0"/>
            <Label class="title" text="Welcome to NativeScript-Vue!"  col="1"/>
          </GridLayout>
        </ActionBar>
        <StackLayout v-if="loading">
            <ActivityIndicator :busy="loading" />
        </StackLayout>

        <StackLayout class="p-10" v-else>
            <Label class="h1 text-center p-y-10" text="Oh Hi There, Join us ^^"/>

            <TextField v-model="user.username" hint="Your username" />
            <TextField v-model="user.email" keyboardType="email" hint="Your email" />
            <TextField v-model="user.password" secure="true" hint="Your Password" />

            <Button class="btn btn-primary" @tap="register" backgroundColor="#53ba82">Register</Button>
            <Label  class="h5 text-center text-primary p-y-10" @tap="goToLoginPage" text="login instead" />

        </StackLayout>
    </Page>
</template>
<script>
    import {mapActions} from 'vuex'
    import Login from './Login.vue'
    import sideDrawer from '~/mixins/sideDrawer'
    export default {
        mixins: [ sideDrawer ],
        data() {
            return {
                loading: false,
                user: {
                    username: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions('user',{
                registerUser: 'register'
            }),

            goToLoginPage() {
                this.$navigateTo(Login)
            },
            register() {
                this.loading = true
                this.registerUser(this.user).then(res => {
                    this.loading = false
                    this.$toast.notify('Hello there, please check your mail.')
                    this.goToLoginPage()
                }).catch(err => console.log(err))
            }
        }
        
    }
</script>
