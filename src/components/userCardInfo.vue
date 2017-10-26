<template>
  <div>
    <section class="main fixed hx_page" data-page="home">
      <header class="header">
        <div class="header_inner hd_inner01">
          <a class="icon_back" @click="back" href="javascript:void(0);"></a>
          <h1 class="title">身份信息</h1>
        </div>
      </header>
      <article class="content status_ibox">
        <div class="user_main hx_main mt10">
          <div class="input_form">
            <div class="multi_cbox clearfix">
              <div class="input_text act" style="width:30%">
                <span class="tit active">姓名</span>
                <input class="t1" type="text"  value="" v-model="name" required format="^[\u4E00-\u9FA5]{2,14}([·•]?[\u4E00-\u9FA5]+)*$" placeholder="姓名" error-hint="姓名格式不正确" maxlength="14">
              </div>
              <div class="input_text act" style="width:60%">
                <span class="tit active">身份证号</span>
                <input class="t1" type="text" value=""  v-model="idCard" required format="^([\d]{17}[\dXx]|[\d]{15})$" maxlength="18" placeholder="身份证号" error-hint="身份证格式不正确">
              </div>
            </div>
            <div class="input_text act">
              <span class="tit active">签发机关</span>
              <input class="t1" type="text" value="" v-model="releaseOrgan" format="^[\u4E00-\u9FA5\w\d\-\s\/]{4,25}$" maxlength="25" required placeholder="签发机关" error-hint="签发机关格式不正确">
            </div>
            <div class="input_text act">
              <span class="tit active">证件地址</span>
              <input class="t1" type="text" value="" v-model="address" required placeholder="证件地址" error-hint="证件地址格式不正确">
            </div>
            <div class="input_text act">
              <span class="tit">有效期</span>
              <div class="t1">
                <div class="dateInput">
                  <div class="dropdown"><span style="display: block">{{beginDate}}</span></div>
                  <span class="line"></span>
                  <div class="dropdown"><span style="display: block">{{endDate}}</span></div>
                  <span style="padding: 0 0.5rem;color: #999999;">长期</span>
                </div>
                <div class="switch_box">
                  <input type="checkbox" :checked="isAllLong" @click="switchBtn" class="needsclick" />
                  <div class="swt_inner">
                    <div class="switch_btn"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 class="hx_tit">请完善以下信息</h4>
          <div class="input_form">
            <div class="input_text act">
              <span class="tit active">民族</span>
              <div class="dropdown" default-hint="民族" error-hint="请选择民族" @click="selectDetail">{{nation}}</div>
            </div>
            <div class="input_text act">
              <span class="tit active">学历</span>
              <div class="dropdown" default-hint="学历" error-hint="请选择学历" @click="selectDetail">{{qualifications}}</div>
            </div>
            <div class="input_text act">
              <span class="tit active">职业</span>
              <div class="dropdown" default-hint="职业" error-hint="请选择职业" @click="selectDetail">{{job}}</div>
            </div>
          </div>
        </div>
        <div class="ce_btn mt10"><a href="javascript:void(0);" @click="submit">下一步</a></div>
      </article>
    </section>
  </div>
</template>

<script>
import * as $ from '../utils/base'
import * as Utils from '../utils/util'
import * as config from '../config/config'

var userInfo
var endDateCache = ''

