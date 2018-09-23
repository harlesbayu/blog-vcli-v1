<template>
    <div class="card" style="width: 18rem; margin-bottom : 20px;">
        <img class="card-img-top" src="https://via.placeholder.com/250x150" alt="Card image cap">
        <div class="card-body">
            <p class="card-text">{{ name }}</p>
            <p class="card-text">{{ address }}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data: function () {
      return {
          name : '',
          address : ''
      }
  },
  created: function () {
      this.name = localStorage.getItem('userName')
      this.address = localStorage.getItem('userAddress')
  },
}
</script>

<style>

</style>
