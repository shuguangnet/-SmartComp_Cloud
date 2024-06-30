<template>
  <!-- Modal 组件 -->
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :body-style="{ padding: '10px'}"
    :destroy-on-close="true"
    :after-close="removeFile"
    title="导入数据"
    ok-text="确认导入"
    cancel-text="取消"
    centered
    @cancel="onCancel"
    @ok="onOk"
  >
    <!-- 下载上传模板按钮 -->
    <a-button type="link" @click="writeTemplateFile">
      下载上传模板({{ type === "student" ? "学生" : "教师" }})
    </a-button>
    <!-- 上传文件组件 -->
    <a-upload
      accept=".xlsx,.xls"
      class="upload"
      :before-upload="getFile"
      :remove="removeFile"
    >
      <a-button> <a-icon type="upload" /> 点击上传表格 </a-button>
    </a-upload>

    <!-- 数据表格 -->
    <a-table
      size="small"
      style="margin-top: 10px"
      row-key="工号"
      :columns="columns"
      :data-source="result"
      :loading="uploading"
      :pagination="{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${result.length} 条记录`,
      }"
    />
  </a-modal>
</template>

<script>
import { uniq } from 'lodash-es';
import { readExcel, makeExcel } from '@/utils/excel';
import { sexes, grades, ranks,userPrivileges } from '@/utils/const';
import DisplayFailedUser from '@/components/common/DisplayFailedUser';

// 映射性别、年级、职称
const sexesRevertMap = mapRevert(sexes);
const gradesRevertMap = mapRevert(grades);
const rankRevertMap = mapRevert(ranks);

