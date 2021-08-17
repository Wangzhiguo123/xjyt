<template>
  <div>
    <!-- 搜索输入框 -->
    <div class="select_box" v-if="logs.orderType=='end'||logs.orderType=='repair'||logs.orderType=='My'">
    发起人&nbsp;&nbsp;&nbsp;<el-select class="selects" v-model="originator" clearable placeholder="请选择">
    <el-option
      v-for="item in logs.originator_options"
      :key="item.value"
      :label="item.label"
      :value="item.label">
    </el-option>
  </el-select>

    <span class="demonstration">时间&nbsp;&nbsp;&nbsp;</span>
    <el-date-picker
      class="times"
      v-model="the_time"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>

    类别&nbsp;&nbsp;&nbsp;<el-select class="selects" v-model="the_type" clearable placeholder="请选择">
    <el-option
      v-for="item in logs.type_options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
     等级&nbsp;&nbsp;&nbsp;<el-select class="selects" v-model="the_level" clearable placeholder="请选择">
    <el-option
      v-for="item in logs.level_options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
     标题&nbsp;&nbsp;&nbsp;<el-select class="selects" v-model="the_title" clearable placeholder="请选择">
    <el-option
      v-for="item in logs.title_options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <div class="sel_btn">
      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
    </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="table_list"
      :border="the_border"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- <template v-for="(item, index) in table_data">
		    	<el-table-column
          :key="index"
					:prop="item.name"
					:label="item.title"
					:align="item.align || 'center'"
					:show-overflow-tooltip="item.overHidden || true">
					<template slot-scope="scope">
			            <slot
			            	v-if="item.slot"
			            	:name="scope.column.property"
			            	:row="scope.row"
			            	:$index="scope.$index"
						/>
			            <span v-else>{{ scope.row[scope.column.property] }}</span> // 这里的property自己打印出来看看就明白了
					</template>
				</el-table-column>
			</template> -->
      <el-table-column v-if="select" type="selection" width="55">
      </el-table-column>
      <el-table-column
        v-for="item in table_data2"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        sortable
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column v-if="the_action" fixed="right" label="操作" width="100">
        <div slot-scope="adc">
          <!-- 我的工单 -->
          <el-button
            v-if="logs.edits && logs.orderType=='My'"
            type="text"
            size="small"
            @click="handleClick(adc.row, 3)"
            >编辑</el-button
          >
          <el-button
            v-if="logs.deletes && logs.orderType=='My'"
            type="text"
            size="small"
            @click.native.prevent="deleteRow(adc.$index, table_list, 5)"
            >删除</el-button
          >
          <!-- 待办工单 -->
          <el-button
            v-if="logs.solve && logs.orderType=='repair'"
            type="text"
            size="small"
            @click="handleClick(adc.row, 4)"
            >处理</el-button
          >
          <!-- 办结 -->
          <el-button
            v-if="logs.search && logs.orderType=='end'"
            type="text"
            size="small"
            @click="handleClick(adc.row, 1)"
            >查看</el-button
          >
          <el-button
            v-if="logs.submits && logs.orderType=='end'"
            type="text"
            size="small"
            @click="handleClick(adc.row, 2)"
            >评价</el-button
          >
        </div>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        :current-page.sync="currentPage"
        :page-size="every_page"
        layout="prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    logs: Object,
    table_data: [Array, String, Number, Object],
    table_data2: [Array, String, Number, Object],
    table_list: [Array, String, Number, Object],
    table_title: [Array, Object],
  },
  data() {
    return {

      originator:'',//发起人
      the_time:'',
      the_title:'',
      the_type:'',
      the_level:'',
      select: true, //多选
      the_action: true, //操作
      datas: 5,
      currentPage: 1,
      total: 0,
      every_page: 0,
      pageData: [],
      tableData: [],
      the_border: false,
    };
  },
  created() {
    // console.log(this.table_data)
    console.log(this.logs);
    this.tableData = this.table_data;
    this.total = this.logs.total ? this.logs.total : 0;
    this.every_page = this.logs.every_page ? this.logs.every_page : 10;
  },
  methods: {
    // 删除
    deleteRow(index, rows, actions) {
      console.log(index, actions);
      rows.splice(index, 1);
    },
    //   查看/评价/提交/修改
    handleClick(row, actions) {
      console.log(actions);
    },
    // 多选
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      // 每页xx条
      this.$emit("every_page", `${val}`);
      this.every_page = `${val}`;
    },
    handleCurrentChange(val) {
      // 当前页
      this.$emit("the_page", `${val}`, this.every_page);
    },
  },
};
</script>
<style scoped>
.the_tile{
    font-size: 18px;
    font-weight: bold;
    margin: 10px;
}
.select_box{
  margin: 20px;
}
.sel_btn{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.times{
  width: 200px;
}
.selects{
  width: 120px;
  margin-right: 10px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.block {
  margin-top: 10px;
}
</style>
