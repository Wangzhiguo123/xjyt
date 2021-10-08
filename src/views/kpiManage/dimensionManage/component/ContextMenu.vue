<!--
 * @Description: 右键菜单
 * @Date: 2021-09-01 10:25:50
 * @LastEditTime: 2021-09-18 11:18:49
-->
<template>
  <div class="contextmenu" :style="boundingClient" v-show="isShow">
    <ul class="box">
      <li
        class="item"
        v-for="item in menuList"
        :key="item.key"
        @click="handleClick(item)"
      >
        <div class="part">
          {{ item.label }}
        </div>
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
            label: "添加子节点",
          },
          {
            key: "sibling",
            label: "添加同层节点",
          },
          {
            key: "update",
            label: "修改节点",
          },
          {
            key: "delete",
            label: "删除",
          },
          {
            key: "cancel",
            label: "取消",
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
  background: #ffffff;
  z-index: 100;
  .box {
    width: 212px;
    padding: 4px 4px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
    .item {
      color: #000;
      cursor: pointer;
      padding:4px 4px;
      border-bottom: 1px solid #f5f5f5;
      &:last-child{
        border-bottom: 0;
      }
      .part {
        height: 36px;
        padding-left: 6px;
        line-height: 36px;
        color: rgba(0, 0, 0, 0.85);
        text-align: left;
        font-size: 14px;
        &:hover {
          background-color: #e8f3fd;
          color: #1982ed;
        }
      }
    }
  }
}
</style>
