<!--
 * @Description: 搜索tab
 * @Date: 2021-08-27 11:03:33
 * @LastEditTime: 2021-08-27 16:33:46
-->
<template>
  <div class="nav-container">
    <ul :class="[direction === 'up' ? 'tabs' : 'nav']">
      <span
        v-for="item in defaultList"
        :class="[item.classificationId === id ? 'actived' : '', 'item']"
        :key="item.classificationId"
        @click="tabClick(item)"
        >{{ item.classificationName }}</span
      >
      <a class="item" v-if="moreList.length" href="javascript:void(0);" @click="toggleMore">更多</a>
    </ul>

    <ul
      :class="[direction === 'up' ? 'up-extra' : 'down-extra', 'extra-box']"
      v-if="isMoreShow"
    >
      <li
        v-for="it in moreList"
        :key="it.classificationId"
        :class="[it.classificationId === id ? 'actived' : '', 'item']"
        @click="tabClick(it)"
      >
        {{ it.classificationName }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    direction: {
      type: String,
      default: "up",
    },
    defaultList: {
      type: Array,
      default() {
        return [];
      },
    },
    moreList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 是否显示更多
      isMoreShow: false,
    };
  },
  methods: {
    /**
     * @description: 标签点击
     * @param {*} idx
     */
    tabClick(val) {
      this.$emit("handleClick", val.classificationId);
    },
    /**
     * @description: 处理更多分类切换
     * @param {*}
     * @return {*}
     * @author: hh
     */
    toggleMore() {
      this.isMoreShow = !this.isMoreShow;
    },
  },
  mounted() {
    if (this.moreList.some((it) => it.classificationId === this.id)) {
      this.isMoreShow = true;
    }
  },
};
</script>
<style lang="less" scoped>
.common-tag {
  padding: 6px 18px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  font-family: PingFang SC, PingFang SC-Regular;
}
.tag {
  font-size: 14px;
  .common-tag;
}
.tag-actived {
  background: #1982ed;
  border-radius: 4px 4px 0px 0px;
  color: #fff;
}
.nav-item {
  font-size: 16px;
  .common-tag;
}
.nav-actived {
  position: relative;
  color: #1982ed;
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    content: "";
    width: 100%;
    height: 3px;
    background-color: #1982ed;
  }
}

.nav-container {
  position: relative;
  width: fit-content;
  .tabs {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .item {
      .tag;
      &:not(:last-child):hover {
        .actived;
      }
    }
    .actived {
      .tag-actived;
    }
  }
  .nav {
    display: flex;
    flex-flow: row nowrap;
    margin-top: 16px;
    .item {
      .nav-item;
      &:not(:last-child):hover {
        .nav-actived;
      }
    }
    .actived {
      .nav-actived;
    }
  }
  .extra-box {
    position: absolute;
    right: -100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  }

  .up-extra {
    bottom: 30px;
    .item {
      .tag;
      &:hover {
        .tag-actived;
      }
    }
    .actived {
      .tag-actived;
    }
  }
  .down-extra {
    top: 30px;
    .item {
      .tag;
      &:hover {
        .nav-actived;
      }
    }
    .actived {
      .nav-actived;
    }
  }
}
</style>
