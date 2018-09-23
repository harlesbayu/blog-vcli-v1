<template>
    <div id="addArticle" v-if="isLogin">
      <h3>Create Article</h3>
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" placeholder="Title" v-model="title">
            <label>Picture</label>
            <input type="file" class="form-control" v-on:change="getImage">
            <label>Content</label>
            <textarea class="form-control" rows="7" v-model="content"></textarea>
            <button type="button" class="btn btn-primary btn-block" style="margin-top: 20px;" v-on:click="btnCreate">Create
                Article</button>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateArticle',
  props: ['statusLogin'],
  data: function () {
    return {
      title: '',
      content: '',
      image: '',
      isLogin: false
    }
  },
  created: function () {
    this.documentReady()
  },
  methods: {
    documentReady () {
      let token = localStorage.getItem('token')
      if (token) {
        this.isLogin = true
      } else {
        this.$router.push('/')
      }
    },
    btnCreate: function () {
  
      let self = this
      let formData = new FormData()
      formData.append('image', this.image)
      axios.post('http://localhost:3000/articles/upload/image', formData)
      .then(function (response) {
          let data = {
            title: self.title,
            content: self.content,
            picture: response.data.link,
          }
          
          axios({
            method: 'post',
            url: 'http://localhost:3000/articles/create',
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
            self.$router.push(`/articles/${response.data.articleId}`)
          })
          .catch(function (err) {
            console.log(err.response)
          })


        })
        .catch(function (err) {
          console.log(err.response)
      })      

     
    },
    getImage: function(image){
      this.image = image.target.files[0]
    }
  }
}
</script>

<style>

</style>
