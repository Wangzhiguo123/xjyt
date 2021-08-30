<!--
 * @Description: 富文本
 * @Date: 2021-08-24 10:41:41
 * @LastEditTime: 2021-08-25 17:43:54
-->
<template>
  <div id="editor"></div>
</template>
<script>
import E from "wangeditor";
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  watch: {
    // 监听传入内容进行赋值
    content: {
      handler() {
        setTimeout(() => {
          //判断父组件传递过来的值跟当前编辑器内容是否一样
          if (this.editor && this.content != this.editor.txt.html()) {
            this.editor.txt.html(this.content);
          }
        }, 10);
      },
      immediate: true,
    },
  },
  data() {
    return {
      editor: null,

      // 内容
      info: null,
    };
  },
  methods: {
    initE() {
      this.editor = new E("#editor");
      this.editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
      ];

      this.editor.config.onchange = (html) => {
        this.info = html;
        this.$emit("update:content", this.info);
        this.$emit("change", this.info);
      };
      this.editor.create();
      // 取消默认聚焦
      this.editor.disable();
      setTimeout(() => {
        this.editor.enable();
      }, 100);
    },
  },
  mounted() {
    this.initE();
  },
};
</script>
<style lang="less" scoped>
/deep/.w-e-toolbar,
/deep/.w-e-text-container {
  z-index: inherit !important;
}
</style>
