<template>
  <div id="app">
    <router-view></router-view>
    <dictionary-select style="display: none"></dictionary-select>
  </div>
</template>

<script>
  import DictionarySelect from './components/dictionarySelect'
  export default {
    name: 'app',
    components: {
      DictionarySelect
    }
  }
</script>

<style lang="css">
  /*这里必须写成@import形式，标签里面用src引入会报错*/
  @import url('../static/css/common.css');
  @import url('../static/css/style.css');
  @import url('../static/css/add-styles.css');
  @import url('../static/css/hx_style.css');
  /*
    之前图片一直显示不出来就是没加这个样式，必须设置html,body,#app的height都为100%
   */
  #app {
    height:100%;
  }
</style>

