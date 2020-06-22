<template>
  <div v-bind:class = '{hidden : !open}'>
    <el-row type = "flex" class = "row-bg" v-bind:class='{mgTop40: open}' justify = "center">
      <el-col :span = "8">
        <div>
          <el-collapse-transition>
            <div v-show = "open">
              <div class = "transition-box">
                <el-form ref = "form" :model = "form" :label-position = "'left'">
                  <el-form-item label = "User">
                    <el-input v-model = "form.name"></el-input>
                  </el-form-item>
                  <el-form-item label = "Password">
                    <el-input v-model = "form.pass"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type = "primary">Sign In</el-button>
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
  export default {
    name: 'Login',
    props: {
      open: {
        type: Boolean,
        default: false,
      },
      action: Function
    },
    data: () => ({
      form: {
        user: '',
        pass: '',
      },
    }),
    methods: {
      onSubmit() {
        console.log('submit!');
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
