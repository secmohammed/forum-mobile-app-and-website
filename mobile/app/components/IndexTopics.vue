<template>
    <PullToRefresh @refresh="refreshList">
        <AbsoluteLayout ref="rootLayout">
            <Label v-if="section" :text="section.title" textWrap="true" left="10" top="10" height="97%" width="100%" marginBottom="48" />
            <ListView for="topic in topics"
                @itemTap="onItemTap" left="10" top="10" height="97%" class="list-group" width="100%" marginBottom="48">
                <v-template>
                    <FlexboxLayout flexDirection="row" class="list-group-item">
                        <slot name="avatar">
                            <Image src="https://via.placeholder/150" row="0" col="0" class="thumb img-circle" style="border-radius: 50%;max-width:30px;max-height:30px"/>
                        </slot>
                        <Label :text="topic.diffForHumans" class="list-group-item-text"  style="width: 60%"/>
                        <Label :text="topic.title" textWrap="true" class="list-group-item-text"  style="width: 60%"/>
                        <Label v-if="topic.section" :text="topic.section.title" textWrap="true"class="list-group-item-text"  style="width: 60%"/>
                    </FlexboxLayout>
                </v-template>
            </ListView>
            <FloatingButton v-if="isLoggedIn" :parentRefs="$refs" />
        </AbsoluteLayout>
    </PullToRefresh>

</template>
<script>
    import ShowTopic from '@/pages/forum/topic/Show.vue'
    import {mapActions, mapGetters} from 'vuex'
    import FloatingButton from './FloatingButton'
    export default {
        components: { FloatingButton },
        props: ['topics','forUser'],
        computed: {
            ...mapGetters('section',{
                section: 'getSection'
            }),
            ...mapGetters('user',{
                isLoggedIn: 'isLoggedIn'
            })
        },
        methods: {
            ...mapActions('topic',{
                indexTopics: 'index',
                indexUserTopics: 'indexForUser'
            }),
            onItemTap({item}) {
                this.$navigateTo(ShowTopic,{
                    props: {
                        topic: item
                    }
                })
            } ,
            refreshList(args) {
              let pullRefresh = args.object;
              if (this.forUser) {
                this.indexUserTopics().then(() => pullRefresh.refreshing = false)

              }else{
                this.indexTopics(this.section.id).then(() => pullRefresh.refreshing = false)

              }
            }

        }
    }
</script>
