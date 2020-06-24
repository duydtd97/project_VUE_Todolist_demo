<template>
  <div>
    <el-row v-if='isLogin' class="tac">
      <el-col :span="6">
        <SideBar/>
      </el-col>
      <el-col :span="18">
        <Dashboard/>
      </el-col>
    </el-row>
    <el-row v-else class="tac">
      <p>chua dang nhap ban oi</p>
    </el-row>
  </div>
</template>

<script>
  import {AUTH_TOKEN} from '@/utils/axiosInstance';
  import Dashboard    from '@/views/User/components/Dashboard/index';
  import SideBar      from '@/components/NavBar/SideBar';
  import Cookies      from 'js-cookie';

  export default {
    name:"User",
    components: {Dashboard, SideBar},
    data () {
      return {
        isLogin: Cookies.get(AUTH_TOKEN)
      }
    }
  };
</script>

<style scoped>
  .tac{
    margin-top: 32px;
  }
  .box_avatar{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    justify-content: center;
    display: flex;
  }
</style>
