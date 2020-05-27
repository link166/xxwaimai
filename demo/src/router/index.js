import Vue from 'vue'
import Router from 'vue-router'
import msite from '../pages/Msite/Msite.vue'
import order from '../pages/Order/Order.vue'
import search from '../pages/Search/Search.vue'
import profile from '../pages/Profile/Profile.vue'
import shop from '../pages/Shop/Shop.vue'
import login from '../pages/Login/login.vue'
import shopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import shopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import shopInfo from '../pages/Shop/ShopInfo/shopinfo.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/msite'
        },
        {
            path: '/msite',
            component: msite,
            meta: {
                showfooter: true
            }
        },
        {
            path: '/order',
            component: order,
            meta: {
                showfooter: true
            }
        },
        {
            path: '/search',
            component: search,
            meta: {
                showfooter: true
            }
        },
        {
            path: '/profile',
            component: profile,
            meta: {
                showfooter: true
            }
        },
        {
            path: '/login',
            component: login,
            meta: {
                showfooter: false
            }
        },
        {
            path: '/shop',
            component: shop,
            meta: {
                showfooter: false
            },
            children: [{
                    path: '/shop/goods',
                    component: shopGoods,
                    meta: {
                        showfooter: false
                    }
                },
                {
                    path: '/shop/ratings',
                    component: shopRatings,
                    meta: {
                        showfooter: false
                    }
                },
                {
                    path: '/shop/info',
                    component: shopInfo,
                    meta: {
                        showfooter: false
                    }
                },
                {
                    path: '',
                    redirect: '/shop/goods'
                }
            ]
        }
    ]
})