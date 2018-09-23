<template>
    <div>
        <h1 class="mt-4">{{ article.title }}</h1>

        <p class="lead">
            by
            <a href="#">{{ author }}</a>
        </p>

        <hr>
        <!-- Date/Time -->
        <p>Posted on {{ new Date(article.createdAt) }}</p>

        <hr>
        <!-- Preview Image -->
        <img class="img-fluid rounded" :src="article.picture" alt="">

        <hr>

        <!-- Post Content -->
        <p class="lead">{{ article.content }}</p>
        <hr>

        <!-- Comments Form -->
        <div class="card my-4" v-if="userEmail !== authorEmail && isLogin">
            <h5 class="card-header">Leave a Comment:</h5>
            <div class="card-body">
                <div class="form-group">
                    <textarea class="form-control" rows="3" v-model="msgComment"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="btnComment(article._id)">Submit</button>
            </div>
        </div>

        <div class="media mb-4" v-for="(comment, index) in comments" :key="index">
            <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
            <div class="media-body">
                <h5 class="mt-0">{{ comment.user.name }}</h5>
                {{ comment.status }}
            </div>
            <button type="button" class="btn btn-danger" v-if="isLogin && comment.user.email === userEmail" v-on:click="btnDelete(comment._id)">Delete</button>
        </div>
        <!-- Comment with nested comments -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FullPageArticle',
  props: ['statusLogin'],
  data: function () {
    return {
      author: '',
      userEmail: '',
      authorEmail: '',
      msgComment: '',
      articleId: '',
      article: {},
      comments: [],
      isLogin: false
    }
  },
  created: function () {
    this.documentReady()
    let token = localStorage.getItem('token')
    if(token){
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  methods: {
    documentReady: function () {
      this.articleId = this.$route.params.id
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${this.articleId}`
      })
        .then(function (response) {
          self.comments = response.data.article.comments
          self.article = response.data.article
          self.author = self.article.author.name
          self.authorEmail = self.article.author.email
          self.userEmail = localStorage.getItem('userEmail')
        })
        .catch(function (err) {
          console.log(err.response)
        })
    },
    btnComment: function (articleId) {
      let self = this
      axios({
        method: 'post',
        url: `http://localhost:3000/comments/${articleId}`,
        data: {
          status: this.msgComment
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          self.msgComment = ''
          self.documentReady()
        })
        .catch(function (err) {
          console.log(err.response)
        })
    },
    btnDelete: function(commentId){
      let self = this
      axios({
        method: 'delete',
        url: `http://localhost:3000/comments/remove/${commentId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          self.documentReady()
        })
        .catch(function (err) {
          console.log(err.response)
        })
    }
  },
  computed: {
    getArticleIdFormParams: {
      get: function () {
        return this.$route.params.id
      }
    },
    checkLogin: {
      get: function () {
        return this.isLogin   = this.statusLogin
        return this.userEmail = localStorage.getItem('userEmail')
      }
    }
  },
  watch: {
    getArticleIdFormParams: function (value) {
      this.articleId = value
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${this.articleId}`
      })
        .then(function (response) {
          self.comments = response.data.article.comments
          self.article = response.data.article
          self.author = self.article.author.name
          self.authorEmail = self.article.author.email
          self.userEmail = localStorage.getItem('userEmail')
          self.isLogin = self.checkLogin
        })
        .catch(function (err) {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>

</style>
