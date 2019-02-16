<template>
     <Page class="page">
        <ActionBar>
          <GridLayout width="100%" columns="auto, *">
            <Label  :text="'fa-align-justify' | fonticon" fontSize="24"  class="fa" @tap="openDrawer()" col="0"/>
            <Label class="title" text="Profile"  col="1"/>
          </GridLayout>
        </ActionBar>
        <DockLayout stretchLastChild="true">
            <!-- Summary -->
            <StackLayout orientation="vertical" dock="top">
                <GridLayout columns="*, *" rows="auto, auto" class="m-y-30 m-x-20">
                    <Label color="#53ba82" :text="user.username" textWrap="true" row="0" col="0" class="body medium" />
                    <Label color="#53ba82" :text="user.email" textWrap="true" row="1" col="0" class="body small" />
                    <Label color="#53ba82" :text="'Questions: ' + user.topicsCount" textWrap="true" row="0" col="1" class="body medium"/>
                    <Label color="#53ba82" :text="'Comments & Replies :' + user.postsCount" textWrap="true" row="1" col="1" class="body small" />
                </GridLayout> 
            </StackLayout>
            <StackLayout orientation="vertical" class="m-t-30"
                backgroundColor="#ffffff">
                <IndexTopics :topics="user.topics" forUser="true">
                    <Image slot="avatar" :src="user.avatar" row="0" col="0" class="thumb img-circle" style="border-radius: 50%;max-width:30px;max-height:30px"/>
                </IndexTopics>
            </StackLayout>
        </DockLayout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer'
    import IndexTopics from '@/components/IndexTopics'
    export default {
        mixins: [ sideDrawer ],
        props: ['user'],
        components:{ IndexTopics }
    };
</script>

<style scoped>
.large {
    font-size: 40;
    font-weight: bold;
    margin-bottom: 5;
    vertical-align: top;
}

.medium {
    font-size: 28;
    /* font-weight: bold; */
    margin-bottom: 5;
    vertical-align: top;
}

.small {
    font-size: 15;
    margin: 0;
    /* text-align: left;  */
}

.hr-light {
    background-color: white;
    opacity: 0.1;
}
</style>
