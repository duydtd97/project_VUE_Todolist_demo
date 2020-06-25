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

      <el-row style='margin-top: 40px'>
        <el-col :span='11' class='box_ListTodo'>
          <div v-if='listTodo'>
            <div v-for='(item, id) in listTodo' v-bind:key='id'>
              <TodoItem :title='item.title' :idTodo='item.id' @deleteTodo='deleteTodo'/>
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

        <el-col :span='12'>
          <NewItem v-bind:open='showAddItem' @closeFormAdd='showFormAdd' @addTodoList='addTodoList'/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import {axios}  from '@/utils/axiosInstance';
  import TodoItem from '@/views/User/components/Dashboard/ListItem/Item';
  import NewItem  from '@/views/User/components/Dashboard/ListItem/NewItem';
  import qs from 'query-string';

  export default {
    name: 'Dashboard',
    components: {NewItem, TodoItem},
    data() {
      return {
        input: '',
        showAddItem: false,
        listTodo: [],
        currentPage: 1,
        totalPage: 0
      }
    },
    methods:{
      showFormAdd(){
        this.showAddItem = !this.showAddItem;
      },
      addTodoList(){
        this.currentPage = 1;
        const query = {
          page: this.currentPage,
          limit: 5
        };
        axios.get(`api/v1/todos?${qs.stringify(query)}`)
          .then(res =>{
            this.listTodo = res.data;
            this.totalPage = parseInt(res.headers['x-total-pages'],0);
          })
          .catch(err =>{
            console.log(err);
          });
      },
      deleteTodo(id){
        console.log(id);
      },
      changePage(page){
        this.currentPage = page;

        const query = {
          page: page,
          limit: 5
        };
        const url = `api/v1/todos?${qs.stringify(query)}`;

        axios.get(url)
          .then(res =>{
            this.listTodo = res.data;
          })
          .catch(err =>{
            console.log(err);
          })
      },
    },
    beforeMount(){
      const query = {
        page: this.currentPage,
        limit: 5
      };

      axios.get(`api/v1/todos?${qs.stringify(query)}`)
        .then(res =>{
          this.listTodo = res.data;
          this.totalPage = parseInt(res.headers['x-total-pages'],0);
        })
        .catch(err =>{
          console.log(err);
        })
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
