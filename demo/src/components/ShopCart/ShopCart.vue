<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{shopInfo.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
    import {
        MessageBox
    } from 'mint-ui'
    import BScroll from 'better-scroll'
    import {
        mapState,
        mapGetters
    } from 'vuex'
    import CartControl from '../CartControl/CartControl.vue'

    export default {
        data() {
            return {
                isShow: false
            }
        },

        computed: {
            ...mapState(['cartFoods', 'shopInfo']),
            ...mapGetters(['totalCount', 'totalPrice']),
            payClass() {
                const {
                    totalPrice
                } = this
                const {
                    minPrice
                } = this.shopInfo

                return totalPrice >= minPrice ? 'enough' : 'not-enough'
            },
            payText() {
                const {
                    totalPrice
                } = this
                const {
                    minPrice
                } = this.shopInfo
                if (totalPrice === 0) {
                    return `￥${minPrice}元起送`
                } else if (totalPrice < minPrice) {
                    return `还差￥${minPrice-totalPrice}元起送`
                } else {
                    return '结算'
                }
            },

            listShow() {
                // 如果总数量为0, 直接不显示
                if (this.totalCount === 0) {
                    this.isShow = false
                    return false
                }

                if (this.isShow) {
                    this.$nextTick(() => {
                        // 实现BScroll的实例是一个单例
                        if (!this.scroll) {
                            this.scroll = new BScroll('.list-content', {
                                click: true
                            })
                        } else {
                            this.scroll.refresh() // 让滚动条刷新一下: 重新统计内容的高度
                        }

                    })
                }

                return this.isShow
            }
        },


        methods: {
            toggleShow() {
                // 只有当总数量大于0时切换
                if (this.totalCount > 0) {
                    this.isShow = !this.isShow
                }
            },

            clearCart() {
                MessageBox.confirm('确定清空购物车吗?').then(action => {
                    this.$store.dispatch('clearCart')
                }, () => {});
            }
        },
        components: {
            CartControl
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl";
    @import './stylus/ShopCart.styl';
</style>