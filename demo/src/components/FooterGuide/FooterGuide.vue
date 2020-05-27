<!--  -->
<template>
<div class='footer '>
   <div class="footer_item" :class="{on:'/msite'===$route.path}" @click="goTo('/msite')">
       <span class="item_icon ">
           <i class="iconfont icon-waimai footer_msite "></i>
       </span>
   </div>
   <div class="footer_item" :class="{on:'/search'===$route.path}" @click="goTo('/search')">
    <span class="item_icon" >
        <i class="iconfont icon-sousuo"></i>
    </span>
    <span>搜索</span>
   </div>
   <div class="footer_item" :class="{on:'/order'===$route.path}" @click="goTo('/order')">
    <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
    </span>
    <span>订单</span>
   </div>
   <div class="footer_item" :class="{on:'/profile'===$route.path}" @click="goTo('/profile')">
    <span class="item_icon">
        <i class="iconfont icon-geren4"></i>
    </span>
    <span>我的</span>
   </div>
</div>
</template>
<script>
    export default {

        components: {},
        data() {

            return {

            };
        },

        computed: {},

        watch: {},

        methods: {
            goTo(path) {
                this.$router.replace(path)
            }
        },

        created() {

        },

    }
</script>
<style lang="less" rel="stylesheet/less">
    @import '../../common/less/mixins.less';
    @import '../../common/less/footer.less';
</style>