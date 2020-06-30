<template>
  <el-row justify = 'center'>
    <el-col :span = '24' class = 'box-container'>
      <el-row type = "flex" justify = "space-between" style = 'border-bottom: 1px solid #e6e6e6; padding-bottom: 16px'>
        <el-col :span = '4'>
          <h2 style = 'margin: 0; text-align: left'>My To-do list</h2>
        </el-col>
        <el-col :span = "20">
          <el-row :gutter = "8" type = "flex" justify = "end">
            <el-col :span = "10">
              <el-form ref = "formSearchTodo" :model = "formSearchTodo" :rules = "rulesSearchTodo"
                       :label-position = "'left'" @submit.native.prevent>
                <el-form-item prop = "q"
                              v-bind:error = 'formSearchTodo.q.length < 2 ? errMess : ""'
                >
                  <el-input
                      placeholder = "Search item by enter..."
                      v-model = "formSearchTodo.q"
                      @keyup.enter.native.prevent = "submitSearchTodo('formSearchTodo', $event)"
                      clearable
                  >
                    <el-button slot = "append" icon = "el-icon-refresh-right" @click = 'afterChangeData'></el-button>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span = "3">
              <el-button type = "primary" @click = 'visibleFormAdd()'>Add New</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter = '20' style = 'margin-top: 40px'>
        <el-col :span = '13' class = 'box_ListTodo'>
          <el-row v-if = 'listTodo.length || loadingData' v-loading = "loadingData">
            <div v-for = '(item, id) in listTodo' v-bind:key = 'id'>
              <TodoItem :data = 'item'
                        :title = 'item.title'
                        @openDialogDel = 'showDialogDel(item)'
                        @openDialogEdit = 'showDialogEdit(item)'
                        @openDialogCheck = 'showDialogCheck(item)'
              />
            </div>

            <el-pagination
                class = 'pagi-style'
                background
                layout = "prev, pager, next"
                :page-count = "totalPage"
                :page-size = '5'
                :current-page = 'currentPage'
                @current-change = 'changePage'
            >
            </el-pagination>
          </el-row>
          <el-row v-else v-loading = "loadingData">
            <h3>Chua co du lieu </h3>
          </el-row>
        </el-col>

        <el-col :span = '11'>
          <NewTodo v-if = 'showAddInput'
                   :open = 'showAddInput'
                   :rule-form = 'formAddTodo'
                   :rules = 'rulesTodo'
                   :is-loading = 'isLoading'
                   :txt-input = 'formAddTodo.title'
                   @inputChange = 'inputChange'
                   @closeFormAdd = 'visibleFormAdd'
                   @submitFormAdd = 'submitFormAddTodo'
          />
        </el-col>
      </el-row>
    </el-col>

    <DialogConfirmDelete v-if = 'openDialogDel'
                         :data = 'selectedItem'
                         :open = 'openDialogDel'
                         @closeDialog = 'afterCloseDialog'
                         @submitDel = 'submitDel'
    />
    <DialogEditItem v-if = 'openDialogEdit'
                    :data = 'selectedItem'
                    :open = 'openDialogEdit'
                    @closeDialogEdit = 'afterCloseDialog'
    />
    <DialogCheckTodo v-if = 'openDialogCheck'
                     :open = 'openDialogCheck'
                     :data = 'selectedItem'
                     @closeDialog = 'openDialogCheck = false'
    />
  </el-row>
</template>

