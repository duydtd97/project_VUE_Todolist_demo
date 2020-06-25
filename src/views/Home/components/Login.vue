<template>
  <div v-bind:class = '{hidden : !open}'>
    <el-row type = "flex" class = "row-bg" v-bind:class='{mgTop40: open}' justify = "center">
      <el-col :span = "8">
        <div>
          <el-collapse-transition>
            <div v-show = "open">
              <div class = "transition-box">
                <el-form ref = "formLogin" :model = "formLogin" :rules="rules" :label-position = "'left'" @submit.native.prevent>
                  <el-form-item label = "Email"
                                prop="email"
                                v-bind:error='errCode === 201 ? "" : errMess'
                  >
                    <el-input v-model = "formLogin.email"/>
                  </el-form-item>
                  <el-form-item label = "Password" prop="password">
                    <el-input v-model = "formLogin.password" autocomplete="off" type='password'/>
                  </el-form-item>
                  <el-form-item>
                    <el-button type = "primary" @click = "onSubmit" :loading="isLoading">Sign In</el-button>
                  </el-form-item>
                </el-form>

                <p style='margin-top: 40px'>Chưa có tài khoản thì
                  <b style= 'cursor: pointer' @click = "openFormRegister()">Đăng kí </b> đi bạn ôi! </p>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    axios,
    AUTH_TOKEN,
  }              from '@/utils/axiosInstance';
  import Cookies from 'js-cookie';

  export default {
    name: 'Login',
    props: {
      open: {
        type: Boolean,
        default: false,
      },
      action: Function
    },
    data() {
      const emailIsExist = (rule, value, callback) => {
        console.log('email exist' + this.errCode);
        if (value && this.errCode === 401){
          callback(new Error(this.errMess));
        }
      };

      return{
        errCode: '',
        errMess: '',
        isLoading: false,

        formLogin: {
          email: '',
          password: '',
        },
        rules:{
          email: [
            { required: true, message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
            { validator: emailIsExist, trigger: ['blur'] }
          ],
          password: [
            { required: true, message: 'Please input password', trigger: 'blur' },
            { min: 6, message: 'Length should be at least 6 character', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      onSubmit() {
        this.isLoading = true;
        axios.post('auth/signin', this.formLogin)
          .then(res =>{
            this.isLoading = false;
            localStorage.setItem('userEmail', `${res.data.email}`);
            Cookies.set(AUTH_TOKEN, res.data.auth_token, { expires: 7 });
            if(this.$route.name !== 'user') {
              this.$router.push('/user');
            } else {
              window.location.reload();
            }
          })
          .catch(err=>{
            this.isLoading = false;
            this.errMess = err.response.data.message;
            this.errCode = err.response.status;
          })
      },
      openFormRegister(){
        this.$emit('openRegister')
      }
    },
  };
</script>

<style scoped>
  .hidden {
    /*display: none;*/
    /*margin-top: 0;*/
  }

  .mgTop40 {
    margin-top: 40px;
  }

  .transition-box {
    box-sizing: border-box;
  }
</style>
