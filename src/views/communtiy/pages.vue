<template>
	<div>
		<div class="user-coin-card mb-4" >
          <div class="row" style="width: 100%;">
              <!-- 内容 -->
              <div class="container">
                  <div class="content-wrap" style="float: none;">
        <div class="content-layout">
            <div class="fixed-wrap bbs-home-tab">
    
                <div class="fixed-wrap-content">
        <div class="tab-content bbs-main-tab-content">
                        <!-- 文章列表 -->
       <div class="ajaxpager  active" id="home-tab-2"  >
      <div class="forum-posts detail alone ajax-item" >
     <div class="user-info flex ac mb10">
			<!-- <a href="/"> -->
				<div @click="showConfirm">
				<span class="avatar-img"><img  src="https://onlinephoto.oss-cn-chengdu.aliyuncs.com/hangtian/touxiang.jpg" data-src="//www.cmstui.com/wp-content/themes/zibll/img/avatar-default.png" class="lazyload avatar avatar-id-1">
				</span>
			  </div>
			<!-- </a> -->
     <div class="user-right flex flex1 ac jsb ml10">
     <div class="flex1">
         <div class="flex ac flex1"><a class="display-name text-ellipsis " href="/">{{ getUserName(forums.userId) }}</a></div>
     </div>
     
     </div>
     </div>
          <div>
              <div class="content mt6"><a target="_blank" href="#" class="excerpt" v-html="forums.articleContent"></a></div>
          </div>
          <div class="flex ac jsb mt10">
              <div class="action-meta flex0 flex jsb">
                  <div class="score-btns"><a href="javascript:;" ajax-action="score_extra" class="btn-score extra"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-extra-points"></use></svg></a><text>评分</text>
                      <a href="javascript:;" ajax-action="score_deduct" class="btn-score deduct"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-deduct-points"></use></svg></a>
                  </div><a href="#" class="item"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-comment"></use></svg><text>回复</text></a>
                  <a mobile-bottom="true" data-height="243"  class="btn-share item" href="javascript:;" data-toggle="RefreshModal"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-share"></use></svg><text>分享</text></a>
              </div>
          </div>
      </div>
      
       </div>
        </div> 
       </div>
      </div>
      </div>
     </div>
		 <section id="comments" class="box-show wow fadeInDown">  
		<div id="comt-respond" class="commentpost">
	<h4>发表评论<span><a rel="nofollow" id="cancel-reply" href="#comment" class="page_speeder_1817808094"></a></span></h4>
	<form id="frmSumbit">
	<input type=hidden  id="inpId" value="413" >
	<input type=hidden  id="inpRevID" value="0" >
	
	<div id="comment-tools">
		<div class="tools_text">
			<textarea placeholder="请输入您的评论" name="txaArticle" id="txaArticle" class="text input-block-level comt-area" cols="50" rows="4" tabindex="5" v-model="text"></textarea>
		</div>
	</div>
	
	</form>
    <div class="psumbit">
		<a-button type="primary" @click="PublishComments">
      提交
    </a-button>
	</div>
</div>
<div id="commentlist" class="commentlist">
	<div class="comment-tab">
		<div class="come-comt">
		评论列表 <span id="comment_div"></span>
	</div>
</div>
</div>
<h2 class="comment-text-center" v-if="!this.msg"><i class="icon font-meiyou"></i> 还没有评论，来说两句吧...</h2><label id="AjaxCommentBegin"></label>
<div v-for="(item,index) in comments" :key="index">
<div class="shadow-box msg noimg wow fadeInRight" data-wow-delay="0.25s" id="cmt225">
	<div style="display:flex;flex-direction: row;align-items:end;justify-content:flex-end;" @click="DeleteComments(item)">删除</div>
	<div class="msgimg">
		<img class="avatar"  src="https://q2.qlogo.cn/headimg_dl?dst_uin=36926842&spec=100" alt="网友昵称：访客" title="网友昵称：访客">
	</div>
    
	<div class="msgtxt">
		<div class="msgname">
			<span class="autlv aut-6 vs">V</span><span class="autlv autlvname aut-6">游客</span>
			<span class='dot shafa'>沙发</span>			
		</div>
		<div class="interact-bar">
			<span class="interact-time" title="评论时间">{{ item.publishTime | formatTime }}</span>
		</div>
		<div class="msgarticle">
						{{item.commentContent}}<label id="AjaxComment225"></label></div>
						
	</div>
	
