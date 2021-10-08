<!-- 生产监控车辆管理-车辆类型 -->
<template>
  <div class="carRelation">
       <el-form :model="formInline" class="form">
                <el-row> <el-col :span="5">
                         <el-form-item label="车辆类型">
                            <el-input v-model="formInline.name"
                                      style="width: 160px"/></el-form-item></el-col>
                        <el-col :span="5">
                            <el-form-item label="类型编码">
                            <el-input v-model="formInline.code"
                                      style="width: 160px"/></el-form-item></el-col>
                        <el-col :span="5">
                          <el-button type="primary" @click="queryList">搜索</el-button>
                          <el-button @click="onSubmit">新增</el-button></el-col></el-row></el-form>
        <tableCom :table-data="tableData"
                  :column-data="tbColumnCon"
                  :current.sync="pagination.current"
                  :size.sync="pagination.size"
                  :total-count="pagination.totalCount"
                  :columnCheck="true"
                  :show-pagination="true"
                  @query-data="queryList">
                  <el-table-column slot="column3"
                                  slot-scope="row"
                                  :label="row.title"
                                  :width="row.width"
                                  :prop="row.field"
                                  :min-width="row.minWidth"
                                  sortable>
                  <template slot-scope="scoped">
                    <div class="operation">
                      <p @click="openhandle(scoped.row)">编辑</p>
                      <p @click="opendel(scoped.row)">删除</p>
                    </div></template></el-table-column></tableCom>
      <addOrEdit ref="addOrEdit"></addOrEdit>
      <del-modal ref="delModal" @confirm="delConfirm"></del-modal>
  </div>
</template>

<script>
import tableCom from "@/components/tableCom"; 
import delModal from "@/components/delModal";
import { carOrganizeCompanysPage,carOrganizeCompanysDel } from "@/api/modules/carManagement";
import addOrEdit from "../addOrEdit";
import { tbColumnCon } from "./config";
export default {
  name: "carRelation",
  components: {
    tableCom,
    addOrEdit,
    delModal
  },
  data() {
    return {
      //表单信息
      formInline: {
        name: "",
        code: "",
      },
      //表头数据
      tbColumnCon,
      //表格数据
      tableData: [],
      // 分页参数
      pagination: {
        size: 10,
        current: 1,
        totalCount: 0,
      },
    };
  },
  created() {},
  mounted() {
    this.queryList();
  },
  methods: {
    onSubmit() {
       this.$refs.addOrEdit.show()
    },
    formatter(row, column) {
      return row.address;
    },
    //车辆类型处理
    openhandle (data) {
       this.$refs.addOrEdit.show(data)
    },
    //车辆类型删除
    opendel (data) {
       this.$refs.delModal.show(data)
    },
    //确认删除
    async delConfirm (data) {
      console.log('res',data)
      let res = await carOrganizeCompanysDel(data);
      console.log('res',res)
      if (res.status === 204) {
        this.queryList();
      } else {
        this.$Message.error('删除失败');
      }
    },
    //查询列表
    async queryList() {
      let params = {
        ...this.formInline,
        current: this.pagination.current - 1,
        size: this.pagination.size,
        tenantId:0
      };
      let res = await carOrganizeCompanysPage(params);
      this.tableData = res.data.content || [];
      this.pagination.totalCount = res.data.numberOfElements;
    }
  },
};
</script>

<style lang="less" scoped>
.carRelation {
  min-width: calc(100vh - 300px);
  padding-right: 30px;
  padding-left: 30px;
  .form {
    padding-top: 30px;
  }
  .operation {
    display: flex;
    color: #409eff;
    p{
      margin-right: 10px;
    }
  }
}
</style>
