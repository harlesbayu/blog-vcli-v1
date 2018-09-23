<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link to="/">BLOG</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/"><a class="nav-link">Home <span class="sr-only">(current)</span></a></router-link>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link">Article</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li> -->
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-if="isLogin">
                        <a class="nav-link" v-on:click="btnLogout" style="color: #FFFFFF; font-weight:bold; cursor: pointer;">Logout</a>
                    </li>
                    <li class="nav-item" v-else>
                        <a class="nav-link" data-toggle="modal" data-target="#modalLogin" style="color: #FFFFFF; font-weight:bold; cursor: pointer;">Login</a>
                    </li>
                </ul>
            </form>
        </div>
    </nav>

    <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="modalLogin" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" placeholder="Email" v-model="email">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" placeholder="Password" v-model="password">
                        </div>
                    </div>
                </div>
                <p>Didn't have account? <span data-dismiss="modal" style="color:blue; cursor: pointer" data-toggle="modal" data-target="#modalRegister" >Register Here</span></p>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="btnLogin">Signin</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="modalRegister" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="name" v-model="name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Picture</label>
                        <div class="col-sm-10">
                            <input type="file">
                        </div>
                    </div>
                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1"
                                        value="male" checked v-model="gender">
                                    <label class="form-check-label" for="gridRadios1">
                                        Male
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2"
                                        value="female" v-model="gender">
                                    <label class="form-check-label" for="gridRadios2">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Phone</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Phone number" v-model="phone">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Address" v-model="address">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" placeholder="Email" v-model="email">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" placeholder="Pasword" v-model="password">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="btnSignup">Signup</button>
                </div>
            </div>
        </div>
    </div>

    <router-view v-bind:statusLogin="isLogin" />
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "app",
    data: function () {
      return {
          name : '',
          picture : '',
          gender : '',
          phone : '',
          address : '',
          email : '',
          password : '',

          isLogin : false
      }
    },
    created : function () {
        localStorage.getItem('userEmail')
        let token = localStorage.getItem('token')
        if(token){
            this.isLogin = true
        } else {
            this.isLogin = false
        }
    },
    methods: {

    btnSignup: function() {

        let data = {
        name : this.name,
        picture : this.picture,
        gender : this.gender,
        phone : this.phone,
        address : this.address,
        email : this.email,
        password : this.password
        }

        axios({
            method : 'post',
            url : 'http://localhost:3000/users/signup',
            data
        })
        .then(function(response){
            $('#modalRegister').modal('hide');
        })
        .catch(function(err){
            console.log(err.response)
        })

    },

    btnLogin: function() {

        let data = {
            email : this.email,
            password : this.password
        }
        let self = this
        axios({
            method : 'post',
            url : 'http://localhost:3000/users/signin',
            data
        })
        .then(function(response){
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userEmail', response.data.email)
            localStorage.setItem('userName', response.data.name)
            localStorage.setItem('userAddress', response.data.address)
            self.isLogin = true
            $('#modalLogin').modal('hide');
        })
        .catch( function (err) { })
    },

    btnLogout: function () {
      localStorage.removeItem('token')
      localStorage.removeItem('userEmail')
      this.isLogin = false
    }
  }
}
</script>

<style>

</style>
