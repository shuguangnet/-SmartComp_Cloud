<template>
  <div>
    <SearchForm
      ref="searchForm"
      :loading="loading"
      :options="searchOptions"
      @search="search"
      @reset="search"
    />

    <!--信息列表-->
    <AntTable
      v-model="selectedKeys"
      row-key="record_id"
      :loading="loading"
      :data-source="records"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    >
      <template #header>
        <a-button-group>
          <a-button
            
            :disabled="!selectedKeys.length"
            @click="batchDelete"
          >
            批量删除 ({{ selectedKeys.length }})
          </a-button>
          <a-button
            
            :loading="exporting"
            @click="exportAll"
          >
            全量导出
          </a-button>
        </a-button-group>
      </template>
      <template #action="record">
        <RecordAction :record="record" :fresh-data="getData" />
      </template>
    </AntTable>
  </div>
</template>

<script>
import { exportData } from '@/utils/excel';
import { AllCompetition } from '@/api';
import RecordAction from '@/components/record/RecordAction';

export default {
  name: 'Record',
  components: { RecordAction },
  metaInfo: {
    title: '参赛记录',
  },
  data() {
    return {
      selectedKeys: [],
      loading: false,
      exporting: false,
      records: [],
			originalRaces: [],
			query:{},
      current: 1,
      pageSize: 10,
      total: 0,
      tableColumns: createTableColumns.call(this, this.$createElement),
      searchOptions: createSearchOptions.call(this),
    };
  },
  computed: {
    pagination() {
      return {
        current: this.current,
        pageSize: this.pageSize,
        total: this.total,
      };
    },
  },
  mounted() {
    this.$watch(() => [this.pageSize, this.current], this.getData, { immediate: true });
  },
  methods: {
    changePage({ pageSize, current }) {
      Object.assign(this, { pageSize, current });
    },
    search() {
      this.current = 1;
      this.getData();
    },
		getData() {
	this.query = this.$refs.searchForm.getResult();
	console.log(this.query)
  this.loading = true;
  this.$api.RegistrationAll({
  }).then(data => {
		// 如果筛选出来用户身份为学生
    if(this.$store.state.user.userPrivileges == 2){
			// 筛选学生用户自己的比赛
      this.records = data.data.filter(item => {
        return item.studentId == this.$store.state.user.userId; // 添加 return 语句
      });
      this.total = this.records.length; // 更新 total 的计算方式
      console.log(this.records);
    } else {
      this.originalRaces = data.data;
			this.filterRaces(); // 调用过滤方法
      this.total = data.data.length;
    }
  }).catch(e => {
    console.error(e);
    this.$message.error(e.msg || '获取数据失败');
  }).finally(() => {
    this.loading = false;
  });
},
// 过滤
// 过滤比赛
filterRaces() {
  		let filteredRaces = this.originalRaces.slice(); // 复制原始用户数据
			console.log(filteredRaces)
				// 状态
  if (this.query.status) {
    filteredRaces = filteredRaces.filter(user => user.competitionStatus == this.query.status);
  }
// 名称
  if (this.query.title) {
    filteredRaces = filteredRaces.filter(user => user.competitionName.includes(this.query.title));
  }
// 负责人
  if (this.query.sname) {
		filteredRaces = filteredRaces.filter(user => user.studentName.includes(this.query.sname));
  }
// 成绩
if (this.query.score!=null) {
		filteredRaces = filteredRaces.filter(user => user.awardLevel.includes(this.query.sname));
  }
  this.records = filteredRaces;
},
    batchDelete() {
      this.$modal.confirm({
        title: `确认删除选中的${this.selectedKeys.length}项数据?`,
        onOk: () => this.$api.deleteRecord(this.selectedKeys)
          .then(() => {
            this.$message.success('删除成功!');
            this.selectedKeys.splice(0);
            this.getData();
          }).catch(e => {
            this.$message.error(e.msg || '删除失败!');
            throw e;
          }),
      });
    },
    exportAll() {
      this.exporting = true;
      this.$api.getRecordList(this.query).then(data => {
        return exportExcel(data.data);
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '导出失败');
      }).finally(() => {
        this.exporting = false;
      });
    },
  },
};

const statusMap = {
  0: { style: 'color: lightgrey', type: 'question-circle', text: '待审核' },
  1: { style: 'color: limegreen', type: 'check-circle', text: '审核通过' },
  2: { style: 'color: red', type: 'exclamation-circle', text: '审核失败' },
};
// 格式化日期函数
function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error(`Invalid date: ${dateString}`);
    return 'Invalid Date';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function createTableColumns(h) {
  return [
		{ title: '名称', dataIndex: 'competitionName' },
    { title: '参赛人', dataIndex: 'studentName' },
		{ title: '队长', dataIndex: 'teamLeaderName' },
    { title: '类型', dataIndex: 'competitionType' },
		{ 
      title: '成绩', 
      dataIndex: 'awardLevel',
      customRender: (text, record) => {
        // 如果 awardLevel 不存在或为空，则显示“未获奖”，否则显示实际成绩
        return text ? text : '未获奖';
      }
    },
		{ 
      title: '备注信息', 
      dataIndex: 'additionalInfo',
      customRender: (text, record) => {
        // 如果 additionalInfo 不存在或为空，则显示“未获奖”，否则显示实际成绩
        return text ? text : '无';
      }
    },
		{ 
      title: '获奖证书', 
      dataIndex: 'certificatePath',
      customRender: (text, record) => {
        // 如果 certificatePath 存在，则显示图片
        if (text) {
          return <img src={text} style={{ width: '100px', height: 'auto' }} />;
        } else {
          return '无';
        }
      }
    },
		{ title: '状态', dataIndex: 'registrationStatus' },
    { title: '登记时间', 
			dataIndex: 'registrationTime',
	  	customRender: (text, record) => formatDate(record.registrationTime)
	},
    {
      title: '操作',
      align: 'center',
      scopedSlots: {
        customRender: 'action',
      },
    },
  ];
}

function exportExcel(data) {
  const header = createTableColumns().map(v => v.title);
  header.pop(); // 去掉最后一栏操作栏
  return exportData({
    name: '参赛记录信息',
    data,
    header,
    keyMap: {
      competitionId: '名称',
      studentId: '参赛人',
      teamLeaderId: '组队编号',
      competitionType: '类型',
      awardLevel: '成绩',
      competitionType: '类型',
      registrationStatus: ['状态', status => statusMap[registrationStatus]?.text],
      registrationTime: '登记时间',
    },
  });
}

function createSearchOptions() {
  return [
    {
      label: '赛事名称',
      key: 'title',
      default: '',
      component: 'input',
			align: 'center'
    },
    {
      label: '参赛人',
      key: 'sname',
      default: '',
      component: 'input',
			align: 'center'
    },
    {
      label: '成绩',
      key: 'score',
      default: '',
      component: 'input',
			align: 'center'
    },
    {
      label: '审核状态',
      key: 'status',
      default: undefined,
      component: 'select',
			align: 'center',
      props: {
        options: [
          { label: '等待学校审核', value: '等待学校审核' },
          { label: '成功报名', value: '成功报名' },
          { label: '审核失败', value: '审核失败' },
        ],
      },
    },
  ];
}
</script>

<style scoped>
</style>
