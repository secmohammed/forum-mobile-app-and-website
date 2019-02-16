<template lang="html">
  <ScrollView>
    <StackLayout width="100%">
      <GridLayout v-if="isLoggedIn" columns="100, *" rows="auto, auto, auto"  class="p-l-20" backgroundColor="#ffffff">
        <Image :src="user.avatar" row="0" col="0" class="thumb img-circle" style="border-radius: 50%;max-width:30px;max-height:30px" @tap="goToPage($routes.Profile, user)"/>
        <Label row="0" col="1" class="h2 body p-l-15 drawer-header" :text="user.username" @tap="goToPage($routes.Profile)"/>
      </GridLayout>
      <Label class="drawer-item" text="Logout" @tap="logoutUser" v-if="isLoggedIn" />
      
      <Label
        v-for="(page, i) in pages"
        @tap="goToPage(page.component)"
        class="drawer-item"
        :text="page.name"
        :key="i"
      />

      <Button class="drawer-close-button" @tap="closeDrawer()">Close Me</Button>
    </StackLayout>
  </ScrollView>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'
import {mapGetters,mapActions} from 'vuex'
export default {
  mixins: [sideDrawer],
  computed: {
    ...mapGetters('user',{
      isLoggedIn: 'isLoggedIn',
      user: 'getUser'
    }),
    pages() {
      let pages = [
        { name: 'Home', component: this.$routes.Home },
        { name: 'Sections', component: this.$routes.IndexSection },
      ]
      if (!this.isLoggedIn) {
        pages.push(
          { name: 'Login', component: this.$routes.Login },
          { name: 'Register', component: this.$routes.Register }
        )
      }
      return pages
    }
  },
  methods: {
    ...mapActions({ logout: 'user/logout'}),
    logoutUser() {
      this.logout().then(message => this.$toast.notify(message))
    },
    goToPage (pageComponent, data = null) {
      this.$navigateTo(pageComponent, {
        props: {
          data
        }
      })
      this.closeDrawer()
    }
  }
}
</script>

<style lang="css">
</style>
