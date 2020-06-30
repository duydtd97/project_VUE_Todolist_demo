<template>
  <div class = 'mySideBar'>
    <div class = 'box_avatar'>
      <el-avatar :size = "100" :src = "circleUrl" />
      <p>{{userEmail}}</p>
    </div>
    <el-menu
        class = "el-menu-vertical-demo"
        style = 'border: none'
    >
      <el-menu-item index = "2" class = 'styleSubItem' @click = 'logout'>
        <i class = "el-icon-switch-button"></i>
        <span>Logout</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import {AUTH_TOKEN} from '@/utils/axiosInstance';
  import Cookies      from 'js-cookie';

  export default {
    name: 'SideBar',
    data() {
      return {
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userEmail: localStorage.getItem('userEmail'),
      };
    },
    methods: {
      logout() {
        Cookies.remove(AUTH_TOKEN);
        this.$router.push('/');
      },
    },
  };
</script>

<style scoped>
  .styleSubItem {
    text-align: left;
  }

  .styleSubItem:last-child, .styleSubItem:last-child > i {
    color: red;
  }

  .mySideBar {
    border-right: solid 1px #e6e6e6;
    min-height: calc(100vh - 50px);
  }
</style>
