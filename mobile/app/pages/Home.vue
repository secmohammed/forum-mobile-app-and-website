<template>
    <Page class="page">
        <ActionBar>
          <GridLayout width="100%" columns="auto, *">
            <Label  :text="'fa-align-justify' | fonticon" fontSize="24"  class="fa" @tap="openDrawer()" col="0"/>
            <Label class="title" text="Home"  col="1"/>
          </GridLayout>
        </ActionBar>
        <StackLayout class="p-x-10" verticalAlignment="center">
            <Label class="h1 text-center" text="Pickr"/>

            <Label class="h3 text-center p-y-10" textWrap=true text="For when indecision may or may not be your problem"/>

            <Button class="btn btn-primary" v-if="isLoggedIn" @tap="goToSectionsPage" backgroundColor="#53ba82">Start Browsing Sections.</Button>
            <Button class="btn btn-primary" v-else @tap="goToRegisterPage" backgroundColor="#53ba82">Get Started</Button>
        </StackLayout>

    </Page>
</template>
<script>
    import Register from './auth/Register'
    import IndexSection from './forum/section/Index'
    import sideDrawer from '~/mixins/sideDrawer'
    import {mapGetters} from 'vuex'
    export default {
        mixins: [ sideDrawer ],
        computed:{
            ...mapGetters({
                isLoggedIn: 'user/isLoggedIn'
            })
        },
        methods : {
            goToRegisterPage() {
                this.$navigateTo(Register)
            },
            goToSectionsPage(){
                this.$navigateTo(IndexSection)
            }
        }
    }

</script>
