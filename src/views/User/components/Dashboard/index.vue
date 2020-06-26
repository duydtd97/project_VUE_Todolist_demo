<template>
  <el-row justify='center'>
    <el-col :span='24' class='box-container'>
      <el-row type="flex" justify="space-between" style='border-bottom: 1px solid #e6e6e6; padding-bottom: 16px'>
        <el-col :span='4'>
          <h2 style='margin: 0; text-align: left'>My To-do list</h2>
        </el-col>
        <el-col :span="20">
          <el-row :gutter="8" type="flex" justify="end">
            <el-col :span="10">
              <el-input
                  placeholder="Search item by enter..."
                  v-model="input"
                  clearable>
              </el-input>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" @click='showFormAdd()'>Add New</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter='20' style='margin-top: 40px'>
        <el-col :span='13' class='box_ListTodo'>
          <div v-if='listTodo'>
            <div v-for='(item, id) in listTodo' v-bind:key='id'>
              <TodoItem :title='item.title' :idTodo='item.id' @afterDeleteTodo='afterCloseDialog' @afterEditTodo='afterCloseDialog'/>
            </div>

            <el-pagination
                class='pagi-style'
                background
                layout="prev, pager, next"
                :page-count="totalPage"
                :page-size='5'
                :current-page='currentPage'
                @current-change='changePage'
            >
            </el-pagination>
          </div>
          <div v-else>
            <h3>Chua co du lieu </h3>
          </div>
        </el-col>

        <el-col :span='11'>
          <NewTodo v-bind:open='showAddItem' @closeFormAdd='showFormAdd' @addTodoList='afterAddTodo'/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import {axios}  from '@/utils/axiosInstance';
  import TodoItem from '@/views/User/components/Dashboard/ListITodo/Todo';
  import NewTodo  from '@/views/User/components/Dashboard/ListITodo/NewTodo';
  import qs       from 'query-string';

  export default {
    name: 'Dashboard',
    components: {NewTodo, TodoItem},
    data() {
      return {
        input: '',
        showAddItem: false,
        listTodo: [],
        currentPage: 1,
        totalPage: 0,
      }
    },
    methods:{
      showFormAdd(){
        this.showAddItem = !this.showAddItem;
      },
      afterAddTodo(){
        this.currentPage = 1;

        this.getData(this.currentPage, (res)=>{
          this.listTodo = res.data;
          this.totalPage = parseInt(res.headers['x-total-pages'],0);
        });
      },
      afterCloseDialog(){
        this.getData(this.currentPage, (res)=>{
          this.listTodo = res.data;
        });
      },
      changePage(page){
        this.currentPage = page;

        this.getData(this.currentPage, (res)=>{
          this.listTodo = res.data;
        });
      },
      getData(page, callback){
        const query = {
          page: page,
          limit: 5
        };

        axios.get(`api/v1/todos?${qs.stringify(query)}`)
          .then(res =>{
            callback(res);
          })
          .catch(err =>{
            console.log(err);
          })
      },
    },
    beforeMount(){
      this.getData(this.currentPage, (res)=>{
        this.listTodo = res.data;
        this.totalPage = parseInt(res.headers['x-total-pages'],0);
      });
    },

  };
</script>

<style scoped>
  .box_ListTodo{
    border-right: 1px solid #e6e6e6;
    padding-right: 24px;
  }
  .box-container{
    padding: 0 32px;
  }
  .pagi-style{
    margin-top: 32px;
  }
</style>
