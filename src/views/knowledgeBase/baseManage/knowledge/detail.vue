<!--
 * @Description: 文章详情页
 * @Date: 2021-08-26 16:08:29
 * @LastEditTime: 2021-09-07 14:29:46
-->
<template>
  <div class="detail-container" v-if="infoObj" v-loading="loading">
    <PageHeader title="详情">
      <template slot="btns">
        <el-button size="mini" @click="$router.back()">返回</el-button>
      </template>
    </PageHeader>
    <main class="main">
      <aside class="left">
        <p class="title" v-html="infoObj.articleTitle"></p>
        <div class="middle">
          <!-- <img src="@/assets/logo.png" class="avatar" /> -->
          <svg-icon iconClass="avatar" className="avatar"></svg-icon>
          <span class="text">{{ infoObj.articleAuthorName }}</span>
          <span class="time text">{{
            infoObj.creationDate.split(" ")[0]
          }}</span>
          <p class="text">
            发布在<span class="label">{{ classifyValues }}</span
            >下
          </p>
        </div>
        <div class="introduction">
          {{infoObj.articleIntroduction}}
        </div>
        <div class="w-e-text-box-custome">
          <div class="body w-e-text" v-html="infoObj.articleContent"></div>
        </div>
      </aside>
      <aside class="right">
        <div class="part">
          <p class="top">
            <svg-icon iconClass="label" className="icon"></svg-icon>
            <span class="label">文章标签</span>
          </p>
          <div class="tags">
            <span
              class="tag"
              v-for="item in infoObj.articleLabelList"
              :key="item.labelId"
              >{{ item.labelName }}</span
            >
          </div>
        </div>
        <div class="part">
          <p class="top">
            <svg-icon iconClass="label" className="icon"></svg-icon>
            <span class="label">关联知识</span>
          </p>
          <ul class="list">
            <li
              class="item"
              v-for="item in infoObj.articleLinkList"
              :key="item.id"
            >
              <router-link
                :to="'/knowledge-detail/' + item.linkArticleId"
                class="s-left"
              >
                <span class="dot"></span>
                <span class="label textOverflow">{{
                  item.linkArticleTitle
                }}</span>
              </router-link>
              <p class="s-right">
                <span class="text"
                  >发布于{{ item.linkArticlePublishDateTime }}</span
                >
                <span class="text">作者：{{ item.linkArticleAuthorName }}</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="part">
          <p class="top">
            <svg-icon iconClass="filefolder" className="icon"></svg-icon>
            <span class="label">附件</span>
          </p>
          <ul class="list">
            <li
              class="item"
              v-for="item in infoObj.articleAttachmentList"
              :key="item.attachmentId"
            >
              <p class="s-left">
                <span class="dot"></span>
                <a
                  :href="urlComputed(item.attachmentSaveUrl)"
                  target="_blank"
                  class="label textOverflow"
                  >{{ item.attachmentRealName }}</a
                >
              </p>
              <p class="s-right">
                <span class="text">{{ item.attachmentSizeAssemble }}</span>
              </p>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";

import { getArticleInfo } from "@/api/modules/knowledgeBase";
export default {
  components: {
    PageHeader,
  },
  created() {
    this.getArticleInfo();
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  computed: {
    // 类别值集合
    classifyValues() {
      return (
        this.infoObj &&
        this.infoObj.articleClassificationList
          .map((v) => v.classificationName)
          .join("/")
      );
    },
    // urlComputed
    urlComputed(){
      return (url) => {
        return `${process.env.VUE_APP_BASE_OSS}${url}`
      }
    }
  },
  watch: {
    id() {
      this.getArticleInfo();
    },
  },
  data() {
    return {
      loading: false,
      infoObj: null,
    };
  },
  methods: {
    /**
     * @description: 获取文章信息数据
     * @param {*}
     */
    async getArticleInfo() {
      this.loading = true;
      let param = new FormData();
      param.append("articleId", this.id);
      let { data } = await getArticleInfo(param);
      if (data.code === undefined) {
        this.infoObj = data;
      }
      this.loading = false;
    },
  },
};
</script>
<style lang="less" scoped>
.textOverflow {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.detail-container {
  height: 100%;
  .main {
    display: flex;
    flex-flow: row nowrap;
    height: calc(100% - 65px);
    padding: 32px 40px;
    box-sizing: border-box;
    .left {
      flex: 1.2;
      padding-right: 80px;
      border-right: 1px solid #ebebeb;
      .title {
        margin-bottom: 24px;
        font-size: 32px;
        font-weight: 500;
        color: #262626;
        font-family: PingFang SC, PingFang SC-Medium;
      }
      .middle {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 24px;
        .avatar {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
        .text {
          color: #8c8c8c;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
        }
        .time {
          display: inline-block;
          margin: 0 24px;
        }
        .label {
          display: inline-block;
          margin: 0 8px;
          color: #1982ed;
        }
      }
      .introduction{
        font-size: 16px;
        padding: 5px;
        background-color: #f0f2f5;
      }
      .body {
        padding-left: 0px;
        line-height: 24px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .right {
      flex: 1;
      padding-left: 40px;
      .part {
        margin-bottom: 48px;
        .top {
          margin-bottom: 14px;
          .icon {
            margin-right: 10px;
            font-size: 16px;
          }
          .label {
            font-size: 18px;
            color: #262626;
            font-family: PingFang SC, PingFang SC-Regular;
          }
        }

        .tags {
          display: flex;
          .tag {
            margin-right: 12px;
            padding: 0 16px;
            height: 28px;
            line-height: 28px;
            color: #1982ed;
            font-size: 14px;
            background: #e8f3fd;
            border: 1px solid #6bb1fa;
            border-radius: 4px;
            text-align: center;
          }
        }

        .list {
          .item {
            display: flex;
            .s-left {
              display: flex;
              align-items: center;
              width: 50%;
              padding-left: 8px;
              .dot {
                display: inline-block;
                content: "";
                margin-right: 8px;
                background-color: #1982ed;
                width: 4px;
                height: 4px;
                border-radius: 50%;
              }
              .label {
                width: 90%;
                color: #1982ed;
                line-height: 24px;
                font-size: 16px;
                font-family: PingFang SC, PingFang SC-Regular;
              }
            }
            .s-right {
              flex-shrink: 0;
              .text {
                color: #8c8c8c;
                line-height: 24px;
                font-size: 14px;
                font-family: PingFang SC, PingFang SC-Regular;
                &:first-child {
                  margin-right: 8px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
