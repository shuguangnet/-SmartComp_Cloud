<template>
  <div class="container">
    <!-- 搜索表单 -->
    <SearchForm
      ref="searchForm"
      :loading="loading"
      :options="searchOptions"
      @search="search"
      @reset="search"
    />

    <!-- 信息列表 -->
    <AntTable
      v-model="selectedKeys"
      row-key="sid"
      :loading="loading"
      :data-source="users"
      :pagination="pagination"
      :columns="tableColumns"
      @change="changePage"
    >
      <template #header>
        <!-- 操作按钮组 -->
        <a-button-group>
          <a-button type="primary" @click="addUser">
            添加学生
          </a-button>
          <a-button
            :disabled="!selectedKeys.length"
            @click="batchDelete"
          >
            批量删除 ({{ selectedKeys.length }})
          </a-button>
          <a-button @click="$refs.import.show()">
            Excel导入
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
        <!-- 行操作 -->
        <a-space>
          <template>
            <!-- 编辑 -->
            <a @click="editUser(record)">
              <a-icon type="edit" />
            </a>

            <!-- 重置密码 -->
            <a-popconfirm
              title="确认重置密码？"
              ok-text="确认"
              cancel-text="取消"
              placement="left"
              @confirm="resetPassword(record)"
            >
              <template #icon>
                <a-icon type="question-circle-o" style="color: orange" />
              </template>
              <a-tooltip placement="top">
                <template #title>
                  <span>重置密码</span>
                </template>
                <a><a-icon type="rollback" /></a>
              </a-tooltip>
            </a-popconfirm>

            <!-- 授权 -->
            <a @click="grantRole(record)">
              <a-icon type="key" />
            </a>
          </template>

          <!-- 删除 -->
          <a-popconfirm
            title="确认删除？"
            ok-text="确认"
            cancel-text="取消"
            placement="left"
            @confirm="deleteUser(record)"
          >
            <template #icon>
              <a-icon type="question-circle-o" style="color: orange" />
            </template>
            <a><a-icon type="delete" /></a>
          </a-popconfirm>
        </a-space>
      </template>
    </AntTable>

    <!-- 用户导入组件 -->
    <UserImport type="student" ref="import" @refresh="search" />
  </div>
</template>

<script>
import { grades, gradeMap, sexes, sexMap } from '@/utils/const';
import { exportData } from '@/utils/excel';
import createColumns from '@/helpers/importuser-columns';
import EditStudent from '@/components/edit/EditStudent';
import UserImport from '@/components/common/UserImport';
import GrantRole from '@/components/common/GrantRole';

// 格式化日期函数
function formatDate(dateString) {
  const date = new Date(dateString); // 将日期字符串转换为 Date 对象
  const year = date.getFullYear(); // 获取年份
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份，并补零
  const day = String(date.getDate()).padStart(2, '0'); // 获取日期，并补零
  return `${year}-${month}-${day}`; // 返回格式化后的日期字符串
}


// 定义状态映射对象
const statusMap = {
  0: '正常',
  1: '异常',
  // 其他状态以此类推
};

