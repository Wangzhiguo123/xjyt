<!--
 * @Description: 新增指标节点
 * @Date: 2021-09-02 15:40:34
 * @LastEditTime: 2021-09-07 17:49:39
-->
<template>
  <div>
    <!-- 指标信息 -->
    <el-table :data="expressTreeList" default-expand-all row-key="id" border :tree-props="{ children: 'children' }"
      @row-contextmenu="contextmenuClick">
      <el-table-column prop="name" label="指标"> </el-table-column>
      <el-table-column prop="isLast" label="是否末级指标">
        <template slot-scope="scoped">
          {{ scoped.row.isLast === 1 ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column prop="instruction" label="指标业务说明">
      </el-table-column>
      <el-table-column prop="statisticalRemark" label="指标统计方法">
      </el-table-column>
      <el-table-column prop="evaluationRemark" label="指标评价标准">
      </el-table-column>
      <el-table-column prop="" label="指标公式设置">
        <template slot-scope="scoped">
          <el-button v-if="scoped.row.isLast==1" type="text" @click="checkExpress(scoped.row)">查看</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="weightScore" label="权重">
        <template>
          <el-input size="mini" type="text"></el-input>
        </template>
      </el-table-column> -->
      <el-table-column prop="weightScore" label="权重">
        <template slot-scope="scoped">
          <div v-if="!hasConfirm" style="display:flex;align-items: center;">
            <el-input-number :disabled="scoped.row.isLoading" style="width:100%" controls-position="right" :min="0"
              size="mini" :controls="false" v-model="scoped.row.weightScore" :precision="0" :step="1" :max="100"
              @blur="changeScope(scoped.row)">
            </el-input-number>
            <span>%</span>
          </div>
          <div v-else style="text-align: center;">{{(scoped.row.weightScore||0)+'%'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="baseScore" label="基础分">
        <template slot-scope="scoped">
          <el-input-number :disabled="scoped.row.isLoading" v-if="!hasConfirm" style="width:100%"
            controls-position="right" :min="0" size="mini" :controls="false" v-model="scoped.row.baseScore"
            :precision="1" :step="1" :max="99999999" @blur="changeScope(scoped.row)">
          </el-input-number>
          <div v-else style="text-align: center;">{{(scoped.row.baseScore||0)}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="baseScore" label="基础分">
        <template>
          <el-input size="mini" type="text"></el-input>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 节点操作弹窗 -->
    <el-dialog :title="nodeTitle" :visible="isNodeShow" @close="handleClose">
      <el-form :model="form" :rules="formRules" ref="form" label-width="120px">
        <el-form-item label="是否末级指标" prop="isLast">
          <el-radio-group v-model="form.isLast">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="form.isLast === 1">
          <el-form-item label="指标名称" prop="name">
            <el-input v-model="form.name" size="mini" disabled type="text" style="width: 300px" placeholder="指标名称">
            </el-input>
            <el-button type="primary" plain size="mini" style="margin-left: 8px" @click="handleExpressSelectBtn">选择指标库指标
            </el-button>
          </el-form-item>
          <el-form-item label="指标业务说明" prop="instruction">
            <el-input v-model="form.instruction" type="textarea" disabled autocomplete="off" maxlength="500" size="mini"
              placeholder="指标说明"></el-input>
          </el-form-item>
          <el-form-item label="统计方法" prop="statisticalRemark">
            <el-input v-model="form.statisticalRemark" type="textarea" autocomplete="off" maxlength="500" size="mini"
              placeholder="请输入统计方法"></el-input>
          </el-form-item>
          <el-form-item label="评价标准" prop="evaluationRemark">
            <el-input v-model="form.evaluationRemark" type="textarea" autocomplete="off" maxlength="500" size="mini"
              placeholder="请输入评价标准"></el-input>
          </el-form-item>
        </template>

        <el-form-item v-else label="指标名称" prop="name">
          <el-input v-model="form.name" size="mini" type="text" :maxlength="20" style="width: 300px" placeholder="指标名称">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 指标库弹窗 -->
    <el-dialog title="选择指标" :visible.sync="isExpressShow" @close="handleCancelExpress">
      <v-table style="margin-top: 15px" ref="expressTable" _ref="expressTable" :table-data="expressSelectList"
        :column-data="columnData" :current.sync="listQuery.page" :total-count="expressSelectList.length" :show-pagination="true"
        :auto-query-first="false" :column-check="true" @selection-change="selectionChange">
      </v-table>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCancelExpress">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleExpressConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 节点操作菜单 -->
    <context-menu :isShow.sync="isContextShow" :eventTarget="eventTarget" @contextClick="contextClickClallback"
                v-if="$route.name!=='modelDetail'">
    </context-menu>
  </div>
</template>
<script>
  import VTable from "@/components/tableCom";
  import ContextMenu from "../dimensionManage/component/ContextMenu";

  import {
    getModelExpressList,
    getModelExpressSelectList,
    addModelNode,
    deleteModelNode,
    updateModelNode,
    updateBaseAndWeightScore
  } from "@/api/modules/kpi";

  export default {
    props: {
      // 模型id 查询关联可选择指标
      modelId: {
        type: String,
        default: "",
      },
      updateId: {
        type: String,
      },
      hasConfirm:{
        type:Boolean,
        default:false
      }
    },
    components: {
      VTable,
      ContextMenu,
    },
    data() {
      return {
        addKey: 0,
        form: {
          isLast: 1,
          indexId: "", // 指标id
          name: "", // 指标名称
          instruction: "", // 指标说明
          statisticalRemark: "", // 统计方法
          evaluationRemark: "", // 评价标准
        },
        formRules: {
          isLast: [{
            required: true,
            message: "请选择指标类型",
            trigger: "change",
          }, ],
          name: [{
            required: true,
            message: "请输入名称",
            trigger: "blur",
          }, ],
          statisticalRemark: [{
            required: true,
            message: "请输入统计方法",
            trigger: "blur",
          }, ],
          evaluationRemark: [{
            required: true,
            message: "请输入评价标准",
            trigger: "blur",
          }, ],
        },

        // 树形列表数据
        expressTreeList: [],
        // 节点操作弹窗
        isNodeShow: false,
        nodeTitle: "新增",
        nodeType: "",

        // 指标选择弹窗
        isExpressShow: false,
        // 指标选择集合
        expressSelectList: [],
        columnData: [{
            title: "指标名称",
            field: "name",
          },
          {
            title: "指标说明",
            field: "remark",
          },
        ],
        listQuery: {
          page: 1,
          size: 10,
        },
        total: 0,
        // 选择的指标
        selectedExpress: null,

        // 鼠标对象
        eventTarget: null,
        isContextShow: false,
        rowTarget: null,
      };
    },
    methods: {
      /**
       * @description: 保存指标数据
       * @param {*}
       */
      async changeScope(row) {
        row.isLoading = true;
        let {
          data
        } = await updateBaseAndWeightScore([{
          baseScore: row.baseScore,
          id: row.id,
          weightScore: row.weightScore,
        }]);
        if (data) {
          row.isLoading = false;
        }
      },
      /**
       * @description: 获取详情
       * @param {*}
       */
      async getExpressDetail() {
        let {
          data
        } = await getExpressDetail(this.updateId);
        if (data.code === undefined) {
          this.form = JSON.parse(JSON.stringify(data));
          this.getCommentDimensionSelect(data.assessObjectLevel);
        }
      },

      /**
       * @description: 获取指标选择按钮
       * @param {*}
       */
      handleExpressSelectBtn() {
        this.getModelExpressSelectList();
        this.isExpressShow = true;
      },
      /**
       * @description: 获取指标类型下拉
       * @param {*}
       */
      async getModelExpressList() {
        let {
          data
        } = await getModelExpressList(this.modelId);
        if (data.code === undefined) {
          let rev = (data) => {
            for (let i = 0, length = data.length; i < length; i++) {
              let currentNode = data[i];
              currentNode['isLoading'] = false;
              if (currentNode.children) {
                rev(currentNode.children);
              }
            }
          }
          rev(data);
          this.expressTreeList = [...data];
        }
      },
      /**
       * @description: 验证指标数据是否有效
       * @param {*}
       */
      validateScore() {
        let isValid=true;
        let nodeValidObj={valid:true,result:``};
        nodeValidObj=this.isValid(this.expressTreeList);
        if (!nodeValidObj.valid) {
          return nodeValidObj;
        }
        let rev = (data) => {
          if(!isValid)
          {
            return;
          }
          for (let i = 0, length = data.length; i < length; i++) {
            let currentNode = data[i];
            if (currentNode.children) {
              nodeValidObj=this.isValid(currentNode.children);
              if (!nodeValidObj.valid) {
                isValid=false;
                return false;
              }
              rev(currentNode.children);
            }
          }
        }
        rev(this.expressTreeList);

        return nodeValidObj;
      },
      /**
       * @description: 验证权重、基础分逻辑
       * @param {*}
       */
      isValid(rowArr) {
        let weightScore = 0;
        for (let index = 0; index < rowArr.length; index++) {
          const ele = rowArr[index];
          if (ele.baseScore === "" || ele.baseScore === undefined || ele.baseScore === null) {
            return {valid:false,result:`${ele.name}指标的基础分不能为空`};
          }
          if (ele.weightScore === "" || ele.weightScore === undefined || ele.weightScore === null) {
            return {valid:false,result:`${ele.name}指标的权重不能为空`};
          }
          weightScore += Number(ele.weightScore);
        }
        if (weightScore != 100) {
          return {valid:false,result:`${rowArr.map(x=>x.name+'指标').join('、')}的权重之和不等于100%`};
        } else {
          return {valid:true,result:``};
        }
      },
      /**
       * @description: 获取指标类型下拉
       * @param {*}
       */
      async getModelExpressSelectList() {
        let {
          data
        } = await getModelExpressSelectList(this.modelId);
        if (data.code === undefined) {
          this.expressSelectList = [...data];
        }
      },
      /**
       * @description: 指标选择事件
       * @param {*}
       */
      selectionChange(row) {
        this.selectedExpress = row;
      },
      /**
       * @description: 指标选择取消
       * @param {*}
       */
      handleCancelExpress() {
        this.isExpressShow = false;
        this.$refs.expressTable.clearSelection();
        this.selectedExpress = null;
      },
      /**
       * @description:  指标选择确定
       * @param {*}
       */
      handleExpressConfirm() {
        if (this.selectedExpress.length > 1) {
          this.$message.closeAll();
          this.$message({
            type: "warning",
            message: "请选择单一指标",
          });
          return;
        }
        if (this.selectedExpress instanceof Array) {
          this.form.indexId = this.selectedExpress[0].id;
          this.form.name = this.selectedExpress[0].name;
          this.form.instruction = this.selectedExpress[0].remark;
        }
        this.handleCancelExpress();
      },
      /**
       * @description: 节点操作弹窗操作确定
       * @param {*}
       */
      handleConfirm() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            // 编辑
            if (this.nodeTitle === "编辑") {
              // 节点有下级不允许编辑为末级
              if (this.rowTarget.children && this.rowTarget.children.length > 0 && this.form.isLast === 1) {
                this.$message({
                  type: "warning",
                  message: "节点有下级不允许编辑为末级",
                });
                return;
              }
              this.form.id = this.rowTarget.id;
              let {
                data
              } = await updateModelNode(this.form);
              if (data.code === undefined) {
                this.$message({
                  type: "success",
                  message: "修改成功",
                });
              }else{
                return;
              }
            } else {
              /*
               * 新增节点
               */
              this.form.modelId = this.modelId;
              // 添加当前级别上级id
              this.form.pid = this.nodeType == "sibling" ? (this.rowTarget.parentId == "0" ? "" : this.rowTarget
                  .parentId) : this.rowTarget ? this
                .rowTarget.id : "";
              let {
                data
              } = await addModelNode(this.form);
              if (data.code === undefined) {
                this.$message({
                  type: "success",
                  message: "添加成功",
                });
              }else{
                return;
              }
            }
            this.handleClose();
            this.getModelExpressList();
          }
        });
      },
      /**
       * @description: 关闭节点操作弹窗
       * @param {*}
       */
      handleClose() {
        this.form = {
          isLast: 1,
          indexId: "", // 指标id
          name: "", // 指标名称
          instruction: "", // 指标说明
          statisticalRemark: "", // 统计方法
          evaluationRemark: "", // 评价标准
        };
        this.$refs.form.resetFields();
        this.isNodeShow = false;
      },
      /**
       * @description: 右键弹出菜单
       * @param {*}
       */
      contextmenuClick(row, column, event) {
        event.preventDefault();
        if(this.hasConfirm){
          return;
        }
        this.isContextShow = false;
        this.isContextShow = true;
        this.eventTarget = event;

        this.rowTarget = row;
      },
      /**
       * @description: 处理右键 行点击对应事件
       * @param {*} row 点击的事件类型
       */
      contextClickClallback(row) {
        console.log(row);
        switch (row.key) {
          case "append":
            this.addPoint(row);
            break;
          case "sibling":
            this.addPoint(row);
            break;
          case "prev":
            this.addPoint(row);
            break;
          case "next":
            this.addPoint(row);
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
       * @param {*} msg 提示信息
       */
      addPoint(row) {
        if (row.key != "sibling") {
          if (this.rowTarget.isLast === 1) {
            this.$message.closeAll();
            this.$message({
              type: "warning",
              message: "只能对非末级指标进行添加节点操作",
            });
            return;
          }
        }
        this.nodeType = row.key;
        this.nodeTitle = row.label;
        this.isNodeShow = true;
        this.isContextShow = false;
      },
      /**
       * @description: 修改节点
       * @param {*}
       */
      updatePoint() {
        this.nodeTitle = "编辑";

        for (let [k, v] of Object.entries(this.rowTarget)) {
          if (this.form.hasOwnProperty(k)) {
            this.form[k] = v;
          }
        }

        this.isNodeShow = true;
        this.isContextShow = false;
      },
      /**
       * @description: 删除节点
       * @param {*}
       */
      deletePoint() {
        this.$confirm("是否确认删除节点?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          let {
            data
          } = await deleteModelNode(this.rowTarget.id);
          if (data.code === undefined) {
            this.$message({
              type: "success",
              message: "删除节点成功",
            });
            if(this.expressTreeList.length==1){
              this.$emit("refreshModel");
            }
            this.getModelExpressList();
            this.isContextShow = false;
          }
        }).catch(() => {
          this.isContextShow = false;
      });
      },
      /**
       * @description: 查看指标配置
       * @param {*}
       */
      checkExpress(row) {
        let routeData = this.$router.resolve({
          name: "expressConfig",
          query: {isView: true},
          params: {
            id: row.indexId,
            type:2 //1 编辑  2 详情   进行按钮显示判定
          }
        });
        window.open(routeData.href, '_blank')
      },
    },
    created() {
      this.getModelExpressList();
    },
  };
</script>
<style lang="less" scoped>
  /deep/th.el-table-column--selection>.cell {
    display: none !important;
  }
</style>
