<template>
  <div>
    <el-dialog :visible.sync="centerDialogVisible" width="50%" center>
      <div>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                  <el-col :span="12"
                    ><el-form-item label="活动区域">
                      <el-select
                        v-model="form.region"
                        placeholder="请选择活动区域"
                      >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select> </el-form-item
                  ></el-col>
                  <el-col :span="12">
                    <el-form-item label="活动名称">
                      <el-input v-model="form.name"></el-input> </el-form-item
                  ></el-col>
                </el-row>
              </el-form>
            </div>
            <div class="custom-tree-container">
              <div class="block">
                <el-tree
                  :data="data"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span v-if="data.children.children">组织机构名称 &emsp;&emsp;组织机构电话</span>
                    <span v-else-if="data.children">百口泉第三方车辆公司 &emsp;&emsp;15112344321</span>
                    <span v-else>{{data.children}}{{node.label}}</span>
                    <!-- <span>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => append(data)"
                      >
                        组织机构电话
                      </el-button>
                      <el-button type="text" size="mini"> 15112344321 </el-button>
                    </span> -->
                  </span>
                </el-tree>
              </div>
            </div>
          </el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple-light"></div
          ></el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // const data = [
    //   {
    //     id: 1,
    //     label: "组织机构名称     组织机构电话",
    //     children: [
    //       {
    //         id: 4,
    //         label: "百口泉第三方车辆公司       15112344321",
    //         children: [
    //           {
    //             id: 9,
    //             label: "三级 1-1-1",
    //           },
    //           {
    //             id: 10,
    //             label: "三级 1-1-2",
    //           },
    //         ],
    //       },
    //     ],
    //   }
    // ];
    return {
      centerDialogVisible: true,
      form: {
        region: "",
        name: "",
      },
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    };
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
  },
};
</script>

<style lang="less" scoped>
</style>