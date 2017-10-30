<template>
  <div>
    <section class="main fixed" data-page="home">
      <header class="header">
        <div class="header_inner">
          <a class="icon_close" @click="closeBtn"></a>
          <h1 class="title">{{title}}</h1>
          <!--  <a class="icon_search" id="searchBtn"></a> -->
        </div>
      </header>
      <article class="content">
        <div class="list_box">
          <ul class="select_list">
            <li v-for="item in items" @click="selectLi(item)">
              <span>{{item.provincename||item.cityname}}</span>
            </li>
          </ul>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import * as $ from '../utils/base'

var pageParam

export default {
  name: 'countySelect',
  data () {
    return {
      title: '',
      items: []
    }
  },
  mounted: function () {
    pageParam = this.$route.params
    this.title = pageParam['title']
    this.$options.methods.fillPage(this, pageParam['selectCategory'])
  },
  methods: {
    fillPage: function (_this, selectCategory) {
      switch (selectCategory) {
        case 'province':
          _this.items = $.getSStorageInfo('countyprovinceData')
          break
        case 'city':
          _this.items = $.getSStorageInfo('countycityData').filter(function (item, index, arr) {
            return (item.provincenno === $.getSStorageInfo('selected_prov_city').provinceno)
          })
          break
      }
    },
    selectLi: function (item) {
      item.title = this.title
      $.setSStorageInfo('selected_prov_city', item)
      this.$router.push({name: 'provinceCitySelect', params: {}})
    },
    closeBtn: function () {
      this.$router.push({name: 'provinceCitySelect', params: {}})
    }
  }
}
</script>
