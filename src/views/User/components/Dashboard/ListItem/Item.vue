<template>
  <el-row type="flex" justify='space-between' class='el-row-custom'>
    <el-col :span="16" style='text-align: left'>
      <h4 style='cursor: pointer'>{{title}}</h4>
    </el-col>
    <el-col :span="8">
      <el-row type="flex" justify='end'>

        <el-button type="primary" icon="el-icon-edit" circle/>

        <el-button type="danger" icon="el-icon-delete" circle @click='deleteTodo(idTodo)'/>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import {axios} from '@/utils/axiosInstance';

  export default {
    name: "TodoItem",
    props:{
      title: String,
      idTodo: Number
    },
    data(){
      return{

      }
    },
    methods:{
      deleteTodo(id){
        axios.delete(`api/v1/todos/${id}`)
          .then(res =>{
            console.log(res);
          })
          .catch(err =>{
            console.log(err);
          });
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
