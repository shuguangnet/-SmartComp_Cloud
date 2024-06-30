<template>
	<div class="tinymce-editor">
		<a-input v-model="ArticleTitle" placeholder="请输入文字标题" />
		<a-textarea
      v-model="briefContent"
      placeholder="请输入文章简介"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
	<a-form-item style="width: 100%" label="选择比赛与类型:">
  <a-select
    v-model="competitionId"
    style="width: 100%"
    :options="grades"
    allowClear
    :placeholder="请选择相关比赛"
  />
	<a-select
    v-model="articleType"
    style="width: 100%"
    :options="message"
    allowClear
    :placeholder="选择类型"
  />
</a-form-item>



    
		<Editor
							:id="tinymceId"
							:init="init"
							:disabled="disabled"
							v-model="myValue"
							@onClick="onClick"
			></Editor>
			<a-button type="primary" @click="SendTinymce">发布文章</a-button>
	</div>
</template>
<script>
  import {message} from "@/utils/const";
import {createArticle,AllCompetition,SendSMS,SendEmail,AllArticle} from "@/api"
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'//编辑器引入
import 'tinymce/themes/silver/theme'//编辑器主题
import 'tinymce/icons/default'  //引入编辑器图标icon，不引入则不显示对应图标
// 引入编辑器插件（基本免费插件都在这儿了）
import 'tinymce/plugins/advlist'  //高级列表
import 'tinymce/plugins/autolink'  //自动链接
import 'tinymce/plugins/link'  //超链接
import 'tinymce/plugins/image'  //插入编辑图片
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/charmap'  //特殊字符
import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/wordcount'// 字数统计
//   import Cookies from "js-cookie";

const fonts = [
	"宋体=宋体",
	"微软雅黑=微软雅黑",
	"新宋体=新宋体",
	"黑体=黑体",
	"楷体=楷体",
	"隶书=隶书",
	"Courier New=courier new,courier",
	"AkrutiKndPadmini=Akpdmi-n",
	"Andale Mono=andale mono,times",
	"Arial=arial,helvetica,sans-serif",
	"Arial Black=arial black,avant garde",
	"Book Antiqua=book antiqua,palatino",
	"Comic Sans MS=comic sans ms,sans-serif",
	"Courier New=courier new,courier",
	"Georgia=georgia,palatino",
	"Helvetica=helvetica",
	"Impact=impact,chicago",
	"Symbol=symbol",
	"Tahoma=tahoma,arial,helvetica,sans-serif",
	"Terminal=terminal,monaco",
	"Times New Roman=times new roman,times",
	"Trebuchet MS=trebuchet ms,geneva",
	"Verdana=verdana,geneva",
	"Webdings=webdings",
	"Wingdings=wingdings,zapf dingbats"
];
export default {
	components: {
		Editor
	},
	props: {
		//内容
		value: {
			type: String,
			default: ''
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		// 用于区分单个tinymce
	 tinymceId: {
		type: String,
		default: "tinymce"
	},
		//插件
		plugins: {
			type: [String, Array],
			default: 'advlist autolink link image lists charmap  media wordcount'
		},
		//工具栏
		toolbar: {
			type: [String, Array],
			default: 'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table'
		}
	},
	data() {
		return {
			message,
			//初始化配置
			grades:[],
			myValue :this.value,
			ArticleTitle:"",
			competitionId:"",
			articleType:"",
			briefContent:"",
			init: {
				selector: '#' + this.tinymceId,
				language_url: '@/components/edit/zh_CN.js',//汉化路径是自定义的，一般放在public或static里面
				language: 'zh_CN',
				skin_url: '/tinymce/skins/ui/oxide',//皮肤
				plugins: this.plugins,//插件
				//工具栏
				toolbar: this.toolbar,
				toolbar_location: '/',
				fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px',  //字体大小
				font_formats: fonts.join(";"),
				content_style: "p {margin: 0px; border:0px ; padding: 0px}",  // 设置p的行间距
				width: "100%",
				// height: 500,//高度
				placeholder: '在这里输入文字',

				branding: false,//隐藏右下角技术支持
				//图片上传
			},
			ArticleId:"",
			Article:{},
		}
	},
	watch: {
		//监听内容变化
		value(newValue) {
			this.myValue = (newValue == null ? '' : newValue)
		},
		myValue (newValue) {
			if(this.triggerChange){
				this.$emit('change', newValue)
			}else{
				this.$emit('input', newValue)
			}
		}
	},
	mounted () {
		tinymce.init({})
		// console.log(this.toolbar,'======')
		this.GetAritle()
		AllCompetition().then(response => {
  // 获取竞赛数据
  const competitions = response.data;

  // 转换数据为适合select选项的格式
  const selectOptions = competitions.map(competition => ({
    label: competition.competitionName,
    value: competition.competitionId
  }));
  // 将转换后的数据存储在Vue实例中，以便在模板中使用
  this.grades = selectOptions;
}).catch(error => {
  console.error(error);
});

	},
	methods: {
		GetAritle(){
			console.log(this.ArticleId)
			if(this.ArticleId!=''||null){
				AllArticle().then((res) =>{
				res.data.forEach(item=>{
					console.log(item)
					if(item.articleId==this.ArticleId){
						console.log(item)
					this.competitionId=item.competitionId
          this.ArticleTitle = item.articleTitle,
					this.myValue=item.articleContent,
					this.articleType=item.articleType,
					this.briefContent=item.briefContent
					}
				})
				})
			}
		},
		onClick(e) {
			this.$emit('onClick', e, tinymce)
		},
		//可以添加一些自己的自定义事件，如清空内容
		clear() {
			this.myValue = ''
		},
		SendTinymce() {
  const data = {
    userId: this.$store.state.user.userId,
		briefContent:this.briefContent,
    competitionId: this.competitionId,
    articleType: this.articleType,
    articleTitle: this.ArticleTitle,
    articleContent: this.myValue
  };

  createArticle(data)
    .then(res => {
      if (res.code == 200) {
        this.$message.success('发送成功');
				this.articleId=res.data
        if (this.articleType == '公告') {
					// 询问是否进行短信和邮件通知
					this.$modal.confirm({
        title: `确认发送短信与邮件通知用户?`,
        onOk: () => {
					let data={
						competitionId:this.competitionId,
						articleId:this.articleId
					}
					this.$api.SendEmail(data).then(() => {
						this.$api.SendSMS(data).then(() => {
							this.$message.success('短信邮件提醒成功!');
						})
        }).catch(e => {
          this.$message.error(e.msg || '发送失败!');
          throw e;
        })
				}
      });
        }
      } else {
        throw new Error("发布失败");
      }
    })
    .then(notificationData => {
      if (notificationData) {
        return SendEmail(notificationData)
          .then(() => SendSMS(notificationData))
          .then(() => {
            this.$message.success("短信提醒与邮件提醒成功");
          });
      }
    })
    .catch(error => {
      console.error(error);
      this.$notify.error({ title: '错误', message: error.message });
    });
}

	}
}
</script>
<style scoped>
.tinymce-editor{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
