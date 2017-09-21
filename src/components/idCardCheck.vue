<template>
  <div @click="pageClick">
    <section class="main fixed hx_page" data-page="home" id="loadingSection">
      <div class="wait-layer">
        <div>loading</div>
      </div>
    </section>
    <section class="main fixed hx_page" data-page="home">
      <div class="upload_btn" v-show="selectWay">
        <h5>上传身份证正面</h5>
        <ul>
          <li media-id="null" @click.stop="album"><a href="javascript:void(0)">相册</a></li>
          <li media-id="null" @click.stop="camera"><a href="javascript:void(0)">拍照</a></li>
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
          <div class="upload_error positive" uploaded="false" @click.stop="uploadP">
            <div class="info">
              <h5>点击上传</h5>
              <p>身份证正面照片</p>
            </div>
            <div class="pic"><img :src="positive"></div>
          </div>
          <div class="upload_error negative" uploaded="false" @click.stop="uploadN">
            <div class="info">
              <h5>点击上传</h5>
              <p>身份证反面照片</p>
            </div>
            <div class="pic"><img :src="negative"></div>
          </div>
        </div>
        <input style="display:none" @change="input1" ref="input1" type="file" accept="image" capture="album">
        <input style="display:none" @change="input2" ref="input2" type="file" accept="image" capture="camera">
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
      selectWay: false, // 弹出框是否显示
      whichPic: 1, // 1:正面,2:反面,
      positive: '/static/images/pic01.png', // 图片等静态资源放在static目录下
      negative: '/static/images/pic02.png'
    }
  },
  methods: {
    uploadP: function () {
      this.whichPic = 1
      this.selectWay = true
    },
    uploadN: function () {
      this.whichPic = 2
      this.selectWay = true
    },
    album: function () {
      const elem1 = this.$refs.input1
      elem1.click()
    },
    camera: function () {
      const elem2 = this.$refs.input2
      elem2.click()
    },
    pageClick: function () {
      this.selectWay = false
    },
    input1: function (e) {
      // 相册
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.start_init(files[0])
    },
    input2: function () {
      // 相机
      console.log('input2')
    },
    start_init: function (img) {
      // 判断是否是图片
      if (/^image/.test(img.type)) {
        // 判断是否支持FileReader
        if (window.FileReader) {
          // 创建一个reader
          let reader = new FileReader()
          // 将图片转成base64格式
          reader.readAsDataURL(img)
          reader.addEventListener('load', function () {
            console.log(reader.result)
            this.positive = reader.result
          }, false)
        } else {
          alert('您的浏览器不支持FileReader')
          return
        }
      } else {
        alert('请上传图片')
        return
      }
    }
  }
}
</script>
