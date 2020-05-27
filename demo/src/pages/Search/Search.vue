<!--  -->
<template>
<div class=''>
    <section class="search">
      <section class="list" v-if="!noSearchShops">
        <ul class="list_container">
          <!--:to="'/shop?id='+item.id"-->
          <router-link :to="{path:'/shop', query:{id:item.id}}" tag="li"
                       v-for="item in searchShop" :key="item.id" class="list_li">
            <section class="item_left">
              <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
            </section>
            <section class="item_right">
              <div class="item_right_text">
                <p>
                  <span>{{item.name}}</span>
                </p>
                <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
                <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
              </div>
            </section>
          </router-link>
        </ul>
      </section>
      
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
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
                imgBaseUrl: 'http://cangdu.org:8001/img/',
                noSearchShops: false
            };
        },
        computed: {
            ...mapState(['searchShop'])
        },
        watch: {
            searchShop(value) {
                if (!value.length) { // 没有数据
                    this.noSearchShops = true
                } else { // 有数据
                    this.noSearchShops = false
                }
            }
        },
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
        activated() {},
    }
</script>
<style lang='stylus' rel='stylesheet/stylus'>
    @import './stylus/search.styl';
</style>