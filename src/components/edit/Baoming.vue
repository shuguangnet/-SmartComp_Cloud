<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
	<a-form-item label="比赛">
      <a-select
        v-decorator="decorator.competitionId"
        style="width: 100%"
        :options="grades"
        allowClear
        placeholder="请选择相关比赛"
      />
    </a-form-item>
		<a-form-item label="队长">
      <a-select
        v-decorator="decorator.teamLeaderId"
        style="width: 100%"
        :options="users"
        allowClear
        placeholder="请选择队长"
      />
    </a-form-item>
    <a-form-item label="类型">
      <a-select
        v-decorator="decorator.competitionType"
        style="width: 100%"
        :options="raceLevels"
        allowClear
        placeholder="请选择类型"
      />
    </a-form-item>
    
  </a-form>
</template>

<script>
import dayjs from 'dayjs';
import EditMixin from './edit-mixin';
import { raceLevels,competitionStatus } from '@/utils/const';
import { AllCompetition,AllUser } from '@/api';

export default {
  name: 'Baoming',
  mixins: [EditMixin],
  data() {
    return {
			grades: [],
			users:[],
			raceLevels,
			competitionId: '1',
			competitionStatus,
      raceLevels,
      decorator,
    };
  },mounted() {
    AllCompetition().then(response => {
      const competitions = response.data;
      const selectOptions = competitions.map(competition => ({
        label: competition.competitionName,
        value: competition.competitionId
      }));
      this.grades = selectOptions;
    }).catch(error => {
      console.error(error);
    });
		AllUser().then(response => {
  const users = response.data;
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
	competitionId: ['competitionId', {
    initialValue: 0,
  }],
	teamLeaderId: ['teamLeaderId', {
    initialValue: 0,
  }],
	registrationEndTime: ['registrationEndTime', {
    rules: [{
      required: true,
      message: '选择结束时间！',
    }],
  }],
  competitionType: ['competitionType', {
    rules: [{
      required: true,
      message: '请选择类型！',
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
