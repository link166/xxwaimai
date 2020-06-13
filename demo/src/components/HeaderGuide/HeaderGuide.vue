<!--  -->
<template>
<div class='header'>
    <div class="header_search"  v-if="$route.path === '/msite'">
      <router-link to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
    </div>
      <div class="header_title">
        <span class="header_title_text ellipsis header_msite" v-if="$route.path === '/msite'">{{title}}</span>
        <span class="header_title_text" v-if="$route.path === '/order'">订单列表</span> 
          <span class="header_title_text" v-if="$route.path === '/search'">搜索</span>
        <span class="header_title_text"  v-if="$route.path === '/profile'">我的</span>
    </div>
      <router-link :to="userInfo._id?'/userInfo':'/login'">
        <div class="header_login" >
          <div class="header_login_text"  v-if="$route.path === '/msite'&&!userInfo._id">"登录/注册"</div>
          <i class="iconfont icon-geren" v-if="$route.path === '/msite'&&userInfo._id" style="font-size: 24px;"></i>
        </div>
      </router-link>
      <form class="search_form" action="#" v-if="$route.path === '/search'" @submit.prevent='search_shop'>
        <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model='keyword'>
        <input type="submit" name="submit" class="search_submit">
      </form>
      <section class="profile-number" v-if="$route.path === '/profile'">
         <router-link :to="userInfo._id?'/userInfo':'/login'"  class="profile-link">
          <div class="profile_image">
            <i class="iconfont icon-geren" ></i>
          </div>
          <div class="user-info">
            <p class="user-info-top" v-show="!userInfo.phone">{{userInfo.name||"登录/注册"}}</p>
            <p>
              <span class="user-icon">
                <i class="iconfont icon-shouji icon-mobile"></i>
              </span>
              <span class="icon-mobile-number">{{userInfo.phone?userInfo.phone:'暂无绑定手机号'}}</span>
            </p>
          </div>
          <span class="arrow">
            <i class="iconfont icon-jiantou"></i>
          </span>
        </router-link>
      </section>
</div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        components: {},
        data() {
            return {
                title: this.address.name,
                keyword: ''
            };
        },
        props: {
            title: String
        },
        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            search_shop() {
                this.$store.dispatch('getSearchShop', this.keyword)
            }
        }
    }
</script>
<style lang='less' rel='stylesheet/less'>
    @import '../../common/less/mixins.less';
    @import '../../common/less/header.less';
</style>