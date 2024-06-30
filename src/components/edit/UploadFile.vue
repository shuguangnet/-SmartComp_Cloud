<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :form="form"
  >
    <a-form-item label="文件">
      <a-upload
        v-decorator="decorator.file"
        @change="handleFileChange"
        :beforeUpload="beforeUpload"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          上传
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item label="比赛">
      <a-select
        v-decorator="decorator.competitionId"
        style="width: 100%"
        :options="grades"
        allowClear
        placeholder="请选择相关比赛"
      />
    </a-form-item>
    <a-form-item label="描述">
      <a-textarea v-decorator="decorator.relatedData" placeholder="描述"/>
    </a-form-item>
  </a-form>
</template>

<script>
import dayjs from 'dayjs';
import EditMixin from './edit-mixin';
import { AllCompetition } from '@/api';

export default {
  name: 'UploadFile',
  mixins: [EditMixin],
  data() {
    return {
      grades: [],
      file: null, // 用于保存文件对象
      competitionId: '1',
      raceLevels: [],
      decorator,
    };
  },
  mounted() {
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
  },
  methods: {
    disableDate(cur) {
      const yesterday = dayjs().startOf('day');
      return cur.isSameOrBefore(yesterday);
    },
    beforeUpload(file) {
      // 阻止默认上传行为
      return false;
    },
    handleFileChange(info) {
      const { file } = info;
      this.file = file;
      console.log(file);
    },
    initData() {
      const { data } = this;
      this.form.setFieldsValue({
        title: data.title,
        sponsor: data.sponsor,
        date: data.date,
        location: data.location,
        level: data.level,
        type: data.type,
        description: data.description,
      });
    },
  },
};

const decorator = {
  sponsor: ['sponsor', {
    rules: [{
      required: true,
      message: '请输入文件描述！',
    }],
  }],
  location: ['location', {
    rules: [{
      required: true,
      message: '请填写地点！',
    }],
  }],
  competitionId: ['competitionId', {
    initialValue: null,
  }],
  file: ['file', {
    initialValue: 'A',
  }],
  relatedData: ['relatedData', {
    initialValue: '这是一段文件描述',
  }],
};
</script>
