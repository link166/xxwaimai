<!--  -->
<template>
          <!--首页附近商家-->
          <div class="msite_shop_list">
            <div class="shop_header">
              <i class="iconfont icon-xuanxiang"></i>
              <span class="shop_header_title">附近商家</span>
            </div>
            <div class="shop_container">
              <ul class="shop_list" v-if="shops.length>0">
                <li class="shop_li border-1px" v-for="(shop,index) in shops" :key="index" @click="$router.push('/shop')">
                  <a>
                    <div class="shop_left">
                      <img class="shop_img" :src="imageBasePath+shop.image_path">
                    </div>
                    <div class="shop_right">
                      <section class="shop_detail_header">
                        <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                        <ul class="shop_detail_ul">
                          <li class="supports" v-for="(support,index) in shop.supports" :key="index">{{support.icon_name}}</li>
                        </ul>
                      </section>
                      <section class="shop_rating_order">
                        <section class="shop_rating_order_left">
                          <star :score="shop.rating" :size="24"></star>
                          <div class="rating_section">
                            {{shop.rating}}
                          </div>
                          <div class="order_section">
                            月售{{shop.recent_order_num}}单
                          </div>
                        </section>
                        <section class="shop_rating_order_right">
                          <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                        </section>
                      </section>
                      <section class="shop_distance">
                        <p class="shop_delivery_msg">
                          <span>¥{{shop.float_minimum_order_amount}}起送</span>
                          <span class="segmentation">/</span>
                          <span>{{shop.piecewise_agent_fee.tips}}</span>
                        </p>
                      </section>
                    </div>
                  </a>
                </li>
              </ul>
              <ul v-else>
                <li v-for="i in 4">
                  <img src="./images/shop_back.svg" alt="" >
                </li>
              </ul>
            </div>
          </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import star from '../star/star.vue'
    export default {
        components: {
            star
        },
        data() {
            return {
                imageBasePath: "https://fuss10.elemecdn.com/"
            };
        },
        computed: {
            ...mapState(['shops'])
        },
        watch: {},
        methods: {

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
        acivated() {},
    }
</script>
<style lang='less' rel='stylesheet/less'>
    @import '../../common/less/mixins.less';
    @import './less/shop.less';
</style>