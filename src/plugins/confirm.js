import Vue from 'vue';

// 确认模态框组件定义
const ConfirmModal = {
  name: 'ConfirmModal',
  data() {
    return {
      title: undefined, // 模态框标题
      okText: '确定', // 确定按钮文本
      cancelText: '取消', // 取消按钮文本
      content: undefined, // 模态框内容
      maskClosable: false, // 点击遮罩是否关闭模态框
      visible: false, // 模态框可见性
      loading: false, // 确定按钮加载状态
      onOk() {}, // 确定按钮点击处理函数
      onCancel() {}, // 取消按钮点击处理函数
    };
  },
  methods: {
    // 异步处理确定按钮点击
    async ok() {
      try {
        this.loading = true; // 设置加载状态为true
        await this.onOk(); // 调用确定按钮点击处理函数
        this.visible = false; // 在操作成功后隐藏模态框
      } catch (e) {
        console.warn(e.message || '模态框关闭失败'); // 记录任何错误
      } finally {
        this.loading = false; // 重置加载状态
      }
    },
    // 取消按钮点击处理
    cancel() {
      this.onCancel(); // 调用取消按钮点击处理函数
      this.visible = false; // 隐藏模态框
    },
    // 从DOM中移除模态框并销毁Vue实例
    remove() {
      this.$el.remove(); // 从DOM中移除模态框元素
      this.$destroy(); // 销毁Vue实例
    },
  },
  render(h) {
    return (
      // 渲染Ant Design的模态框组件
      <a-modal
        afterClose={this.remove}
        maskClosable={this.maskClosable}
        title={this.title}
        okText={this.okText}
        cancelText={this.cancelText}
        visible={this.visible}
        onOk={this.ok}
        onCancel={this.cancel}
        confirmLoading={this.loading}
      >
        {/* 渲染模态框内容，如果内容为函数则调用，否则直接显示 */}
        {typeof this.content === 'function' ? this.content(h) : <div>{this.content}</div>}
      </a-modal>
    );
  },
};

/**
 * 扩展$confirm方法
 * @param {Object} data - 模态框数据
 */
export default function confirm(data) {
  const instance = new Vue(ConfirmModal); // 创建确认模态框实例
  Object.assign(instance.$data, data); // 将传入的数据属性分配给实例
  const { $el } = instance.$mount(); // 挂载实例以创建DOM元素
  document.body.appendChild($el); // 将模态框元素追加到body中
  instance.visible = true; // 设置模态框可见性为true
}
