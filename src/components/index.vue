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
              <input class="t1" id="mobileNumber" type="tel" v-model.trim="param.mobile_no" format="phone" maxlength="11" placeholder="手机号"/>
              <a class="txt_close" style="display: none"></a>
            </div>
            <div class="input_text">
              <input class="t1" type="text" v-model.trim="param.verifyNumber" maxlength="4"  placeholder="验证码"/>
              <a class="code_img" id="verifyImage"><img :src="imageSrc" @click="refresh"/></a>
            </div>
            <div class="input_text">
              <input class="t1" type="tel" maxlength="6" v-model.trim="param.mobile_code" format="\d{6}" placeholder="短信验证码"/>
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
import * as $ from '../utils/base'
var vue

export default {
  name: 'index',
  data () {
    return {
      imageSrc: config.serverUrl + '/TicketImgServlet?key=' + Math.random(),
//      phone: '',
//      verifyNumber: this.imageSrc,
//      smsNumber: ''
      param: {
        mobile_no: '',
        verifyNumber: this.imageSrc,
        mobile_code: ''
      }
    }
  },
  methods: {
    refresh: function () {
      this.imageSrc = config.serverUrl + '/TicketImgServlet?key=' + Math.random()
    },
    login: function () {
      this.param['funcNo'] = '601521'
      this.param['login_flag'] = '2'
      this.param['business_type'] = '2'
      this.param['flow_type'] = 'twvideo'
      vue = this  // 此处this指向vue实例对象
      $.request(this.param, function (results) {
        if (results.error_no === '0') {
          $.clearSStorage('referrerCodeList')
          $.setSStorageInfo('_isLoginIn', 'true')   // 登陆标记
          vue.$options.methods.saveUserInfo(results.results[0])
          vue.$options.methods.next(results.results[0])
        } else {
          alert(results.error_info)
          vue.$options.methods.refresh()
        }
      })
    },
    // 保存用户信息
    saveUserInfo: function (result) {
      // 此处this却指向methods对象
      console.log(this)
      // 全局用户的自动填充的数据都存入这个对象中
      // 后面的新增的信息 在提交成功后需要修改这个对象  （例如：身份证信息补充完成后把身份证信息更新到这个类里来
      var userInfo = {
        clientId: result.clientinfo,    // 登陆信息
        jsessionId: result.jsessionid,  // session id
        userId: result.user_id, // 用户编号
        last_step: result.lastcomplete_step, // 最后一步
        mealId: result.tcID, // 服务套餐id
        mealName: result.tcMZ, // 服务套餐名
        meal_desc: result.tcDesc, // 服务套餐详情
        mobileNumber: vue.param.mobile_no,  // 手机号
        birthday: result.birthday,  // 出生日期 1988-3-15
        policeorg: result.policeorg,  // 发证机关名
        referrerCode: result.recommendno,  // 推荐人编号
        zipCode: result.postid, // 邮政编码
        jobCode: result.profession_code,    // 职业代码
        eduCode: result.edu,    // 学历代码
        credentialsType: result.idtype, // 证件类型
        countryCode: result.nationality,    // 国家编号
        userName: result.custname, // 用户名称
        idCardNumber: result.idno,  // 身份证号码
        idCardAddress: result.native,   // 证件地址/户籍地址
        idbegindate: result.idbegindate, // 身份证有效期 开始  2028-02-04
        idenddate: result.idenddate,    // 身份证有效期 结束 2028-02-04
        exchangeFundAccountSZ: result.szfnd_str,    // 深圳场内基金账户
        exchangeFundAccountSH: result.shfnd_str,    // 上海场内基金账户
        aStockAccountSZ: result.sza_str,    //  深圳A股账户
        aStockAccountSH: result.sha_str,    // 上海A股账户
        offFundAccountSZ: result.sz_open_funds,    // 深圳场外基金
        offFundAccountSH: result.sh_open_funds,    // 上海场外基金
        nextStep: result.next_step, // 下一个节点标志
        branchName: result.branchname, // 营业部名称
        branchCode: result.branchno,   // 营业部编号
        contactAddress: result.addr,    // 联系人地址
        cityNo: result.cityNo, // 市区编号
        urgentContactName: result.contacts,    // 紧急联系人名称
        urgentContactTel: result.contactsphone,    // 紧急联系人电话
        bankAccount: result.bank_account,   // 三方存管账户
        bankCode: result.bankcode, // 三方存管银行编号
        ethnic: result.ethnic,  // 民族
        postid: result.postid, // 邮编
        templateid: result.templateid, // 服务套餐
        isReject: +result.reject_flag ? 1 : 0,   // 驳回标志
        witnessType: +result.current_witness_way, // 0:双向视频;1:单向视频;
        spreadBankCode: result.tg_bank_no,  // 推广  三方存管银行编号
        spreadBranchCode: result.tg_branch_no,  // 推广  营业部编号
        spreadReferrerCode: result.tg_recommendno, // 推广  推荐人信息
        product_code: result.product_code,
        product_name: result.product_name,
        tot_price: result.tot_price,
        investment_horizon: result.investment_horizon,
        accrual_startDate: result.accrual_start_date,
        expired_date: result.expired_date,
        need_info: result.need_info, // 驳回信息
        need_info_reason: result.need_info_reason, // 驳回信息原因

        need_photo: result.need_photo, // 驳回照片
        need_photo_reason: result.need_photo_reason, // 驳回照片原因

        // 驳回视频
        need_video: result.need_video,
        need_video_reason: result.need_video_reason
      }
      $.setSStorageInfo('userInfo', userInfo)  // 用户信息
    },
    // 下一步流程判断
    next: function (r) {
      var param = {
        funcNo: '601518',
        userid: r.user_id,
        user_step: 'login',
        kh_version: '3.0'
      }
      $.request(param, function (results) {
        if (results.error_no === '0') {
          if (r.need_photo === '1') {
//            $.alert(r.need_photo_reason,"",function(){
//              $.pageInit(pageCode,"account/idCardCheck");
//            });
            // 驳回信息
          } else if (r.need_info === '1') {
//            $.alert(r.need_info_reason,"",function(){
//              $.pageInit(pageCode,"account/identitySupplement");
//            });
            // 驳回视频
          } else {
            // 保存银行信息
            var result = results.results
            var bankcodeStr = ''
            if (!!result && result.length > 0) {
              $.each(result, function (index, item) {
                if (!!item.bank_dm && true) {
                  bankcodeStr += item.bank_dm + '|'
                }
              })
              $.setSStorageInfo('bankcodeStr', bankcodeStr)
            } else {
              $.clearSStorage('bankcodeStr')
            }
            vue.$options.methods.nextStep()
          }
        } else {
          alert(results.error_info)
          vue.$options.methods.refresh()
        }
      })
    },
    // 跳转到下个页面
    nextStep: function () {
      var userInfo = $.getSStorageInfo('userInfo')
      var currentStep = userInfo.last_step // 断点：上次走的最后一步
      if (currentStep && currentStep.length > 0) {
        var index = config.steps.indexOf(currentStep)
        if (index < (config.steps.length - 1)) {
          currentStep = config.steps[index + 1]
        }
        // 页面跳转，手动修改url
        vue.$router.push({name: config.stepMap[currentStep], params: {}})
      } else {
        // 页面跳转，手动修改url
        vue.$router.push({name: 'idCardCheck', params: {}})
      }
    }
  }
}
</script>

