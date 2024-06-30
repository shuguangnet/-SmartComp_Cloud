<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
    <a-form-item label="名称">
      <a-input v-decorator="decorator.competitionName" placeholder="赛事名称"/>
    </a-form-item>
    <!-- <a-form-item label="负责人">
      <a-input v-decorator="decorator.userId" placeholder="主办方"/>
    </a-form-item> -->
		<a-form-item label="负责人">
      <a-select
        v-decorator="decorator.userId"
        style="width: 100%"
        :options="users"
        allowClear
        placeholder="请选择负责人"
      />
    </a-form-item>
    <a-form-item label="时间">
      <a-date-picker
        v-decorator="decorator.registrationStartTime"
        :disabled-date="disableDate"
        value-format="YYYY-MM-DD HH:mm:ss"
        style="width: 100%"
        placeholder="选择开始报名时间"
      />
    </a-form-item>
		<a-form-item label="时间">
      <a-date-picker
        v-decorator="decorator.registrationEndTime"
        :disabled-date="disableDate"
        value-format="YYYY-MM-DD HH:mm:ss"
        style="width: 100%"
        placeholder="选择开始报名时间"
      />
    </a-form-item>
    <a-form-item label="描述">
      <a-textarea v-decorator="decorator.announcementLink" placeholder="描述"/>
    </a-form-item>
		<!-- 状态 -->
    <a-form-item label="状态">
      <a-select
        v-decorator="decorator.competitionStatus"
        placeholder="请选择状态"
        :options="competitionStatus"
      />
		</a-form-item>
  </a-form>
</template>

<script>
import dayjs from 'dayjs';
import EditMixin from './edit-mixin';
import { raceLevels,competitionStatus } from '@/utils/const';

export default {
  name: 'EditRace',
  mixins: [EditMixin],
  data() {
    return {
			competitionStatus,
      raceLevels,
      decorator,
			users:[],
    };
  },
	mounted(){
		this.$api.AllUser().then(response => {
  const users = response.data.filter(item=>{
		// 仅返回教师用户
		return item.userPrivileges==1
	});
  const selectOptions = users
    .map(user => ({
      label: user.userName,
      value: user.userId
    }));
  this.users = selectOptions;
}).catch(error => {
  console.error(error);
});
	},
  methods: {
    disableDate(cur) {
      const yesterday = dayjs().startOf('day');
      return cur.isSameOrBefore(yesterday);
    },
    initData() {
      const { data } = this;
      this.form.setFieldsValue({
        competitionName: data.competitionName,
        userId: data.userId,
        registrationStartTime: data.registrationStartTime,
        registrationEndTime: data.registrationEndTime,
        announcementLink: data.announcementLink,
        competitionStatus: data.competitionStatus,
      });
    },
  },
};

// 定义装饰器
const decorator = {
  competitionName: ['competitionName', {
    rules: [{
      required: true,
      message: '请输入赛事名称！',
    }],
  }],
  userId: ['userId', {
    rules: [{
      required: true,
      message: '请输入负责人！',
    }],
  }],
  registrationStartTime: ['registrationStartTime', {
    rules: [{
      required: true,
      message: '选择开始时间！',
    }],
  }],
	registrationEndTime: ['registrationEndTime', {
    rules: [{
      required: true,
      message: '选择结束时间！',
    }],
  }],
  location: ['location', {
    rules: [{
      required: true,
      message: '请填写地点！',
    }],
  }],
	competitionStatus: ['competitionStatus', {
    initialValue: 0,
  }],
  level: ['level', {
    initialValue: 1,
  }],
  type: ['type', {
    initialValue: 'A',
  }],
  announcementLink: ['announcementLink', {
    initialValue: '',
  }],
};
</script>
