<template>
    <div>
        <div class="card mb-3" v-for="(article, index) in articles" :key="index">
            <img class="card-img-top" :src="article.picture" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{ article.title }}</h5>
                <p class="card-text">{{ article.content }}</p>
                <center>
                    <router-link :to="{ path : `/articles/${article._id}` }" relace v-bind:statusLogin="isLogin"><button type="button" class="btn btn-info">Read More</button></router-link>
                    <router-link :to="{ path : `articles/update/${article._id}` }"><button type="button" class="btn btn-warning" style="margin: 0px 5px; 0 5px;" v-if="article.author.email == userEmail && isLogin">Update</button></router-link>
                    <button v-on:click="btnDelete(article, article._id)" type="button" class="btn btn-danger" v-if="article.author.email == userEmail && isLogin">Delete</button>
                </center>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ArticleCollection',
  props: ['statusLogin', 'articles'],
  data: function () {
    return {
        userEmail: '',
        isLogin: false
    }
  },
  created: function () {
    this.userEmail   = localStorage.getItem('userEmail')
    if(localStorage.getItem('token')){
        this.isLogin = true
    } else {
        this.isLogin = false
    }
  },
  methods: {
    btnDelete: function(article, articleId) {
        let self = this
        axios({ 
            method : 'delete',
            url : `http://localhost:3000/articles/remove/${articleId}`,
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then(function(response){
           const idx = self.articles.indexOf(article)
           self.articles.splice(idx, 1)
        })
        .catch(function(err){
            console.log(err.response)
        })
    }
  } 
//   ,
//   computed: {
//       checkLogin: {
//           get: function(){
//               return this.isLogin   = this.statusLogin
//               return this.userEmail = localStorage.getItem('userEmail')
//           }
//       }
//   }
  ,
  watch: {
    statusLogin: function(value){
      this.isLogin = value
      this.userEmail = localStorage.getItem('userEmail')
    }
  }
}
</script>

<style>

</style>
