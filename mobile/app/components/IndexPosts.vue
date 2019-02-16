<template>
<ScrollView>
<ListView for="post in posts"  left="10" top="10">
    <v-template>
        <StackLayout>
            <Image :src="post.user.avatar" @tap="goToProfilePage(post.user.username)" left="0"  width="15%" class="thumb img-circle" />
            <Label :text="post.user.username" textWrap="true" margin="0" @tap="goToProfilePage(post.user.username)" width="60%"/>
            <Label :text="post.body" textWrap="true"
                style="width: 60%" />
            <posts v-if="post.children" :posts="post.children" />
        </StackLayout>
    </v-template>
</ListView>
</ScrollView>
</template>
<script>
    import {mapActions} from 'vuex'
    import Profile from '@/pages/Profile.vue'
    export default {
        name: 'posts',
        props: ['posts'],
        methods: {
            ...mapActions('user',{
                getUser: 'getUserThroughUsername'
            }),
            goToProfilePage(username) {
                this.getUser(username).then((user) => {
                    this.$navigateTo(Profile,{
                        props: {
                            user
                        }
                    })
                })
            }
        }
    }
</script>
