<!--删除模态框-->

<template>
  <el-dialog
    v-model="modalShow"
    title="Title"
    :mask-closable="false"
    class="del-node"
    class-name="vertical-center-modal"
  >
    <div slot="header" class="target-class">
      <span class="title">
        {{ title }}
      </span>
    </div>
    <div class="warn-info">
      <slot>
        {{ msg }}
      </slot>
    </div>
    <div slot="footer">
      <Button type="error" class="ivu-btn-90px" @click.stop="confirm">{{
        $t(confirmBtnTxt)
      }}</Button>
      <Button v-if="showCancelBtn" class="ivu-btn-90px" @click.stop="cancel">{{
        $t("cancel")
      }}</Button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      //要显示的信息
      msg: "",
      //标题信息
      title: "",
      //是否显示模态框
      modalShow: false,
      //确认执行的回调函数
      confirmCallback: null,
      //取消执行的回调函数
      cancelCallback: null,
      //是否显示取消按钮
      showCancelBtn: true,
      //确认按钮文案
      confirmBtnTxt: "confirm",
    };
  },
  methods: {
    /**
     * 取消删除
     */
    cancel() {
      this.modalShow = false;
      if (this.cancelCallback) {
        this.cancelCallback();
      }
    },
    /**
     * 确认删除
     */
    confirm() {
      this.modalShow = false;
      if (this.confirmCallback) {
        this.confirmCallback();
      }
    },
    /**
     * 显示 模态框
     * @param{String} msg 显示的提示信息
     * @param{String} title 提示框标题
     * @param{Function} confirmCallback 确认回调函数
     * @param{Function} cancelCallback 取消回调函数
     * @param{Boolean} showCancelBtn 是否显示取消按钮
     * @param{String} confirmBtnTxt 确认按钮文案
     */
    show({
      msg,
      title,
      confirmCallback = null,
      cancelCallback,
      showCancelBtn = true,
      confirmBtnTxt = "confirm",
    }) {
      this.modalShow = true;
      this.msg = msg;
      this.title = title;
      this.showCancelBtn = showCancelBtn;
      this.confirmBtnTxt = confirmBtnTxt;
      if (confirmCallback && typeof confirmCallback === "function") {
        this.confirmCallback = confirmCallback;
      }
      if (cancelCallback && typeof cancelCallback === "function") {
        this.cancelCallback = cancelCallback;
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
