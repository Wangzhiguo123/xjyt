<!--
        参数配置==>
            1、table-data: [],                     表格数据
            2、column-data: [],                    表头数据
            3、current: 1,                         当前页
            4、size: 10,                           每页长度
            5、total-count: 0,                     总条数
            6、show-pagination: true,              是否分页
            7、@query-data: function,              初始化查询
            8、columnCheck: false,                 是否多选
            9、border: true,                      是否边框
            10、autoQueryFirst: true,             是否需要初始化查询

        返回事件判断==>
            1、selection-change:                    选中行改变
            2、sort-change:                         排序改变
            3、 query-data:                         初始化查询
        案例==》
          <tableCom
            :table-data="tableData"
            :column-data="tbColumnCon"
            style="width: 900px"
            :current.sync="pagination.current"
            :size.sync="pagination.size"
            :total-count="pagination.totalCount"
            :columnCheck="true"
            :show-pagination="true"
            @query-data="queryList"
          >
-->
<template>
  <div class="tableCom">
    <el-table
      v-loading="loading"
      :ref="_ref"
      :data="tableData"
      :border="border"
      :row-key="getKeys"
      class="table"
      :sortable="true"
      @selection-change="handleSelectionChange"
      :default-sort="defaultSort"
      @sort-change="handleSortChanged"
      :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
      :cell-style="cellStyle"
      @row-click="handleRowClick"
    >
      <!-- 多选  -->
      <el-table-column
        v-if="columnCheck"
        reserve-selection
        type="selection"
        fixed="left"
        :selectable="selectable"
      >
      </el-table-column>
      <template v-for="(item, index) in columnData">
        <slot
          :name="'column' + index"
          :index="index"
          :field="item.field"
          :title="item.title"
          :width="item.width"
        >
          <!--普通列-->
          <el-table-column
            :sortable="sortable"
            :label="item.title"
            :prop="item.field"
            show-overflow-tooltip
            :key="index"
            :width="item.width"
            :fixed="item.fixed"
            :min-width="getColumnMinWidth(item)"
          >
          </el-table-column>
        </slot>
      </template>
    </el-table>
    <section>
      <div class="pagination" v-if="showPagination && tableData.length > 0">
        <el-pagination
          style="margin-top: 30px"
          :current-page="current"
          :layout="pageLayout.pageLayout"
          background
          :page-size="size"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          prev-text="上一页"
          next-text="下一页"
        >
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    "_ref":{
      type: String
    },
    //表格数据
    "table-data": {
      type: Array,
      default() {
        return [];
      },
    },
    //表头配置
    "column-data": {
      type: [Object, Array],
      default() {
        return {};
      },
    },
    //是否开启分页
    "show-pagination": {
      type: Boolean,
      default: true,
    },
    //总共条数
    "total-count": {
      type: Number,
      default: 0,
    },
    //页码
    current: {
      type: Number,
      default: 1,
    },
    //每页条数
    size: {
      type: Number,
      default: 10,
    },
    //默认分页参数
    "default-page-layout": {
      type: String,
      defaut: "",
    },
    //是否开启边框
    border: {
      type: Boolean,
      default: true,
    },
    //是否展示多选
    "column-check": {
      type: Boolean,
      defaut: false,
    },
    //表格的默认排序的列、顺序 {prop: '', order: 'ascending'}
    "default-sort": {
      type: Object,
    },
    //表格的默认排序的列、顺序 {prop: '', order: 'ascending'}
    sortable: {
      type: Boolean,
      defaut: true,
    },
    //第一次需要自动查询接口，
    "auto-query-first": {
      type: Boolean,
      default: true,
    },
    //表格选择框是否禁用
    selectable: {
      type: Function,
      default() {
        return function () {
          return true;
        };
        // 复选框是否可点
        // :selectable='selectable'
        // selectable (row) {
        //   return row.field === 判断条件;
        // }
      },
    },
    // 加载中
    loading: {
      type: Boolean,
      default: false,
    },
    // 记录选中项
    getKeys: {
      type: Function | String,
      default() {
        return new Date() + ((Math.random() * 1000).toFixed(0) + "");
      },
    },
    // 单元格样式
    cellStyle: {
      type: Function | Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      pageLayout: {
        //每页大小配置
        pageSizeConfig: [5, 10, 20, 50],
        //默认每页大小
        pageDefaultSize: 10,
        //分页功能配置
        pageLayout: " prev, pager, next,total, jumper",
      },
    };
  },
  created() {
    if (this.autoQueryFirst) {
      this.queryList();
    }
  },
  mounted() {
    if (this.tableData.length && this.showPagination) {
      document.getElementsByClassName(
        "el-pagination__jump"
      )[0].childNodes[0].nodeValue = "跳转到";
    }
  },
  methods: {
    /**
     * @description: 清空选择
     * @param {*}
     */    
    clearSelection(){
      this.$refs[this._ref].clearSelection();
    },
    /**
     * 获取表格最小宽度
     * @param columnData
     */
    getColumnMinWidth(columnData) {
      if (columnData.enMinWidth) {
        return columnData.enMinWidth;
      } else {
        return columnData.minWidth;
      }
    },
    /**
     * 每页条数改变
     * @param size
     */
    handleSizeChange(val) {
      this.size = val;
      this.$emit("update:current", val);
      this.queryList();
    },
    /**
     * 当前页改变
     * @param size
     */
    handleCurrentChange(val) {
      this.$emit("update:current", val);
      this.queryList();
    },
    /**
     * 多选框选中状态改变
     * @param data
     */
    handleSelectionChange(data) {
      this.$emit("selection-change", data);
    },
    /**
     * 排序改变
     * @param data
     */
    handleSortChanged(data) {
      this.$emit("sort-change", data);
    },
    /**
     * 排序改变
     * @param data
     */
    handleRowClick(data) {
      this.$emit("row-click", data);
    },
    /**
     * 触发查询数据的方法
     */
    queryList() {
      this.$emit("query-data", {
        current: this.current,
        size: this.showPagination ? this.size : this.maxSize,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tableCom {
  .table {
    position: relative;
  }
  .pagination {
    position: relative;
    right: 0;
  }
}
/deep/.el-table th.gutter {
  display: table-cell !important;
}

/deep/.el-table colgroup.gutter {
  display: table-cell !important;
}
/deep/ .el-pagination {
  text-align: right;
}
/deep/.el-pagination span:not([class*="suffix"]) {
  min-width: 72px;
  // border: 1px solid #b5bdcc;
  // border-radius: 4px;
  // .btn-next,.btn-prev,
}
/deep/.el-pager li {
  color: #b5bdcc !important;
  border: 1px solid #b5bdcc;
  border-radius: 4px !important;
}
/deep/.el-pager li.active + li {
  border-left: 1px solid #b5bdcc;
}
/deep/.el-pager li:not(.disabled).active {
  border: none;
  color: #fff !important;
}
</style>
