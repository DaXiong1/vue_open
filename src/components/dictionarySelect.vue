<template>
  <div>
    <section class="main fixed" data-page="home">
      <header class="header">
        <div class="header_inner hd_inner01">
          <a class="icon_close" @click="closeBtn"></a>
          <h1 class="title">选择{{title}}</h1>
        </div>
      </header>
      <article class="content">
        <ul class="select_list" id="list">
          <li v-for="item in items" @click="selectLi(item)">
            <span>{{item.value}}</span>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>

<script>
import * as Utils from '../utils/util'
import * as $ from '../utils/base'

export default {
  name: 'dictionarySelect',
  data () {
    console.log('data')
    return {
      title: '',
      items: [],
      category: ''
    }
  },
  methods: {
    closeBtn: function () {
      this.$router.push({name: 'userCardInfo', params: {}})
    },
    selectLi: function (item) {
      item.title = this.title
      $.setSStorageInfo('selected_' + this.category, item)
      this.$router.push({name: 'userCardInfo', params: {}})
    },
    fillList: function (_this, data) {
      _this.items = data
    }
  },
  mounted: function () {
    var _this = this
    _this.BUS.$on('categoryEvent', function (param) {
      console.log(param.title)
      _this.title = param.title
      // 查询字典
      if (param.category) {
        _this.category = param.category
        Utils.queryDictionary({type: param.category}, function (data) {
          data && _this.fillList(_this, data)
        })
      }
      _this.BUS.$off('categoryEvent') // 否则会多次触发
    })
//    console.log('abc')
//    _this.title = 'abc'
  }
}
</script>