const STUDENT_COLUMNS = [
  { title: '学号', dataIndex: 'stid' , align: 'center'},
  { title: '姓名', dataIndex: 'userName' , align: 'center' },
	{ 
      title: '性别', 
      dataIndex: 'gender',
			align: 'center',
      customRender: (text, record) => {
        return text ? text : '男';
      }
    },
  { 
    title: '学院', 
    dataIndex: 'collegeId', 
		align: 'center',
    customRender: (text, record) => gradeMap[record.collegeId] // 根据学院 ID 查找映射对象中的学院名称
  },
  { 
    title: '生日', 
    dataIndex: 'birthdate', 
		align: 'center',
    customRender: (text, record) => formatDate(record.birthdate) // 在渲染时调用 formatDate 函数
  },
	{ 
      title: '手机', 
      dataIndex: 'phone',
			align: 'center',
      customRender: (text, record) => {
        return text ? text : '无';
      }
    },
  { 
    title: '状态', 
    dataIndex: 'userStatus',
		align: 'center',
    customRender: (text, record) => statusMap[record.userStatus] // 根据状态值查找映射对象中的状态名称
  },
  {
    title: '操作',
    align: 'center',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
];

function exportExcel(data) {
  const header = STUDENT_COLUMNS.map(v => v.title);
  header.pop(); // 去掉最后一栏操作栏
  return exportData({
    name: '学生信息',
    data,
    header,
    keyMap: {
      stid: '学号',
      userName: '姓名',
      gender: '性别',
      collegeId: '学院',
      birthdate: '生日',
      phone: '手机',
      userStatus: '状态',
    },
  });
}

export default {
  name: 'Student',
  metaInfo: {
    title: '学生管理',
  },
  components: {
    UserImport,
  },
  data() {
    return {
      loading: false,
      exporting: false,
      query: {},
      selectedKeys: [],
      users: [],
			originalUsers: [],
      current: 1,
      pageSize: 12,
      total: 0,
      tableColumns: STUDENT_COLUMNS,
    };
  },
  computed: {
    searchOptions() {
      return createSearchOptions.call(this);
    },
    curColumns() {
      return createColumns(this.importUserType);
    },
    user() {
      return this.$store.state.user;
    },
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
    // 搜索
    search() {
      this.current = 1;
      this.getData();
    },
    // 分页切换
    changePage({ pageSize, current }) {
      Object.assign(this, { pageSize, current });
    },
    // 获取数据
    getData() {
      this.loading = true;
      this.query = this.$refs.searchForm.getResult();
			console.log(this.query);
      this.$api.AllUser({}).then(data => {
        // 过滤权限大于1的用户
        this.originalUsers = data.data.filter(user => user.userPrivileges > 1);
				this.filterUsers(); // 调用过滤用户方法
        this.total = data.users.length;
      }).catch(e => {
        console.error(e);
        // this.$message.error(e.msg || '获取数据失败');
      }).finally(() => {
        this.loading = false;
      });
    },
		filterUsers() {
  		let filteredUsers = this.originalUsers.slice(); // 复制原始用户数据
			console.log(filteredUsers)
  	if (this.query.sid) {
    filteredUsers = filteredUsers.filter(user => user.stid.includes(this.query.sid));
  	}

  if (this.query.name) {
    filteredUsers = filteredUsers.filter(user => user.userName.includes(this.query.name));
  }

  if (this.query.sex) {
    filteredUsers = filteredUsers.filter(user => user.gender === this.query.sex);
  }

  if (this.query.collageId) {
    filteredUsers = filteredUsers.filter(user => user.collageId === this.query.collageId);
  }

  this.users = filteredUsers;
},


    // 重置密码
    resetPassword(row) {
      const key = Date.now();
      this.$message.loading({
        key,
        content: '请稍后',
        duration: 0,
      });
      this.$api.resetPassword({
        type: 'student',
        account: row.sid,
      }).then(() => {
        this.$message.success({ content: '已重置', key });
      }).catch(() => {
        this.$message.error({ content: '重置失败', key });
      });
    },
    // 添加学生
    addUser() {
      let vnode;
      this.$confirm({
        title: '添加学生',
        content: h => (vnode = h(EditStudent)),
        onOk: async () => {
					const values = await vnode.componentInstance.validate();
					const data = {
    				sTId: values.stid,
						userPassword: values.password,
						// 用户权限学生
   					userPrivileges: 2,
   					userName: values.userName,
   					collegeId: values.collegeId,
   					userStatus: 0,
   					email: values.email,
   					phone: values.phone,
					};
          
          return this.$api.CreateUser(data).then(() => {
            this.$message.success('添加成功');
            this.getData();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '添加失败');
            throw e;
          });
        },
      });
    },
    // 修改学生
    editUser(row) {
      let vnode;
      this.$confirm({
        title: '修改信息',
        content: h => (vnode = <EditStudent type="update" data={row} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
					console.log(values)
					let data={
						stid: row.stid,
						userId:row.userId,
						userName:values.userName,
						userPassword:values.password,
						userPrivileges:values.userPrivileges,
						phone:values.phone,
						email:values.email,
						collegeId:values.collegeId,
						userStatus:0,
					}
          return this.$api.UPuser(data).then(() => {
            this.$message.success('修改成功');
            this.getData();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '修改失败');
            throw e;
          });
        },
      });
    },
    // 删除学生
    deleteUser(row) {
      const key = Math.random();
      this.$message.loading({ content: '正在删除', duration: 0, key });
      this.$api.deleteUser('student', {
        ids: [row.sid],
      }).then(() => {
        this.$message.success({ content: '删除成功!', key });
        this.getData();
      }).catch(e => {
        this.$message.error({ content: e.msg || '删除失败!', key });
      });
    },
    // 批量删除
    batchDelete(row) {
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
    // 导出学生
    exportAll() {
      this.exporting = true;
      this.$api.AllUser().then(data => {
        // 过滤权限2的用户
				return exportExcel(data.data.filter(user => user.userPrivileges > 1));
      }).then(data => {
        return exportExcel(data.data);
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '导出失败');
      }).finally(() => {
        this.exporting = false;
      });
    },
    // 授权用户
    grantRole(item) {
      let vnode;
      this.$confirm({
        title: '授权',
        content: () => (vnode = <GrantRole
          type="student"
          role={item.role_id}
          account={item.sid}
        />),
        onOk: async () => {
          await vnode.componentInstance.confirm();
          this.getData();
        },
      });
    },
  },
};

// 创建搜索选项
function createSearchOptions() {
  return [
    {
      label: '学号',
      key: 'sid',
      default: '',
      component: 'input',
			align: 'center'
    },
    {
      label: '姓名',
      key: 'name',
      default: '',
      component: 'input',
			align: 'center'
    },
    {
      label: '性别',
      key: 'sex',
      default: undefined,
      component: 'select',
			align: 'center',
      props: {
        options: sexes,
      },
    },
    {
      label: '学院',
      key: 'collageId',
      default: undefined,
      component: 'select',
			align: 'center',
      props: {
        options: grades,
      },
    },
    
  ];
}
</script>
