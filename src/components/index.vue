<template>
  <div>
    <section class="main fixed" data-page="home" id="loadingSection" style="min-height: 100%; height: auto">
      <div class="wait-layer"><div>loading</div></div>
    </section>
    <section class="main fixed" data-page="home" id="loginSection" style="min-height: 100%; height: auto">
      <header class="header">
        <div class="header_inner hd_inner01">
          <a class="icon_back" id="backToAppBtn"></a>
          <h1 class="title">短信验证</h1>
        </div>
      </header>
      <article class="content">
        <div class="login_box">
          <div class="input_form">
            <div class="input_text">
              <input class="t1" id="mobileNumber" type="tel" v-model.trim="param.phone" format="phone" maxlength="11" placeholder="手机号"/>
              <a class="txt_close" style="display: none"></a>
            </div>
            <div class="input_text">
              <input class="t1" type="text" v-model.trim="param.verifyNumber" maxlength="4"  placeholder="验证码"/>
              <a class="code_img" id="verifyImage"><img :src="imageSrc" @click="refresh"/></a>
            </div>
            <div class="input_text">
              <input class="t1" type="tel" maxlength="6" v-model.trim="param.smsNumber" format="\d{6}" placeholder="短信验证码"/>
              <a class="code_btn" id="smsSendBtn">获取验证码</a>
            </div>
          </div>
        </div>
        <div class="ce_btn"><a @click="login">确 定</a></div>
      </article>
    </section>
  </div>
</template>

<script>
import * as config from '../config/config'
import {request} from '../utils/base'

export default {
  name: 'index',
  data () {
    return {
      imageSrc: config.serverUrl + '/TicketImgServlet?key=' + Math.random(),
//      phone: '',
//      verifyNumber: this.imageSrc,
//      smsNumber: ''
      param: {
        phone: '',
        verifyNumber: this.imageSrc,
        smsNumber: ''
      }
    }
  },
  methods: {
    refresh: function () {
      this.imageSrc = config.serverUrl + '/TicketImgServlet?key=' + Math.random()
    },
    login: function () {
      this.param['funcNo'] = '601520'
      request(this.param)
    }
  }
}
console.log(this.login)
</script>

