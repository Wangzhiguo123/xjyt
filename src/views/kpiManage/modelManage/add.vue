<!--
 * @Description: 模型 新增编辑
 * @Date: 2021-08-31 14:49:20
 * @LastEditTime: 2021-09-07 11:45:24
-->
<template>
  <div class="container">
    <page-header :title="id ? '编辑' : '新增'">
      <template slot="btns">
        <el-button type="primary" size="mini" v-if="id" @click="handlePublish"
          >发布</el-button
        >
        <el-button
          v-else
          type="primary"
          plain
          size="mini"
          @click="handleSaveExpress"
          >保存</el-button
        >
        <el-button size="mini" @click="$router.back()">返回</el-button>
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
            size="mini"
            v-model="formParams.name"
            clearable
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务分类" prop="businessId">
              <el-select
                size="mini"
                v-model="formParams.businessId"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in businessList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="场景分类" prop="sceneId">
              <el-cascader
                size="mini"
                v-model="formParams.sceneId"
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
                size="mini"
                v-model="formParams.cycle"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in periodList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="评价对象" prop="level">
          <el-radio-group
            v-model="formParams.level"
            @change="getCommentDimensionSelect"
          >
            <el-radio label="organization">组织机构级别</el-radio>
            <el-radio label="geology">地质关系级别</el-radio>
            <el-radio label="gathering">集输关系级别</el-radio>
          </el-radio-group>

          <el-cascader
            size="mini"
            style="margin-left: 8px"
            v-model="formParams.detailIds"
            :key="addKey"
            :show-all-levels="false"
            :options="commentDimensionSelect"
            :props="
              formParams.level === 'organization'
                ? { multiple: true, emitPath: false, checkStrictly: true }
                : { checkStrictly: true, emitPath: false }
            "
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain size="mini" @click="handleSaveModel"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
      <add-express
        title="添加节点"
        :isShow.sync="isAddShow"
        :modelId="modelId"
      ></add-express>
    </main>
  </div>
</template>
<script>
import PageHeader from "@/components/PageHeader";
import AddExpress from "./addExpress.vue";

import {
  getBusinessList,
  getSceneList,
  getCommentDimensionSelect,
  addCommentModel,
  publishCommentModel,
} from "@/api/modules/kpi";
export default {
  components: {
    PageHeader,
    AddExpress,
  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      // 表单参数
      formParams: {
        name: "",
        businessId: "",
        sceneId: "",
        detailIds: "",
        cycle: "",
        level: "",
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
        level: [
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

      // 模型id  同propid
      modelId: "223028090996133888",
      // 节点操作弹窗
      isAddShow: false,
    };
  },
  methods: {
    /**
     * @description: 获取列表数据
     * @param {*}
     */
    async getBusinessList() {
      let { data } = await getBusinessList({
        page: 1,
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
          if (params.detailIds instanceof Array) {
            params.detailIds = params.detailIds.join(",");
          }
          let { data } = await addCommentModel(params);
          if (data.code === undefined) {
            this.$message({
              type: "success",
              message: "保存模型成功",
              callback: () => {
                if (!this.id) {
                  this.modelId = data.id;
                  this.isAddShow = true;
                }
              },
            });
          }
        }
      });
    },
    /**
     * @description: 保存模型关联指标
     * @param {*}
     */
    handleSaveExpress() {
      this.$refs.form.validate((valid) => {
        if (valid) {
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
          this.$confirm(
            "发布成功后，此评价模型数据不可编辑，是否确定发布？",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).then(async () => {
            let { data } = await publishCommentModel(this.modelId);

            this.$message({
              type: "success",
              message: "发布成功",
            });
          });
        }
      });
    },
  },
  created() {
    this.getBusinessList();
    this.getSceneList();
  },
};
</script>
<style lang="less" scoped>
.main {
  padding: 32px 40px 32px 30px;
}
</style>
