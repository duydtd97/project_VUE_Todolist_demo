<template>
  <el-dialog
      :title = "formEdit.title"
      :visible = "open === id"
      width = "30%"
      :before-close = "handleCloseDialog">
    <el-form :model = "formEdit" :rules = "rules" ref = "formEdit">
      <div>
        <el-form-item prop = "title" label='Title'>
          <el-input
              placeholder = "Todo name"
              v-model = "formEdit.title"
              clearable>
          </el-input>
        </el-form-item>

        <NewTodo v-bind:open='showAddItem' @closeFormAdd='showFormAdd' @addTodoList='afterAddTodo'/>

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
                       @click = "submitForm('formEdit')">Save</el-button>
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
      open: Number,
      id: Number,
      propsTitleTodo: String,
    },
    data() {
      return {
        showAddItem: false,
        isLoading: false,
        listItem: [],

        formEdit: {
          title: this.propsTitleTodo,
        },
        rules: {
          title: [
            {required: true, message: 'Please input name', trigger: 'blur'},
            {min: 3, message: 'Length should be at least 3 character', trigger: 'blur'},
          ],
        },
      };
    },
    methods: {
      handleCloseDialog() {
        this.$emit('closeDialogEdit');
      },
      showFormAdd(){
        this.showAddItem = !this.showAddItem;
      },
      afterAddTodo(){
        this.getData( (res)=>{
          this.listItem = res.data;
        });
      },
      submitForm(formName) {
        this.isLoading = true;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.put(`api/v1/todos/${this.id}`, this.formEdit)
              .then(res => {
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
        axios.get(`api/v1/todos/${this.id}/items`)
          .then(res =>{
            callback(res);
          })
          .catch(err =>{
            console.log(err);
          })
      },
    },
    beforeMount(){
      this.getData((res)=>{
        this.listItem = res.data;
      });
    },
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
