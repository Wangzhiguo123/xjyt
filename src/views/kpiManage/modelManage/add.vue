<!--
 * @Description: 模型 新增编辑
 * @Date: 2021-08-31 14:49:20
 * @LastEditTime: 2021-09-07 11:45:24
-->
<template>
  <div class="container">
    <page-header :title="hasConfirm ? '详情' : id ? '编辑' : '新增'">
      <template slot="btns">
        <el-button
          v-if="!hasConfirm && assessModelId && formParams.hasIndex"
          type="primary"
          size="mini"
          @click="handlePublish"
          >发布
        </el-button>
        <el-button size="mini" @click="$router.push('/model-manage')"
          >返回</el-button
        >
      </template>
    </page-header>

    <main class="main">
      <el-form
        ref="form"
        class="demo-form-inline"
        label-width="120px"
        :model="formParams"
        :rules="rules"
      >
        <el-form-item label="评价模型名称" prop="name">
          <el-input
            v-model="formParams.name"
            :disabled="hasConfirm"
            size="mini"
            clearable
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务分类" prop="businessId">
              <el-select
                v-model="formParams.businessId"
                :disabled="hasConfirm"
                size="mini"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="(item, businessIndex) in businessList"
                  :key="businessIndex"
                  :label="item.name"
                  :value="item.businessId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场景分类" prop="sceneId">
              <el-cascader
                v-model="formParams.sceneId"
                :disabled="hasConfirm"
                size="mini"
                placeholder="请选择"
                :options="sceneList"
                :show-all-levels="false"
                :props="{ emitPath: false }"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评价周期" prop="cycle">
              <el-select
                v-model="formParams.cycle"
                :disabled="hasConfirm"
                size="mini"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in periodList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="评价对象" prop="objectLevel">
              <el-radio-group
                v-model="formParams.objectLevel"
                :disabled="hasConfirm"
                @change="getCommentDimensionSelect"
              >
                <el-radio label="organization">组织机构级别</el-radio>
                <el-radio label="geology">地质关系级别</el-radio>
                <el-radio label="gathering">集输关系级别</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" prop="objectIds" label-width="0">
              <el-cascader
                :key="addKey"
                v-model="formParams.objectIds"
                :disabled="hasConfirm"
                size="mini"
                style="margin-left: 8px"
                :show-all-levels="false"
                :options="commentDimensionSelect"
                :props="
                  formParams.objectLevel === 'organization'
                    ? { multiple: true, emitPath: false, checkStrictly: true }
                    : { checkStrictly: true, emitPath: false }
                "
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            v-if="!hasConfirm"
            type="primary"
            plain
            size="mini"
            @click="handleSaveModel"
            >保存</el-button
          >
          <el-button
            v-if="!hasConfirm && assessModelId && !formParams.hasIndex"
            type="primary"
            plain
            size="mini"
            @click="addInitNode"
          >
            初始化节点</el-button
          >
        </el-form-item>
      </el-form>
      <add-express
        v-if="assessModelId && formParams.hasIndex"
        ref="addExpress"
        :has-confirm="hasConfirm"
        title="添加节点"
        :model-id="assessModelId"
      >
      </add-express>
      <!-- <add-express title="添加节点" :modelId="assessModelId"></add-express> -->
      <!-- index-dialog组件是从add-express组件中抠出的新增节点的功能，前期没有时间，后期需要重构，合并功能为一个组件 -->
      <index-dialog
        v-model="initDialogShow"
        :model-id="assessModelId"
        @addSuccess="initAddSuccess"
      ></index-dialog>
    </main>
  </div>
</template>
<script>
import PageHeader from "@/components/PageHeader";
import AddExpress from "./addExpress";
import IndexDialog from "./indexDialog";

