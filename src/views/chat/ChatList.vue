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
      row-key="competitionId"
      :loading="loading"
      :data-source="races"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    >
      <template #header>
        <a-button-group>
          <a-button  type="primary" v-if="$store.state.user.userPrivileges!=2" @click="addRace">
            添加赛事
          </a-button>
					<a-button  type="primary" v-if="$store.state.user.userPrivileges==2" @click="addBao">
						
            我要报名
          </a-button>
          <a-button
					v-if="$store.state.user.userPrivileges!=2"
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
        <a-space>
          <!-- 成绩录入 -->
          <a-tooltip v-if="isStudent" title="无权限">
            <a>
              无权限
            </a>
          </a-tooltip>
          <!--编辑-->
          <a  @click="editRace(record)" 	v-if="$store.state.user.userPrivileges!=2">
					
            <a-icon type="edit" />
          </a>
          <!--删除-->
          <a-popconfirm
					v-if="$store.state.user.userPrivileges!=2"
            title="确认删除？"
            placement="left"
            @confirm="deleteRace(record)"
          >
            <template #icon>
              <a-icon type="question-circle-o" style="color: orange" />
            </template>
            <a><a-icon type="delete" /></a>
          </a-popconfirm>
        </a-space>
      </template>
    </AntTable>
  </div>
</template>

<script>
import { raceLevelMap, raceLevels,competitionStatus } from '@/utils/const';
import { AllUser } from '@/api';
import { exportData } from '@/utils/excel';
import EditRace from '@/components/edit/EditRace';
import Baoming from '@/components/edit/Baoming';
import AddRecord from '@/components/record/AddRecord';
import dayjs from 'dayjs';