export default {
  name: 'UserImport',
  props: {
    type: {
      default: 'student',
      require: true,
      validator: value => ['student', 'teacher'].includes(value),
    },
  },
  data() {
    return {
      visible: false, // 控制 Modal 显示/隐藏
      uploading: false, // 控制上传状态
      result: [], // 上传结果数据
    };
  },
  computed: {
    primaryKey() {
      return this.type === 'student' ? 'sid' : 'tid'; // 主键
    },
    keyMap() {
      // 映射表头与数据字段
      // 学生和教师的映射关系
    const studentMap = new Map([
      ['学号', 'stid'],
      ['姓名', 'userName'],
      ['性别', 'gender'],
      ['身份', 'userPrivileges'],
      ['学院', 'collegeId'],
      ['生日', 'birthdate'],
      ['手机号', 'phone'],
      ['邮箱', 'email'],
    ]);

    const teacherMap = new Map([
      ['工号', 'stid'],
      ['姓名', 'userName'],
      ['性别', 'gender'],
      ['身份', 'userPrivileges'],
      ['职称', 'teacherTitle'],
      ['学院', 'collegeId'],
      ['生日', 'birthdate'],
      ['手机号', 'phone'],
      ['邮箱', 'email'],
      ['密码', 'userPassword'],
      ['状态', 'userStatus'],
    ]);
		// 根据 primaryKey 选择对应的映射关系
    return this.primaryKey === 'sid' ? studentMap : teacherMap;
    },
    columns() {
      // 生成表格列配置
      const cols = [];
      for (const key of this.keyMap.keys()) {
        cols.push({
          title: key,
          dataIndex: key,
        });
      }
      return cols;
    },
		transformedData() {
		
  // 转换上传数据
  const data = [];
  const strategy = {
		collegeId: label => {
  // 遍历 grades 数组，找到匹配的 label，并返回对应的 value（ID）
  for (const grade of grades) {
    if (grade.label == label) {
      return grade.value;
    }
  }
  // 如果没有匹配项，则返回 null 或者其他默认值，取决于你的需求
  return null;
},userPrivileges: label => {
  // 遍历 grades 数组，找到匹配的 label，并返回对应的 value（ID）
  for (const userPrivilege of userPrivileges) {
    if (userPrivilege.label == label) {
      return userPrivilege.value;
    }
  }
  // 如果没有匹配项，则返回 null 或者其他默认值，取决于你的需求
  return null;
},
   // 映射生日
    birthdate: label => {
      return new Date((label-25569) *24 * 60 *60 *1000);
    }, // 解析生日并格式化为指定格式
  };
  for (const item of this.result) {
    const temp = {};
    for (let [key, value] of Object.entries(item)) {
      key = this.keyMap.get(key.trim());
      const revert = strategy[key];
      temp[key] = typeof revert === 'function'
        ? revert(value)
        : value;
    }
    data.push(temp);
  }
  return data;
},

  },
  methods: {
    getFile(file) {
      // 读取上传文件
      this.uploading = true;
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = async e => {
        const result = await readExcel(e.target.result);
        console.log(result);
        this.result = uniq(result, '工号');

        this.uploading = false;
        const diff = result.length - this.result.length;
        this.$message.success(
          diff > 0
            ? `工号不能重复，已去重${diff}条数据`
            : '文件读取成功',
        );
      };
      reader.onerror = e => {
        this.$message.error('文件读取失败');
      };
      return false; // 阻止上传
    },
    removeFile() {
      // 移除上传文件
      this.result.splice(0);
    },
    onCancel() {
      // 取消上传
      if (!this.result.length) {
        this.visible = false;
        return;
      }
      const modal = this.$modal.confirm({
        title: '警告',
        content: '数据未保存，确认关闭？',
        onOk: () => {
          modal.destroy();
          this.visible = false;
        },
      });
    },
    onOk() {
      // 确认上传
      if (!this.result.length) {
        return this.$message.warn('暂无数据！');
      }
      this.$modal.confirm({
        title: '提示',
        content: '确认导入吗？',
        centered: true,
        onOk: () => 
				{
					let data={
					userDataList:this.transformedData
				}
					this.$api.importUser(this.transformedData)
          .then(() => {
            this.$message.success('导入成功');
            this.visible = false;
          }).catch(e => {
            const message = e.msg || '导入失败';
            if (e.code === 1) {
              this.$confirm({
                title: message,
                content: () => <DisplayFailedUser
                  primaryKey={this.primaryKey}
                  users={this.result}
                  fail={e.data}
                />,
              });
            } else this.$message.error(message);
          }).finally(() => {
            this.$emit('refresh');
          })
				}
      });
    },
    writeTemplateFile() {
      // 下载上传模板文件
      makeExcel(({
        student: {
          header: ['学号', '姓名', '性别', '身份', '学院', '生日', '手机号', '邮箱'], // 学生表头
          name: '学生上传模板.xlsx',
          data: [
            { 学号: '213010101', 姓名: '张三', 性别: '男', 身份: '学生', 学院: '计算机学院',生日:'2002-04-04',手机号:'18888888888',邮箱:'1270540423@qq.com' },
            { 学号: '213010102', 姓名: '张三', 性别: '男', 身份: '学生', 学院: '计算机学院',生日:'2002-04-04',手机号:'18888888888',邮箱:'1270540423@qq.com' },
          ],
        },
        teacher: {
          header: ['工号', '姓名', '性别','身份', '职称', '学院', '生日', '手机号', '邮箱'], // 教师表头
          name: '教师上传模板.xlsx',
          data: [
					{ 工号: '213010188', 姓名: '孙赤赤', 性别: '男', 身份: '教师',职称:'教授', 学院: '计算机学院',生日:'2002-04-04',手机号:'18888888888',邮箱:'1270540423@qq.com' },
          { 工号: '213010189', 姓名: '张三', 性别: '男', 身份: '教师', 职称:'讲师', 学院: '计算机学院',生日:'2002-04-04',手机号:'18888888888',邮箱:'1270540423@qq.com' },
          ],
        },
      })[this.type]);
    },
    /**
     * 外部调用方法
     */
    show() {
      // 显示 Modal
      this.visible = true;
    },
  },
};

/**
 * label映射value
 * @param{Array} arr
 */
function mapRevert(arr) {
  const result = {};
  for (const { label, value } of arr) {
    result[label] = value;
  }
  return result;
}
</script>
