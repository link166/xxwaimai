import { RECEIVE_ADRESS, INCREMENT_FOOD_COUNT, DECREMENT_FOOD_COUNT, SEARCH_SHOP, CLEAR_CART, RECEIVE_SHOPS, RECEIVE_FOODTYPE, RECEIVE_USERINFO, RECEIVE_CLEARUSERINFO, RECEIVE_SHOPINFO, RECEIVE_SHOPGOODS, RECEIVE_SHOPRATINGS } from './mutations-type'
import { reqAdress, reqFoodType, reqShops, sendCode, reqShopsByKeys, reqUserInfo, logout, reqShopGoods, reqShopRatings, reqShopInfo } from '../api/index'
export default {
    async getAdress({ commit, state }) {
        const geohash = state.latitude + ',' + state.longtitude
        const result = await reqAdress(geohash)
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADRESS, { address })
        }
    },
    async getFoodType({ commit }) {
        const result = await reqFoodType()
        if (result.code === 0) {
            const foodType = result.data
            commit(RECEIVE_FOODTYPE, { foodType })
        }
    },
    async getShops({ commit, state }) {
        const latitude = state.latitude
        const longtitude = state.longtitude
        const result = await reqShops(latitude, longtitude)
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, { shops })
        }
    },
    async getCode({ commit }, { phone }) {
        const result = await sendCode(phone)
        if (result.code === 1) {
            return new Promise((resolve, reject) => {
                reject("发送验证码失败")
            })
        }
        return Promise.resolve()
    },
    recordUser({ commit }, userInfo) {
        commit(RECEIVE_USERINFO, { userInfo })
    },
    async getUerInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 0) {
            const userInfo = result.data
            commit(RECEIVE_USERINFO, { userInfo })
        }
    },
    async logOut({ commit }) {
        const result = await logout()
        if (result.code === 0) {
            commit(RECEIVE_CLEARUSERINFO)
        }
    },
    async getShopInfo({ commit }) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const shopInfo = result.data
            commit(RECEIVE_SHOPINFO, { shopInfo })
        }
    },
    async getShopRatings({ commit }, cb) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const shopRatings = result.data
            commit(RECEIVE_SHOPRATINGS, { shopRatings })
        }
        cb && cb()
    },
    async getShopGoods({ commit }, cb) {
        console.log("im running")
        const result = await reqShopGoods()
        if (result.code === 0) {
            const shopGoods = result.data
            console.log(result.data)
            commit(RECEIVE_SHOPGOODS, { shopGoods })
        }
        cb && cb()
    },
    updateFoodCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(INCREMENT_FOOD_COUNT, { food })
        } else {
            commit(DECREMENT_FOOD_COUNT, { food })
        }
    },
    clearCart({ commit }) {
        commit(CLEAR_CART)
    },
    async getSearchShop({ commit, state }, keyword) {
        const geohash = state.latitude + ',' + state.longtitude
        const result = await reqShopsByKeys(keyword, geohash)
        if (result.code === 0) {
            const searchShop = result.data
            console.log(keyword)
            commit(SEARCH_SHOP, { searchShop })
        }
    }
}