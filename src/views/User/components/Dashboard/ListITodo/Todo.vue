<template>
  <el-row type="flex" justify='space-between' class='el-row-custom'>
    <el-col :span="16" style='text-align: left'>
      <h4 style='cursor: pointer'>{{title}}</h4>
    </el-col>
    <el-col :span="8">
      <el-row type="flex" justify='end'>

        <el-button type="primary" icon="el-icon-edit" circle @click='openDialogEdit = idTodo'/>

        <el-button type="danger" icon="el-icon-delete" circle @click='openDialogDel = idTodo'/>

      </el-row>
    </el-col>

    <DialogConfirmDelete :titleTodo='title' :open='openDialogDel' :id='idTodo' @closeDialog='closeDialog' @afterDeleteTodo='afterDeleteTodo'/>
    <DialogEditItem :propsTitleTodo='title' :open='openDialogEdit' :id='idTodo' @closeDialogEdit='closeDialogEdit'/>
  </el-row>
</template>

<script>
  import DialogConfirmDelete from '@/views/User/components/DialogConfirmDelete';
  import DialogEditItem      from '@/views/User/components/DialogEditItem';

  export default {
    name: "TodoItem",
    components: {DialogEditItem, DialogConfirmDelete},
    props:{
      title: String,
      idTodo: Number
    },
    data(){
      return{
        openDialogDel: 0,
        openDialogEdit: 0
      }
    },
    methods:{
      closeDialog(){
        this.openDialogDel = 0;
      },
      closeDialogEdit(){
        this.openDialogEdit = 0;
        this.$emit('afterEditTodo')
      },
      afterDeleteTodo(){
        this.$emit('afterDeleteTodo')
      }
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
