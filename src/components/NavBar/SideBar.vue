<template>
  <div class='mySideBar'>
    <div class='box_avatar'>
      <el-avatar :size="100" :src="circleUrl"/>
      <p>abc@gmail.clm</p>
    </div>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        style='border: none'
        @open="handleOpen"
        @close="handleClose">
      <el-submenu index="1" class='styleSubItem'>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2" class='styleSubItem'>
        <i class="el-icon-menu"></i>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" class='styleSubItem' disabled>
        <i class="el-icon-document"></i>
        <span>Navigator Three</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name:'SideBar',
    data () {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    }
  };
</script>

<style scoped>
  .styleSubItem{
    text-align: left;
  }
  .mySideBar{
    border-right: solid 1px #e6e6e6;
    min-height: calc(100vh - 40px);
  }
</style>
