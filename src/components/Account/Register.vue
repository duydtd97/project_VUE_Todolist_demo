<template>
  <div v-bind:class = '{show : !open}'>
    <el-row type = "flex" class = "row-bg mgTop40" justify = "center">
      <el-col :span = "8">
        <div>
          <transition name="el-zoom-in-top">
            <div v-show = "open">
              <div class = "transition-box">
                <el-form ref = "form" :model = "form" :label-position = "'left'">
                  <el-form-item label = "User">
                    <el-input v-model = "form.name" />
                  </el-form-item>
                  <el-form-item label = "Password">
                    <el-input v-model = "form.pass" />
                  </el-form-item>
                  <el-form-item label = "Confirm Password">
                    <el-input v-model = "form.rePass" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type = "primary" @click = "onSubmit">Sign Up</el-button>
                  </el-form-item>
                </el-form>

                <p style='margin-top: 40px'>Có tài khoaỏn rồi thì
                  <b style= 'cursor: pointer' @click = "openFormLogin()">Đăng Nhập </b> luôn nha! </p>
              </div>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    props: {
      open: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      form: {
        user: '',
        pass: '',
        rePass: '',
      },
    }),
    methods: {
      onSubmit() {
        console.log('submit!');
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