</div>
</div>
     </section> 
      </div>
      <!-- 评论列表 -->
     </div>
     </div>
		</div>
</template>
<script>

    import {ArticleById,CommentsById,PublishComments,DeleteComments,AllUser} from "@/api"
import ColumnSetting from "@/components/common/ColumnSetting.vue";
    export default {
        name: 'UserCenter',
        data() {
            return {
								userId: this.$store.state.user.userId,
								userName: this.$store.state.user.userName,
                likes:"",
                dianzan:"",
                forums:{},
                ArticleId:this.$route.query.id,
                text:"",
                msg: "",
                comments:[],
								users:[]
            };
        },
        
				mounted() {
  this.fetchData();
	this.getuser();
},
filters: {
    formatTime(time) {
      // 将 ISO 8601 格式的时间转换为 Date 对象
      const date = new Date(time);
      // 获取年月日时分秒
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');   
      // 返回格式化后的时间字符串
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  },
methods: {
	showConfirm() {
  this.$confirm({
    title: '添加好友?',
    content: '是否现在与该用户进行聊天',
    onOk: () => { // 使用箭头函数定义回调函数
      let data = {
        friendId: this.forums.userId,
        friendName: this.getUserName(this.forums.userId),
      }
      console.log(data)
      this.$api.addFriend(data).then(res => {
        console.log(res)
      })
    },
    onCancel() {},
  });
},

  PublishComments() {
    // 发布评论
    let formdata = { articleId: this.ArticleId, commentContent: this.text, userId: this.userId };
    // console.log(formdata);
    PublishComments(formdata).then(res => {
      if (res.code == 200) {
        this.$message.success('发布成功');
        
        // 发布成功后重新获取评论
        this.fetchData();
      }
    }).catch(error => {
      console.log(error);
      this.$message.error(error.msg || '发布失败');
    });
  },

  fetchData() {
    // 获取文章
    let datas = { id: this.ArticleId };
    ArticleById(datas).then(res => {
      if (res.code === 200) {
        this.forums = res.data;
        // 获取文章成功后再获取评论
				this.getuser()
        this.fetchComments();
      }
    }).catch(error => {
      console.log(error);
    });
  },
	// 删除评论
	DeleteComments(item){
		DeleteComments(item.commentId).then(res=>{
			if (res.code == 200) {
				this.$message.success('删除成功');
        // 获取文章成功后再获取评论
        this.fetchComments();
      }
		}).catch(error => {
      this.$message.error(error || '删除失败');
    });
	},
  fetchComments() {
    // 获取评论
    let data = { id: this.ArticleId };
    CommentsById(data).then(res => {
      this.msg = res.data.length || 0;
      this.comments = res.data;
      // console.log(this.comments);
      // console.log(this.comments);
    }).catch(error => {
      console.log(error);
    });
  },getuser() {
        AllUser().then(response => {
            this.users = response.data;
        }).catch(error => {
            console.error("Failed to load users:", error);
        });
    },getUserName(userId) {
        const user = this.users.find(u => u.userId === userId);
        return user ? user.userName : '未知用户';
    },
}
}
        
  
    </script>
<style src="@/assets/pages.css"></style>
<style scoped>
button {
	color: #FFFFFF;
	background-color: #3690cf;
	height: 30px;
	width: 88px;
	border-top-width: 0;
	border-right-width: 0;
	border-bottom-width: 0;
	border-left-width: 0;
	border-radius: 4px;
	float: right;
	margin: 2px 10px 0 10px;
}

.router-link-exact-active {
	color: none
}
</style>