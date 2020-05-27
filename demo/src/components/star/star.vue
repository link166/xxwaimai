<!--  -->
<template>
    <div class="star" :class="'star-'+size">
        <span class="star-item" v-for="(starClass,index) in starClasses" :key="index" :class="starClass"></span>
      </div>
</template>

<script>
    export default {
        components: {},
        props: {
            score: Number,
            size: Number
        },
        data() {
            return {

            };
        },
        computed: {
            starClasses() {
                let score = this.score
                let arr = []
                let j = Math.floor(score)
                for (let i = 0; i < j; i++) {
                    arr.push('on')
                }
                if (score * 10 - j * 10 >= 5) {
                    arr.push('half')
                }
                for (let i = arr.length; i < 5; i++) {
                    arr.push('off')
                }
                return arr
            }
        },
        watch: {},
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
<style lang='less' rel='stylesheet/less'>
    @import url('./less/star.less');
</style>