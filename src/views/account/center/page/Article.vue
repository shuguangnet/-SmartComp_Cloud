<template>
  <a-list
    size="large"
    rowKey="id"
    :loading="loading"
    itemLayout="vertical"
    :dataSource="data"
  >
    <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
			
      <template slot="actions">
        <icon-text type="star-o" :text="item.star" />
        <icon-text type="like-o" :text="item.like" />
        <icon-text type="message" :text="item.message" />
      </template>
      <a-list-item-meta>
        <a slot="title">{{ item.articleTitle }}</a>
        <template slot="description">
          <span>
						<a-button type="primary" shape="circle" @click="deleteContent(item.articleId)" icon="delete" style="float: inline-end;margin-left: 8px;" />
						<router-link :to="'/community/editcontent?id=' + item.articleId">
						   <a-button type="primary" shape="circle" icon="edit" style="float: inline-end;" />
					  </router-link>
						
            <a-tag>{{ item.articleType }}</a-tag>
          </span>
        </template>
      </a-list-item-meta>
			<router-link :to="'/pages?id=' + item.articleId">
				<!-- 头像 -->
      <article-list-content :description="item.articleContent" :owner="userData[item.userId]" :avatar="`/logo.png`"/>
			</router-link>
    </a-list-item>
    <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
      <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
    </div>
  </a-list>
</template>

<script>
import {AllArticle,AllUser,DeteleArticleById} from '@/api'
import IconText from '../../../../views/communtiy/components/IconText.vue'
import  ArticleListContent  from '../../../../components/ArticleListContent'

export default {
  name: 'Article',
  components: {
    IconText,
    ArticleListContent
  },
  data () {
    return {
			userData:[],
      loading: true,
      loadingMore: false,
      data: []
    }
  },
  mounted () {
    this.getList()
		this.getUser() 
  },
  methods: {
    getList () {
      AllArticle().then(res => {
        console.log('res', res)
        this.data = res.data.filter(article =>article.userId = this.$store.state.user.userId)
        this.loading = false
      })
    },
		deleteContent(id){
			DeteleArticleById({id}).then((res)=>{
				if(res.code==200){
					this.$message.success("删除成功");
				}
			}).catch(error=>{
				this.$message.error(error);
			})
		},
		getUser() {
      AllUser().then(res => {
      const users = res.data;
    const userMap = {};
    users.forEach(user => {
      userMap[user.userId] = user.userName;
    });
    this.userData = userMap;
		console.log(this.userData)
  }).catch(error => {
    console.error(error);
  });
},
    loadMore () {
			console.log(this.userData)
      this.loadingMore = true
      this.$http.get('/list/article').then(res => {
        this.data = this.data.concat(res.result)
      }).finally(() => {
        this.loadingMore = false
      })
    }
  }
}
</script>

<style scoped>

</style>
