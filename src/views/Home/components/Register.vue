<template>
  <div v-bind:class = '{show : !open}'>
    <el-row type = "flex" class = "row-bg mgTop40" justify = "center">
      <el-col :span = "8">
        <div>
          <transition name="el-zoom-in-top">
            <div v-show = "open">
              <div class = "transition-box">
                <el-form ref = "formRegister" :model = "formRegister" :rules="rules" :label-position = "'left'" v-on:submit.prevent>
                  <el-form-item label = "Email"
                                prop="email"
                                v-bind:error='errMess'
                  >
                    <el-input v-model = "formRegister.email" />
                  </el-form-item>
                  <el-form-item label = "Password" prop="password">
                    <el-input v-model = "formRegister.password" autocomplete="off" type='password'/>
                  </el-form-item>
                  <el-form-item label = "Confirm Password" prop="password_confirmation">
                    <el-input v-model = "formRegister.password_confirmation" autocomplete="off" type='password'/>
                  </el-form-item>
                  <el-form-item>
                    <el-button type = "primary" @click = "onSubmit">Sign Up</el-button>
                  </el-form-item>
                </el-form>

                <p style='margin-top: 40px'>Có tài khoaỏn rồi thì
                  <b style= 'cursor: pointer' @click = "openFormLogin()" >Đăng Nhập </b> luôn nha! </p>
              </div>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {axios} from '@/utils/axiosInstance';

  export default {
    name: 'Register',
    props: {
      open: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.formRegister.password_confirmation !== '') {
            this.$refs.formRegister.validateField('password_confirmation');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.formRegister.password) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };

      const emailIsExist = (rule, value, callback) => {
        console.log('email exist' + this.errCode);
        if (value && this.errCode === 422){
          callback(new Error(this.errMess));
        }
      };

      return{
        errCode: '',
        errMess: '',

        formRegister: {
          email: '',
          password: '',
          password_confirmation: '',
        },
        rules: {
          email: [
              { required: true, message: 'Please input email address', trigger: 'blur' },
              { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
              { validator: emailIsExist, trigger: ['blur'] }
            ],
          password: [
            { required: true, message: 'Please input password', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          password_confirmation: [
            { required: true, message: 'Please input password_confirmation', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      onSubmit() {
        axios.post('/auth/signup', this.formRegister)
          .then(res =>{
            this.errCode = res.status;
            console.log(res);
          })
          .catch(err=>{
            this.errMess = err.response.data.message;
            this.errCode = err.response.status;
            console.log(err.response);
          })
      },
      openFormLogin(){
        this.$emit('openLogin')
      }
    },
  };
</script>

<style scoped>
  .show {
    display: none;
    height: 0;
  }

  .mgTop40 {
    margin-top: 40px;
  }

  .transition-box {
    box-sizing: border-box;
  }
</style>
