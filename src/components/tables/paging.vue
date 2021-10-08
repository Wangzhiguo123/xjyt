<template>
  <div>
    <!-- 搜索输入框 -->
    <div
      v-if="
        logs.orderType == 'end' ||
        logs.orderType == 'dictionary' ||
        logs.orderType == 'My' ||
        logs.orderType == 'dictionaryDetail' ||
        logs.orderType == 'workBench' ||
        logs.orderType == 'workBenchDetails' ||
        logs.orderType == 'year'
      "
      class="select_box"
    >
      发起人&nbsp;&nbsp;&nbsp;<el-select
        v-model="originator"
        class="selects"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in logs.originator_options"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>

      <span class="demonstration">时间&nbsp;&nbsp;&nbsp;</span>
      <el-date-picker
        v-model="the_time"
        class="times"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>

      类别&nbsp;&nbsp;&nbsp;<el-select
        v-model="the_type"
        class="selects"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in logs.type_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      等级&nbsp;&nbsp;&nbsp;<el-select
        v-model="the_level"
        class="selects"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in logs.level_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      标题&nbsp;&nbsp;&nbsp;<el-select
        v-model="the_title"
        class="selects"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in logs.title_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="sel_btn">
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
        <el-button @click="openTC">新增</el-button>
      </div>
    </div>

    <!-- 单独的新增按钮 -->
    <div v-if="logs.orderType == 'flight'" class="sel_btn2">
      <!-- <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button> -->
      <el-button type="primary" @click="openTC">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="table_list"
      :border="the_border"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column v-if="select" type="selection" width="55">
      </el-table-column> -->
      <el-table-column
        v-for="item in table_data2"
        v-if="item.prop != 'users'"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        sortable
        show-overflow-tooltip
      >
      </el-table-column>
      <div v-if="logs.select">
        <el-table-column
          v-if="logs.select[1].users"
          fixed="right"
          label="班组成员"
          prop="users"
          width="120"
        >
          <template slot-scope="scopes">
            <div class="userbox">
              <span v-for="(item, index) in scopes.row.users" :key="index">{{
                item.userName
              }}</span>
            </div>
          </template>
        </el-table-column>
      </div>
      <el-table-column v-if="the_action" fixed="right" label="操作" width="140">
        <div slot-scope="adc">
          <el-button
            v-if="logs.edits && logs.orderType == 'My'"
            type="text"
            size="small"
            @click="handleClick(adc.row, 3)"
            >审核</el-button
          >
          <el-button
            v-if="logs.solve"
            type="text"
            size="small"
            @click="handleClick(adc.row, 4)"
            >编辑</el-button
          >
          <el-button
            v-if="logs.deletes"
            type="text"
            size="small"
            @click.native.prevent="deleteRow(adc.$index, table_list, 5)"
            >删除</el-button
          >
          <el-button
            v-if="
              (logs.search && logs.orderType == 'end') ||
              logs.orderType == 'dictionary' ||
              logs.orderType == 'workBench'
            "
            type="text"
            size="small"
            @click="handleClick(adc.row, 1)"
            >查看</el-button
          >
          <el-button
            v-if="logs.submits && logs.orderType == 'end'"
            type="text"
            size="small"
            @click="handleClick(adc.row, 2)"
            >评价</el-button
          >
        </div>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- :page-size="logs.every_page" -->
    <div class="block">
      <el-pagination
        background
        :current-page.sync="logs.the_page"
        :page-size="parseInt(logs.every_page)"
        layout="prev, pager, next, jumper"
        :total="parseInt(logs.total)"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- 用于新增 -->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div v-if="logs.orderType == 'dictionary'">
        <div class="drawer_input">
          <div>Code:</div>
          <el-input v-model="add.code" placeholder="请输入内容" clearable>
          </el-input>
        </div>

        <div class="drawer_input">
          <div>Name:</div>
          <el-input v-model="add.name" placeholder="请输入内容" clearable>
          </el-input>
        </div>
        <div class="drawer_input">
          <div>ParentId:</div>
          <el-input v-model="add.parentId" placeholder="请输入内容" clearable>
          </el-input>
        </div>
        <div class="drawer_input">
          <div>TypeId:</div>
          <el-input
            v-model="add.typeId"
            placeholder="请输入内容"
            :disabled="edits"
            clearable
          >
          </el-input>
        </div>
      </div>
      <div v-if="logs.orderType == 'dictionaryDetail'">
        <div class="drawer_input">
          <div>Value:</div>
          <el-input v-model="detail.value" placeholder="请输入内容" clearable>
          </el-input>
        </div>
        <div class="drawer_input">
          <div>Code:</div>
          <el-input v-model="detail.code" placeholder="请输入内容" clearable>
          </el-input>
        </div>
      </div>
      <div v-if="logs.orderType == 'workBench'">
        <el-upload
          ref="upload"
          style="margin: 20px 10px"
          class="upload-demo"
          action=""
          :on-change="fileChange"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
          <div></div>
        </el-upload>
        <div class="drawer_input">
          <div>Name:</div>
          <el-input v-model="work.name" placeholder="请输入内容" clearable>
          </el-input>
        </div>
        <div class="drawer_input">
          <div>parentId:</div>
          <el-input v-model="work.parentId" placeholder="请输入内容" clearable>
          </el-input>
        </div>
        <div class="drawer_input">
          <div>statusId:</div>
          <el-input v-model="work.statusId" placeholder="请输入内容" clearable>
          </el-input>
        </div>
        <div class="drawer_input">
          <div>organizeId:</div>
          <!-- v-model="work.organizeId" -->
          <el-select v-model="value" style="width: 100%" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div v-if="logs.orderType == 'workBenchDetails'">
        <div class="drawer_input">
          <div>Name:</div>
          <el-input
            v-model="workdetails.name"
            placeholder="请输入内容"
            clearable
          >
          </el-input>
        </div>
        <div class="drawer_input">
          <div>statusId:</div>
          <el-input
            v-model="workdetails.statusId"
            placeholder="请输入内容"
            clearable
          >
          </el-input>
        </div>
        <div class="drawer_input">
          <div>iconPath:</div>
          <el-input
            v-model="workdetails.iconPath"
            placeholder="请输入内容"
            clearable
          >
          </el-input>
        </div>
      </div>
      <div v-if="logs.orderType == 'year'">
        <div class="drawer_input">
          <div>samplingFile:</div>
          <!-- 上传图片 -->
          <el-upload
            action=""
            list-type="picture-card"
            :auto-upload="false"
            :on-change="fileChange"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <!-- <el-upload
  class="upload-demo"
  ref="upload"
  action=""
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload> -->
        </div>
        <div class="drawer_input">
          <div>samplingFileDetails:</div>
          <el-input
            v-model="addData.samplingFileDetails"
            placeholder="请输入内容"
            clearable
          >
          </el-input>
        </div>
        <div class="drawer_input">
          <div>samplingTitle:</div>
          <el-input
            v-model="addData.samplingTitle"
            placeholder="请输入内容"
            clearable
          >
          </el-input>
        </div>
        <div class="drawer_input">
          <div>samplingYear:</div>
          <el-input
            v-model="addData.samplingYear"
            placeholder="请输入内容"
            clearable
          >
          </el-input>
        </div>
      </div>
      <div v-if="logs.orderType == 'flight'">
        <div
          v-for="(item, index) in logs.select"
          :key="index"
          class="drawer_input"
        >
          <div style="width: 50%">{{ item.title }}:</div>
          <el-input
            v-if="item.type == 'input'"
            v-model="logs.newdata[item.title]"
            placeholder="请输入内容"
            clearable
          >
          </el-input>
          <div v-if="item.type == 'box'" class="the_boxs">
            <!-- item.users -->
            <div
              v-for="(vega, index) in logs.newdata.users"
              v-if="item.type == 'box'"
              :key="index"
              style="
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <el-input
                v-model="logs.newdata.users[index].userName"
                style="margin: 10px 0"
                placeholder="请输入名字"
                clearable
              >
              </el-input>
              <div class="actionsBox">
                <div @click="deletes(item, index)">删除</div>
              </div>
            </div>
          </div>
          <el-time-picker
            v-if="item.type == 'time'"
            v-model="logs.newdata[item.title]"
            style="width: 100%"
            value-format="HH:MM:ss"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59',
            }"
            placeholder="请填写时间"
          >
          </el-time-picker>
        </div>
      </div>
      <!-- <el-button v-if="logs.select[1].users" style="margin:30px" @click="addMore">新增</el-button> -->
      <el-button type="primary" style="margin: 30px" @click="add_submit"
        >提交</el-button
      >
    </el-drawer>
  </div>
