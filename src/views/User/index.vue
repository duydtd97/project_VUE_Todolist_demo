<template>
  <el-row class="tac">
    <el-col :span="6">
      <SideBar/>
    </el-col>
    <el-col :span="18">
      <Dashboard/>
    </el-col>
  </el-row>
</template>

<script>
  import Dashboard from '@/views/User/components/Dashboard/index';
  import SideBar   from '@/components/NavBar/SideBar';

  export default {
    name:"User",
    components: {Dashboard, SideBar},
    data () {
      return {

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
