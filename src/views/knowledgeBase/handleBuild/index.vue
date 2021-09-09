<!--
 * @Description: 手动构建知识库
 * @Date: 2021-08-24 09:10:27
 * @LastEditTime: 2021-09-08 09:58:30
-->
<template>
  <div class="add-container">
    <page-header :title="updateArticleId ? '编辑' : '新增'">
      <template slot="btns">
        <el-button
          size="mini"
          :loading="saveBtnLoading"
          @click="handleSave"
          v-if="status !== '已发布'"
          >保存</el-button
        >
        <el-button
          v-if="updateArticleId"
          size="mini"
          :disabled="savedArticleIdList.length == 0"
          @click="handlePreview"
          >预览</el-button
        >
        <el-button
          type="primary"
          :loading="btnLoading"
          size="mini"
          @click="handlePublish"
          >发布</el-button
        >
        <el-button size="mini" @click="$router.back()">返回</el-button>
      </template>
    </page-header>
    <main class="main">
      <el-form
        label-width="80px"
        ref="formArticle"
        :model="formParams"
        :rules="formRules"
        class="demo-form-inline"
      >
        <el-form-item label="标题" prop="articleTitle">
          <el-input
            v-model="formParams.articleTitle"
            placeholder="请输入标题"
            size="mini"
            maxlength="30"
            clearable
            style="width: 646px"
          ></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="classificationIdList">
          <el-select
            size="mini"
            v-model="formParams.classificationIdList"
            placeholder="请选择"
            clearable
            multiple
            style="width: 323px"
            :multiple-limit="1"
          >
            <el-option
              v-for="item in classifyList"
              :key="item.classificationId"
              :label="item.classificationName"
              :value="item.classificationId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            size="mini"
            style="width: 323px"
            clearable
            :multiple-limit="3"
            multiple
            v-model="formParams.labelIdList"
            placeholder="请选择"
          >
            <el-option
              v-for="item in labelList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="简介" prop="articleIntroduction">
          <el-input
            type="textarea"
            maxlength="200"
            show-word-limit
            :rows="4"
            v-model="formParams.articleIntroduction"
            placeholder="请输入自定义文章显示内容（200字以内）"
          ></el-input>
        </el-form-item>
        <el-form-item label="编辑" prop="articleContent">
          <wang-editor
            :content.sync="formParams.articleContent"
            @change="editorChange"
          ></wang-editor>
        </el-form-item>

        <el-form-item label="附件" prop="articleAttachmentList">
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            multiple
            :show-file-list="false"
            :auto-upload="false"
            :on-change="fileChange"
          >
            <el-button slot="trigger" size="mini" type="primary" plain
              >选取文件</el-button
            >
          </el-upload>
          <v-table
            :table-data="fileList"
            :column-data="fileColumnData"
            :show-pagination="false"
          >
            <el-table-column
              slot="column2"
              slot-scope="row"
              :label="row.title"
              :width="row.width"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleRemoveFile(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </v-table>
        </el-form-item>

        <el-form-item label="关联知识" prop="linkArticleIdList">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="handleLinkArticleAdd"
            >添加</el-button
          >

          <v-table
            :table-data="linkArticleSelectedList"
            :column-data="linkArticleSelectedCloumn"
            :show-pagination="false"
          >
            <el-table-column
              slot="column2"
              slot-scope="row"
              :label="row.title"
              :width="row.width"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleRemoveLinkArticle(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </v-table>
        </el-form-item>
      </el-form>
    </main>

    <!-- 关联知识选择弹窗 -->
    <el-dialog
      title="关联知识选择"
      :visible.sync="isLinkArticleShow"
      @close="onDialogClose"
    >
      <header class="dialog-header">
        <el-form
          :inline="true"
          :model="linkArticleParam"
          class="demo-form-inline"
        >
          <el-form-item>
            <el-select
              size="mini"
              v-model="linkArticleParam.authorId"
              placeholder="请选择作者姓名"
              clearable
            >
              <el-option
                v-for="item in authorList"
                :key="item.authorId"
                :label="item.authorName"
                :value="item.authorId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="linkArticleParam.articleTitle"
              placeholder="请输入文章标题"
              clearable
              size="mini"
              maxlength="30"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="onLinkArticleSearch"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </header>
      <v-table
        :table-data="linkArticleList"
        :column-data="linkArticleCloumn"
        :column-check="true"
        :show-pagination="false"
        ref="linkArticleTable"
        _ref="linkArticleTable"
        @selection-change="articleSelectionChange"
      >
      </v-table>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isLinkArticleShow = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="articleSelectionConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VTable from "@/components/tableCom";
import WangEditor from "@/components/WangEditor";
import PageHeader from "@/components/PageHeader";

import {
  getAuthorList,
  getClassificationList,
  getLabelList,
  getNotBindLinkArticleList,
  saveAsDraft,
  publishArticle,
  getArticleInfo,
  updateArticle,
} from "@/api/modules/knowledgeBase";

import { formatSizeUnits, handleParam } from "@/utils";
import { validateTitle } from "@/utils/validate";
export default {
  name: "knowledgeAdd",
  components: {
    VTable,
    WangEditor,
    PageHeader,
  },
  props: {
    // 更新的id
    updateArticleId: {
      type: String,
      default: "",
    },
  },
  data() {
    // 标题校验
    const validateArticleTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入文章标题"));
      } else {
        if (validateTitle(value)) {
          callback();
        } else {
          callback("文章标题不超过30字，不含特殊符号");
        }
      }
    };
    // 简介校验
    const validateIntroduction = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入文章简介"));
      } else {
        if (validateTitle(value)) {
          callback();
        } else {
          callback("文章简介不能含特殊符号");
        }
      }
    };
    return {
      // 保存加载中
      saveBtnLoading: false,
      // 按钮加载中
      btnLoading: false,
      // 文章状态
      status: "",
      // 表单参数
      formParams: {
        articleTitle: "",
        classificationIdList: [],
        labelIdList: [],
        articleIntroduction: "",
        articleContent: "",
        articleAttachmentList: [],
        linkArticleIdList: [],
      },
      //校验规则
      formRules: {
        articleTitle: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur",
          },
          {
            validator: validateArticleTitle,
            trigger: "blur",
          },
        ],
        classificationIdList: [
          {
            required: true,
            message: "请选择类别",
            trigger: "change",
          },
        ],
        articleIntroduction: [
          {
            required: true,
            message: "请输入简介",
            trigger: "blur",
          },
          {
            validator: validateIntroduction,
            trigger: "blur",
          },
        ],
        articleContent: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
      },
      // 更新 额外参数
      updateParams: {
        needDeleteLinkArticleIdList: [], //关联文章删除id集合
        needDeleteArticleAttachmentIdList: [], //文章附件删除id集合
      },

      // 类别集合
      classifyList: [],
      // 标签数据
      labelList: [],
      // 作者数据
      authorList: [],

      // 附件数据
      fileList: [],
      fileColumnData: [
        {
          title: "附件名称",
          field: "attachmentRealName",
        },
        {
          title: "大小",
          field: "attachmentSizeAssemble",
          width: 200,
        },
        {
          title: "操作",
          width: 200,
        },
      ],

      // 关联文章数据
      linkArticleSelectedList: [],
      linkArticleSelectedCloumn: [
        {
          title: "标题",
          field: "linkArticleTitle",
        },
        {
          title: "作者",
          field: "linkArticleAuthorName",
        },
        {
          title: "操作",
        },
      ],
      // 关联知识弹窗
      isLinkArticleShow: false,
      // 关联知识弹窗数据
      linkArticleList: [],
      linkArticleCloumn: [
        {
          title: "标题",
          field: "linkArticleTitle",
        },
        {
          title: "作者",
          field: "linkArticleAuthorName",
        },
      ],
      // 关联知识文章数据
      preLinkArticleSelected: [],
      linkArticleParam: {
        authorId: "",
        // 更新的id
        articleId: "",
        articleTitle: "",
      },

      // 保存后的文章id 及 关联文章id集合
      savedArticleIdList: [],
    };
  },
  created() {
    this.getClassificationList();
    this.getLabelList();
    this.getAuthorList();

    if (this.updateArticleId) {
      this.savedArticleIdList.push(this.updateArticleId);
      this.linkArticleParam.articleId = this.updateArticleId;
      this.getArticleInfo();
    }
  },
  methods: {
    /**
     * @description: 编辑时 获取文章信息
     * @param {*}
     */
    async getArticleInfo() {
      let formData = new FormData();
      formData.append("articleId", this.updateArticleId);

      let { data } = await getArticleInfo(formData);
      if (data.code === undefined) {
        for (let [k, v] of Object.entries(data)) {
          if (this.formParams.hasOwnProperty(k)) {
            this.formParams[k] = v;
          }
        }
        this.fileList = data.articleAttachmentList;
        this.linkArticleSelectedList = data.articleLinkList;

        this.status = data.articleState_dictText;
      }
    },
    /**
     * @description: 附件选择改变
     * @param {*} file 当前选择
     * @param {*} list
     */
    fileChange(file) {
      this.fileList.push({
        attachmentId: "",
        attachmentSizeAssemble: formatSizeUnits(file.size),
        attachmentRealName: file.name,
        file: file.raw,
      });
      this.formParams.articleAttachmentList = [
        ...this.fileList.map((it) => it.file).filter((it) => it),
      ];
    },
    /**
     * @description: 移除选择附件
     * @param {*} row
     */
    handleRemoveFile(row) {
      // 区分文件对象和json数据
      let idx = -1;
      if (row.attachmentId) {
        idx = this.fileList.findIndex(
          (it) => it.attachmentId === row.attachmentId
        );
      } else {
        idx = this.fileList.findIndex((it) => it.file.uid === row.file.uid);
      }
      if (idx > -1) {
        this.fileList.splice(idx, 1);
      }
      // 若更新时 需要添加额外参数
      if (this.savedArticleIdList.length) {
        if (
          !this.updateParams.needDeleteArticleAttachmentIdList.includes(
            row.attachmentId
          )
        ) {
          this.updateParams.needDeleteArticleAttachmentIdList.push(
            row.attachmentId
          );
        }
      }
    },
    /**
     * @description: 获取作者下拉
     * @param {*}
     */
    async getAuthorList() {
      let { data } = await getAuthorList();
      if (data && data.code === undefined) {
        this.authorList = data;
      }
    },
    /**
     * @description: 获取分类下拉
     * @param {*}
     */
    async getClassificationList() {
      let { data } = await getClassificationList();
      if (data && data.code === undefined) {
        this.classifyList = data;
      }
    },
    /**
     * @description: 获取标签下拉
     * @param {*}
     */
    async getLabelList() {
      let { data } = await getLabelList();
      if (data && data.code === undefined) {
        this.labelList = data;
      }
    },

    /**
     * @description: 富文本改变
     * @param {*}
     */
    editorChange(res) {
      if (res !== "") {
        this.$refs.formArticle.clearValidate("articleContent");
      } else {
        this.$refs.formArticle.validateField("articleContent");
      }
    },
    /**
     * @description: 关联知识到添加按钮事件
     * @param {*}
     */
    handleLinkArticleAdd() {
      this.isLinkArticleShow = true;
      this.onLinkArticleSearch();
    },
    /**
     * @description: 关联知识筛选确定
     * @param {*}
     */
    async onLinkArticleSearch() {
      if (this.$refs.linkArticleTable) {
        this.$refs.linkArticleTable.clearSelection();
      }
      this.linkArticleList = [];
      let formData = new FormData();
      handleParam(this.linkArticleParam, formData);

      let { data } = await getNotBindLinkArticleList(formData);
      if (data && data.code === undefined) {
        this.linkArticleList = data.filter(
          (it) => !this.formParams.linkArticleIdList.includes(it.linkArticleId)
        );
      }
    },
    /**
     * @description: 关联知识弹窗选择改变 获取选中项
     * @param {*}
     */
    articleSelectionChange(res) {
      this.preLinkArticleSelected = res;
    },
    /**
     * @description: 关联知识弹窗选择确定
     * @param {*}
     */
    articleSelectionConfirm() {
      if (this.preLinkArticleSelected.length) {
        this.linkArticleSelectedList = [
          ...this.linkArticleSelectedList,
          ...this.preLinkArticleSelected,
        ];

        // 参数赋值id
        this.formParams.linkArticleIdList = this.linkArticleSelectedList.map(
          (it) => it.linkArticleId
        );
      }
      this.preLinkArticleSelected = [];
      this.isLinkArticleShow = false;
    },
    /**
     * @description: 关联知识对话框关闭
     * @param {*}
     */
    onDialogClose() {
      this.linkArticleParam = {
        authorId: "",
        articleTitle: "",
      };

      this.$refs.linkArticleTable.clearSelection();
    },
    /**
     * @description: 移除已选择的关联知识文章
     * @param {*}
     */
    handleRemoveLinkArticle(row) {
      let idx = this.linkArticleSelectedList.findIndex(
        (it) => it.linkArticleId === row.linkArticleId
      );
      if (idx > -1) {
        this.linkArticleSelectedList.splice(idx, 1);
        this.formParams.linkArticleIdList.splice(idx, 1);

        // 若更新时 需要添加额外参数
        if (this.savedArticleIdList.length) {
          if (
            !this.updateParams.needDeleteLinkArticleIdList.includes(
              row.linkArticleId
            )
          ) {
            this.updateParams.needDeleteLinkArticleIdList.push(
              row.linkArticleId
            );
          }
        }
      }
    },
    /**
     * @description: 保存文章事件
     * @param {*}
     */
    handleSave() {
      this.$refs.formArticle.validate(async (valid) => {
        if (valid) {
          this.saveBtnLoading = true;
          try {
            let res = await this.handleInsertOrUpdate("direct");
            if (res) {
              this.$router.back();
            }
            this.saveBtnLoading = false;
          } catch (error) {
            this.saveBtnLoading = false;
          }
        }
      });
    },
    /**
     * @description: 插入或者更新文章
     * @param {*}
     */
    handleInsertOrUpdate(type) {
      let formData = new FormData();

      return new Promise(async (resolve, reject) => {
        // 编辑  新增文章id参数
        if (this.savedArticleIdList.length) {
          formData.append("articleId", this.savedArticleIdList[0]);
          // 删除非file对象的参数
          this.formParams.articleAttachmentList =
            this.formParams.articleAttachmentList.filter(
              (it) => !it.hasOwnProperty("attachmentSaveUrl")
            );

          handleParam(this.updateParams, formData);
        }
        handleParam(this.formParams, formData);

        const apiArr = new Map([
          ["add", saveAsDraft],
          ["update", updateArticle],
        ]);
        let flag = this.savedArticleIdList.length ? "update" : "add";
        let { data } = await apiArr.get(flag)(formData);
        if (data.code === undefined) {
          // 保存文章关联id
          this.savedArticleIdList = [
            data.articleId,
            ...data.articleLinkList.map((it) => it.linkArticleId),
          ];
          // 赋值附件id
          this.fileList = [...data.articleAttachmentList];

          // 赋值关联文章所需排除当前文章id
          this.linkArticleParam.articleId = data.articleId;
          console.log(this.savedArticleIdList, "保存文章关联id");
          if (type === "direct") {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          }
          resolve(true);
        } else {
          resolve(false);
        }
      });
    },
    /**
     * @description: 发布文章
     * @param {*}
     */
    handlePublish() {
      this.$refs.formArticle.validate(async (valid) => {
        if (valid) {
          this.btnLoading = true;
          // 当新增成功后 进行发布
          try {
            let res = await this.handleInsertOrUpdate();
            if (res) {
              let formData = new FormData();
              handleParam(
                {
                  articleIdList: this.savedArticleIdList[0],
                  publishOrUnPublishType: 1,
                },
                formData
              );
              let { data } = await publishArticle(formData);
              if (data.code === undefined) {
                this.$message({
                  type: "success",
                  message: "发布成功",
                });
                setTimeout(() => {
                  this.$router.back();
                }, 1500);
              }
            }
            this.btnLoading = false;
          } catch (error) {
            this.btnLoading = false;
          }
        }
      });
    },
    /**
     * @description: 预览
     * @param {*}
     */
    handlePreview() {
      if (this.savedArticleIdList.length) {
        this.$router.push({
          path: `/knowledge-detail/${this.savedArticleIdList[0]}`,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.add-container {
  .main {
    padding: 32px 0 60px;
    box-sizing: border-box;
    .demo-form-inline {
      width: 900px;
      margin: 0 auto;
    }
  }
}
</style>