<script>
  import {axios}             from '@/utils/axiosInstance';
  import TodoItem            from '@/views/User/components/Dashboard/ListITodo/Todo';
  import NewTodo             from '@/views/User/components/Dashboard/ListITodo/NewTodo';
  import DialogCheckTodo     from '@/views/User/components/DialogCheckTodo';
  import DialogConfirmDelete from '@/views/User/components/DialogConfirmDelete';
  import DialogEditItem      from '@/views/User/components/DialogEditItem';
  import qs                  from 'query-string';

  export default {
    name: 'Dashboard',
    components: {DialogCheckTodo, DialogConfirmDelete, DialogEditItem, NewTodo, TodoItem},
    data() {
      return {
        inputSearch: '',
        errMess: '',
        showAddInput: false,
        listTodo: [],
        currentPage: 1,
        totalPage: 0,
        openDialogDel: false,
        openDialogEdit: false,
        openDialogCheck: false,
        selectedItem: null,
        isLoading: false,
        loadingData: false,
        formAddTodo: {
          title: '',
        },
        rulesTodo: {
          title: [
            {required: true, message: 'Please input name', trigger: 'blur'},
            {min: 3, message: 'Length should be at least 3 character', trigger: 'blur'},
          ],
        },

        formSearchTodo: {
          q: '',
        },
        rulesSearchTodo: {
          q: [
            {min: 2, message: 'Length should be at least 2 character', trigger: 'blur'},
          ],
        },
      };
    },
    methods: {
      submitSearchTodo(formName, e) {
        this.loadingData = true;
        const query      = {
          q: this.formSearchTodo.q,
          page: 1,
          limit: 5,
        };

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (e.target.value.length >= 2) {
              axios.get(`api/v1/todos/search?${qs.stringify(query)}`)
                .then(res => {
                  this.currentPage = 1;
                  this.listTodo    = res.data;
                  this.totalPage   = parseInt(res.headers['x-total-pages'], 0);
                  this.loadingData = false;
                  console.log(res);
                });
            } else {
              this.loadingData = false;
              this.errMess     = 'Length should be at least 2 character';
            }
          } else {
            return false;
          }
        });
      },
      visibleFormAdd() {
        this.showAddInput = !this.showAddInput;
      },
      inputChange(value) {
        this.formAddTodo.title = value;
      },
      submitFormAddTodo() {
        this.isLoading = true;
        axios.post('api/v1/todos', this.formAddTodo)
          .then(res => {
            this.afterChangeData();
            this.isLoading = false;
            console.log(res);
          })
          .catch(err => {
            this.isLoading = false;
            console.log(err);
          });
      },
      submitDel(idTodo) {
        axios.delete(`api/v1/todos/${idTodo}`)
          .then(res => {
            this.afterCloseDialog();
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      },
      afterChangeData() {
        this.formSearchTodo.q = '';
        this.loadingData      = true;
        this.currentPage      = 1;

        this.getData(this.currentPage, (res) => {
          this.listTodo    = res.data;
          this.totalPage   = parseInt(res.headers['x-total-pages'], 0);
          this.loadingData = false;
        });
      },
      afterCloseDialog() {
        this.openDialogDel  = false;
        this.openDialogEdit = false;
        this.getData(this.currentPage, (res) => {
          this.listTodo  = res.data;
          this.totalPage = parseInt(res.headers['x-total-pages'], 0);
        });
      },
      showDialogDel(data) {
        this.selectedItem  = data;
        this.openDialogDel = true;
      },
      showDialogEdit(data) {
        this.selectedItem   = data;
        this.openDialogEdit = true;
      },
      showDialogCheck(data) {
        this.selectedItem    = data;
        this.openDialogCheck = true;
      },
      changePage(page) {
        this.currentPage = page;

        this.getData(this.currentPage, (res) => {
          this.listTodo = res.data;
        });
      },
      getData(page, callback) {
        const query = {
          page: page,
          limit: 5,
        };

        axios.get(`api/v1/todos?${qs.stringify(query)}`)
          .then(res => {
            callback(res);
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    beforeMount() {
      this.loadingData = true;
      this.getData(this.currentPage, (res) => {
        this.listTodo    = res.data;
        this.totalPage   = parseInt(res.headers['x-total-pages'], 0);
        this.loadingData = false;
      });
    },

  };
</script>

<style scoped>
  .box_ListTodo {
    border-right: 1px solid #e6e6e6;
    padding-right: 24px;
  }

  .box-container {
    padding: 0 32px;
  }

  .pagi-style {
    margin-top: 32px;
  }
</style>
