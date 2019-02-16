<template>
    <Page class="page">
        <ActionBar title="Create Topic" center>
          <GridLayout width="100%" columns="auto, *">
            <Label  :text="'fa-align-justify' | fonticon" fontSize="24"  class="fa" @tap="openDrawer()" col="0"/>
            <Label class="title" text="Let's create some topics"  col="1"/>
          </GridLayout>
        </ActionBar>
        <StackLayout v-if="loading">
            <ActivityIndicator :busy="loading" />
        </StackLayout>

        <StackLayout class="p-10" v-else>
            <Label class="h1 text-center p-y-10" text="Oh Hi There, Come in ^^"/>

            <TextField v-model="topic.title" hint="your problem title." />
            <TextField v-model="topic.body"  hint="Your Problem" />
            <ListPicker :items="sections" textField="title"
                @selectedIndexChange="selectedIndexChanged"/>
            <Button class="btn btn-primary" backgroundColor="#53ba82" @tap="storeTopic">Create Topic</Button>
        </StackLayout>
    </Page>

</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import sideDrawer from '~/mixins/sideDrawer'

    export default {
        mixins: [sideDrawer],
        data(){
            return {
                loading: true,
                topic: {
                    title: null,
                    body: null,
                    section_id: null
                }
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
            ...mapActions('topic',{
                store: 'store'
            }),
            ...mapActions('section', {
                indexSections : 'indexSection'
            }),
            selectedIndexChanged(event) {
                this.topic.section_id = this.sections[event.value].id
            },
            storeTopic() {
                this.loading = true
                this.store(this.topic).then(topic => {
                    this.loading = false
                    this.$toast.notify('Topic Created, Let\'s  wait for some help.')

                }).catch(err => console.log(err))
            }
        }
    }
</script>
