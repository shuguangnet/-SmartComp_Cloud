import Vue from 'vue';
import Form from '@/tool/form'; // 导入自定义表单组件
import { isFunction, isString } from 'lodash-es'; // 导入lodash中的isFunction和isString函数

// 根据表单项名称动态生成对应的渲染函数
function matcher(name) {
  // 返回一个对象，对象的键为表单项名称，值为对应的渲染函数
  return ({
    // 渲染a-input组件的渲染函数
    'a-input': {
      functional: true, // 设置为函数式组件
      render(h, ctx) { // 渲染函数接受两个参数：h函数和上下文对象ctx
        const { formOption, attrs, on } = ctx.data; // 解构上下文对象中的data属性
        const label = formOption?.label; // 获取表单项的标签
        ctx.data.attrs = Object.assign({ // 合并表单项的属性
          allowClear: true, // 允许清除内容
          placeholder: isString(label) ? getPlaceholder('请输入', label) : '', // 根据标签生成占位符
        }, attrs);

        // 重写回车键的事件处理函数
        const { pressEnter, input } = on;
        on.pressEnter = e => {
          isFunction(pressEnter) && pressEnter(e); // 调用原先的pressEnter处理函数
          const vm = ctx.parent.$parent; // 获取表单组件的父组件（AuditForm）
          // 如果父组件为SearchForm，且不处于加载状态，则调用search方法触发搜索
          if (vm && vm.$vnode.componentOptions.tag === 'SearchForm') {
            if (!vm.loading) {
              vm.search();
            }
          }
        };

        // 重写输入事件的处理函数
        on.input = e => {
          isFunction(input) && input(e.target.value.trim()); // 调用原先的input处理函数
        };

        return h('a-input', ctx.data); // 返回a-input组件
      },
    },
    'a-select': {
      functional: true, // 设置为函数式组件
      render(h, ctx) { // 渲染函数接受两个参数：h函数和上下文对象ctx
        const { formOption, attrs, on } = ctx.data; // 解构上下文对象中的data属性
        const label = formOption?.label; // 获取表单项的标签
        ctx.data.attrs = Object.assign({ // 合并表单项的属性
          allowClear: true, // 允许清除内容
          placeholder: isString(label) ? getPlaceholder('请选择', label) : '', // 根据标签生成占位符
        }, attrs);
        const { change, input } = on;
        on.change = value => {
          input(value);
          isFunction(change) && change(value);
        };
        return h('a-select', ctx.data); // 返回a-select组件
      },
    },
    'a-range-picker': {
      functional: true, // 设置为函数式组件
      render(h, ctx) { // 渲染函数接受两个参数：h函数和上下文对象ctx
        const { on, attrs } = ctx.data; // 解构上下文对象中的data属性
        attrs.valueFormat = 'YYYY-MM-DD'; // 设置日期格式

        const { change, input } = on;
        on.change = value => {
          input(value);
          isFunction(change) && change(value);
        };
        return h('a-range-picker', ctx.data); // 返回a-range-picker组件
      },
    },
  })[name?.startsWith('a-') ? name : `a-${name}`]; // 根据名称获取对应的渲染函数
}

// 定义获取占位符的函数
const getPlaceholder = (prefix, label) => `${prefix}${label}`;

// 使用自定义表单插件，并传入matcher函数
Vue.use(Form, { matcher });
