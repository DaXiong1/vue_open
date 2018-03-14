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
            <div class="info" v-show="infoP">
              <h5>点击上传</h5>
              <p>身份证正面照片</p>
            </div>
            <div class="pic"><img :src="positive"></div>
          </div>
          <div class="upload_error negative" uploaded="false" @click.stop="uploadN">
            <div class="info" v-show="infoN">
              <h5>点击上传</h5>
              <p>身份证反面照片</p>
            </div>
            <div class="pic"><img :src="negative"></div>
          </div>
        </div>
        <input style="display:none" @change="input1" ref="input1" type="file" accept="image" capture="album">
        <input style="display:none" @change="input1" ref="input2" type="file" accept="image" capture="camera">
        <div class="ce_btn">
          <a href="javascript:void(0);" @click="submit">下一步</a>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import * as $ from '../utils/base'

export default {
  name: 'idCardCheck',
  data () {
    return {
      selectWay: false, // 弹出框是否显示
      whichPic: 4, // 4:正面,5:反面,
      positive: '/static/images/pic01.png', // 图片等静态资源放在static目录下
      negative: '/static/images/pic02.png',
      infoP: true,
      infoN: true
    }
  },
  methods: {
    uploadP: function () {
      this.whichPic = 4
      this.selectWay = true
    },
    uploadN: function () {
      this.whichPic = 5
      this.selectWay = true
    },
    album: function () {
      const elem1 = this.$refs.input1// vue获取节点的方式，用ref属性绑定dom节点,可以减少获取dom节点的消耗
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
    start_init: function (img) {
      var vue = this
      // 判断是否是图片
      if (/^image/.test(img.type)) {
        // 判断是否支持FileReader
        if (window.FileReader) {
          // 创建一个reader
          let reader = new FileReader()
          // 将图片转成base64格式
          reader.readAsDataURL(img)
          reader.addEventListener('load', function () {
            var base64 = reader.result
            console.log('图片大小:' + base64.length / 1024 + 'Kb')
            if (base64.length > 1024 * 100) { // 超过100k压缩图片
              vue.$options.methods.compress(base64, vue)
            } else {
              vue.$options.methods.uploadAjax(base64, vue)
            }
          }, false)
        } else {
          alert('您的浏览器不支持FileReader')
          return
        }
      } else {
        alert('请上传图片')
        return
      }
    },
    uploadAjax: function (base64, vue) {
      var userInfo = $.getSStorageInfo('userInfo')
      var imgdata = base64.split(',')[1]
      imgdata = encodeURIComponent(imgdata)
      var param = {}
      param['funcNo'] = '501525'
      param['user_id'] = userInfo.userId
      param['jsessionid'] = userInfo.jsessionId
      param['img_type'] = vue.whichPic
      param['img_data'] = imgdata
      $.request(param, function (results) {
        if (results.error_no === '0') {
          if (vue.whichPic === 4) { // 正面
            vue.positive = base64
            vue.infoP = false
            userInfo.idCardNumber = results.results[0].idno  // 身份证号
            userInfo.userName = results.results[0].custname  // 客户姓名
            userInfo.idCardAddress = results.results[0].native  // 证件地址
            userInfo.ethnicName = results.results[0].ethnicname  // 民族
            userInfo.birthday = results.results[0].birthday  // 出生日期
            userInfo.gender = results.results[0].usersex  // 用户性别
          } else { // 反面
            vue.negative = base64
            vue.infoN = false
            userInfo.policeorg = results.results[0].policeorg  // 签发机关
            userInfo.idbegindate = results.results[0].idbegindate  // 证件开始日期
            userInfo.idenddate = results.results[0].idenddate  // 证件结束日期
          }
          // 保存
          $.setSStorageInfo('userInfo', userInfo)
          vue.$options.methods.h5Uploadvalidate(userInfo, vue)
        } else {
          alert(results.error_info)
        }
      })
    },
    // 使用canvas压缩图片
    compress: function (imgData, vue) {
      let img = new Image()
      img.src = imgData
      // 需要等图片加载完成后才能取到width和height
      img.onload = () => {
        let canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio
        console.log('图片像素为：' + width * height / 1000000 + '百万')
        if ((ratio = width * height / 4000000) > 1) {
          ratio = Math.sqrt(ratio)
          width /= ratio
          height /= ratio
        } else {
          ratio = 1
        }
        canvas.width = width
        canvas.height = height
        // 进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1)
        console.log('压缩前：' + imgData.length)
        console.log('压缩后：' + ndata.length)
        console.log('压缩率：' + ~~(100 * (imgData.length - ndata.length) / imgData.length) + '%')
        vue.$options.methods.uploadAjax(ndata, vue)
      }
    },
    h5Uploadvalidate: function (userInfo, vue) {
      switch (vue.whichPic) {
        // 正面照
        case 4 :
          if (userInfo.idCardNumber.length === 0) {
            $.alert('身份证号码识别失败，需重新拍摄，请注意拍摄的角度和光线！')
            vue.positive = '/static/images/pic01.png'
            vue.infoP = true
            return false
          } else if (userInfo.gender.length === 0) {
            $.alert('性别识别失败，需重新拍摄，请注意拍摄的角度和光线！')
            vue.positive = '/static/images/pic01.png'
            vue.infoP = true
            return false
          }
          break
        // 反面照
        case 5 :
          if (userInfo.idbegindate.length === 0) {
            $.alert('身份证的有效期限识别失败，需重新拍摄，请注意拍摄的角度和光线！')
            vue.negative = '/static/images/pic02.png'
            vue.infoN = true
            return false
          } else if (userInfo.idenddate.length === 0) {
            $.alert('身份证的有效期限识别失败，需重新拍摄，请注意拍摄的角度和光线！')
            vue.negative = '/static/images/pic02.png'
            vue.infoN = true
            return false
          }
          break
      }
    },
    submit: function () {
      var vue = this
      if (vue.infoP === true) {
        alert('请先上传正面照')
        return false
      }
      if (vue.infoN === true) {
        alert('请先上传反面照')
        return false
      }
      var userInfo = $.getSStorageInfo('userInfo')
      var param = {
        funcNo: '601569',
        user_id_new: userInfo.userId,
        idtype: '00',
        idcardmodify: '0',
        nationality: '156',
        native: userInfo.idCardAddress,
        idno: userInfo.idCardNumber,
        custname: userInfo.userName,
        ethnic: userInfo.ethnic,
        birthday: userInfo.birthday,
        policeorg: userInfo.policeorg,
        addr: userInfo.idCardAddress,
        ethnicname: userInfo.ethnicName,
        usersex: userInfo.gender,
        idbegindate: userInfo.idbegindate,
        idenddate: userInfo.idenddate
      }
      $.request(param, function (results) {
        if (results.error_no === '0') {
          // 页面跳转，手动修改url
          vue.$router.push({name: 'userCardInfo', params: {}})
        } else {
          alert(results.error_info)
        }
      })
    }
  }
}
</script>
