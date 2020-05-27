<!--  -->
<template>
<div class=''  style="top:50px;position: relative;height: 500px;">
    <section class="profile">
        <section class="profile_info_data border-1px">
          <ul class="info_data_list">
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0.00</span>元</span>
              <span class="info_data_bottom">我的余额</span>
            </a>
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0</span>个</span>
              <span class="info_data_bottom">我的优惠</span>
            </a>
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0</span>分</span>
              <span class="info_data_bottom">我的积分</span>
            </a>
          </ul>
        </section>
        <section class="profile_my_order border-1px">
          <!-- 我的订单 -->
          <a href='javascript:' class="my_order">
            <span>
              <i class="iconfont icon-dingdan"></i>
            </span>
            <div class="my_order_div">
              <span>我的订单</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
            </div>
          </a>
          <!-- 积分商城 -->
          <a href='javascript:' class="my_order">
            <span>
              <i class="iconfont icon-jifen"></i>
            </span>
            <div class="my_order_div">
              <span>积分商城</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
            </div>
          </a>
          <!-- 硅谷外卖会员卡 -->
          <a href="javascript:" class="my_order">
            <span>
              <i class="iconfont icon-huiyuan-"></i>
            </span>
            <div class="my_order_div">
              <span>外卖会员卡</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
            </div>
          </a>
        </section>
        <section class="profile_my_order border-1px">
          <!-- 服务中心 -->
          <a href="javascript:" class="my_order">
            <span>
              <i class="iconfont icon-fuwu"></i>
            </span>
            <div class="my_order_div">
              <span>服务中心</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
            </div>
          </a>
        </section>
        <section class="profile_my_order border-1px">
          <mt-button type="danger" style="width:100%" v-if="userInfo._id" @click="logout()">退出登陆</mt-button>
        </section>
      </section>
</div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import {
        MessageBox,
        Toast
    } from 'mint-ui'
    export default {
        components: {},
        data() {
            return {

            };
        },
        computed: {
            ...mapState(['userInfo'])
        },
        watch: {},
        methods: {
            logout() {
                MessageBox.confirm('真的要退出马？').then((action) => {
                    this.$store.dispatch('logOut')
                    Toast("已登出")
                })
            }
        },
        created() {

        },
        mounted() {

        },
        beforeCreate() {},
        beforeMount() {},
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        activated() {},
    }
</script>
<style lang='stylus' rel='stylesheet/stylus'>
    @import './stylus/profile.styl'
</style>