export default {
  name: 'userCardInfo',
  data () {
    return {
      name: userInfo.userName,
      idCard: userInfo.idCardNumber,
      releaseOrgan: userInfo.policeorg,
      address: userInfo.idCardAddress,
      beginDate: '',
      endDate: '',
      isAllLong: false,
      nation: '',
      qualifications: '',
      job: ''
    }
  },
  beforeCreate: function () { // 提前拿到数据绑定要用的数据，否则会报错
    userInfo = $.getSStorageInfo('userInfo')
  },
  beforeMount: function () {
    var dateExp = /\d{4}-\d{2}-\d{2}/
    var validityBeginStr = userInfo.idbegindate.trim()
    var validityEndStr = userInfo.idenddate.trim()
    this.beginDate = dateExp.test(validityBeginStr) ? validityBeginStr.replace(/-/g, '.') : '点击设置'
    this.endDate = dateExp.test(validityEndStr) ? validityEndStr.replace(/-/g, '.') : '点击设置'
    if (this.endDate === '3000.12.31') {
      this.isAllLong = true
    } else {
      this.isAllLong = false
      endDateCache = this.endDatev
    }
    // 处理民族/学历/职业
    var objEthnic = $.getSStorageInfo('selected_' + config.dictionary.ethnic)
    var objEdu = $.getSStorageInfo('selected_' + config.dictionary.edu)
    var objJob = $.getSStorageInfo('selected_' + config.dictionary.job)
    if (objEthnic) {
      this.nation = objEthnic.value
    } else {
      this.getEthnic(this)
    }
    if (objEdu) {
      this.qualifications = objEdu.value
    } else {
      this.getEdu(this)
    }
    if (objJob) {
      this.job = objJob.value
    } else {
      this.getJob(this)
    }
  },
  methods: {
    back: function () {
      this.$router.push({name: 'idCardCheck', params: {}})
    },
    switchBtn: function () {
      if (this.isAllLong) {
        this.isAllLong = false
        this.endDate = endDateCache
      } else {
        this.isAllLong = true
        this.endDate = '3000.12.31'
      }
    },
    getEthnic: function (vue) {
      Utils.queryDictionary({type: config.dictionary.ethnic, key: (userInfo.ethnic.length === 1 ? '0' + userInfo.ethnic : userInfo.ethnic)}, function (d) {
        vue.nation = d.value
        // 保存在session中
        $.setSStorageInfo('selected_' + config.dictionary.ethnic, d)
      })
    },
    getEdu: function (vue) {
      Utils.queryDictionary({type: config.dictionary.edu, key: (userInfo.eduCode)}, function (d) {
        vue.qualifications = d.value
      })
    },
    getJob: function (vue) {
      Utils.queryDictionary({type: config.dictionary.job, key: (userInfo.jobCode)}, function (d) {
        vue.job = d.value
      })
    },
    selectDetail: function (e) {
      var title = e.path[0].attributes['default-hint'].value
      var category
      category = this.switchTitle(title)

      // 页面跳转，手动修改url
      this.$router.push({name: 'dictionarySelect', params: {}})
      // 传参——事件的触发和接受必须绑定在同一个实例对象上，故BUS注册为全局变量
      var _this = this
      setTimeout(function () { // 让接收消息的地方晚于data中的初始数据绑定执行
        _this.BUS.$emit('categoryEvent', {'category': category, 'title': title})
      }, 0)
//      _this.BUS.$emit('categoryEvent', {'category': category, 'title': title})
    },
    switchTitle: function (title) {
      var category
      switch (title) {
        case '民族' : category = config.dictionary.ethnic; break
        case '学历' : category = config.dictionary.edu; break
        case '职业' : category = config.dictionary.job; break
      }
      return category
    },
    submit: function () {
      this.saveUserInfoInSession(this)
      this.$router.push({name: 'identitySupplement', params: {}})
    },
    saveUserInfoInSession: function (vue) {
      userInfo.ethnic = $.getSStorageInfo('selected_ethnicType2').key
      userInfo.ethnicname = $.getSStorageInfo('selected_ethnicType2').value
      userInfo.userName = vue.name
      userInfo.idCardNumber = vue.idCard
      userInfo.idCardAddress = vue.address
      userInfo.idbegindate = vue.beginDate.replace(/\./g, '-')
      userInfo.idenddate = vue.endDate.replace(/\./g, '-')
      userInfo.birthday = Utils.idCardToBirthday(userInfo.idCardNumber)  // 出生日期
      userInfo.eduCode = $.getSStorageInfo('selected_adapter2').key
      userInfo.jobCode = $.getSStorageInfo('selected_occupational2').key
      userInfo.policeorg = vue.releaseOrgan
    }
  }
}
</script>

