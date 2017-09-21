<template>
  <div>
    <section class="main fixed hx_page" data-page="home" id="loadingSection">
      <div class="wait-layer">
        <div>loading</div>
      </div>
    </section>
    <section class="main fixed hx_page" data-page="home" id="idCardUploadSection">
      <div class="upload_btn" style="display:none">
        <h5>上传身份证正面</h5>
        <ul>
          <li media-id="null"><a href="javascript:void(0)">相册</a></li>
          <li media-id="null"><a href="javascript:void(0)">拍照</a></li>
        </ul>
      </div>
      <header class="header">
        <div class="header_inner hd_inner01">
          <a class="icon_back" href="javascript:void(0);" id="icon_back"></a>
          <h1 class="title">上传影像</h1>
        </div>
      </header>
      <article class="content">
        <div class="user_main">
          <div class="upload_progress">
            <h3 style="color: red;display: none;"></h3>
            <h3>请确保您的二代身份证处于有效期内</h3>
          </div>
          <div class="upload_error positive" uploaded="false" @click="uploadP">
            <div class="info">
              <h5>点击上传</h5>
              <p>身份证正面照片</p>
              <form v-show="positive" enctype="multipart/form-data" style="opacity: 0;"><input id="btn1" style="width:100%;height:100%;position:absolute;top:0;left:0;" type="file" multiple="multiple" accept="image/*"></form>
            </div>
            <div class="pic"><img src="../images/pic01.png"></div>
          </div>
          <div class="upload_error negative" uploaded="false" @click="uploadN">
            <div class="info">
              <h5>点击上传</h5>
              <p>身份证反面照片</p>
              <input style="display:none" ref="input2" type="file" accept="image" capture="camera">
            </div>
            <div class="pic"><img src="../images/pic02.png"></div>
          </div>
        </div>
        <div class="ce_btn">
          <a href="javascript:void(0);" id="submit">下一步</a>
        </div>
      </article>
    </section>
  </div>
</template>

<script>

export default {
  name: 'idCardCheck',
  data () {
    return {
      positive: false,
      negative: false
    }
  },
  methods: {
    uploadP: function () {

    },
    uploadN: function () {
      const elem = this.$refs.input2
      elem.click()
    },
    start_init: function () {

    }
  }
}
</script>
