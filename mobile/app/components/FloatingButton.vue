<template>
    <AbsoluteLayout left="0" top="0" height="100%" width="100%"  
        ref="fabItemPosition" marginTop="87%" marginLeft="80%">
        <StackLayout class="fab-button" @tap="onButtonTap">
            <GridLayout rows="2, auto" horizontalAlignment="center" class="fab-icon">
                <Label row="1" class="fab-dash--1" />
                <Label row="1" class="fab-dash--2" />
            </GridLayout>
        </StackLayout>
    </AbsoluteLayout>
</template>
<script>
    import EventBus from '~/mixins/event-bus'
    const app = require('tns-core-modules/application')
    const platform = require('tns-core-modules/platform')
    import CreateTopic from '@/pages/forum/topic/Create'
    export default {
        props: ['parentRefs'],
        components: {
            CreateTopic
        },
        created(){
            EventBus.$on('appLoaded', (payload) => this.appLoaded(payload))
        },
        methods: {
            appLoaded(args) {
                let fabItemPosition = this.$refs.fabItemPosition.nativeView
                let rootLayout = this.parentRefs.rootLayout.nativeView

                // Needed to avoid masking child components on Android
                if (app.android && platform.device.sdkVersion >= '21') {
                    fabItemPosition.android.setClipChildren(false)
                    rootLayout.android.setClipChildren(false)
                }                
            },
            onButtonTap(args) {
                this.$navigateTo(CreateTopic)
            },      
        }
    }
</script>
<style scoped>
    .fab-button {
        width: 56;
        height: 56;
        background-color: #53ba82;
        border-radius: 28;
        vertical-align: center;
    }

    .fab-icon {
        height: 16;
        width: 16;
    }

    .fab-dash--1,
    .fab-dash--2 {
        background-color: #fff;
        transform: translate(0, -2);
        height: 16;
        width: 3;
    }

    .fab-dash--1 {
        transform: rotate(90deg) translate(0, -2);
    }
</style>
