<template>
  <div class = "hello">
    <h1 class="pre-formatted">{{ msg }}</h1>

    <!--    <el-row>-->
    <!--      <el-button @click = "changeOpenLogin()">Đăng nhập</el-button>-->
    <!--    </el-row>-->

    <Login v-if='openLogin' v-bind:open = 'openLogin' @openRegister='changeOpenRegister()'/>
    <Register v-if='openRegister' v-bind:open = 'openRegister' @openLogin='changeOpenLogin()'/>

  </div>
</template>


<script>
  import Login    from '@/components/Account/Login';
  import Register from '@/components/Account/Register';

  export default {
    name: 'Home',
    components: {Register, Login},
    props: {
      msg: String,
    },
    data() {
      return {
        dialogVisible: false,
        openLogin: true,
        openRegister: false,
      };
    },
    computed: {},
    methods: {
      changeOpenLogin() {
        this.openLogin    = !this.openLogin;
        this.openRegister = false;
      },
      changeOpenRegister() {
        this.openRegister = !this.openRegister;
        this.openLogin    = false;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pre-formatted {
    white-space: pre;
  }
</style>
