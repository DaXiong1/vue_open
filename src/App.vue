<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="css">
  /*这里必须写成@import形式，标签里面用src引入会报错*/
  @import url('./css/common.css');
  @import url('./css/style.css');
  @import url('./css/add-styles.css');
  @import url('./css/hx_style.css');
  #app {
    height:100%;
  }
</style>

