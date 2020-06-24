<template>
  <el-row type="flex" justify='space-between' class='el-row-custom'>
    <el-col :span="16" style='text-align: left'>
      <h4 style='cursor: pointer'>Todo 1</h4>
    </el-col>
    <el-col :span="8">
      <el-row type="flex" justify='end'>

        <el-button type="primary" icon="el-icon-edit" circle/>

        <el-button type="danger" icon="el-icon-delete" circle/>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "TodoItem",
    methods:{

    }
  };
</script>

<style scoped>
  .el-row-custom{
    margin-top: 10px;
    border-bottom: 1px solid #e6e6e6;
    align-items: center;
  }
</style>