import {
  getBusinessList,
  getSceneList,
  getCommentDimensionSelect,
  addCommentModel,
  publishCommentModel,
  getModelDetail,
} from "@/api/modules/kpi";
export default {
  components: {
    PageHeader,
    AddExpress,
    IndexDialog,
  },
  props: {
    id: {
      type: String,
    },
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      hasConfirm: false,
      initDialogShow: false,
      assessModelId: "", //评价模型ID
      // 表单参数
      formParams: {
        id: "",
        name: "",
        businessId: "",
        sceneId: "",
        objectIds: "",
        cycle: "",
        objectLevel: "",
        hasIndex: false,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入评价模型名称",
            trigger: "blur",
          },
        ],
        businessId: [
          {
            required: true,
            message: "请选择业务分类",
            trigger: "change",
          },
        ],
        sceneId: [
          {
            required: true,
            message: "请选择场景分类",
            trigger: "change",
          },
        ],
        cycle: [
          {
            required: true,
            message: "请选择评价周期",
            trigger: "change",
          },
        ],
        objectLevel: [
          {
            required: true,
            message: "请选择评价对象",
            trigger: "change",
          },
        ],
        objectIds: [
          {
            required: true,
            message: "请选择评价对象",
            trigger: "change",
          },
        ],
      },
      // 业务分类
      businessList: [],
      // 场景分类
      sceneList: [],
      // 周期集合
      periodList: [
        {
          value: "year",
          label: "年度",
        },
        {
          value: "quarter",
          label: "季度",
        },
        {
          value: "month",
          label: "月度",
        },
        {
          value: "day",
          label: "日度",
        },
      ],
      addKey: 0,
      // 评价对象维度
      commentDimensionSelect: [],
    };
  },
  created() {
    this.hasConfirm = this.type === "detail";
    this.assessModelId = this.id;
    this.getBusinessList();
    this.getSceneList();
    if (this.assessModelId) {
      this.getModelDetail();
    }
  },
  methods: {
    /**
     * @description: 初始化节点成功
     * @param {*}
     */
    initAddSuccess() {
      this.formParams.hasIndex = true;
    },
    /**
     * @description: 添加初始化节点
     * @param {*}
     */
    addInitNode() {
      this.initDialogShow = true;
    },
    /**
     * @description: 获取评价模型详情
     * @param {*}
     */
    async getModelDetail() {
      let { data } = await getModelDetail({
        id: this.assessModelId,
      });
      if (data) {
        this.formParams.id = data.id;
        this.formParams.name = data.name;
        this.formParams.businessId = data.businessId;
        this.formParams.sceneId = data.sceneId;
        this.formParams.objectIds = data.objectIds;
        this.formParams.cycle = data.cycle;
        this.formParams.objectLevel = data.objectLevel;
        this.formParams.hasIndex = data.hasIndex;
        if (data.objectLevel) {
          this.getCommentDimensionSelect(data.objectLevel);
          if (data.objectLevel == "organization") {
            this.formParams.objectIds = data.objectIds.split(",");
          }
        }
      }
    },
    /**
     * @description: 获取列表数据
     * @param {*}
     */
    async getBusinessList() {
      let { data } = await getBusinessList({
        page: 0,
        size: 100,
      });
      if (data.code === undefined) {
        this.businessList = data;
      }
    },
    /**
     * @description: 获取场景列表
     * @param {*}
     */
    async getSceneList() {
      let { data } = await getSceneList();
      if (data.code === undefined) {
        this.sceneList = [...data];
      }
    },
    /**
     * @description: 获取评价对象维度下拉
     * @param {*}
     */
    async getCommentDimensionSelect(id) {
      this.addKey++;
      let { data } = await getCommentDimensionSelect({
        code: id,
      });
      if (data.code === undefined) {
        this.commentDimensionSelect = [...data];
      }
    },
    /**
     * @description: 保存评价模型
     * @param {*}
     */
    handleSaveModel() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.formParams));
          if (params.objectIds instanceof Array) {
            params.objectIds = params.objectIds.join(",");
          }
          let { data } = await addCommentModel(params);
          if (data) {
            this.$message({
              type: "success",
              message: "保存模型成功",
            });
            this.assessModelId = data.id;
          }
        }
      });
    },
    /**
     * @description: 发布模型关联指标
     * @param {*}
     */
    handlePublish() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.$refs);
          if (!this.$refs.addExpress.validateScore()) {
            this.$message({
              type: "warning",
              message: "请将权重和基础分完善后发布",
            });
            return;
          }
          this.$confirm(
            "发布成功后，此评价模型数据不可编辑，是否确定发布？",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).then(async () => {
            let { data } = await publishCommentModel(this.assessModelId);
            if (data) {
              this.$message({
                type: "success",
                message: "发布成功",
              });
              this.$router.back();
            }
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  padding: 32px 40px 32px 30px;
}
</style>
