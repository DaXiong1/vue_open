/*
  中央事件总线
  ——为了能够全局使用，写成一个插件，并在main.js中注册
 */
export default{
  install (Vue, options) {
    Vue.prototype.BUS = new Vue()
  }
}
