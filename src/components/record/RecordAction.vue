<template>
  <a-space>
		<a-tooltip  title="成绩录入" v-if="$store.state.user.userPrivileges==2">
        无权限
      </a-tooltip>
		<a-tooltip  title="成绩录入" v-if="$store.state.user.userPrivileges!=2">
        <a @click="addRecord(record)">
        <a-icon type="plus-circle" />
        </a>
      </a-tooltip>
    <a  @click="editRecord" v-if="$store.state.user.userPrivileges!=2">
      <a-icon type="edit" />
    </a>
    <DelPopConfirm  @confirm="deleteRecord" v-if="$store.state.user.userPrivileges!=2" />
  </a-space>
</template>

<script>
import AddRecord from '@/components/record/AddRecord';
import AuditRecord from '@/components/record/AuditRecord';

export default {
  name: 'RecordAction',
  props: {
    record: {
      type: Object,
      required: true,
    },
    freshData: {
      type: Function,
      default() {},
    },
  },
  computed: {
    identity() {
      return this.$store.state.user.identity;
    },
  },
  methods: {
    deleteRecord() {
      this.$api.deleteRecord([this.record.record_id]).then(data => {
        this.$message.success(data.msg);
        this.freshData();
      }).catch(e => {
        console.error(e);
        this.$message.error(e.msg || '删除失败');
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
					let data={
						registrationId: race.registrationId,
            awardLevel: values.awardLevel,
            additionalInfo: values.additionalInfo,
            certificatePath: values.certificatePath,
					}
          return this.$api.RegistrationAdd(data).then(data => {
            this.$message.success("已成功录取成绩");
          }).catch(e => {
            this.$message.error(e.msg || '系统错误');
            throw e;
          });
        },
      });
    },
    editRecord() {
      if (this.$store.state.user.userPrivileges ==2) {
        this.studentEditRecord();
      } else {
        this.auditRecord();
      }
    },
    studentEditRecord() {
      let score = this.record.score;
      this.$confirm({
        title: '修改成绩',
        content: h => (
          <a-form-model>
            <a-form-model-item required={true} label="成绩录入">
              <a-input
                value={score}
                placeholder="请输入比赛成绩"
                onInput={e => { score = e.target.value; }}
              />
            </a-form-model-item>
          </a-form-model>
        ),
        onOk: () => {
          let msg;
          score = score.trim();
          if (!score) {
            msg = '请输入成绩';
          } else if (this.record.score === score) {
            msg = '未检测到变动';
          }
          if (msg) {
            this.$message.warn(msg);
            throw new Error(msg);
          }
          return this.$api.updateRecord({
            record_id: this.record.record_id,
            score,
          }).then(() => {
            this.$message.success('修改成功');
            this.freshData();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '修改失败');
            throw e;
          });
        },
      });
    },
    auditRecord() {
      let vnode;
      this.$confirm({
        title: '审核',
        content: h => (vnode = <AuditRecord record={this.record} />),
        onOk: async () => {
          const values = await vnode.componentInstance.validate();
					let data={
						registrationId:this.record.registrationId,
						status: values.status==1?'成功报名':'未通过审核',
					}
					console.log(data)
          return this.$api.Review(data).then(() => {
            this.$message.success('提交成功');
            this.freshData();
          }).catch(e => {
            console.error(e);
            this.$message.error(e.msg || '提交失败');
            throw e;
          });
        },
      });
    },
  },
};
</script>
