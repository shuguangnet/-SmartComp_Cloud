<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
		<a-form-item label="学号">
      <a-input
        v-decorator="decorator.stid"
        :disabled="isEdit"
        placeholder="学号"
        allowClear
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <!-- <a-form-item v-if="!isEdit" label="密码"> -->
			<a-form-item  label="密码">
      <a-input
        ref="password"
        v-decorator="decorator.password"
        placeholder="密码"
        allowClear
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item label="姓名">
      <a-input
        v-decorator="decorator.userName"
        placeholder="姓名"
        allowClear
      />
    </a-form-item>
    <a-form-item label="学院">
      <a-select
        v-decorator="decorator.collegeId"
        :options="grades"
        allowClear
        placeholder="学院"
      />
    </a-form-item>
		<a-form-item label="身份">
      <a-select
        v-decorator="decorator.userPrivileges"
        :options="userPrivileges"
        allowClear
        placeholder="身份"
      />
    </a-form-item>
     <!-- 手机号 -->
		 <a-form-item label="手机号">
      <a-input
        v-decorator="decorator.phone"
        placeholder="手机号"
      />
    </a-form-item>
    <!-- 邮箱 -->
    <a-form-item label="邮箱">
      <a-input
        v-decorator="decorator.email"
        placeholder="邮箱"
      />
    </a-form-item>
    <!-- 状态 -->
    <a-form-item label="状态">
      <a-select
        v-decorator="decorator.UserStatus"
        placeholder="请选择状态"
        :options="UserStatus"
      />
		</a-form-item>
    <a-form-item label="性别">
      <a-radio-group v-decorator="decorator.gender" :options="sexes" />
    </a-form-item>
  </a-form>
</template>

<script>
import { pick } from 'lodash-es';
import { UserStatus,grades, sexes } from '@/utils/const';
import EditMixin from './edit-mixin';

export default {
  name: 'EditStudent',
  mixins: [EditMixin],
  data() {
    return {
      grades,
			UserStatus,
      decorator,
      sexes,
			userPrivileges:[
				{label:'管理员',value:'0'},
				{label:'教师',value:'1'},
				{label:'学生',value:'2'},
			]
    };
  },
  methods: {
    initData() {
      const { data } = this;
      const result = pick(data, ['stid', 'userName', 'gender',  'collegeId','phone','email','userStatus']);
      this.form.setFieldsValue(result);
    },
  },
};

/**
 * 定义decorator
 */
const decorator = {
  stid: ['stid', {
    rules: [{
      required: true,
      message: '请输入账号！',
    }],
  }],
  password: ['password', {
    rules: [{
      required: true,
      message: '请输入密码！',
    }],
  }],
  userName: ['userName', {
    rules: [{
      required: true,
      message: '请输入姓名！',
    }],
  }],
  gender: ['gender', {
    initialValue: '男',
  }],
	collegeId: ['collegeId', {
    rules: [{
      required: false,
      message: '请选择学院！',
    }],
  }]
	,userPrivileges: ['userPrivileges', {
    rules: [{
      message: '请选择身份！',
    }],
  }],UserStatus: ['UserStatus', {
    initialValue: '正常',
  }],
  phone: ['phone', {
    initialValue: '未填写',
  }],
  email: ['email', {
    initialValue: '未填写',
  }],
};
</script>
