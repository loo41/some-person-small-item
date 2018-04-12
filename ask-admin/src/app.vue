<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    created () {
        if (!Cookies.get('user')) {
            this.$router.push({
                name: 'login'
            });
        }
    },
    beforeDestroy () {

    },
    methods: {

    }
};
</script>

<style>
.app-main{
    width: 100%;
    height: 100%;
}
</style>
