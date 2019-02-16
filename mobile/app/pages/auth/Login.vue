<template>
    <Page class="page">
        <ActionBar title="Login" center>
          <GridLayout width="100%" columns="auto, *">
            <Label  :text="'fa-align-justify' | fonticon" fontSize="24"  class="fa" @tap="openDrawer()" col="0"/>
            <Label class="title" text="Welcome to NativeScript-Vue!"  col="1"/>
          </GridLayout>
        </ActionBar>
        <StackLayout v-if="loading">
            <ActivityIndicator :busy="loading" />
        </StackLayout>

        <StackLayout class="p-10" v-else>
            <Label class="h1 text-center p-y-10" text="Oh Hi There, Come in ^^"/>

            <TextField v-model="user.email" keyboardType="email" hint="Your email" />
            <TextField v-model="user.password" secure="true" hint="Your Password" />

            <Button class="btn btn-primary" backgroundColor="#53ba82" @tap="login">Login</Button>
            <Label  class="h5 text-center text-primary p-y-10" @tap="goToForgotPasswordPage" text="forgot password?" />

        </StackLayout>
    </Page>
</template>
<script>
    import {mapActions} from 'vuex'
    import Profile from '../Profile'
    import sideDrawer from '~/mixins/sideDrawer'
    import ForgotPassword from './ForgotPassword'
    export default {
        mixins: [ sideDrawer ],
        data() {
            return {
                loading: false,
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            goToForgotPasswordPage(){
                this.$navigateTo(ForgotPassword)
            },
            ...mapActions('user',{
                loginUser: 'login'
            }),
            login() {
                this.loading = true
                this.loginUser(this.user).then(user => {
                    this.loading = false
                    this.$toast.notify('Welcome back !')
                    this.$navigateTo(Profile,{
                        props: {
                            user
                        }
                    })
                }).catch(err => console.log(err))
            }
        }
        
    }
</script>
