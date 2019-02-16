<template>
    <Page class="page">
        <ActionBar :title="topic.title" center>
          <GridLayout width="100%" columns="auto, *">
            <Label  :text="'fa-align-justify' | fonticon" fontSize="24"  class="fa" @tap="openDrawer()" col="0"/>
            <Label class="title" textWrap="true" :text="topic.title"  col="1"/>
          </GridLayout>
        </ActionBar>
        <FlexboxLayout class="p-10" backgroundColor="white" padding="10">
            <Label textWrap="true" :text="topic.title" class="h2 description-label" />
            <Label textWrap="true" class="p-y-10" :text="topic.body" />
            <IndexPosts :posts="topic.posts" class="p-10"/>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import IndexPosts from '@/components/IndexPosts'
    import sideDrawer from '~/mixins/sideDrawer'

    export default {
        mixins: [sideDrawer],
        components: {
            IndexPosts
        },
        props: ['topic']
    }
</script>
