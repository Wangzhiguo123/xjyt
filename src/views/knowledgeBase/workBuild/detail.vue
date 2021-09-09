<!--
 * @Description: 工单详情
 * @Date: 2021-08-31 10:40:20
 * @LastEditTime: 2021-08-31 14:40:02
-->
<template>
  <div class="repair-container">
    <div class="header">
      <span class="label">表单信息</span>
      <el-button type="primary" size="mini" @click="toImage('form')"
        >引用</el-button
      >
    </div>
    <div ref="form">
      <div class="title">{{result.repairTitle}}</div>
      <ul class="form-info">
        <li class="item">
          <span class="label">用车单位：</span>
          <span class="text"></span>
        </li>
        <li class="item">
          <span class="label">用车时间：</span>
          <span class="text"></span>
        </li>
        <li class="item">
          <span class="label">车辆类型：</span>
          <span class="text"></span>
        </li>
        <li class="item">
          <span class="label">申请数量：</span>
          <span class="text"></span>
        </li>
        <li class="item">
          <span class="label">工作安排：</span>
          <span class="text"></span>
        </li>
      </ul> 
    </div>

    <div class="header">
      <span class="label">流程信息</span>
      <el-button type="primary" size="mini" @click="toImage('process')"
        >引用</el-button
      >
    </div>
    <div class="process-info" ref="process">
      <el-steps direction="vertical">
        <el-step>
          <template slot="title">
            <div class="process-title">djsflsj</div>
          </template>
          <template slot="description">
            <ul class="process-desc">
              <li class="item">
                <span class="label">xx-xx</span>
                <span class="text">fdsf</span>
              </li>
            </ul>
          </template>
        </el-step>
      </el-steps>
    </div>
    <el-button type="primary" @click="importAll">全部引用</el-button>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import { getDcRepairDetail } from "@/api/modules/knowledgeBase";

export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      result: '',

      imgObj: null,
    };
  },
  methods: {
    /**
     * @description: 获取详情信息
     * @param {*}
     */
    async getDetail() {
      let { data } = await getDcRepairDetail({
        id: this.id,
      });
      if (data.code === undefined) {
        this.result = data;
      }
    },
    /**
     * @description: 引用全部
     * @param {*}
     */
    importAll() {
      for (let it of [this.$refs.form, this.$refs.process]) {
        html2canvas(it).then((canvas) => {
          let dataURL = canvas.toDataURL("image/png");
          if (dataURL !== "") {
            let _fileBlob = this.dataURLtoBlob(dataURL);
            this.imgObj = this.blobToFile(_fileBlob, "type");
            localStorage.setItem("importImage", "ssss");
          }
        });
      }
    },
    /**
     * @description: 生成图片
     * @param {*} type
     */
    toImage(type) {
      html2canvas(this.$refs[type]).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        if (dataURL !== "") {
          let _fileBlob = this.dataURLtoBlob(dataURL);
          this.imgObj = this.blobToFile(_fileBlob, "type");

          localStorage.setItem("importImage", "ssss");
        }
      });
    },
    /**
     * @description: base64 转换 bolb
     * @param {*} dataurl
     */
    dataURLtoBlob(dataurl) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    /**
     * @description: blob 转 file
     * @param {*} theBlob
     * @param {*} fileName
     */
    blobToFile(theBlob, fileName) {
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    },
  },
  created() {
    this.getDetail();
  },
};
</script>
<style lang="less" scoped>
.repair-container {
  padding: 40px;
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 11px;
    .label {
      display: inline-block;
      padding-left: 4px;
      margin-right: 32px;
      line-height: 22px;
      font-weight: 500;
      color: #262626;
      font-size: 16px;
      border-left: 4px solid #3377ff;
    }
  }
  .title {
    margin-bottom: 16px;
    color: #333;
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Regula;
  }
  .form-info {
    display: grid;
    grid-template-columns: repeat(3, 33.3%);
    grid-row-gap: 8px;
    margin-bottom: 32px;

    .label,
    .value {
      line-height: 20px;
      font-size: 14px;
    }
    .label {
      margin-right: 8px;
      color: #a9a9a9;
    }

    .text {
      color: #333;
    }
  }
  .process-info {
    padding: 33px 40px;
    margin-bottom: 16px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    .process-title {
      margin-bottom: 12px;
      margin-left: 7px;
      font-size: 14px;
      color: #262626;
    }
    .process-desc {
      margin-left: 7px;
      padding: 16px;
      background: rgba(0, 0, 0, 0.04);
      .item {
        margin-bottom: 8px;
        .label,
        .text {
          font-size: 14px;
          line-height: 20px;
        }
        .label {
          margin-right: 24px;
          color: #878787;
        }
        .text {
          color: #b9b9b9;
        }
      }
    }
  }
}
</style>
