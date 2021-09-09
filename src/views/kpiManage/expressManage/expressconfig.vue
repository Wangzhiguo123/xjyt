<!--
 * @Description: 指标配置
 * @Date: 2021-08-31 14:49:20
 * @LastEditTime: 2021-09-06 10:57:56
-->
<template>
  <div class="container">
    <PageHeader title="指标公式配置">
      <template slot="btns">
        <el-button type="primary" size="mini" @click="handlePublish"
          >保存</el-button
        >
        <el-button size="mini" @click="$router.back()">返回</el-button>
      </template>
    </PageHeader>

    <el-form :model="form" ref="form" label-width="120px" v-if="info !== null">
      <el-form-item label="指标名称：">
        {{ info.name }}
      </el-form-item>
      <el-form-item label="指标类型：">
        <el-radio-group v-model="info.type">
          <el-radio label="base" disabled>基本指标</el-radio>
          <el-radio label="complex" disabled>复合指标</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="指标公式配置：">
        <el-button
          type="primary"
          size="mini"
          :disabled="objectSelect.length === 1"
          plain
          @click="addRow"
          >新增条件公式配置</el-button
        >
      </el-form-item>
      <div
        class="part"
        v-for="(item, index) in form.validateParam"
        :key="item.key"
      >
        <template v-if="item.isShow">
          <el-form-item
            :label="'条件' + (index + 1) + '：'"
            :prop="'validateParam.' + index + '.assessObjectId'"
            :rules="{
              required: true,
              message: '条件不能为空',
              trigger: 'change',
            }"
          >
            【评价对象级别】=
            <el-select size="mini" v-model="item.assessObjectId">
              <el-option
                v-for="it in objectSelect"
                :key="it.id"
                :label="it.name"
                :disabled="objectSelect.length === 1"
                :value="it.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="传入参数："
            size="mini"
            :prop="'validateParam.' + index + '.params'"
            :rules="{
              required: true,
              message: '参数不能为空',
              trigger: 'change',
            }"
          >
            <el-select v-model="item.params" multiple>
              <el-option
                v-for="it in paramSelect"
                :key="it.id"
                :label="it.name"
                :value="it.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="返回参数："
            :prop="'validateParam.' + index + '.formulaSql'"
            :rules="{
              required: true,
              message: '参数不能为空',
              trigger: 'change',
            }"
          >
            <!-- <el-button size="mini" type="primary" plain>编辑</el-button>
          <p></p> -->
            <el-input type="textarea" v-model="item.formulaSql"></el-input>
          </el-form-item>
        </template>

        <p class="btns">
          <span class="item" @click="toggleShow(item)">
            <svg-icon iconClass="triangle" className="icon"></svg-icon>
          </span>
          <span class="item" @click="removeRow(item)">
            <svg-icon iconClass="delete" className="icon"></svg-icon>
          </span>
        </p>
      </div>
    </el-form>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";

import {
  getExpressDetail,
  getFormulaObjectSelect,
  getFormulaParamSelect,
  addFormula,
} from "@/api/modules/kpi";

export default {
  components: {
    PageHeader,
  },
  props: {
    // 指标id
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      info: null,
      // 关联对象下拉
      objectSelect: [],
      // 传入参数下拉
      paramSelect: [],

      form: {
        validateParam: [],
      },
    };
  },
  methods: {
    /**
     * @description: 获取关联对象级别下拉数据
     * @param {*}
     */
    async getFormulaObjectSelect() {
      let { data } = await getFormulaObjectSelect(this.id);
      if (data.code === undefined) {
        this.objectSelect = data;

        // 只有一个的 默认赋值
        if (data.length === 1) {
          this.form.validateParam[0] = {
            key: Date.now(),
            assessObjectId: data[0].id,
            assessObjectLevel: this.info.assessObjectLevel,
            formulaSql: "",
            indexId: this.id,
            params: [],
            isShow: true,
          };
        }
      }
    },
    /**
     * @description: 获取关联对象级别下拉数据
     * @param {*}
     */
    async getFormulaParamSelect() {
      let { data } = await getFormulaParamSelect();
      if (data.code === undefined) {
        this.paramSelect = data;
      }
    },
    /**
     * @description: 获取详情
     * @param {*}
     */
    async getExpressDetail() {
      let { data } = await getExpressDetail(this.id);
      if (data.code === undefined) {
        this.info = data;
      }
    },
    /**
     * @description: 新增一行
     * @param {*}
     */
    addRow() {
      if (this.objectSelect.length > 1) {
        if (this.form.validateParam.length === this.objectSelect.length) {
          this.$message.closeAll();
          this.$message({
            type: "warning",
            message: `最多新增${this.objectSelect.length}个公式`,
          });
          return;
        }
        this.form.validateParam.push({
          key: Date.now(),
          indexId: this.id,
          assessObjectLevel: this.info.assessObjectLevel,
          assessObjectId: "",
          formulaSql: "",
          params: [],
          isShow: true,
        });
      }
    },
    /**
     * @description: 隐藏展开
     * @param {*}
     */
    toggleShow(row) {
      row.isShow = !row.isShow;
    },
    /**
     * @description: 移除某一行
     * @param {*}
     */
    removeRow(row) {
      let index = this.form.validateParam.indexOf(row);
      if (index !== -1) {
        this.form.validateParam.splice(index, 1);
      }
    },
    /**
     * @description: 保存发布
     * @param {*}
     */
    handlePublish() {
      if (!this.form.validateParam.length) {
        this.$message.closeAll();
        this.$message({
          type: "warning",
          message: "请先添加公式配置",
        });
        return;
      }
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 两个评价对象级别不能相同
          if (this.form.validateParam.length > 1) {
            const ids = this.form.validateParam.map((it) => it.assessObjectId);
            const idsSet = new Set(ids);
            if (idsSet.size !== ids.length) {
              this.$message({
                type: "warning",
                message: "评价对象级别不能相同",
              });
              return;
            }
          }
          let { data } = await addFormula(this.form.validateParam);
          if (data.code === undefined) {
            this.$message({
              type: "success",
              message: "创建成功",
              onClose: () => {
                this.$router.back();
              },
            });
          }
        }
      });
    },
  },
  created() {
    this.getFormulaObjectSelect();
    this.getFormulaParamSelect();
    this.getExpressDetail();
  },
};
</script>
<style lang="less" scoped>
.part {
  position: relative;
  padding: 15px 66px 22px 8px;
  margin: 20px 40px 10px;
  min-height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  .btns {
    position: absolute;
    right: 21px;
    top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 32px;
    background: #ecf8ff;
    border-radius: 2px;
    .item {
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      cursor: pointer;
      &:first-child {
        margin-right: 12px;
      }
      .icon {
        color: #a5aeb3;
      }
    }
  }
}
</style>
