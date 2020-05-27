import Vue from 'vue'
import { RECEIVE_ADRESS, RECEIVE_SHOPS, CLEAR_CART, INCREMENT_FOOD_COUNT, SEARCH_SHOP, DECREMENT_FOOD_COUNT, RECEIVE_FOODTYPE, RECEIVE_USERINFO, RECEIVE_CLEARUSERINFO, RECEIVE_SHOPINFO, RECEIVE_SHOPRATINGS, RECEIVE_SHOPGOODS } from './mutations-type'
export default {
    [RECEIVE_ADRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_FOODTYPE](state, { foodType }) {
        state.foodType = foodType
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USERINFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RECEIVE_CLEARUSERINFO](state) {
        state.userInfo = {}
    },
    [RECEIVE_SHOPINFO](state, { shopInfo }) {
        state.shopInfo = shopInfo
    },
    [RECEIVE_SHOPRATINGS](state, { shopRatings }) {
        state.shopRatings = shopRatings
    },
    [RECEIVE_SHOPGOODS](state, { shopGoods }) {
        state.shopGoods = shopGoods
    },
    [INCREMENT_FOOD_COUNT](state, { food }) {
        if (!food.count) {
            Vue.set(food, 'count', 1)
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT](state, { food }) {
        if (food.count) {
            food.count--
                if (food.count === 0) {
                    // 将food从cartFoods中移除
                    state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
                }
        }
    },
    [CLEAR_CART](state) {
        // 清除food中的count
        state.cartFoods.forEach(food => food.count = 0)
            // 移除购物车中所有购物项
        state.cartFoods = []
    },
    [SEARCH_SHOP](state, { searchShop }) {
        state.searchShop = searchShop
    }
}