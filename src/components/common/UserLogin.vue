<template>
  <div class="login-form">
    <div class="title">
      <a-avatar src="/logo.png" :size="40" />
      <span>竞赛管理系统</span>
			
    </div>
    <a-form-model
      layout="vertical"
      ref="form"
      :model="formData"
      :rules="rules"
      @submit="onSubmit"
    >
		
      <a-form-model-item ref="sTId" prop="sTId">
        <a-input v-model="formData.sTId" placeholder="学号/工号">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="password" prop="password">
        <a-input-password v-model="formData.password" placeholder="密码">
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input-password>
      </a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
        class="login-button"
        :loading="loading"
        block
      >
        登录
      </a-button>
    </a-form-model>
		
  </div>
</template>

<script>
import {login} from '@/api/index'
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      svg: '',
      formData: {
        sTId: '213010127',
        password: '0127',
      },
      rules: {
        sTId: { required: true, message: '请输入学号/工号！' },
        password: { required: true, message: '请输入密码！' },
      },
    };
  },
  methods: {
    
    async onSubmit(e) {
      e.preventDefault();
      try {
        this.loading = true;
        await this.$refs.form.validate();
				// 用户登录
				let formData = { sTId: this.formData.sTId, password: this.formData.password }
				const res= await login(formData)
				if(res.code==200){
					window.localStorage.setItem("token",res.data)// 使用 dispatch 方法触发 action
					this.$store.dispatch('initUser');
					await this.$router.replace({ path: '/' }).catch(e => e);
        	this.$message.success(`${timeFix()}，欢迎回来`);
				}else{
					this.$message.error(error);
				}
      } catch (e) {
				this.$message.error("登录失败请检查账号或密码"||e);
        if (!e) return; // 表单校验
        
      } finally {
        this.loading = false;
      }
    },
  },
};

function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好';
}
</script>

<style scoped lang="stylus">
.login-form
  width 300px
  padding 20px
  text-align left
  border-radius 5px
  background-color white
  box-shadow 0 0 5px lightgrey

.title
  display flex
  justify-content center
  align-items center
  margin-bottom 24px
  font-size 24px
  *:last-child
    margin-left 10px

.identity
  display flex
  flex-flow row nowrap
  justify-content space-between

.login-form-bottom
  margin-bottom 0
  .login-button
    margin-bottom 20px

.code-input
  display flex
  align-items center
  height 32px
  .code >>>
    cursor pointer
    min-width 100px
</style>
