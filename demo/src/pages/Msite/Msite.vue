<!--  -->
<template>
<div class='msite'>
    <div class="msite_item">
        <nav class="msite_nav">
            <div class="swiper-container" v-if="foodType.length>0">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(foodTypeArr,index) in foodTypeArrs" :key="index">
                  <a href="javascript:" class="link_to_food" v-for="(foodType,index) in foodTypeArr" :key="index">
                    <div class="food_container">
                      <img :src='baseImgUrl+foodType.image_url'>
                    </div>
                    <span>{{foodType.title}}</span>
                  </a>
                </div>
              </div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>
            </div>
            <img src="./images/msite_back.svg" alt="" v-else>
          </nav>
    <ShopList></ShopList>
    </div>
    <div class="bc"></div>
</div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import ShopList from '../../components/ShopList/ShopList.vue'
    import swiper from 'swiper'
    export default {
        components: {
            ShopList
        },
        data() {
            return {
                baseImgUrl: "https://fuss10.elemecdn.com"
            };
        },
        computed: {
            ...mapState(["foodType"]),
            foodTypeArrs() {
                const {
                    foodType
                } = this
                const arrs = []
                let arr = []
                let max = 8
                let len = foodType.length
                foodType.forEach(f => {
                    if (arr.length == max) {
                        // arrs.push(arr)
                        arr = []
                    }
                    if (arr.length == 0) {
                        arrs.push(arr)
                    }
                    arr.push(f)
                })
                return arrs
            }
        },
        watch: {
            foodType(value) {
                this.$nextTick(() => { //更新数据后，一旦界面更新，执行此函数
                    new swiper('.swiper-container', {
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination'
                        }
                    })
                })
            }
        },
        methods: {

        },
        created() {

        },
        mounted() {

        },

    }
</script>
<style lang='less' rel='stylesheet/less'>
    @import '../../common/less/mixins.less';
    @import './less/msite.less';
</style>