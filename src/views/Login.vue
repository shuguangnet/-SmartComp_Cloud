<template>
  <div class="container">
    <UserLogin class="login" />
		<p style="position: fixed;bottom: 0;text-align: center;left: 0;right: 0;font-family: '宋体';">@ 2024-青创先锋</p>
  </div>
</template>

<script>
import UserLogin from '@/components/common/UserLogin.vue';

export default {
  name: 'Login',
  components: { UserLogin },
  metaInfo: {
    title: '登录',
  },
};
</script>

<style scoped lang="stylus">
.container
  height 100vh
  background #f0f2f5 url('~@/assets/bg.svg') repeat
  .login
    center()
</style>
