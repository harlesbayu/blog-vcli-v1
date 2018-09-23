<template>
  <div class="container clear" style="margin-top : 20px;">
      <div class="row">
          <SideBar v-bind:statusLogin="isLogin" v-bind:updateArticle="updateArticle" @articlesfromlist="giveArticle"/>
          <Content v-bind:statusLogin="isLogin" v-bind:articles="articles" @responupdate="updatearticle"/>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '../components/componentHome/sidebarComponent/index.vue'
import Content from '../components/componentHome/contentComponent/index.vue'

export default {
  name: 'home',
  components: {
    SideBar,
    Content
  },
  data: function () {
    return {
      isLogin: false,
      articles: [],
      updateArticle: ''
    }
  },
  props: ['statusLogin'],
  mounted: function () {
    this.isLogin = this.statusLogin
  },
  created: function() {
   
  },
  methods: {
    giveArticle: function(value){
      this.articles = value
    },
    updatearticle: function(value){
      this.updateArticle = value
    }
  },
  watch: {
    statusLogin: function (value) {
      this.isLogin = value
    }
  }
}
</script>
