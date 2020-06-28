<template>
  <el-dialog
      title = "Edit"
      :visible = "open"
      width = "30%"
      :before-close = "handleCloseDialog">
    <el-form :model = "formEdit" :rules = "rules" ref = "formEdit">
      <div>
        <el-form-item prop = "title" label='To-do Title'>
          <el-input
              placeholder = "Title"
              v-model = "formEdit.title"
              clearable>
          </el-input>
        </el-form-item>

        <NewTodo v-if='showAddItem'
                 :open='showAddItem'
                 :rule-form='formAddItem'
                 :rules='rulesItem'
                 :is-loading='isLoading'
                 @closeFormAdd='showFormAdd'
                 @submitFormAdd='submitFormAddItem'
        />

        <div v-if='listItem.length'>
          <div v-for='(item, id) in listItem' v-bind:key='id'>
            <p>du lieu</p>
          </div>
        </div>
        <div v-else class='box_empty'>
          <h3>Chua co du lieu </h3>
        </div>

        <el-button type = "text" :loading = "isLoading" class='btn__addItem' @click='showFormAdd()'>Them moi</el-button>

        <span slot = "footer" class = "dialog-footer">
          <el-form-item>
            <el-button type = "primary" style = 'width: 100%' :loading = "isLoading"
                       @click = "saveTodo('formEdit')">Save</el-button>
          </el-form-item>
        </span>
      </div>
    </el-form>

  </el-dialog>
</template>

<script>
  import {axios}  from '@/utils/axiosInstance';
  import NewTodo  from '@/views/User/components/Dashboard/ListITodo/NewTodo';

  export default {
    name: 'DialogEditItem',
    components: {NewTodo},
    props: {
      open: Boolean,
      data: Object
    },
    data() {
      return {
        showAddItem: false,
        isLoading: false,
        listItem: [],

        formAddItem: {
          title: '',
        },
        rulesItem: {
          title: [
            {required: true, message: 'Please input name', trigger: 'blur'},
            {min: 3, message: 'Length should be at least 3 character', trigger: 'blur'},
          ],
        },

        formEdit: {
          title: this.data.title,
        },
        rules: {
          title: [
            {required: true, message: 'Please input name', trigger: 'blur'},
            {min: 3, message: 'Length should be at least 3 character', trigger: 'blur'},
          ],
        },
      };
    },
    watch:{
      data() {
        this.getData((res)=>{
          this.listItem = res.data;
        });
      }
    },
    methods: {
      handleCloseDialog() {
        this.$emit('closeDialogEdit');
      },
      showFormAdd(){
        this.showAddItem = !this.showAddItem;
      },
      afterAddTodo(){
        this.getData((res)=>{
          this.listItem = res.data;
        });
      },
      submitFormAddItem(){
        this.isLoading = true;
        axios.post(`api/v1/todos/${this.data.id}/items`, this.formAddItem)
          .then(res => {
            this.afterAddTodo();
            this.isLoading = false;
            console.log(res);
          })
          .catch(err => {
            this.isLoading = false;
            console.log(err);
          });
      },
      saveTodo(formName) {
        this.isLoading = true;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.put(`api/v1/todos/${this.data.id}`, this.formEdit)
              .then(res => {
                console.log(res);
                this.isLoading = false;
                this.formEdit.title = res.data.title;
              })
              .catch(()=> {
                this.isLoading = false;
              });
          } else {
            this.isLoading = false;
            return false;
          }
        });
      },
      addItem(formName) {
        this.isLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('api/v1/todos', this.ruleForm)
              .then(res => {
                this.isLoading = false;
                this.$emit('addTodoList');
                console.log(res);
              })
              .catch(err => {
                this.isLoading = false;
                console.log(err);
              });
          } else {
            this.isLoading = false;
            return false;
          }
        })
      },
      getData(callback){
        axios.get(`api/v1/todos/${this.data.id}/items`)
          .then(res =>{
            callback(res);
          })
          .catch(err =>{
            console.log(err);
          })
      },
    },
    // beforeMount(){
    //   console.log(this.data);
    //   this.getData((res)=>{
    //     this.listItem = res.data;
    //   });
    // },

  };
</script>

<style scoped>
  .btn__addItem{
    width: 100%;
    text-align: left;
    margin: 16px 0;
  }
  .box_empty{
    margin: 64px 0;
  }
</style>
