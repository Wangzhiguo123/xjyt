<!--
 * @Description: 新增编辑
 * @Date: 2021-09-02 15:40:34
 * @LastEditTime: 2021-09-03 11:03:55
-->
<template>
  <el-dialog :title="title" :visible="isShow" @close="close">
    <el-form :model="form" :rules="formRules" ref="form">
      <el-form-item label="指标名称" label-width="120px" prop="name">
        <el-input
          size="mini"
          style="width: 200px"
          v-model="form.name"
          autocomplete="off"
          maxlength="15"
          placeholder="请输入指标名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="指标类型" label-width="120px" prop="type">
        <el-select size="mini" v-model="form.type" placeholder="请选择指标类型">
          <el-option
            v-for="item in expressTypeSelect"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="评价对象级别"
        label-width="120px"
        prop="assessObjectLevel"
      >
        <el-select
          v-model="form.assessObjectLevel"
          placeholder="请选择指标类型"
          size="mini"
          @change="getCommentDimensionSelect"
        >
          <el-option
            v-for="item in commentLevelSelect"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="评价对象维度"
        label-width="120px"
        prop="assessObjectIds"
      >
        <el-cascader
          size="mini"
          v-model="form.assessObjectIds"
          :key="addKey"
          :show-all-levels="false"
          :options="commentDimensionSelect"
          :props="
            form.assessObjectLevel === 'organization'
              ? { multiple: true, checkStrictly: true }
              : { checkStrictly: true }
          "
        ></el-cascader>
      </el-form-item>
      <el-form-item label="指标说明" label-width="120px" prop="instruction">
        <el-input
          v-model="form.instruction"
          type="textarea"
          autocomplete="off"
          maxlength="500"
          size="mini"
          placeholder="请添加指标说明"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="$emit('update:isShow', false)"
        >取 消</el-button
      >
      <el-button size="mini" type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  getExpressDetail,
  getExpressTypeSelect,
  getCommentLevelSelect,
  getCommentDimensionSelect,
} from "@/api/modules/kpi";

export default {
  props: {
    // 是否显示
    isShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    updateId: {
      type: String,
    },
  },
  watch: {
    async isShow() {
      if (this.isShow && this.updateId) {
        this.getExpressDetail();
      }
    },
  },
  data() {
    return {
      addKey: 0,
      form: {
        name: "",
        type: "",
        assessObjectLevel: "",
        assessObjectIds: [],
        instruction: "",
      },
      formRules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择指标类型",
            trigger: "change",
          },
        ],
        assessObjectLevel: [
          {
            required: true,
            message: "请选择评价对象级别",
            trigger: "change",
          },
        ],
        assessObjectIds: [
          {
            required: true,
            message: "请选择评价对象维度",
            trigger: "change",
          },
        ],
        instruction: [
          {
            required: true,
            message: "请输入指标说明",
            trigger: "change",
          },
        ],
      },

      // 指标类型
      expressTypeSelect: [],
      // 评价对象级别
      commentLevelSelect: [],
      // 评价对象维度
      commentDimensionSelect: [],
    };
  },
  methods: {
    /**
     * @description: 获取详情
     * @param {*}
     */
    async getExpressDetail() {
      let { data } = await getExpressDetail(this.updateId);
      if (data.code === undefined) {
        this.form = JSON.parse(JSON.stringify(data));
        this.getCommentDimensionSelect(data.assessObjectLevel);
      }
    },
    /**
     * @description: 获取指标类型下拉
     * @param {*}
     */
    async getExpressTypeSelect() {
      let { data } = await getExpressTypeSelect();
      if (data.code === undefined) {
        this.expressTypeSelect = [...data];
      }
    },
    /**
     * @description: 获取评价对象级别下拉
     * @param {*}
     */
    async getCommentLevelSelect() {
      let { data } = await getCommentLevelSelect();
      if (data.code === undefined) {
        this.commentLevelSelect = [...data];
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
     * @description: 确定
     * @param {*}
     */
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.form);
        }
      });
    },
    /**
     * @description: 关闭弹窗
     * @param {*}
     */
    close() {
      this.form = {
        name: "",
        type: "",
        assessObjectLevel: "",
        assessObjectIds: [],
        instruction: "",
      };
      this.$refs.form.resetFields();
      this.$emit("update:isShow", false);
    },
  },
  created() {
    this.getExpressTypeSelect();
    this.getCommentLevelSelect();
  },
};
</script>
