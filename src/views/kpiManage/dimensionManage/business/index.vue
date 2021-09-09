<!--
 * @Description: 业务分类
 * @Date: 2021-08-31 15:10:20
 * @LastEditTime: 2021-09-01 09:44:10
-->
<template>
  <div class="container">
    <el-button type="primary" size="mini" @click="btnAdd">新增</el-button>
    <v-table
      style="margin-top: 15px"
      :loading="loading"
      :table-data="tableData"
      :column-data="columnData"
      :current.sync="listQuery.page"
      :total-count="total"
      :show-pagination="false"
      :auto-query-first="false"
      @query-data="getBusinessList"
    >
      <el-table-column
        slot="column4"
        slot-scope="row"
        :label="row.title"
        :width="row.width"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="text" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </v-table>

    <!-- 新增编辑弹窗 -->
    <el-dialog
      :title="dialogType === 'add' ? '新增' : '编辑'"
      :visible.sync="isDialogShow"
    >
      <el-form :model="formParam" :rules="formRules" ref="formParam">
        <el-form-item label="编号" label-width="120px" prop="code">
          <el-input
            v-model="formParam.code"
            autocomplete="off"
            size="mini"
            placeholder="请输入编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="生产分类名称" label-width="120px" prop="name">
          <el-input
            v-model="formParam.name"
            autocomplete="off"
            size="mini"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleConfirm" size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VTable from "@/components/tableCom";

import {
  getBusinessList,
  addBusiness,
  updateBusiness,
  deleteBusiness,
} from "@/api/modules/kpi";
import { validateTitle, validateNum } from "@/utils/validate";

export default {
  components: {
    VTable,
  },
  data() {
    // 标题校验
    const validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入编号"));
      } else {
        if (validateNum(value)) {
          callback();
        } else {
          callback("编号只能为纯数字");
        }
      }
    };
    // 标题校验
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入分类名称"));
      } else {
        if (validateTitle(value)) {
          callback();
        } else {
          callback("名称输入格式不正确");
        }
      }
    };
    return {
      loading: false,
      tableData: [],
      columnData: [
        {
          title: "编号",
          field: "code",
        },
        {
          title: "生产分类名称",
          field: "name",
        },
        {
          title: "创建人",
          field: "",
        },
        {
          title: "创建时间",
          field: "creationDate",
        },
        {
          title: "操作",
          width: 150,
        },
      ],
      // 总条数
      total: 0,

      // 入参
      listQuery: {
        page: 1,
        size: 10,
      },

      isDialogShow: false,
      // 表格表头类型
      dialogType: "add",
      formParam: {
        code: "",
        name: "",
      },
      formRules: {
        code: [
          {
            required: true,
            message: "请输入编号",
            trigger: "blur",
          },
          {
            validator: validateCode,
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
          {
            validator: validateName,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    /**
     * @description: 获取列表数据
     * @param {*}
     */
    async getBusinessList() {
      let { data } = await getBusinessList(this.listQuery);
      if (data.code === undefined) {
        this.tableData = data;
      }
    },
    /**
     * @description: 新增
     * @param {*}
     */
    btnAdd() {
      this.dialogType = "add";
      this.isDialogShow = true;
    },
    /**
     * @description: 编辑数据
     * @param {*}
     */
    handleEdit(row) {
      this.formParam = Object.assign(this.formParam, {
        code: row.code,
        name: row.name,
        businessId: row.businessId,
      });
      this.isDialogShow = true;
      this.dialogType = "update";
    },
    /**
     * @description: 删除
     * @param {*}
     */
    handleDelete(row) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.formParam = Object.assign(this.formParam, {
          businessId: row.businessId,
        });
        let { data } = await deleteBusiness(this.formParam.businessId);
        if (data.code === undefined) {
          this.getBusinessList();
          this.$message({
            type: "success",
            message: "删除成功",
          });
        }
      });
    },
    /**
     * @description: 新增编辑确定
     * @param {*}
     */
    handleConfirm() {
      this.$refs.formParam.validate(async (valid) => {
        if (valid) {
          const apiArr = new Map([
            ["add", addBusiness],
            ["update", updateBusiness],
          ]);
          let { data } = await apiArr.get(this.dialogType)(this.formParam);
          if (data.code === undefined) {
            this.isDialogShow = false;
            this.getBusinessList();
            this.$message({
              type: "success",
              message: this.dialogType === "add" ? "新增成功" : "编辑成功",
            });
          }
        }
      });
    },
    /**
     * @description: 取消
     * @param {*}
     */
    handleCancel() {
      this.isDialogShow = false;
      this.formParam = {
        code: "",
        name: "",
      };
    },
  },
  created() {
    this.getBusinessList();
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 40px;
}
</style>
