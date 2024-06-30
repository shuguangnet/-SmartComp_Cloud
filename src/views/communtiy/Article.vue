<template>
  <!-- 主容器 -->
  <div>
		<!-- 搜索表单 -->
    <SearchForm
      ref="searchForm"
      :loading="loading"
      :options="searchOptions"
      @search="search"
      @reset="search"
    />
    <!-- 标签选择器 -->
    <a-card :bordered="false" class="ant-pro-components-tag-select" style="margin-bottom:-82px"> 
      <a-form :form="form" layout="inline">
        <!-- 类目选择 -->
        <standard-form-row title="所属类目" block style="padding-bottom: 11px;">
          <a-form-item>
            <!-- 标签选择器组件 -->
          <tag-select>
  					<!-- 类目选项 -->
						<!-- 全部选项 -->
  					<tag-select-option value="全部" @click.native="getList"><h3><a-icon type="audit" />全部</h3></tag-select-option>
     				<tag-select-option value="公告" @click.native="search('公告')"><h3><a-icon type="audit" />公告</h3></tag-select-option>
     				<tag-select-option value="交流" @click.native="search('交流')"><h3><a-icon type="audit" />交流</h3></tag-select-option>
     				<tag-select-option value="讨论" @click.native="search('讨论')"><h3><a-icon type="audit" />讨论</h3></tag-select-option>
          </tag-select>
          </a-form-item>
        </standard-form-row>
      </a-form>
    </a-card>
    <!-- 文章列表 -->
    <a-card style="margin-top: 24px;" :bordered="false">
      <a-list
        size="large"
        rowKey="id"
        :loading="loading"
        itemLayout="vertical"
        :dataSource="data"
				:pagination="pagination"
				@change="changePage"
      >
			<div class="side-brick">			
				<ul class="brick-box">
					<li class="brick-list" v-for="item in data">
						<router-link :to="'/pages?id=' + item.articleId">
				   <a class="item-box-retina">
					  <figure class="item-box-img">
							<!-- 文章图片 -->
							<!-- 调用extractImageUrl方法并传递文章内容 -->
							<img class="lazy" :src="extractImageUrl(item.articleContent)" alt="Article Cover">
							<!-- <img class="lazy" :src="item.articleContent.match(imageUrlRegex)" > -->
							<!-- 文章标题 -->
							<h3>{{item.articleTitle}}</h3>
						</figure>
						<!-- 文章内容 -->
					    <p class="item-user-info" v-html="item.articleContent"></p>
					    <p class="item-user-author">
						    <img src="/logo.png" :alt="userData[item.userId]">
								<!-- 文章作者 -->
						     <span class="comment-username">{{userData[item.userId]}}<span class="autlv aut-5 vs-level">V</span></span>
						     <span class="comment-tip"><i class="icon font-time"></i>{{item.publishTime | formatTime}}</span>
					    </p>
				   </a>
					</router-link>
			    </li>			
		</ul>	
	</div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import TagSelect from '../../components/TagSelect';
