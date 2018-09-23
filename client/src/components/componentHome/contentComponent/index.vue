<template>
    <div class="col-8">
        <router-view v-bind:statusLogin="isLogin" v-bind:articles="articles" @responupdate="updatearticle"></router-view>
    </div>
</template>

<script>

export default {
  name: 'Content',
  data: function () {
    return {
      isLogin: false
    }
  },
  props: ['statusLogin', 'articles'],
  mounted: function () {
    this.isLogin = this.statusLogin
  },
  methods: {
    updatearticle: function(value){
      this.$emit('responupdate', value)
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
