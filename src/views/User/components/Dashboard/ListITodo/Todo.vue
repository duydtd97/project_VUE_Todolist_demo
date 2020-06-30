<template>
  <el-row type = "flex" justify = 'space-between' class = 'el-row-custom'>
    <el-col :span = "16" style = 'text-align: left'>
      <h4 style = 'cursor: pointer' @click = 'openDialogCheck'>{{title}}</h4>
    </el-col>
    <el-col :span = "8">
      <el-row type = "flex" justify = 'end'>

        <el-button type = "primary" icon = "el-icon-edit" circle @click = 'openDialogEdit' />

        <el-button type = "danger" icon = "el-icon-delete" circle @click = 'openDialogDel' />

      </el-row>
    </el-col>
  </el-row>
</template>

<script>


  export default {
    name: 'TodoItem',
    components: {},
    props: {
      title: String,
      data: Object,
    },
    data() {
      return {};
    },
    methods: {
      openDialogEdit() {
        this.$emit('openDialogEdit');
      },
      openDialogDel() {
        this.$emit('openDialogDel');
      },
      openDialogCheck() {
        this.$emit('openDialogCheck');
      },
    },
  };
</script>

<style scoped>
  .el-row-custom {
    margin-top: 10px;
    border-bottom: 1px solid #e6e6e6;
    align-items: center;
  }
</style>
