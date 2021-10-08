<!--
 * @Description: 指标配置
 * @Date: 2021-08-31 14:49:20
 * @LastEditTime: 2021-09-06 10:57:56
-->
<template>
  <div class="container">
    <PageHeader title="指标公式配置">
      <template slot="btns">
        <el-button type="primary" size="mini" @click="handlePublish" v-if="!$route.query.isView">保存</el-button>
        <el-button size="mini" @click="$router.push('/express-manage')">返回</el-button>
      </template>
    </PageHeader>

    <el-form :model="form" ref="form" label-width="120px" v-if="info !== null" :disabled="$route.query.isView">
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
        <el-button type="primary" size="mini" :disabled="form.validateParam.length === objectSelect.length" plain
          @click="addRow">新增条件公式配置</el-button>
      </el-form-item>
      <template v-if="info.type=='base'">
        <div class="part" v-for="(item, index) in form.validateParam" :key="item.key">
          <template v-if="item.isShow">
            <el-form-item :label="'条件' + (index + 1) + '：'" :prop="'validateParam.' + index + '.assessObjectId'" :rules="{
              required: true,
              message: '条件不能为空',
              trigger: 'change',
            }">
              【评价对象维度】=
              <el-select size="mini" v-model="item.assessObjectId" :disabled="objectSelect.length===1">
                <el-option v-for="it in objectSelect" :key="it.id" :label="it.name"
                  :disabled="form.validateParam.some((x,selectIndex)=>x.assessObjectId==it.id&&selectIndex!=index)"
                  :value="it.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="传入参数：" size="mini" :prop="'validateParam.' + index + '.params'" :rules="{
              required: true,
              message: '参数不能为空',
              trigger: 'change',
            }">
              <el-select v-model="item.params" multiple>
                <el-option v-for="it in paramSelect" :key="it.id" :label="it.name" :value="it.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="返回参数：" :prop="'validateParam.' + index + '.formulaSql'" :rules="{
              required: true,
              message: '参数不能为空',
              trigger: 'change',
            }">
              <!-- <el-button size="mini" type="primary" plain>编辑</el-button>
          <p></p> -->
              <el-input type="textarea" v-model="item.formulaSql"></el-input>
            </el-form-item>
          </template>

          <p class="btns" v-if="!$route.query.isView">
            <span class="item" @click="toggleShow(item)">
              <svg-icon iconClass="triangle" className="icon"></svg-icon>
            </span>
            <span class="item" @click="removeRow(item)">
              <svg-icon iconClass="delete" className="icon"></svg-icon>
            </span>
          </p>
        </div>
      </template>
      <template v-if="info.type=='complex'">
        <div class="part" v-for="(item, index) in form.validateParam" :key="item.key">
          <template v-if="item.isShow">
            <el-form-item :label="'条件' + (index + 1) + '：'" :prop="'validateParam.' + index + '.assessObjectId'" :rules="{
              required: true,
              message: '条件不能为空',
              trigger: 'change',
            }">
              【评价对象级别】=
              <el-select size="mini" v-model="item.assessObjectId" :disabled="objectSelect.length===1">
                <el-option v-for="it in objectSelect" :key="it.id" :label="it.name"
                  :disabled="form.validateParam.some((x,selectIndex)=>x.assessObjectId==it.id&&selectIndex!=index)"
                  :value="it.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" size="mini">
              <el-button size="mini" type="primary" @click="combineComplexFormula(1,{},item)">(</el-button>
              <el-button size="mini" type="primary" @click="combineComplexFormula(2,{},item)">)</el-button>
              <el-button size="mini" type="primary" @click="combineComplexFormula(3,{},item)">+</el-button>
              <el-button size="mini" type="primary" @click="combineComplexFormula(4,{},item)">-</el-button>
              <el-button size="mini" type="primary" @click="combineComplexFormula(5,{},item)">*</el-button>
              <el-button size="mini" type="primary" @click="combineComplexFormula(6,{},item)">/</el-button>
              <!-- indexSelect -->
              <el-popover placement="top" class="popover-button" width="160" v-model="item.addIndexButtonShow">
                <div class="value-contianer">
                  <el-select size="mini" v-model="item.addIndex">
                    <el-option v-for="it in item.indexSelect" :key="it.indexId" :label="it.name" :value="it.indexId">
                    </el-option>
                  </el-select>
                </div>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="item.addIndexButtonShow = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="confirmIndex(item,index)">确定</el-button>
                </div>
                <el-button size="mini" type="primary" slot="reference"
                  @click.native="addIndex($event,item,'validateParam.' + index + '.assessObjectId')">添加指标</el-button>
              </el-popover>
              <el-popover placement="top" class="popover-button" width="160" v-model="item.addValueButtonShow">
                <div class="value-contianer">
                  <div class="value-contianer-label">数值：</div>
                  <el-input-number class="value-contianer-input" controls-position="right" :min="-99999999" size="mini"
                    :controls="false" v-model="item.addvalue" :precision="2" :step="1" :max="99999999">
                  </el-input-number>
                </div>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="item.addValueButtonShow = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="addValue(item)">确定</el-button>
                </div>
                <el-button size="mini" type="primary" slot="reference">添加数值</el-button>
              </el-popover>
              <el-button size="mini" class="popover-button" type="primary" @click="resetPre(item)">回退</el-button>
            </el-form-item>
            <el-form-item label="返回参数：" :prop="'validateParam.' + index + '.showSql'" :rules="{
              required: true,
              message: '参数不能为空',
              trigger: 'change',
            }">
              <div class="value-contianer">
                <el-input size="mini" disabled v-model="item.showSql"></el-input>
                <el-button style="margin-left:5px" size="mini" type="primary" @click="resetAll(item)">重置</el-button>
              </div>
            </el-form-item>
          </template>

          <p class="btns" v-if="!$route.query.isView">
            <span class="item" @click="toggleShow(item)">
              <svg-icon iconClass="triangle" className="icon"></svg-icon>
            </span>
            <span class="item" @click="removeRow(item)">
              <svg-icon iconClass="delete" className="icon"></svg-icon>
            </span>
          </p>
        </div>
      </template>

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
    getFormulaIndexSelect
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
        //指标下拉
        indexSelect: [],
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
        let {
          data
        } = await getFormulaObjectSelect(this.id);
        if (data.code === undefined) {
          this.objectSelect = data;
        }
      },
      /**
       * @description: 获取指标公式配置的指标下拉列表
       * @param {*}
       */
      async getFormulaIndexSelect(item) {
        let {
          data
        } = await getFormulaIndexSelect(item.assessObjectId);
        if (data.code === undefined) {
          item.indexSelect = data.filter(x => x.indexId != this.id);
        }
      },
      /**
       * @description: 点击选择指标
       * @param {*}
       */
      addIndex(event, item, validateFiled) {
        // event.cancelBubble = true;
        // event.stopPropagation();
        this.$refs.form.validateField(validateFiled, (errorMessage) => {
          if (!errorMessage) {
            this.getFormulaIndexSelect(item);
            item.addIndex = "";
          } else {
            setTimeout(() => {
              item.addIndexButtonShow = false;
            }, 250);
          }
        });
      },
      /**
       * @description: 获取关联对象级别下拉数据
       * @param {*}
       */
      async getFormulaParamSelect() {
        let {
          data
        } = await getFormulaParamSelect();
        if (data.code === undefined) {
          this.paramSelect = data;
        }
      },
      /**
       * @description: 获取详情
       * @param {*}
       */
      async getExpressDetail() {
        let {
          data
        } = await getExpressDetail(this.id);
        if (data.code === undefined) {
          this.info = data;
          if (data.type == "base") {
            data.formula.forEach((x, y) => {
              let item = {
                key: y,
                indexId: this.id,
                assessObjectLevel: this.info.assessObjectLevel,
                assessObjectId: x.assessObjectId,
                formulaSql: x.formulaSql,
                params: x.params.map(z=>z.param),
                isShow: true,
              };
              this.form.validateParam.push(item);
            });
          } else {
            data.formula.forEach((x, y) => {
              let item = {
                key: y,
                indexId: this.id,
                assessObjectLevel: this.info.assessObjectLevel,
                assessObjectId: x.assessObjectId,
                formulaSql: x.formulaSql,
                params: x.params,
                isShow: true,
                indexSelect: [],
                addIndex: '',
                addIndexButtonShow: false,
                addvalue: 0,
                addValueButtonShow: false,
                metaSql: JSON.parse(x.metaSql),
                showSql: ''
              };
              this.form.validateParam.push(item);
              this.formateParam(item);
            });

          }
        }
      },

      /**
       * @description: 新增一行
       * @param {*}
       */
      addRow() {
        if (this.info.type == "base") {
          this.form.validateParam.push({
            key: Date.now(),
            indexId: this.id,
            assessObjectLevel: this.info.assessObjectLevel,
            assessObjectId: this.objectSelect.length>1 ? '' : this.objectSelect[0].id,
            formulaSql: "",
            params: [],
            isShow: true,
          });
        } else {
          this.form.validateParam.push({
            key: Date.now(),
            indexId: this.id,
            assessObjectLevel: this.info.assessObjectLevel,
            assessObjectId: this.objectSelect.length>1 ? '' : this.objectSelect[0].id,
            formulaSql: "",
            params: [],
            isShow: true,
            indexSelect: [],
            addIndex: '',
            addIndexButtonShow: false,
            addvalue: 0,
            addValueButtonShow: false,
            metaSql: [],
            showSql: '',
          });
        }
      },
      /**
       * @description: 撤销上一步
       * @param {*}
       */
      resetPre(item) {
        item.metaSql.pop();
        this.formateParam(item);
      },
      /**
       * @description: 重置公式
       * @param {*}
       */
      resetAll(item) {
        item.metaSql = [];
        this.formateParam(item);
      },
      /**
       * @description: 添加数值
       * @param {*}
       */
      addValue(item) {
        if (item.addvalue !== '' && item.addvalue !== null && item.addvalue !== undefined) {
          this.combineComplexFormula(8, {
            value: item.addvalue
          }, item);
        }
        item.addValueButtonShow = false;
      },
      /**
       * @description: 确认添加指标值
       * @param {*}
       */
      confirmIndex(item, index) {
        if (item.addIndex) {
          let combineIndex = `obj_${index}_${item.metaSql.length}`;
          this.combineComplexFormula(7, {
            ref: combineIndex,
            value: item.addIndex,
            label: item.indexSelect.find(x => x.indexId == item.addIndex).name
          }, item)
        }
        item.addIndexButtonShow = false;
      },
      /**
       * @description: 拼装复杂指标公式
       * @param type:1( 2) 3+ 4- 5* 6/ 7指标 8数值 data:{ref:'',value:'',label:''}
       */
      combineComplexFormula(type, data, item) {
        item.metaSql.push({
          type,
          data
        });
        this.formateParam(item);
      },
      /**
       * @description: 格式化传入后台接口参数以及页面展示
       * @param {*}
       */
      formateParam(item) {
        let showSql = "",
          formulaSql = "",
          params = [];
        for (const element of item.metaSql) {
          switch (element.type) { //type:1( 2) 3+ 4- 5* 6/ 7指标 8数值
            case 1:
              showSql += "(";
              formulaSql += "(";
              break;
            case 2:
              showSql += ")";
              formulaSql += ")";
              break;
            case 3:
              showSql += "+";
              formulaSql += "+";
              break;
            case 4:
              showSql += "-";
              formulaSql += "-";
              break;
            case 5:
              showSql += "*";
              formulaSql += "*";
              break;
            case 6:
              showSql += "/";
              formulaSql += "/";
              break;
            case 7:
              showSql += `${element.data.label}`;
              formulaSql += `${element.data.ref}`;
              params.push({
                refIndexId: element.data.value,
                code: element.data.ref
              })
              break;
            case 8:
              showSql += `${element.data.value}`;
              formulaSql += `${element.data.value}`;
              break;
            default:
              break;
          }
        }
        item.showSql = showSql;
        item.formulaSql = formulaSql;
        item.params = params;
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
            // if (this.form.validateParam.length > 1) {
            //   const ids = this.form.validateParam.map((it) => it.assessObjectId);
            //   const idsSet = new Set(ids);
            //   if (idsSet.size !== ids.length) {
            //     this.$message({
            //       type: "warning",
            //       message: "评价对象级别不能相同",
            //     });
            //     return;
            //   }
            // }
            // key: Date.now(),
            //           indexId: this.id,
            //           assessObjectLevel: this.info.assessObjectLevel,
            //           assessObjectId: "",
            //           formulaSql: "",
            //           params: [],
            //           isShow: true,
            if (this.info.type == "base") {
              let {
                data
              } = await addFormula(this.form.validateParam.map(x => {
                return {
                  ...x,
                  params: x.params.map(y => {
                    return {
                      "param": y
                    }
                  })
                }
              }));
              if (data.code === undefined) {
                this.$message({
                  type: "success",
                  message: "保存成功",
                });
                this.$router.back();
              }
            } else {
              this.serializeFormula(true);
              let {
                data
              } = await addFormula(this.form.validateParam);
              if (data.code === undefined) {
                this.$message({
                  type: "success",
                  message: "保存成功",
                  // onClose: () => {
                  //   this.$router.back();
                  // },
                });
                this.$router.back();
              } else {
                this.serializeFormula(false);
              }
            }
          }
        });
      },
      serializeFormula(isToString) {
        for (let item of this.form.validateParam) {
          if (isToString) {
            item.metaSql = JSON.stringify(item.metaSql);
          } else {
            item.metaSql = JSON.parse(item.metaSql);
          }
        }
      },
    },
    created() {
      this.getFormulaParamSelect();
      (async () => {
        await this.getFormulaObjectSelect();
        await this.getExpressDetail();
      })();
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

    .popover-button {
      margin-left: 10px;
    }
  }
</style>
