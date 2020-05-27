<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in shopGoods" :key="index"
              :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in shopGoods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>


<script>
    import BScroll from 'better-scroll'
    import {
        mapState
    } from 'vuex'
    import CartControl from '../../../components/CartControl/CartControl.vue'
    import Food from '../../../components/Food/Food.vue'
    import ShopCart from '../../../components/ShopCart/ShopCart.vue'


    export default {
        data() {
            return {
                scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化)
                tops: [], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
                food: {}, // 需要显示的food
            }
        },
        mounted() {
            this.$store.dispatch('getShopGoods', () => { // 数据更新后执行
                this.$nextTick(() => { // 列表数据更新显示后执行

                    this._initScroll()
                    this._initTops()
                })
            })

        },
        computed: {
            ...mapState(['shopGoods']),

            // 计算得到当前分类的下标
            currentIndex() { // 初始和相关数据发生了变化
                // 得到条件数据
                const {
                    scrollY,
                    tops
                } = this
                // 根据条件计算产生一个结果
                const index = tops.findIndex((top, index) => {
                        // scrollY>=当前top && scrollY<下一个top
                        return scrollY >= top && scrollY < tops[index + 1]
                    })
                    // 返回结果
                return index
            }
        },

        methods: {
            // 初始化滚动
            _initScroll() {
                // 列表显示之后创建
                new BScroll('.menu-wrapper', {
                    click: true
                })
                this.foodsScroll = new BScroll('.foods-wrapper', {
                    probeType: 2, // 因为惯性滑动不会触发
                    click: true
                })

                // 给右侧列表绑定scroll监听
                this.foodsScroll.on('scroll', ({
                        x,
                        y
                    }) => {
                        // console.log(x, y)
                        this.scrollY = Math.abs(y)
                    })
                    // 给右侧列表绑定scroll结束的监听
                this.foodsScroll.on('scrollEnd', ({
                    x,
                    y
                }) => {
                    // console.log('scrollEnd', x, y)
                    this.scrollY = Math.abs(y)
                })

            },
            // 初始化tops
            _initTops() {
                // 1. 初始化tops
                const tops = []
                let top = 0
                tops.push(top)
                    // 2. 收集
                    // 找到所有分类的li
                const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
                Array.prototype.slice.call(lis).forEach(li => {
                    top += li.clientHeight
                    tops.push(top)
                })

                // 3. 更新数据
                this.tops = tops
                console.log(tops)
            },

            clickMenuItem(index) {
                // console.log(index)
                // 使用右侧列表滑动到对应的位置

                // 得到目标位置的scrollY
                const scrollY = this.tops[index]
                    // 立即更新scrollY(让点击的分类项成为当前分类)
                this.scrollY = scrollY
                    // 平滑滑动右侧列表
                this.foodsScroll.scrollTo(0, -scrollY, 300)
            },

            // 显示点击的food
            showFood(food) {
                // 设置food
                this.food = food
                    // 显示food组件 (在父组件中调用子组件对象的方法)
                this.$refs.food.toggleShow()
            }
        },

        components: {
            CartControl,
            Food,
            ShopCart
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../common/stylus/mixins.styl";
    @import '../stylus/ShopGoods.styl';
</style>