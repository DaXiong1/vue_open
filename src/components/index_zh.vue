<template>
  <section class="main fixed">
    <article>
      <div class="account_box">
        <div class="content_bottom">
          <div class="buttons_box">
            <a @click="jumpToOpen" href="javascript:void(0);">开始</a>
            <a @click="jumpToDownload" href="javascript:void(0);">测试跳转</a>
          </div>
          <p style="color: red;font-size: large">My Vue</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'index_zh',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    jumpToOpen: function () {
      console.log('jumpToOpen')
      // 页面跳转，手动修改url
      this.$router.push({name: 'index', params: {}})
    },
    jumpToDownload: function () {
      console.log('jumpToDownload')
      // 页面跳转，手动修改url
      this.$router.push({name: 'download', params: {}})
    }
  }
}
</script>

<style>
  .account_box{
    height:100%;
    background:url(../../static/images/open-account.png) no-repeat top center;
    background-size:cover;
    position:relative;
  }
</style>
