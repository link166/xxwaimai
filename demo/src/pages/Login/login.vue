<!--  -->
<template>
    <section class="loginContainer">
        <div class="loginInner">
          <div class="login_header">
            <h2 class="login_logo">xx外卖</h2>
            <div class="login_header_title">
              <a href="javascript:;" :class="{on:type}" @click="type=true">短信登录</a>
              <a href="javascript:;" :class="{on:!type}" @click="type=false">密码登录</a>
            </div>
          </div>
          <div class="login_content">
            <form @submit.prevent="login">
              <div :class="{on:type}">
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                  <button :disabled="!isRightPhone" class="get_verification" :class="{right_phone:isRightPhone}" @click.prevent="getCode()">{{computetime>0?`已发送${computetime}s`:'获取验证码'}}</button>
                </section>
                <section class="login_verification">
                  <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                </section>
                <section class="login_hint">
                  温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                  <a href="javascript:;">《用户服务协议》</a>
                </section>
              </div>
              <div :class="{on:!type}">
                <section>
                  <section class="login_message">
                    <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                  </section>
                  <section class="login_verification">
                    <input type="tel" maxlength="8" placeholder="密码" v-if="passwordShow" v-model="pwd">
                    <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                    <div class="switch_button" @click="passwordShow=!passwordShow" :class="passwordShow?'on':'off'">
                      <div class="switch_circle" :class="{right:passwordShow}"></div>
                      <span class="switch_text">{{passwordShow?"abc":"... "}}</span>
                    </div>
                  </section>
                  <section class="login_message">
                    <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" >
                    <img class="get_verification" id="captcha" src="	http://localhost:4000/captcha" alt="captcha" @click='getCaptcha()'>
                  </section>
                </section>
              </div>
              <input type="submit" class="login_submit" value="登录">
              <!-- <button class="login_submit" @click.prevent="">登录</button> -->
            </form>
            <a href="javascript:;" class="about_us">关于我们</a>
          </div>
          <a href="javascript:" class="go_back" @click="$router.back()">
            <i class="iconfont icon-jiantou-copy"></i>

          </a>
        </div>
        <AlertTip :alertText="alertText" v-if="showAlert" @closeTip="CloseTip" ></AlertTip>
      </section>
</template>

<script>
    import AlertTip from '../../components/AlertTip/AlertTip.vue'
    import {
        reqPwdLogin,
        loginBysms
    } from '../../api/index.js'
    export default {
        components: {
            AlertTip
        },
        data() {
            return {
                type: true,
                phone: '', // 手机号
                code: '', // 短信验证码
                computetime: 0, //短信倒计时
                passwordShow: false, // 是否展示密码
                name: '', // 用户名
                pwd: '', // 密码
                captcha: '', // 图片验证码
                alertText: '', // 错误文本
                showAlert: false // 是否展示错误提示框
            };
        },
        computed: {
            isRightPhone() {
                let phone = this.phone
                let Reg = /^1\d{10}$/
                return Reg.test(phone)
            }
        },
        watch: {},
        methods: {
            // 获取短信验证码
            getCode() {
                let phone = this.phone
                let timer = this.timer
                if (!this.computetime) {
                    this.computetime = 30
                    this.timer = setInterval(() => {
                        this.computetime--
                            if (!this.computetime) {
                                clearInterval(timer)
                            }
                    }, 1000)
                }
                // ajax
                this.$store.dispatch('getCode', {
                    phone
                }).then().catch((err) => {
                    this.ToshowAlert(err)
                    if (this.computetime) {
                        this.computetime = 0
                        clearInterval(timer)
                    }
                })
            },
            ToshowAlert(alertText) {
                this.showAlert = true
                this.alertText = alertText
            },
            // 登录
            async login() {
                let result
                if (this.type) {
                    //短信登录
                    const {
                        phone,
                        code,
                        isRightPhone
                    } = this
                    if (!isRightPhone) {
                        // 手机号不正确
                        this.ToshowAlert("手机号不正确")
                    } else if (!code) {
                        // 验证码不正确
                        this.ToshowAlert("验证码不正确")
                    }
                    result = await loginBysms(phone, code)

                } else {
                    // 密码登录
                    const {
                        name,
                        pwd,
                        captcha
                    } = this
                    if (!name) {
                        this.ToshowAlert("用户名不正确")
                    } else if (!pwd) {
                        this.ToshowAlert("密码不正确")
                    } else if (!captcha) {
                        this.ToshowAlert("验证码不正确")
                    }
                    console.log(captcha)
                    result = await reqPwdLogin({
                        name,
                        pwd,
                        captcha
                    })
                }

                if (this.computetime) {
                    let timer = this.timer
                    this.computetime = 0
                    clearInterval(timer)
                }

                if (result.code === 1) {
                    this.ToshowAlert(result.msg)
                    this.getCaptcha()
                } else {
                    // 登录成功
                    const userInfo = result.data
                        //更新数据
                    this.$store.dispatch('recordUser', userInfo)
                        //跳转路由
                    this.$router.replace('/profile')
                }
            },
            // 关闭错误提示
            CloseTip() {
                this.showAlert = false
                this.alertText = ''
            },
            // 获取图片验证
            getCaptcha(event) {
                document.getElementById("captcha").src = "http://localhost:4000/captcha?time=" + Date.now()
                    // event.target.src = "http://localhost:4000/captcha?time=" + Date.now()
            }
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
    @import './stylus/login.styl'
</style>