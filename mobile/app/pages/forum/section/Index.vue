<template>
    <Page class="page">
        <ActionBar title="Available Sections" center>
          <GridLayout width="100%" columns="auto, *">
            <Label  :text="'fa-align-justify' | fonticon" fontSize="24"  class="fa" @tap="openDrawer()" col="0"/>
            <Label class="title" text="Sections"  col="1"/>
          </GridLayout>
        </ActionBar>
        <StackLayout v-if="loading">
            <ActivityIndicator :busy="loading" />
        </StackLayout>

        <StackLayout v-else>
            <IndexSections :sections="sections"/>
        </StackLayout>
    </Page>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import sideDrawer from '~/mixins/sideDrawer'
    import IndexSections from '@/components/IndexSections'
    import EventBus from '~/mixins/event-bus'

    export default {
        mixins: [ sideDrawer ],
        components: {
            IndexSections
        },
        data() {
            return {
                loading: true
            }
        },
        computed: {
            ...mapGetters('section',{
                sections: 'getSections'
            })
        },
        async created() {
            await this.indexSections()
            this.loading = false
        },
        methods: {
            ...mapActions('section', {
                indexSections : 'indexSection'
            }),
        }
    }
</script>
