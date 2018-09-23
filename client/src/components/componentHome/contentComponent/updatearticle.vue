<template>
    <div id="addArticle" v-if="statusLogin">
        <h3>Update Article</h3>
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" placeholder="Title" v-model="title">
            <label>Content</label>
            <textarea class="form-control" rows="7" v-model="content"></textarea>
            <button type="button" class="btn btn-primary btn-block" style="margin-top: 20px;" v-on:click="btnUpdate">Update
                Article</button>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdateArticle',
  props: ['statusLogin'],
  data: function () {
    return {
      title: '',
      content: ''
    }
  },
  created: function () {
      this.documentReady()
  },
  methods: {
    documentReady: function() {
      let self = this
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${this.articleId}`
      })
        .then(function (response) {
          self.title = response.data.article.title
          self.content = response.data.article.content
        })
        .catch(function (err) {
          console.log(err.response)
        })
    },
    btnUpdate: function () {
      let data = {
        title: this.title,
        content: this.content
      }
      let self = this
      axios({
        method: 'put',
        url: `http://localhost:3000/articles/update/${self.articleId}`,
        data,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          self.title = ''
          self.content = ''
          let count = Math.random()*1000
          self.$emit('responupdate', count)
          self.$router.push('/')
        })
        .catch(function (err) {
          console.log(err.response)
        })
    }
  },
  computed: {
    // cekLogin: {
    //   get: function(){
    //     if(this.statusLogin == false){
    //       return this.$router.push('/')
    //     } else {
    //       return  this.isLogin = this.statusLogin
    //     }
        
    //   }
    // },
    articleId: {
        get: function () {
          return this.$route.params.id
        }
    }
  },
  watch: {
    statusLogin: function(value){
      if(value == false){
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>

</style>
