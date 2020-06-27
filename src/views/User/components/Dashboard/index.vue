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
              <TodoItem :data='item'
                        @openDialogDel='showDialogDel(item)'
                        @openDialogEdit='showDialogEdit(item)'
                        />
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
          <NewTodo v-if='showAddInput'
                   :open='showAddInput'
                   :rule-form='formAddTodo'
                   :rules='rulesTodo'
                   @closeFormAdd='showFormAdd'
                   @submitFormAdd='submitFormAddTodo'
                   />
        </el-col>
      </el-row>
    </el-col>

    <DialogConfirmDelete v-if='openDialogDel' :data='selectedItem' :open='openDialogDel' @closeDialog='afterCloseDialog'/>
    <DialogEditItem v-if='openDialogEdit' :data='selectedItem' :open='openDialogEdit' @closeDialogEdit='afterCloseDialog'/>
  </el-row>
</template>

<script>
  import {axios}             from '@/utils/axiosInstance';
  import TodoItem            from '@/views/User/components/Dashboard/ListITodo/Todo';
  import NewTodo             from '@/views/User/components/Dashboard/ListITodo/NewTodo';
  import DialogConfirmDelete from '@/views/User/components/DialogConfirmDelete';
  import DialogEditItem      from '@/views/User/components/DialogEditItem';
  import qs                  from 'query-string';

  export default {
    name: 'Dashboard',
    components: {DialogConfirmDelete, DialogEditItem, NewTodo, TodoItem},
    data() {
      return {
        input: '',
        showAddInput: false,
        listTodo: [],
        currentPage: 1,
        totalPage: 0,
        openDialogDel: false,
        openDialogEdit: false,
        selectedItem: null,
        formAddTodo: {
          title: '',
        },
        rulesTodo: {
          title: [
            {required: true, message: 'Please input name', trigger: 'blur'},
            {min: 3, message: 'Length should be at least 3 character', trigger: 'blur'},
          ],
        },
      }
    },
    methods:{
      showFormAdd(){
        this.showAddInput = !this.showAddInput;
      },
      submitFormAddTodo(){
        axios.post('api/v1/todos', this.formAddTodo)
          .then(res => {
            // this.isLoading = false;
            this.afterAddTodo();
            console.log(res);
          })
          .catch(err => {
            // this.isLoading = false;
            console.log(err);
          });
      },
      afterAddTodo(){
        this.currentPage = 1;

        this.getData(this.currentPage, (res)=>{
          this.listTodo = res.data;
          this.totalPage = parseInt(res.headers['x-total-pages'],0);
        });
      },
      afterCloseDialog(){
        this.openDialogDel = false;
        this.openDialogEdit = false;
        this.getData(this.currentPage, (res)=>{
          this.listTodo = res.data;
        });
      },
      showDialogDel(data){
        this.selectedItem = data;
        this.openDialogDel = true;
      },
      showDialogEdit(data){
        this.selectedItem = data;
        this.openDialogEdit = true;
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