export default {
  name: 'Race',
  metaInfo: {
    title: '赛事管理',
  },
  data() {
    return {
      selectedKeys: [],
      loading: false,
      exporting: false,
      races: [],
      users: [], // 用于存储用户信息
      current: 1,
			originalRaces: [],
			query:{},
      pageSize: 10,
      total: 0,
      tableColumns: [],
      searchOptions: this.createSearchOptions(),
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
    isStudent() {
      return this.$store.state.user.userPrivileges == 2;
    },
  },
	async mounted() {
    await this.getAllUsers(); // 确保在表格列设置前获取用户信息
    this.$watch(() => [this.pageSize, this.current], this.getData, { immediate: true });
  },
  methods: {
		async getAllUsers() {
      try {
        const response = await AllUser();
        this.users = response.data;
        this.tableColumns = this.createTableColumns(this.users); // 利用获取的用户信息来设置表格列
      } catch (error) {
        console.error("Failed to load users", error);
      }
    },createTableColumns(users) {
    const competitionStatusMap = [
        { label: '进行中', value: 0 },
        { label: '已终止', value: 1 },
    ];
		console.log(users)
    return [
       
        { title: '赛事名称', dataIndex: 'competitionName', align: 'center' },
        {
            title: '负责人',
            dataIndex: 'userId',
            customRender: (text) => {
                if (!text) {
                    return '无';
                }
                const user = users.find(u => u.userId === text);
                return user ? user.userName : '无';
            }, align: 'center'
        },
        {
            title: '开始时间',
            dataIndex: 'registrationStartTime',
            customRender: (text, record) => formatDate(record.registrationStartTime)
						, align: 'center'
        },
        {
            title: '结束时间',
            dataIndex: 'registrationEndTime',
            customRender: (text, record) => formatDate(record.registrationEndTime)
						, align: 'center'
        },
        { title: '参考材料', dataIndex: 'announcementLink' , align: 'center'},
        {
            title: '状态',
            dataIndex: 'competitionStatus',
            customRender: (text, record) => {
                const statusObject = competitionStatusMap.find(item => item.value === record.competitionStatus);
                return statusObject ? statusObject.label : '未知状态';
            }
						, align: 'center'
        },
        {
            title: '操作',
            align: 'center',
            scopedSlots: {
                customRender: 'action',
            },
        },
    ];
},createSearchOptions() {
  return [
    {
      label: '赛事名称',
      key: 'title',
      default: '',
      component: 'input',
    },
    {
      label: '负责人',
      key: 'sponsor',
      default: '',
      component: 'input',
    },
		{
      label: '状态',
      key: 'collageId',
      default: undefined,
      component: 'select',
      props: {
        options: competitionStatus,
      },
    },

    {
      label: '时间',
      key: 'date',
      default: () => [],
      mapper: ({ date }) => date.join('~'),
      component: 'range-picker',
    },
  ];
},
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
				this.$api.AllCompetition({
      }).then(data => {
        this.originalRaces = data.data;
				this.filterRaces(); // 调用过滤方法
        this.total = data.data.length;
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '获取数据失败');
      }).finally(() => {
        this.loading = false;
      });
    },
		// 过滤比赛
		filterRaces() {
  		let filteredRaces = this.originalRaces.slice(); // 复制原始用户数据
			console.log(filteredRaces)
				// 状态
  if (this.query.collageId) {
    filteredRaces = filteredRaces.filter(user => user.competitionStatus == this.query.collageId);
  }
// 名称
  if (this.query.title) {
    filteredRaces = filteredRaces.filter(user => user.competitionName.includes(this.query.title));
  }
// 负责人
  if (this.query.sponsor) {
		filteredRaces = filteredRaces.filter(user => user.userName.includes(this.query.sponsor));
  }


  this.races = filteredRaces;
},
// 我要报名
    addBao() {
      let vnode;
      this.$confirm({
        title: '我要报名',
        content: h => (vnode = <Baoming />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
					const data = {
    				studentId: this.$store.state.user.userId,
						competitionId: values.competitionId,
						teamLeaderId: values.teamLeaderId,
						competitionType: values.competitionType,
						registrationTime: dayjs(new Date).format('YYYY-M-D HH:mm:ss'),
						registrationStatus: '等待学校审核',
					};
					console.log(data)
          return this.$api.Enroll(data).then(data => {
            this.$message.success("报名成功");
          }).catch(e => {
            this.$message.error(e.msg || '报名失败');
            throw e;
          });
        },
      });
    },
		// 新增比赛
    addRace() {
      let vnode;
      this.$confirm({
        title: '新增赛事',
        content: h => (vnode = <EditRace />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
					const data = {
    				competitionName: values.competitionName,
						userId: values.userId,
						registrationStartTime: values.registrationStartTime,
						registrationEndTime: values.registrationEndTime,
						announcementLink: values.announcementLink,
						competitionStatus: values.competitionStatus,
					};
          return this.$api.AddCompetition(data).then(data => {
            this.$message.success("添加成功");
            this.getData();
          }).catch(e => {
            this.$message.error(e.msg || '添加失败');
            throw e;
          });
        },
      });
    },// 定义格式化日期时间函数
  formatDateTime(isoDateTime) {
    const date = new Date(isoDateTime);
    const formattedDateTime = `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())} ${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;
    return formattedDateTime;
  },
  // 定义补零函数
  padZero(num) {
    return num < 10 ? '0' + num : num;
  },
		// 修改比赛
    editRace(race) {
      let vnode;
      this.$confirm({
        title: '编辑赛事',
        content: h => (vnode = <EditRace data={race} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
					// 调用formatDateTime函数来格式化日期时间
					values.registrationStartTime = this.formatDateTime(values.registrationStartTime);
        	values.registrationEndTime = this.formatDateTime(values.registrationEndTime);
          values.competitionId = race.competitionId;
					const data = {
    					competitionId: values.competitionId,
    					competitionName: values.competitionName,
    					userId: values.userId,
    					registrationStartTime: values.registrationStartTime,
    					registrationEndTime: values.registrationEndTime,
							announcementLink: values.announcementLink,
    					competitionStatus: values.competitionStatus,
							};

					return this.$api.UpCompetition(data).then(data => {
    				this.$message.success('修改成功');
    				this.getData();
					}).catch(e => {
    					this.$message.error(e.msg || '修改失败');
    					throw e;
					});
        },
      });
    },
		// 删除竞赛
    deleteRace(race) {
      this.loading = true;
      this.$api.DeleteCompetition([race.competitionId]).then(data => {
        this.$message.success(data.msg);
        this.getData();
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '删除失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    batchDelete() {
      this.$modal.confirm({
        title: `确认删除选中的${this.selectedKeys.length}项数据?`,
        onOk: () => this.$api.deleteRace(this.selectedKeys)
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
    addRecord(race) {
      let vnode;
      this.$confirm({
        title: '成绩录入',
        content: h => (vnode = <AddRecord />),
        onOk: async () => {
          const form = vnode.componentInstance;
          const values = await form.validate();
          return this.$api.addRecord({
            race_id: race.race_id,
            sid: this.$store.state.user.account,
            score: values.score,
            tid: values.tid,
          }).then(data => {
            this.$message.success(data.msg);
          }).catch(e => {
            this.$message.error(e.msg || '系统错误');
            throw e;
          });
        },
      });
    },
    exportAll() {
      this.exporting = true;
      this.$api.getRaceList(this.query).then(data => {
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
function exportExcel(data) {
  const header = createTableColumns().map(v => v.title);
  header.pop(); // 去掉最后一栏操作栏
  return exportData({
    name: '赛事信息',
    data,
    header,
    keyMap: {
      title: '赛事名称',
      level: ['级别', level => raceLevelMap[level]],
      sponsor: '主办方',
      type: '类别',
      description: '描述',
      location: '地点',
      date: '举办时间',
      create_time: '创建时间',
      update_time: '修改时间',
    },
  });
}
</script>
