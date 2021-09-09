<!--
 * @Description: 右键菜单
 * @Date: 2021-09-01 10:25:50
 * @LastEditTime: 2021-09-01 14:53:20
-->
<template>
  <div class="contextmenu" :style="boundingClient" v-show="isShow">
    <div class="title">节点操作</div>
    <ul class="box">
      <li
        class="item"
        v-for="item in menuList"
        :key="item.key"
        @click="handleClick(item)"
      >
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    menuList: {
      type: Array,
      default: () => {
        return [
          {
            key: "append",
            value: "添加子节点",
          },
          {
            key: "prev",
            value: "上方添加节点",
          },
          {
            key: "next",
            value: "下方添加节点",
          },
          {
            key: "update",
            value: "修改节点",
          },
          {
            key: "delete",
            value: "删除",
          },
          {
            key: "cancel",
            value: "取消",
          },
        ];
      },
    },
    eventTarget: {},
    // 菜单数据
  },
  computed: {
    // 位置
    boundingClient() {
      return (
        this.eventTarget && {
          top: this.eventTarget.clientY + "px",
          left: this.eventTarget.clientX + "px",
        }
      );
    },
  },
  data() {
    return {};
  },
  methods: {
    /**
     * @description: 行点击
     * @param {*}row
     */
    handleClick(row) {
      if (row.key === "cancel") {
        this.$emit("update:isShow", false);
      } else {
        this.$emit("contextClick", row);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.contextmenu {
  position: absolute;
  font-size: 16px;
  background-color: lightcyan;
  .title {
    line-height: 20px;
    padding-left: 6px;
    color: #000;
  }
  .box {
    width: 300px;
    .item {
      padding-left: 30px;
      line-height: 20px;
      color: #000;
    }
  }
}
</style>
