import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules
})
export default store


/*
  模块化使用方法(记住一定要加上模块的名称，也就是modules文件夹下的js文件名称) ==》
    1、正常使用
      this.$store.state.overall.userInfo;
      this.$store.commit("overall/SAVE_USERINFO",{name:"zls"});
      this.$store.dispatch("overall/SAVE_USERINFO",{name:"xry"});

    2、辅助函数使用
    computed: {
      ...mapState("overall", {
        userInfo: state => state.userInfo
      }),
    },
    created(){
      this.set_userInfo({name:"使用mutation辅助函数时，需要给个自定义的方法，可以用于传递参数！"})
      this.async_fn({name:"使用actation辅助函数时，需要给个自定义的方法，可以用于传递参数！"})
    },
    methods:{
      ...mapMutations("overall", { set_userInfo: "SAVE_USERINFO" }),
      ...mapActions("overall", { async_fn: "ASYNC_FN" }),
    }

*/
