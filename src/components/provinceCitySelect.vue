<template>
  <div>
    <section class="main fixed hx_page" data-page="home">
      <header class="header">
        <div class="header_inner hd_inner01">
          <a class="icon_back" id="icon_back" href="javascript:void(0);"></a>
          <h1 class="title">联系地址</h1>
          <!--   <a class="icon_location" id="mapLocationBtn"></a>-->
        </div>
      </header>
      <article class="content">
        <div class="user_main hx_main mt10">
          <div class="input_form">
            <div class="input_text">
              <span class="tit">{{tit.tit1}}</span>
              <div class="dropdown" @click="provinceSelect" :category="category.category1" required error-hint="请选择[省/直辖市]"></div>
            </div>
            <div class="input_text">
              <span class="tit">{{tit.tit2}}</span>
              <div class="dropdown" @click="citySelect" :category="category.category2" required default-hint="市/区/县" error-hint="请选择[市/区/县]"></div>
            </div>
            <div class="input_text">
              <span class="tit">{{tit.tit3}}</span>
              <input class="t1" type="text" value="" v-model="detail" style="border-bottom:1px solid #efefef" required default-hint="详细地址" error-hint="请输入详细地址" >
              <!-- 	<span class="t1">永修县何市镇大筒子三村八队28号</span> -->
            </div>
          </div>
        </div>
        <div class="ce_btn"><a @click="submit">确定</a></div>
      </article>
      <span class="id_icon"></span>
    </section>
  </div>
</template>

<script>
import * as $ from '../utils/base'

export default {
  name: 'provinceCitySelect',
  data () {
    return {
      detail: '',
      selected_prov: $.getSStorageInfo('selected_prov'),
      selected_city: $.getSStorageInfo('selected_city'),
      tit: {
        tit1: '省/直辖市',
        tit2: '市/区/县',
        tit3: '联系地址'
      },
      category: {
        category1: 'province',
        category2: 'city'
      },
      provinceList: $.getSStorageInfo('countyprovinceData'),
      cityList: $.getSStorageInfo('countycityData')
    }
  },
  mounted: function () {
    // 将字典数据缓存在data中
    if (!this.provinceList || !this.cityList) {
      this.$options.methods.queryAddressDic()
    }
    // 填充页面数据（如果有数据的话）
    this.$options.methods.fillData(this)
  },
  methods: {
    queryAddressDic: function () {
      var param = {funcNo: '601513'}
      $.request(param, function (results) {
        if (results.error_no === '0') {
          $.setSStorageInfo('countyprovinceData', results.provinceList)
          $.setSStorageInfo('countycityData', results.cityList)
        } else {
          alert(results.error_info)
        }
      })
    },
    fillData: function (_this) {
      var selectedProvCity = $.getSStorageInfo('selected_prov_city')
      // countycityData里面是provincenno， countyprovinceData里面是provinceno
      var resultp = _this.provinceList.filter(function (item, index, arr) {
        return (item.provinceno === selectedProvCity.provinceno)
      })
      if (resultp.length > 0) {
        _this.tit.tit1 = resultp[0].provincename
        $.setSStorageInfo('selected_prov', resultp[0].provincename)
        if (_this.tit.tit2 === '市/区/县') {
          var resultc = _this.cityList.filter(function (item, index, arr) {
            return (item.provincenno === resultp[0].provinceno)
          })
        }
        if (resultc.length > 0) {
          _this.tit.tit2 = resultc[0].cityname
          $.setSStorageInfo('selected_city', resultc[0].cityname)
        }
      } else {
        // 读取缓存数据
        if (_this.selected_prov !== '' && _this.selected_prov !== undefined) {
          _this.tit.tit1 = _this.selected_prov
        }
        if (selectedProvCity !== '') {
          _this.tit.tit2 = selectedProvCity.cityname
        } else {
          if (_this.selected_city !== '' && _this.selected_city !== undefined) {
            _this.tit.tit2 = _this.selected_city
          }
        }
      }
    },
    provinceSelect: function () {
      this.$router.push({name: 'countySelect', params: {'title': this.tit.tit1, 'selectCategory': this.category.category1}})
    },
    citySelect: function () {
      this.$router.push({name: 'countySelect', params: {'title': this.tit.tit2, 'selectCategory': this.category.category2}})
    },
    submit: function () {
      this.$router.push({name: 'identitySupplement', params: {'address': this.tit.tit1 + this.tit.tit2 + this.detail}})
    }
  }
}
</script>
