<!--
 * @Description: 
 * @Autor: hh
 * @Date: 2021-08-20 10:58:21
 * @LastEditTime: 2021-08-27 10:13:38
-->
<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title, path } = context.props;
    const vnodes = [];
    if (icon) {
      if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
      } else {
        vnodes.push(<svg-icon icon-class={icon} className="bar-icon" />);
      }
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
.bar-icon {
  vertical-align: middle!important;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 16px;
}
</style>
