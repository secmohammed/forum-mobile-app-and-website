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
            <Button class="btn btn-primary" backgroundColor="#53ba82" @tap="forgotPassword">Send me token</Button>
            <Label  class="h5 text-center text-primary p-y-10" @tap="goToLoginPage" text="login instead?" />

        </StackLayout>
    </Page>

</template>
<script>
    import {mapActions} from 'vuex'
    import Login from './Login.vue'
    export default {
        data() {
            return {
                loading: false,
                user: {
                    email: '',
                }
            }
        },
        methods: {
            ...mapActions('user', {
                forgotUserPassword: 'forgotPassword'
            }),
            goToLoginPage() {
                this.$navigateTo(Login)
            },
            forgotPassword(){
                this.loading = true
                this.forgotUserPassword(this.user).then(res => {
                    this.loading = false
                    this.$toast.notify(res)
                })
            }
        }
    }
</script>
