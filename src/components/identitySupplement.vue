<template>
  <div>
    <section class="main fixed hx_page" data-page="home">
      <header class="header">
        <div class="header_inner hd_inner01">
          <a class="icon_back" @click="back" href="javascript:void(0);"></a>
          <h1 class="title">身份信息</h1>
        </div>
      </header>
      <article class="content">
        <div class="user_main hx_main mt10">
          <div class="input_form">
            <div class="input_text">
              <span class="tit">{{tit.tit1}}</span>
              <div class="dropdown" @click="selectAddress" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                   required default-hint="联系地址" error-hint="请选择地址"></div>
            </div>
            <div class="input_text">
              <span class="tit">邮编</span>
              <input type="number" class="t1" name="" id="postCode" value="" required format="^([\d]{6})$" maxlength="6"
                     default-hint="邮编" error-hint="邮编格式不正确"/>
            </div>
            <div class="input_text">
              <span class="tit">营业部</span>
              <div class="dropdown" id="branch_btn" branch_no="" required default-hint="营业部"
                   error-hint="请选择[营业部]"></div>
            </div>
            <div class="input_text">
              <span class="tit">服务套餐</span>
              <input class="t1" type="text" value="" id="serviceMeal" required default-hint="服务套餐" error-hint="服务套餐不能为空"
                     readonly="readonly">
              <a class="icon_explain" id="serviceMeal_info"></a>
              <div class="arrow" id="serviceMealJump"></div>
              <a href="javascript:void(0);" class="sel"></a>
            </div>
            <div class="input_text">
              <span class="tit">推荐人编号（选填）</span>
              <input class="t1" type="text" value="" id="referrerNo" style="border-bottom:1px solid #efefef;"
                     maxlength="12" required default-hint="推荐人编号（选填）" error-hint="请选择或填写[推荐人编号]">
              <div class="arrow" id="referrerNoJump"></div>
              <a href="javascript:void(0);" class="sel"></a>
            </div>
            <div class="set_pword">
              <div class="input_text">
                <span class="tit" style="color:#333333">账户实际控制人为本人</span>
                <div class="t1" style="border:none;">
                  <div class="switch_box">
                    <input id="switch_box1" class="sdx needsclick" type="checkbox" checked="checked"/>
                    <div class="swt_inner">
                      <div class="switch_btn"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input_text">
                <span class="tit" style="color:#333333">账户实际受益人为本人</span>
                <div class="t1" style="border:none;">
                  <div class="switch_box">
                    <input id="switch_box2" class="sdx needsclick" type="checkbox" checked="checked"/>
                    <div class="swt_inner">
                      <div class="switch_btn"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input_text">
                <span class="tit" style="color:#333333">是否担任董事、监事或高级管理人员</span>
                <div class="t1" style="border:none;">
                  <div class="switch_box">
                    <input id="switch_box3" class="sdx needsclick" type="checkbox"/>
                    <div class="swt_inner">
                      <div class="switch_btn"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="com_title mt15">
            <p>诚信记录</p>
          </div>
          <div class="record_main">
            <div id="zc_check" class="record_box">
              <h5>请按照您的实际情况选择<span>（单选）</span></h5>
              <ul>
                <li><span class="icon_radio checked">无不良诚信记录</span></li>
                <li><span class="icon_radio">有不良诚信记录</span></li>
              </ul>
            </div>
            <div id="zx_detail" class="record_box" style="display: none;">
              <h5>您是否有以下来源的不良诚信记录<span>（可多选）</span></h5>
              <ul>
              </ul>
            </div>
          </div>
          <div class="com_title">
            <p>个人税收声明</p>
          </div>
          <div class="record_main">
            <div id="ss_check" class="record_box">
              <h5>本人声明<span>（单选）</span></h5>
              <ul>
                <li><span value="1" class="icon_radio checked">本人仅为中国税收居民</span></li>
                <li><span value="0" class="icon_radio">本人仅为非中国税收居民</span></li>
                <li><span value="2" class="icon_radio">本人既是中国税收居民又是其他国家(地区)税收居民</span></li>
              </ul>
              <span class="icon_check checked"><a id="shuishou" href="javascript:void(0)">《个人税收居民身份声明文件》</a></span>
            </div>
          </div>

          <div class="proto_box mt10" id="agreeProtocols">
          </div>
        </div>
        <div class="ce_btn mt10"><a href="javascript:void(0);" id="submit">确认并提交</a></div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'identitySupplement',
  data () {
    return {
      tit: {
        tit1: '联系地址'
      }
    }
  },
  mounted: function () {
    this.tit.tit1 = this.$route.params.address
  },
  methods: {
    back: function () {
      this.$router.push({name: 'userCardInfo', params: {}})
    },
    selectAddress: function () {
      this.$router.push({name: 'provinceCitySelect', params: {}})
    }
  }
}
</script>
