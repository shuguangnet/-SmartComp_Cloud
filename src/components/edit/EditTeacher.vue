<template>
  <!-- 表单 -->
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
    <!-- 职工号 -->
    <a-form-item label="工号">
      <a-input
        v-decorator="decorator.stid"
        :disabled="isEdit"
        placeholder="职工号"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <!-- 密码（编辑模式下隐藏） -->
    <a-form-item  label="密码">
      <a-input
        ref="password"
        v-decorator="decorator.password"
        placeholder="密码"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <!-- 姓名 -->
    <a-form-item label="姓名">
      <a-input
        v-decorator="decorator.userName"
        placeholder="姓名"
      />
    </a-form-item>
    <!-- 职称 -->
    <a-form-item label="职称">
      <a-select
			:disabled="isEdit"
        v-decorator="decorator.teacherTitle"
        placeholder="请选择职称"
        :options="ranks"
      />
			
    </a-form-item>
		<a-form-item label="身份" v-if="isStidNotEqual">
      <a-select
				
        v-decorator="decorator.userPrivileges"
        :options="userPrivileges"
        allowClear
        placeholder="身份"
      />
    </a-form-item>
		<a-form-item label="学院">
      <a-select
			  :disabled="isEdit"
        v-decorator="decorator.collegeId"
        :options="grades"
        allowClear
        placeholder="学院"
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
  </a-form>
</template>

<script>
import { pick } from 'lodash-es';
import { ranks, UserStatus,grades } from '@/utils/const';
import EditMixin from './edit-mixin';

export default {
  name: 'EditTeacher',
  mixins: [EditMixin],
  data() {
    return {
			grades,
      ranks, // 职称选项
      UserStatus, // 用户状态选项
      decorator, // 表单装饰器
			userPrivileges:[
				{label:'管理员',value:'0'},
				{label:'教师',value:'1'},
				{label:'学生',value:'2'},
			]
    };
  },computed: {
    isStidNotEqual() {
			const data=JSON.parse(window.localStorage.getItem("users"))
      return data.stid !== this.decorator.stid;
    }
  },
	mounted(){
		    const data=JSON.parse(window.localStorage.getItem("users"))
	},
  methods: {
    // 初始化表单数据
    initData() {
      const { data } = this;
      // 设置表单字段初始值
      this.form.setFieldsValue(
        pick(data, ['stid', 'userName', 'teacherTitle', 'collegeId','phone', 'email', 'UserStatus']),
      );
    },
  },
};

/**
 * 定义表单装饰器
 */
const decorator = {
  stid: ['stid', {
    rules: [{
      required: true,
      message: '请输入职工号！',
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
  teacherTitle: ['teacherTitle', {
    initialValue: "无",
  }],
  UserStatus: ['UserStatus', {
    initialValue: '正常',
  }],
  phone: ['phone', {
    initialValue: '未填写',
  }],
	collegeId: ['collegeId', {
    rules: [{
      required: false,
      message: '请选择学院！',
    }],
  }],
  email: ['email', {
    initialValue: '',
  }],userPrivileges: ['userPrivileges', {
    rules: [{
      required: true,
      message: '请选择身份！',
    }],
  }],
};
</script>
