<template>
    <Page class="page"  @loaded="appLoaded">
        <ActionBar :title="item.title" center>
          <GridLayout width="100%" columns="auto, *">
            <Label  :text="'fa-align-justify' | fonticon" fontSize="24"  class="fa" @tap="openDrawer()" col="0"/>
            <Label class="title" :text="item.title"  col="1"/>
          </GridLayout>
        </ActionBar>
            <StackLayout v-if="loading">
                <ActivityIndicator :busy="loading" />
            </StackLayout>
            <StackLayout v-if="!loading">
                <Label class="h1 text-center p-y-10"  :text="section.title" />
                <Label class="h4 text-center p-y-8"  :text="section.description" />
                <IndexTopics :topics="section.topics" />
            </StackLayout>
    </Page>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import EventBus from '~/mixins/event-bus'
    import sideDrawer from '~/mixins/sideDrawer'
    import IndexTopics from '@/components/IndexTopics'

    export default {
        mixins: [ sideDrawer ],
        components: {
            IndexTopics
        },
        props: ['item'],
        data(){
            return {
                loading: true
            }
        },
        computed: {
            ...mapGetters('section',{
                section: 'getSection'
            })
        },
        async created(){
            await this.showSection(this.item.id)
            this.loading = false
        },
        methods: {
            appLoaded(payload) {
                EventBus.$emit('appLoaded',payload)
            },

            ...mapActions('section',{
                showSection: 'showSection'
            })
        }
    }
</script>