import StandardFormRow from '../../components/StandardFormRow';
import ArticleListContent from '../../components/ArticleListContent';
import IconText from './components/IconText';
const TagSelectOption = TagSelect.Option;
export default {
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ArticleListContent,
    IconText,
  },
  data() {
    return {
			userData:[],
			imageUrlRegex:/(http[s]?:\/\/[^(\s|")]+\.(png|jpg|jpeg|gif|webp))/gi,
			current: 1,
			pageSize: 8,
      loading: true,
      loadingMore: false,
      data: [],
			originalUsers: [],
			total: 0,
      form: this.$form.createForm(this),
    };
  },
  mounted() {
		this.getUser() 
		this.$watch(() => [this.pageSize, this.current], this.getList, { immediate: true });
  },filters: {
    formatTime: function(value) {
        // 在这里编写时间格式化逻辑，例如：
        const parsedTime = new Date(value);
        const year = parsedTime.getFullYear();
        const month = String(parsedTime.getMonth() + 1).padStart(2, '0');
        const day = String(parsedTime.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
},
computed:{
	searchOptions() {
      return createSearchOptions.call(this);
    },
		pagination() {
      return {
        current: this.current,
        pageSize: this.pageSize,
        total: this.total,
        showSizeChanger: true,
        pageSizeOptions: ['8', '9', '10', '20'],
        showQuickJumper: true,
        showTotal: total => `Total ${total} items`,
        onChange: this.changePage,
        onShowSizeChange: this.changePage
      };
    },
},
  methods: { extractImageUrl(content) {
      // 定义匹配图片URL的正则表达式
      const imageUrlRegex = /(http[s]?:\/\/[^(\s|")]+\.(png|jpg|jpeg|gif|webp))/gi;
      // 使用正则表达式匹配内容中的图片URL
      const matches = content.match(imageUrlRegex);
      // 如果找到匹配项，返回第一张图片的URL
      if (matches && matches.length > 0) {
        return matches[0];
      }
			// 避免浏览器缓存
			const randomSeed = Math.floor(Math.random() * 10000);  // 生成一个0到9999之间的随机数
      // 如果没有找到匹配的图片，可以使用随机图片
      return 'https://api.7585.net.cn/bing/api.php?rand=1?'+randomSeed;
    },
		async getImage(articleId) {
  try {
    const res = await this.$api.AllArticle();
    let content = res.data.filter(item => item.articleId === articleId);

    if (content.length === 0) {
      console.log("未找到对应文章内容");
      return null; // 返回空值，表示未找到封面图片
    }

    const imageUrlRegex = /(http[s]?:\/\/[^(\s|")]+\.(png|jpg|jpeg|gif|webp))/gi;
    const images = content[0].articleContent.match(imageUrlRegex);

    if (images && images.length > 0) {
      console.log("找到封面图片链接:", images[0]);
      return images[0]; // 返回第一张匹配到的图片链接
    } else {
      console.log("未找到图片链接");
      return null; // 返回空值，表示未找到封面图片
    }
  } catch (error) {
    console.error("获取文章内容失败:", error);
    return null; // 返回空值，表示未找到封面图片
  }
},
		// 搜索
    search() {
      this.current = 1;
      this.getList();
    },
		// 分页切换
		changePage(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getList();
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
		getUser() {
      this.$api.AllUser().then(res => {
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
    async getList() {
  try {
    // 开始加载，显示加载指示器
    this.loading = true;
		this.query = this.$refs.searchForm.getResult();
    // 使用 await 直接等待异步操作的结果
    const res = await this.$api.AllArticle();
    // 打印响应结果
		this.originalUsers = res.data
		this.filterUsers(); // 调用过滤用户方法
    console.log('res', res.data);
    // 使用响应结果更新数据
		this.total = res.data.length;
  } catch (error) {
    // 处理可能出现的错误
    console.error("获取文章列表失败:", error);
  } finally {
    // 无论成功还是失败，最后都会执行，隐藏加载指示器
    this.loading = false;
  }
},
// 搜索		
filterUsers() {
  		let filteredUsers = this.originalUsers.slice(); // 复制原始用户数据
			console.log(this.query)
  	if (this.query.articleTitle) {
    filteredUsers = filteredUsers.filter(user => user.articleTitle.includes(this.query.articleTitle));
  	}

  if (this.query.userName) {
    filteredUsers = filteredUsers.filter(user => user.userId.includes(this.query.userName));
  }
	if (this.query.articleContent) {
    filteredUsers = filteredUsers.filter(user => user.articleContent.includes(this.query.articleContent));
  }
  const start = (this.current - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.data = filteredUsers.slice(start, end);
},
  },
};
// 创建搜索选项
function createSearchOptions() {
  return [
    {
      label: '标题',
      key: 'articleTitle',
      default: '',
      component: 'input',
    },
    {
      label: '作者',
      key: 'userName',
      default: '',
      component: 'input',
    },
		{
      label: '内容',
      key: 'articleContent',
      default: '',
      component: 'input',
    },
    {
      label: '时间',
      key: 'publishTime',
      default: () => [],
      mapper: ({ publishTime }) => publishTime.join('~'),
      component: 'range-picker',
    },
    
  ];
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  :deep(.ant-pro-tag-select .ant-tag) {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-components-tag-select .ant-tag-checkable-checked {
    color: black; /* 设置为你喜欢的颜色 */
}
.list-articles-trigger {
  margin-left: 12px;
}
.box-show, .post-list {
    position: relative;
    background: rgba(192, 111, 111, 0.95);
    border: 1px solid rgba(221, 221, 221, 0.28);
    padding: 0 20px;
    border-radius: 18px;
    margin-bottom: 20px;
    -webkit-box-shadow: 0px 0px 10px -2px rgba(158,158,158,0.2);
    box-shadow: 0px 0px 10px -2px rgba(158,158,158,0.2);
}article, input, textarea, b, ul, li, i, button, a, .swiper-button-next, .swiper-button-prev {
    -moz-transition: ease-in-out 0.3s;
    -webkit-transition: ease-in-out 0.3s;
    -o-transition: ease-in-out 0.3s;
    -ms-transition: ease-in-out 0.3s;
    transition: ease-in-out 0.3s;
}article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
    display: block;
}html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    background: transparent;
    vertical-align: baseline;
    font-size: 100%;
}article {
    display: block;
    unicode-bidi: isolate;
}body {
    color: #666;
    font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    background-color: #f5f5f5;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: top center;
}
.side-title-wrap {
    margin-top: 15px;
    padding-bottom: 15px;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #ddd;
}.side-title-wrap h3.widget-title {
    font-size: 16px;
    color: #333;
    margin-right: 16px;
    display: inline-block;
    vertical-align: bottom;
    padding-left: 10px;
    margin-left: 0px;
    border-left: 4px solid #3690cf;
    font-weight: 400;
}.side-title-wrap span, .side-title-wrap span.suburl a {
    font-size: 12px;
    color: #999;
}.brick-box {
    margin-right: -2%;
    margin-top: 20px;
    overflow: hidden;
}li.brick-list {
    float: left;
    position: relative;
    width: 23%;
    margin-right: 2%;
    margin-bottom: 15px;
    border-radius: 4px;
    overflow: hidden;
    transition: all .3s ease;
}figure.item-box-img {
    height: 190px;
    position: relative;
    overflow: hidden;
}p.item-user-info {
    height: 44px;
    margin-top: 10px;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    white-space: normal;
}p.item-user-author {
    overflow: hidden;
    line-height: 32px;
    margin-top: 10px;
    padding-top: 10px;
    position: relative;
}
.side-brick {
    margin-top: 20px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.68);
    border: 1px solid rgba(221, 221, 221, 0.28);
    padding: 0 20px;
    border-radius: 18px;
    margin-bottom: 20px;
    -webkit-box-shadow: 0px 0px 10px -2px rgba(158,158,158,0.2);
    box-shadow: 0px 0px 10px -2px rgba(158,158,158,0.2);
}
</style>
