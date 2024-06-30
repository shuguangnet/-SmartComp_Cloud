<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src=userimg>
            </div>
            <div class="username">{{ $store.state.user.userName }}</div>
            <div class="bio">身份：{{ shenfen }}</div>
          </div>
          <a-divider/>
          <div class="account-center-tags">
            <div class="tagsTitle">标签</div>
            <div>
              <template v-for="(tag, index) in tags">
                <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                  <a-tag
                    :key="tag"
                    :closable="index !== 0"
                    :close="() => handleTagClose(tag)"
                  >{{ `${tag.slice(0, 20)}...` }}</a-tag>
                </a-tooltip>
                <a-tag
                  v-else
                  :key="tag"
                  :closable="index !== 0"
                  :close="() => handleTagClose(tag)"
                >{{ tag }}</a-tag>
              </template>
              <a-input
                v-if="tagInputVisible"
                ref="tagInput"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                :value="tagInputValue"
                @change="handleInputChange"
                @blur="handleTagInputConfirm"
                @keyup.enter="handleTagInputConfirm"
              />
              <a-tag v-else @click="showTagInput" style="background: #fff; borderStyle: dashed;">
                <a-icon type="plus"/>New Tag
              </a-tag>
            </div>
          </div>
          <a-divider :dashed="true"/>

          <div class="account-center-team">
            <div class="teamTitle">我的比赛</div>
            <a-spin :spinning="teamSpinning" v-for="(item, index) in matchs" :key="index">
              <div class="members">
                <a-row>
                  <a-col>
                    <a-tag :color="colors[index]" style="margin: 5px;">
                        竞赛名称:{{ item.competitionName }} {{ item.competitionType }}
                    </a-tag>
										<a-tag :color="colors[index]" style="margin: 5px;">
                        类型: {{ item.competitionType }}
                    </a-tag>                   
                  </a-col>
                </a-row>
              </div>
            </a-spin>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <article-page v-if="noTitleKey === 'article'"></article-page>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import PageView from '../../../layouts/PageView.vue'
import RouteView from '../../../layouts/RouteView.vue'
import { AppPage, ArticlePage, ProjectPage } from './page'
import { mapGetters } from 'vuex'

export default {
  components: {
    RouteView,
    PageView,
    AppPage,
    ArticlePage,
    ProjectPage
  },
  data () {
    return {
			userimg:this.$store.state.avatar,
      tags: ['很有想法的', '专注设计', '程序猿'],
      tagInputVisible: false,
      tagInputValue: '',
      teams: [],
      teamSpinning: true,
			shenfen:'',
      tabListNoTitle: [
        {
          key: 'article',
          tab: '我的文章'
        },
      ],
      noTitleKey: 'app',
			// 比赛
			matchs:[],
			colors:['red','green','orange','pink','cyan']
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
	mounted () {
  if (this.$store.state.user.userPrivileges == 0) {
    this.shenfen = "管理员"
  } else if (this.$store.state.user.userPrivileges == 1) {
    this.shenfen = "教师"
  } else {
    this.shenfen = "学生"
  }
  this.My()
  this.noTitleKey = 'article'; // 在页面加载完成后直接切换到 "我的文章" 选项卡
},
  methods: {
		My(){
			this.$api.RegistrationAll().then(res=>{
				this.matchs=res.data.filter(match=>{
					return match.studentId==this.$store.state.user.userId;
				})
				this.teamSpinning=false;
			})
		},

    handleTabChange (key, type) {
      this[type] = key
    },

    handleTagClose (removeTag) {
      const tags = this.tags.filter(tag => tag !== removeTag)
      this.tags = tags
    },

    showTagInput () {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },

    handleInputChange (e) {
      this.tagInputValue = e.target.value
    },

    handleTagInputConfirm () {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }

      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
