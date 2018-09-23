<template>
    <div class="col-4">
        <UserProfile v-if="isLogin"/>
        <AddArticle v-if="isLogin"/>
        <ListArticle v-bind:isLogin="isLogin" v-bind:updatearticle="updateArticle" @articlesfromlist="giveArticle"/>
    </div>
</template>

<script>

import UserProfile from './userprofile.vue'
import AddArticle from './addarticle.vue'
import ListArticle from './listarticle.vue'

export default {
  name: 'SideBar',
  components: {
    UserProfile,
    AddArticle,
    ListArticle
  },
  data: function () {
    return {
      isLogin: false,
      articles: [],
    }
  },
  props: ['statusLogin', 'updateArticle'],
  mounted: function () {
    this.isLogin = this.statusLogin
  },
  methods: {
    giveArticle: function(value){
      this.$emit('articlesfromlist', value)
    }
  },
  watch: {
    statusLogin: function (value) {
      this.isLogin = value
    }
  }
}

</script>

<style>

</style>
