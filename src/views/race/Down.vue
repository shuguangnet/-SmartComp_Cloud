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
      row-key="race_id"
      :loading="loading"
      :data-source="races"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    >
      <template #header>
        <a-button-group>
          <a-button  type="primary" @click="addRace">
            上传资料
          </a-button>
          <a-button
            :disabled="!selectedKeys.length"
            @click="batchDelete"
          >
            批量删除 ({{ selectedKeys.length }})
          </a-button>
          
        </a-button-group>
      </template>
      <template #action="record">
        <a-space>
          <!--编辑-->
          <a @click="Download(record)">
            <!-- <a-icon type="edit" /> -->
						下载
          </a>
          <!--删除-->
          <a-popconfirm
            title="确认删除？"
            placement="left"
            @confirm="deleteRace(record)"
						v-if="$store.state.user.userPrivileges!=2"
          >
            <template #icon>
              <a-icon type="question-circle-o" style="color: orange" />
            </template>
            <a>删除</a>
          </a-popconfirm>
        </a-space>
      </template>
    </AntTable>
  </div>
</template>

<script>
import { raceLevelMap, raceLevels } from '@/utils/const';
import { exportData } from '@/utils/excel';
import UploadFile from '@/components/edit/UploadFile';
import AddRecord from '@/components/record/AddRecord';

export default {
  name: 'Down',
  metaInfo: {
    title: '资料下载',
  },
  data() {
    return {
      selectedKeys: [],
      loading: false,
      exporting: false,
      races: [],
      current: 1,
      pageSize: 10,
      total: 0,
      tableColumns: createTableColumns.call(this),
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
    isStudent() {
      return this.$store.state.user.identity === 'student' || false;
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
      this.loading = true;
      this.$api.Allinformation({
      }).then(data => {
        this.races = data.data;
        this.total = data.data.length;
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '获取数据失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    addRace() {
      let vnode;
      this.$confirm({
        title: '上传资料',
        content: h => (vnode = <UploadFile />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
					let data={
						userId:this.$store.state.user.userId,
						competitionId:values.competitionId,
						relatedData:values.relatedData,
						file:values.file.file
					}
					console.log(data)
          return this.$api.uploadOneFile(data).then(data => {
						if(data.code==200){
						this.$message.success("添加成功");
            this.getData();
						}
          }).catch(e => {
						console.log(e)
            throw e;
          });
        },
      });
    },
		Download(race) {
			this.$confirm({
  title: '即将前往该网站下载资料',
  content: `您确定要前往 ${race.personalInfo} 下载资料吗？`,
  onOk: () => window.location.href = race.personalInfo,
  onCancel: () => {
    // 取消操作
  }
});

},
    batchDelete() {
      this.$modal.confirm({
        title: `确认删除选中的${this.selectedKeys.length}项数据?`,
        onOk: () => {
					let data={
						list:this.selectedKeys.map(index => this.users[index].userId)
					}
					this.$api.deleteList(data).then(() => {
            this.$message.success('删除成功!');
            this.selectedKeys.splice(0);
            this.getData();
          }).catch(e => {
            this.$message.error(e.msg || '删除失败!');
            throw e;
          })

				}
				
				
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

function createTableColumns() {
  return [
    { title: '赛事名称', dataIndex: 'competitionName' , align: 'center'},
		{ title: '上传人', dataIndex: 'userName', customRender: (text) => text || '管理员', align: 'center' },
    { title: '地址', dataIndex: 'personalInfo', align: 'center' },
    { title: '描述', dataIndex: 'relatedData' , align: 'center'},
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
    name: '赛事信息',
    data,
    header,
    keyMap: {
      competitionName: '赛事名称',
      // level: ['级别', level => raceLevelMap[level]],
      // sponsor: '主办方',
      // type: '类别',
      relatedData: '描述',
      userName: '上传人',
      // date: '举办时间',
      personalInfo: '存放地址',
      // update_time: '修改时间',
    },
  });
}

function createSearchOptions() {
  return [
    {
      label: '赛事名称',
      key: 'competitionName',
      default: '',
      component: 'input',
    },
    // {
    //   label: '主办方',
    //   key: 'sponsor',
    //   default: '',
    //   component: 'input',
    // },
    // {
    //   label: '地点',
    //   key: 'location',
    //   default: '',
    //   component: 'input',
    // },
    // {
    //   label: '类别',
    //   key: 'type',
    //   default: undefined,
    //   component: 'select',
    //   props: {
    //     options: ['A', 'B', 'C', 'D', 'E', 'F'].map(key => ({
    //       label: key,
    //       value: key,
    //     })),
    //   },
    // },
    // {
    //   label: '级别',
    //   key: 'level',
    //   default: undefined,
    //   component: 'select',
    //   props: {
    //     options: raceLevels,
    //   },
    // },
    // {
    //   label: '举办时间',
    //   key: 'date',
    //   default: () => [],
    //   mapper: ({ date }) => date.join('~'),
    //   component: 'range-picker',
    // },
  ];
}
</script>
