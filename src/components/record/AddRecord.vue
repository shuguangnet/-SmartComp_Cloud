<template>
  <a-form-model
    ref="form"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 20 }"
    :model="formData"
    :rules="rules"
  >
	<a-form-item label="上传证书">
      <a-upload
        v-model="formData.file"
        @change="handleFileChange($event)"
        :beforeUpload="beforeUpload"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          上传
        </a-button>
      </a-upload>
    </a-form-item>
		<a-form-item label="成绩">
      <a-select
			v-model="formData.awardLevel"
        :options="records"
        allowClear
        placeholder="成绩"
      />
    </a-form-item>
    <a-form-item label="描述">
      <a-input
        v-model="formData.additionalInfo"
        placeholder="描述"
      />
    </a-form-item>
  </a-form-model>
</template>

<script>
import { debounce } from 'lodash-es';
import { records } from '@/utils/const';

export default {
  name: 'AddRecord',
  data() {
    return {
			records,
      teachers: [],
      loading: false,
      formData: {
        awardLevel: '',
				certificatePath:'',
        additionalInfo: "",
      },
      rules: {
        score: { required: true, message: '请输入比赛成绩' },
      },
    };
  },
  methods: {
		beforeUpload(file) {
      // 阻止默认上传行为
      return false;
    },
		// 上传图片
		handleFileChange(event) {
			console.log(event)
			// const { event } = info;
      // this.file = event;
      // console.log(event);
      const file = event.file;
      const formData = new FormData();
      formData.append('image', file);
      formData.append('token', '1c17b11693cb5ec63859b091c5b9c1b2');
      
      // 发起上传请求
      fetch('https://img.pqblog.com/api/index.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // 更新图片链接
				this.$message.success("上传成功");
				this.formData.certificatePath=data.url
        console.log('上传成功:', data.message, data.url);
      })
      .catch(error => {
        this.$message.error('上传失败:', error);
      });
    },
    validate() {
      return this.$refs.form.validate().then(() => this.formData);
    },
    onSearch: debounce(function(query) {
      if (!query) return;
      this.loading = true;
      this.$api.getUserList({
        type: 'teacher',
        name: query,
        offset: 1,
        limit: 10,
      }).then(data => {
        this.teachers = data.data.map(item => ({
          label: `(${item.tid})${item.name}`,
          value: item.tid,
        }));
      }).catch(e => {
        this.$message.error(e.msg || '查询失败');
      }).finally(() => {
        this.loading = false;
      });
    }, 300),
  },
};
</script>
