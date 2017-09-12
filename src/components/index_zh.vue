<template>
  <section class="main fixed">
    <article>
      <div class="account_box">
        <div class="content_bottom">
          <div class="buttons_box">
            <a id="open" href="javascript:void(0);">理财开户</a>
            <a id="download" href="javascript:void(0);">股票开户</a>
          </div>
          <p>华西证券旗下专业理财服务平台</p>
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
  }
}
</script>

<style>
  .account_box{
    height:100%;
    background:url(../images/open-account.png) no-repeat top center;
    background-size:cover;
    position:relative;
  }
</style>
