<!--
 * @Description: 组织机构维度
 * @Date: 2021-08-31 15:10:20
 * @LastEditTime: 2021-09-15 16:48:52
-->
<template>
  <div class="container">
    <el-button type="primary" v-if="hasShowInit" size="mini" @click="addInit">初始化组织机构维度</el-button>
    <el-table
      :data="tableData"
      style="width: 300px;"
      default-expand-all
      row-key="id"
      :tree-props="{ children: 'children' }"
      @row-contextmenu="contextmenuClick"
    >
      <el-table-column prop="label" label="组织机构维度"> </el-table-column>
    </el-table>

    <context-menu
      :isShow.sync="isContextShow"
      :eventTarget="eventTarget"
      @contextClick="contextClick"
    ></context-menu>
  </div>
</template>
<script>
import ContextMenu from "../component/ContextMenu";
import {
  getOrganizaList,
  addOrganiza,
  updateOrganiza,
  deleteOrganiza,
} from "@/api/modules/kpi";
export default {
  components: {
    ContextMenu,
  },
  data() {
    return {
      // 列表数据
      tableData: [],
      rowTarget: null,
      hasShowInit:false,
      // 鼠标对象
      eventTarget: null,
      isContextShow: false,
    };
  },
  methods: {
    /**
     * @description: 初始化节点
     * @param {*}
     */
    addInit(){
      this.rowTarget={
        parentId:""
      };
      this.addPoint({ key:"sibling", label: "初始化初始化组织机构维度"});
    },
    /**
     * @description: 获取场景列表
     * @param {*}
     */
    async getOrganizaList() {
      let { data } = await getOrganizaList();
      if (data.code === undefined) {
        if(data.length==0){
          this.hasShowInit=true;
        }else{
          this.hasShowInit=false;
        }
        this.tableData = [...data];
      }
    },
    /**
     * @description: 右键弹出菜单
     * @param {*}
     */
    contextmenuClick(row, column, event) {
      this.isContextShow = false;
      event.preventDefault();
      this.isContextShow = true;
      this.eventTarget = event;

      this.rowTarget = row;
    },
    /**
     * @description: 处理右键 行点击对应事件
     * @param {*} row 点击的事件类型
     */
    contextClick(row) {
      switch (row.key) {
        case "append":
          this.addPoint({...row});
          break;
        case "sibling":
          this.addPoint({...row});
          break;
        case "update":
          this.updatePoint();
          break;
        case "delete":
          this.deletePoint();
          break;
      }
    },
    /**
     * @description: 添加节点
     * @param {*} label 提示信息
     */
    addPoint({key, label}) {
      this.$prompt("请输入维度名称", "添加节点", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4e00-\u9fa5\da-zA-Z-]{0,20}$/,
        inputErrorMessage: "不能包含特殊字符，长度为20位",
      })
        .then(async ({ value }) => {
          let { data } = await addOrganiza({
            name: value,
            parentId:
              key === "append" ? this.rowTarget.id : this.rowTarget.parentId,
          });
          if (data.code == undefined) {
            this.getOrganizaList();
            this.$message({
              type: "success",
              message: `${label}成功`,
            });
            this.isContextShow = false;
          }
        })
        .catch(() => {
          this.isContextShow = false;
        });
    },
    /**
     * @description: 修改节点
     * @param {*}
     */
    updatePoint() {
      this.$prompt("请修改维度名称", "修改节点", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.rowTarget.label,
        inputPattern: /^[\u4e00-\u9fa5\da-zA-Z-]{0,20}$/,
        inputErrorMessage: "不能包含特殊字符，长度为20位",
      })
        .then(async ({ value }) => {
          let { data } = await updateOrganiza({
            name: value,
            id: this.rowTarget.id,
            levelId: this.rowTarget.id,
          });
          if (data.code == undefined) {
            this.getOrganizaList();
            this.$message({
              type: "success",
              message: `编辑成功`,
            });
            this.isContextShow = false;
          }
        })
        .catch(() => {
          this.isContextShow = false;
        });
    },
    /**
     * @description: s删除节点
     * @param {*}
     */
    deletePoint() {
      this.$confirm("是否确认删除节点?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let { data } = await deleteOrganiza(this.rowTarget.id);
        if (data.code === undefined) {
          this.getOrganizaList();
          this.isContextShow = false;
          this.$message({
            type: "success",
            message: "删除成功",
          });
        }
      }).catch(() => {
          this.isContextShow = false;
        });
    },
  },
  created() {
    this.getOrganizaList();
  },
};
</script>
<style lang="less" scoped>
  .container {
    padding: 40px;
  }
</style>