</template>
<script>
// handleParam
import { handleParam } from "@/utils/index";
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
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      value: "",
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false, //上传图片
      add: {
        parentId: "",
        typeId: "",
        name: "",
        code: "",
      },
      detail: {
        value: "",
        code: "",
        typeId: this.$route.query.typeId,
      },
      work: {
        iconPath: [],
        name: "",
        parentId: "",
        statusId: "",
      },
      workdetails: {
        docId: "",
        name: "",
        statusId: "",
        iconPath: "",
      },
      addData: {
        file: [],
        samplingFileDetails: "",
        samplingId: "",
      },
      theKey: null, //键值
      edits: false, //编辑？
      drawer: false,
      originator: "", //发起人
      the_time: "",
      the_title: "",
      the_type: "",
      the_level: "",
      select: true, //多选
      the_action: true, //操作
      datas: 5,
      currentPage: 1,
      total: 0,
      every_page: 0,
      pageData: [],
      tableData: [],
      the_border: false,
      loading: true,
      theTypeid: "",
    };
  },
  watch: {
    table_list: function (news, old) {
      // console.log('发生改变',news)
      this.getData(news);
    },
    "logs.": function (news, olds) {
      console.log("发生改变", news);
    },
  },
  created() {
    this.tableData = this.table_data;
    // console.log(this.tableData)
    this.total = this.logs.total ? this.logs.total : 0;
  },
  methods: {
    submitUpload() {
      console.log(this.fileList);
      // this.$refs.upload.submit();
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList);
    },
    handleRemove(file) {
      console.log(file);
      // 区分文件对象和json数据
      let idx = -1;
      // if (file.uid) {
      //   idx = this.fileList.findIndex(
      //     (it) => it.attachmentId === row.attachmentId
      //   );
      // } else
      // console.log(this.fileList)
      // return
      // console.log(file)
      if (this.fileList.length > 0) {
        idx = this.fileList.findIndex((it) => it.uid === file.uid);
      }
      console.log(idx);
      if (idx > -1) {
        this.fileList.splice(idx, 1);
      }
      // 若更新时 需要添加额外参数
      // if (this.savedArticleIdList.length) {
      //   if (
      //     !this.updateParams.needDeleteArticleAttachmentIdList.includes(
      //       row.attachmentId
      //     )
      //   ) {
      //     this.updateParams.needDeleteArticleAttachmentIdList.push(
      //       row.attachmentId
      //     );
      //   }
      // }
      console.log(this.fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    fileChange(file) {
      // console.log(file.raw)
      // this.fileList.push({
      //   attachmentId: "",
      //   attachmentSizeAssemble: formatSizeUnits(file.size),
      //   attachmentRealName: file.name,
      //   file: file.raw,
      // });
      // this.formParams.articleAttachmentList = [
      //   ...this.fileList.map((it) => it.file).filter((it) => it),
      // ];
      if (this.logs.orderType == "workBench") {
        let formData = new FormData();
        let thedata = {
          file: [],
        };
        thedata.file.push(file.raw);
        //  console.log(file.raw)
        handleParam(thedata, formData);
        // console.log(formDatas)
        // return
        this.$emit("Uploads", formData);
        // this.work.iconPath.push(file.raw)
      } else {
        this.addData.file.push(file.raw);
      }
    }, //上传图片
    //打开新增弹窗
    openTC() {
      this.edits = false;
      this.add = {
        parentId: "",
        typeId: "",
        name: "",
        code: "",
      };
      this.workdetails = {
        // docId:'',
        name: "",
        statusId: "",
        iconPath: "",
      };
      // for(let value in this.logs.newdata){
      //   delete this.logs.newdata[value]
      // }
      // console.log(this.logs.newdata)
      for (let key in this.logs.newdata) {
        this.logs.newdata[key] = "";
        if (key == "users") {
          this.logs.newdata[key] = [
            {
              userId: 8,
              userName: "",
            },
          ];
        }
      }
      // console.log(this.logs.newdata)
      // console.log(this.logs.newdata.users[0])
      // this.theKey = Object.keys(this.logs.newdata.users[0])
      // console.log(Object.keys(this.logs.newdata.users[0]))
      // console.log(this.logs.newdata.users)
      this.drawer = true;
      // this.add
    },
    // 删除用户
    deletes(index, id) {
      // console.log(this.logs.select[1].users)
      // return
      if (this.logs.select[1].users.length > 1) {
        this.logs.select[1].users.splice(id, 1);
      } else {
        this.$message({
          message: "最后一项不能删除哦！",
          duration: "1000",
          type: "warning",
        });
      }
      if (this.logs.newdata.users.length > 1) {
        this.logs.newdata.users.splice(id, 1);
      } else {
        this.$message({
          message: "最后一项不能删除哦！",
          duration: "1000",
          type: "warning",
        });
      }
    },
    // 添加用户
    addMore() {
      this.logs.select[1].users.push({
        userId: "",
        userName: "",
      });
      this.logs.newdata.users.push({
        userId: "",
        userName: "",
      });
      console.log(this.logs.newdata.users);
    },
    // 上传文件
    submitUpload(file) {},
    // 新增/编辑
    add_submit() {
      // console.log(this.logs.newdata)
      if (!this.edits) {
        if (this.logs.orderType == "dictionary") {
          this.$emit("actions", "dictionary_add", this.add);
        } else if (this.logs.orderType == "workBench") {
          console.log(this.work);
          return;
          let formData = new FormData();
          handleParam(this.work, formData);
          // return
          this.$emit("actions", "dictionary_add", formData);
        } else if (this.logs.orderType == "workBenchDetails") {
          // console.log(this.$route.query.typeId)
          this.workdetails.typeId = this.$route.query.typeId;
          // console.log(this.workdetails)
          this.$emit("actions", "dictionary_add", this.workdetails);
        } else if (this.logs.orderType == "year") {
          // this.addData.samplingFile=this.fileList

          console.log(this.addData);
          //  return
          let formData = new FormData();
          handleParam(this.addData, formData);
          this.$emit("actions", "dictionary_add", formData);
        } else if (this.logs.orderType == "flight") {
          console.log(this.logs.newdata);
          //  return
          this.$emit("actions", "dictionary_add", this.logs.newdata);
        } else {
          this.$emit("actions", "dictionary_add", this.detail);
        }
      }
      if (this.edits) {
        if (this.logs.orderType == "dictionary") {
          this.$emit("actions", "dictionary_edit", this.add);
        } else if (this.logs.orderType == "workBench") {
          this.work.typeId = this.theTypeid;
          this.$emit("actions", "dictionary_edit", this.work);
        } else if (this.logs.orderType == "workBenchDetails") {
          this.workdetails.typeId = this.theTypeid;
          this.$emit("actions", "dictionary_edit", this.workdetails);
        } else if (this.logs.orderType == "year") {
          this.$emit("actions", "dictionary_edit", this.addData);
        } else if (this.logs.orderType == "flight") {
          console.log(this.logs.newdata);
          // return
          this.$emit("actions", "dictionary_edit", this.logs.newdata);
        } else {
          this.$emit("actions", "dictionary_edit", this.detail);
        }
      }
    },
    the_actions(data, rows, index) {
      if (data == "add") {
        this.drawer = false;
      } else if (data == "del") {
        console.log(rows);
        rows.splice(index, 1);
      }
      // console.log('ok',data)
    },
    getData(data) {
      this.table_list = data;
      console.log(this.table_list);
      // console.log(this.table_data2)
      this.loading = false;
    },
    // 删除
    deleteRow(index, rows, actions) {
      // console.log(index,rows)
      // return
      this.$emit("actions", "dictionary_del", rows, index);
    },
    //   查看/评价/提交/修改
    handleClick(row, actions) {
      // console.log(row)
      // console.log(this.logs.newdata)
      this.theTypeid = row.typeId;
      // console.log(row,actions);
      if (actions == 3) {
        // this.$router.push({path:'/work_order',query: {type:'tcd'}})
      } else if (actions == 1) {
        //查看
        if (this.logs.orderType == "dictionary") {
          this.$router.push({ path: "transferredOrder/details", query: row });
        } else if (this.logs.orderType == "workBench") {
          this.$router.push({ path: "/workbenchDetails", query: row });
        }
      } else if (actions == 4) {
        console.log("编辑前", row);
        this.edits = true;
        this.drawer = true;
        // console.log(row,actions)
        this.add.parentId = row.parentId;
        this.add.typeId = row.typeId;
        this.add.name = row.name;
        this.add.code = row.code;
        if (this.logs.orderType == "dictionaryDetail") {
          this.detail.dictionaryId = row.dictionaryId;
          this.detail.value = row.value;
          this.detail.code = row.code;
        } else if (this.logs.orderType == "workBench") {
          this.work.name = row.name;
          this.work.parentId = row.parentId;
          this.work.statusId = row.statusId;
          this.work.typeName = row.typeName;
        } else if (this.logs.orderType == "workBenchDetails") {
          this.workdetails.docId = row.docId;
          this.workdetails.name = row.name;
          this.workdetails.statusId = row.statusId;
          this.workdetails.iconPath = row.iconPath;
        } else if (this.logs.orderType == "year") {
          this.addData.samplingFile = row.samplingFile;
          this.addData.samplingFileDetails = row.samplingFileDetails;
          this.addData.samplingId = row.samplingId;
          this.addData.samplingTitle = row.samplingTitle;
          this.addData.samplingYear = row.samplingYear;
        } else if (this.logs.orderType == "flight") {
          console.log("只是logs的数据", this.logs.select);
          // return
          Object.keys(this.logs.newdata).forEach((key) => {
            // console.log(key)
            if (key != "users") {
              this.logs.newdata[key] = row[key];
            }
            if (row.users) {
              // console.log('row存在')
              if (row.users.length > 0) {
                this.logs.newdata[key] = row[key];
              } else {
                // this.logs.newdata[key]=row[key]
                // for(let key in this.logs.newdata.users){
                this.logs.newdata.users = [];
                // }
              }
            }
          });
          console.log(this.logs.newdata);
        }
      }
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
.actionsBox {
  color: blue;
  width: 25%;
  cursor: pointer;
  text-align: right;
}
.the_boxs {
  /* border: 1px solid red; */
  width: 100%;
}
.userbox {
  /* border: 1px solid red; */
  display: flex;
}
.userbox > span {
  /* background: rosybrown; */
  width: 32%;
  margin: 0 5px;
  text-align: center;
  color: blue;
}
.the_tile {
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
}
.select_box {
  margin: 20px;
}
.sel_btn {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.sel_btn2 {
  margin-top: 20px;
  margin-left: 20px;
}
.times {
  width: 200px;
}
.selects {
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
.drawer_input {
  display: flex;
  margin: 20px 10px;
  align-items: center;
}
.drawer_input > div:nth-child(1) {
  width: 80px;
}
</style>
