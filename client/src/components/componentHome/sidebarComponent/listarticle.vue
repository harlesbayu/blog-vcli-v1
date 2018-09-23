<template>
  <div>
    <form class="form-inline" style="width: 18rem; margin-bottom: 20px;"> 
      <input v-model="findArticle" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style="width: 18rem;">
    </form>

    <div class="card" style="width: 18rem;">
      <ul class="list-group">
          <li class="list-group-item disabled" style="background-color: #343A40; color: #FFFFFF; font-weigth: bold; text-align: center">LIST
          ARTICLE</li>
          <li class="list-group-item" style="cursor: pointer; font-weigth: bold;" v-if="isLogin" v-on:click="myArticles">My Article</li>
          <li class="list-group-item" style="cursor: pointer; font-weigth: bold;" v-on:click="allArticles">All Articles</li>
          <li class="list-group-item" v-for="(article, index) in articles" :key="index">
          <router-link :to="{ path : `/articles/${article._id}` }" relace>{{ article.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ListArticle',
  data: function () {
    return {
        articles: [],
        reloadPage: false,
    }
  },
  props: ["updatearticle", "isLogin"],
  created: function() {
    this.documentReady()
  },
  methods: {
    documentReady: function () {
      let self = this
      axios({ 
          method : 'get',
          url : 'http://localhost:3000/articles/',
      })
      .then(function(response){
          self.articles = response.data.articles
          let emitArticle = response.data.articles
          self.$emit('articlesfromlist', emitArticle)
      })
      .catch(function(err){
          console.log(err.response)
      })
    },
    myArticles: function () {
        let self = this
        axios({ 
            method : 'get',
            url : 'http://localhost:3000/articles/findArticleUser',
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(function(response){
            let emitArticle = response.data.articles
            self.$emit('articlesfromlist', emitArticle)
            self.$router.push('/')
        })
        .catch(function(err){
            console.log(err.response)
        })
    },
    allArticles: function () {
        this.documentReady()
        this.$router.push('/')
    }
  },
  computed: {
    findArticle: {
      set: function(value){
       let self = this
        axios({ 
          method : 'get',
          url : `http://localhost:3000/articles/findarticle?title=${value}`,
        })
        .then(function(response){
            let emitArticle = response.data.articles
            self.$emit('articlesfromlist', emitArticle)
            self.$router.push('/')
        })
        .catch(function(err){
            console.log(err.response)
        })
      },
      get: function(){}
    },
  },
  watch: {
      updatearticle: function(value){
          if(value){
            this.documentReady()
          }
      },
  
  }
  
}
</script>


<style>

</style>