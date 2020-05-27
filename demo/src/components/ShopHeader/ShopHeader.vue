<template>
  <div class="shop-header">
    <nav class="shop-nav" :style="{backgroundImage: `url(${shopInfo.bgImg})`}">
      <a class="back" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
    </nav>
    <div class="shop-content" @click="toggleShopShow">
      <img class="content-image" :src="shopInfo.avatar">
      <div class="header-content">
        <h2 class="content-title">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
          <span class="content-name">{{shopInfo.name}}</span>
          <i class="content-icon"></i>
        </h2>
        <div class="shop-message">
          <span class="shop-message-detail">{{shopInfo.score}}</span>
          <span class="shop-message-detail">月售{{shopInfo.sellCount}}单</span>
          <span class="shop-message-detail">
            {{shopInfo.description}}
            <span>约{{shopInfo.deliveryTime}}分钟</span>
          </span>
          <span class="shop-message-detail">距离{{shopInfo.distance}}</span>
        </div>
      </div>
    </div>

    <div class="shop-header-discounts" v-if="shopInfo.supports" @click="toggleSupportShow">
      <div class="discounts-left">
        <div class="activity" :class="supportClasses[shopInfo.supports[0].type]">
          <span class="content-tag">
            <span class="mini-tag">{{shopInfo.supports[0].name}}</span>
          </span>
          <span class="activity-content ellipsis">{{shopInfo.supports[0].content}}</span>
        </div>
      </div>
      <div class="discounts-right">
        {{shopInfo.supports.length}}个优惠
      </div>
    </div>

    <transition name="fade">
      <div class="shop-brief-modal" v-show="shopShow">
        <div class="brief-modal-content">
          <h2 class="content-title">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
            <span class="content-name">{{shopInfo.name}}</span>
          </h2>
          <ul class="brief-modal-msg">
            <li>
              <h3>{{shopInfo.score}}</h3>
              <p>评分</p>
            </li>
            <li>
              <h3>{{shopInfo.sellCount}}单</h3>
              <p>月售</p>
            </li>
            <li>
              <h3>{{shopInfo.description}}</h3>
              <p>约{{shopInfo.deliveryTime}}分钟</p>
            </li>
            <li>
              <h3>{{shopInfo.deliveryPrice}}元</h3>
              <p>配送费用</p>
            </li>
            <li>
              <h3>{{shopInfo.distance}}</h3>
              <p>距离</p>
            </li>
          </ul>
          <h3 class="brief-modal-title">
            <span>公告</span>
          </h3>
          <div class="brief-modal-notice">
            {{shopInfo.bulletin}}
          </div>
          <div class="mask-footer" @click="toggleShopShow">
            <span class="iconfont icon-close"></span>
          </div>
        </div>
        <div class="brief-modal-cover" @click="toggleShopShow"></div>
      </div>
    </transition>

    <transition name="fade" >
      <div class="activity-sheet" v-show="supportShow" >
        <div class="activity-sheet-content">
          <h2 class="activity-sheet-title">优惠活动</h2>
          <ul class="list">
            <li class="activity-item" v-for="(support, index) in shopInfo.supports"
                :key="index" :class="supportClasses[support.type]">
            <span class="content-tag">
                <span class="mini-tag">{{support.name}}</span>
              </span>
              <span class="activity-content">{{support.content}}</span>
            </li>
          </ul>
          <div class="activity-sheet-close" @click="toggleSupportShow">
            <span class="iconfont icon-close"></span>
          </div>
        </div>
        <div class="activity-sheet-cover" @click="toggleSupportShow"></div>
      </div>
    </transition>
  </div>
</template>


<script>
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
                shopShow: false,
                supportShow: false
            }
        },
        computed: {
            ...mapState(['shopInfo'])
        },

        methods: {
            toggleShopShow() {
                this.shopShow = !this.shopShow
            },

            toggleSupportShow() {
                this.supportShow = !this.supportShow
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl";
    @import './stylus/ShopHeader.styl';
</style>