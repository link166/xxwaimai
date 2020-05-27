<template>
  <div id="app">
      <HeaderGuide v-show="$route.meta.showfooter" :title="address.name"/>
      <router-view/>
      <FooterGuide  v-show="$route.meta.showfooter"/>
  </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import FooterGuide from './components/FooterGuide/FooterGuide.vue'
    import HeaderGuide from './components/HeaderGuide/HeaderGuide.vue'
    export default {
        name: 'App',
        components: {
            FooterGuide,
            HeaderGuide
        },
        mounted() {
            this.$store.dispatch('getAdress')
            this.$store.dispatch('getFoodType')
            this.$store.dispatch('getShops')
            this.$store.dispatch('getUerInfo')
        },
        computed: {
            ...mapState(["address"])
        }
    }
</script>

<style lang="less">
    @import "./common/less/index.less";
</style>