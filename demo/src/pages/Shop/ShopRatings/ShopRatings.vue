<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{shopInfo.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="shopInfo.serviceScore" :size="36" />
            <span class="score">{{shopInfo.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="shopInfo.foodScore" :size="36" />
            <span class="score">{{shopInfo.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{shopInfo.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" :class="{active: selectType===2}" @click="setSelectType(2)">
            全部<span class="count">{{shopRatings.length}}</span>
          </span>
          <span class="block positive" :class="{active: selectType===0}" @click="setSelectType(0)">
            满意<span class="count">{{positiveSize}}</span>
          </span>
          <span class="block negative" :class="{active: selectType===1}" @click="setSelectType(1)">
            不满意<span class="count">{{shopRatings.length-positiveSize}}</span>
          </span>
        </div>
        <div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
          <span class="iconfont icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :score="rating.score" :size="24" />
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType===0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
    import BScroll from 'better-scroll'
    import {
        mapState,
        mapGetters
    } from 'vuex'
    import Star from '../../../components/Star/Star.vue'

    export default {

        data() {
            return {
                onlyShowText: true, // 是否只显示有文本的
                selectType: 2, // 选择的评价类型: 0满意, 1不满意, 2全部
            }
        },
        mounted() {
            this.$store.dispatch('getShopRatings', () => {
                this.$nextTick(() => {
                    new BScroll(this.$refs.ratings, {
                        click: true
                    })
                })
            })
        },

        computed: {
            ...mapState(['shopInfo', 'shopRatings']),
            ...mapGetters(['positiveSize']),

            filterRatings() {
                // 得到相关的数据
                const {
                    shopRatings,
                    onlyShowText,
                    selectType
                } = this

                // 产生一个过滤新数组
                return shopRatings.filter(rating => {
                    const {
                        rateType,
                        text
                    } = rating
                    /*
                      条件1:
                          selectType: 0/1/2
                          rateType: 0/1
                          selectType===2 || selectType===rateType
                      条件2
                          onlyShowText: true/false
                          text: 有值/没值
                          !onlyShowText || text.length>0
                     */
                    return (selectType === 2 || selectType === rateType) && (!onlyShowText || text.length > 0)
                })
            }
        },

        methods: {
            setSelectType(selectType) {
                this.selectType = selectType
            },
            toggleOnlyShowText() {
                this.onlyShowText = !this.onlyShowText
            }
        },

        components: {
            Star
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../common/stylus/mixins.styl";
    @import '../stylus/ShopRatings.styl';
</style>