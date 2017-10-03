<template>
  <section class="main fixed">
    <article>
      <div class="load_box">
        <div class="content_bottom">
          <div class="buttons_box">
            <a @click="jumpToMyBlog" href="javascript:void(0);">我的博客</a>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'download',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    jumpToMyBlog: function () {
      window.location.href = 'http://blog.csdn.net/u012158998/article/details/73731525'
    }
  }
}
</script>
