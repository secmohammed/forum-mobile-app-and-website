<template>
   <PullToRefresh @refresh="refreshList">
        <ListView for="section in sections"
            @itemTap="onItemTap" left="10" top="10" height="97%" class="list-group" width="100%" marginBottom="48">
            <v-template>
                <FlexboxLayout flexDirection="row" class="list-group-item">
                    <Label :text="section.title" class="list-group-item-heading"
                        style="width: 60%" />
                    <Label :text="section.description" textWrap="true" class="list-group-item-text"  style="width: 60%"/>
                </FlexboxLayout>
            </v-template>
        </ListView>
    </PullToRefresh>
</template>
<script>
    import ShowSection from '@/pages/forum/section/Show.vue'
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props:['sections'],
        methods: {
            ...mapActions('section', {
                indexSections : 'indexSection'
            }),
            onItemTap({ item }){
                this.$navigateTo(ShowSection, {
                    props: {
                        item
                    }
                })
            },
            refreshList(args) {
              let pullRefresh = args.object;
              this.indexSections().then(() => pullRefresh.refreshing = false)
            }
        }
    }
</script>
