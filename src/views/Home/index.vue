<template>
  <div class = "hello">
    <img alt = "Vue logo" src = "../../assets/logo.png">

    <h1 class = "pre-formatted">Đăng nhập trước đã rồi làm gì thì làm nhé !</h1>

    <Login v-if = 'openLogin' v-bind:open = 'openLogin' @openRegister = 'changeOpenRegister()' />
    <Register v-if = 'openRegister' v-bind:open = 'openRegister' @openLogin = 'changeOpenLogin()' />

  </div>
</template>


<script>
  import Login    from '@/views/Home/components/Login';
  import Register from '@/views/Home/components/Register';

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

  .hello {
    margin-top: 32px;
  }
</style>
