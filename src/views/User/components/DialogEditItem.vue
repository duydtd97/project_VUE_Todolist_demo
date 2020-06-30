<template>
  <el-dialog
      title = "Edit"
      :visible = "open"
      width = "30%"
      :before-close = "handleCloseDialog">
    <el-form :model = "formEdit" :rules = "rules" ref = "formEdit">
      <div>
        <el-form-item prop = "title" label = 'To-do Title'>
          <el-input
              placeholder = "Title"
              v-model = "formEdit.title"
              clearable>
          </el-input>
        </el-form-item>

        <NewTodo v-if = 'showAddItem'
                 :open = 'showAddItem'
                 :rule-form = 'formAddItem'
                 :rules = 'rulesItem'
                 :is-loading = 'isLoading'
                 :txtInput = 'formAddItem.content'
                 @inputChange = 'inputChange'
                 @closeFormAdd = 'visibleFormAdd'
                 @submitFormAdd = 'submitFormAddItem'
        />

        <el-row v-if = 'listItem.length || loadingData' v-loading = "loadingData">
          <el-form :model = "formAddItem" :rules = "rulesItem" ref = "formAddItem">
            <div v-for = '(item, id) in listItem' :key = 'id'>
              <NewTodo v-if = 'openFormEditItem && isEditing === item.id'
                       :open = 'openFormEditItem && isEditing === item.id'
                       :rule-form = 'formAddItem'
                       :rules = 'rulesItem'
                       :is-loading = 'isLoading'
                       :txtInput = 'item.content'
                       @inputChange = 'inputChange'
                       @closeFormAdd = 'visibleFormEdit'
                       @submitFormAdd = 'submitFormEditItem'
              />
              <TodoItem v-else
                        :data = 'item'
                        :title = "item.content"
                        @openDialogDel = 'showDialogDel(item)'
                        @openDialogEdit = 'showInputEditItem(item)'
              />
            </div>
          </el-form>
        </el-row>

        <el-row v-else class = 'box_empty' v-loading = "loadingData">
          <h3>Chua co du lieu </h3>
        </el-row>

        <el-button type = "text" :loading = "isLoading" class = 'btn__addItem' @click = 'visibleFormAdd()'>Them moi
        </el-button>

        <span slot = "footer" class = "dialog-footer">
          <el-form-item>
            <el-button type = "primary" style = 'width: 100%' :loading = "isLoading"
                       @click = "saveTodo('formEdit')">Save</el-button>
          </el-form-item>
        </span>
      </div>

      <DialogConfirmDelete v-if = 'openDialogDel' :open = 'openDialogDel' :data = 'selectedItem'
                           @closeDialog = 'afterCloseDialog' @submitDel = 'submitDel' />
    </el-form>
  </el-dialog>
</template>

<script>
  import {axios}             from '@/utils/axiosInstance';
  import NewTodo             from '@/views/User/components/Dashboard/ListITodo/NewTodo';
  import DialogConfirmDelete from '@/views/User/components/DialogConfirmDelete';
  import TodoItem            from '@/views/User/components/Dashboard/ListITodo/Todo';

  export default {
    name: 'DialogEditItem',
    components: {DialogConfirmDelete, NewTodo, TodoItem},
    props: {
      open: Boolean,
      data: Object,
    },
    data() {
      return {
        showAddItem: false,
        isLoading: false,
        loadingData: false,
        listItem: [],
        openDialogDel: false,
        selectedItem: null,
        openFormEditItem: false,
        isEditing: 0,
        formAddItem: {
          content: '',
        },
        rulesItem: {
          content: [
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
    watch: {
      data() {
        this.getData((res) => {
          this.listItem = res.data;
        });
      },
      // listItem(){
      //
      // }
    },
    methods: {
      handleCloseDialog() {
        this.$emit('closeDialogEdit');
      },

      visibleFormAdd() {
        this.showAddItem = !this.showAddItem;
      },

      visibleFormEdit() {
        this.openFormEditItem = !this.openFormEditItem;
        this.isEditing        = 0;
      },

      afterChangeData() {
        this.getData((res) => {
          this.listItem = res.data;
        });
      },

      afterCloseDialog() {
        this.openDialogDel = false;
        this.getData((res) => {
          this.listItem = res.data;
        });
      },

      showDialogDel(data) {
        this.selectedItem  = data;
        this.openDialogDel = true;
      },

      inputChange(value) {
        this.formAddItem.content = value;
      },

      showInputEditItem(item) {
        this.selectedItem     = item;
        this.openFormEditItem = true;
        this.isEditing        = item.id;
      },

      submitFormAddItem() {
        this.isLoading = true;
        axios.post(`api/v1/todos/${this.data.id}/items`, this.formAddItem)
          .then(res => {
            this.afterChangeData();
            this.isLoading = false;
            console.log(res);
          })
          .catch(err => {
            this.isLoading = false;
            console.log(err.response);
          });
      },

      submitFormEditItem() {
        this.isLoading = true;
        axios.put(`api/v1/todos/${this.selectedItem.todo_id}/items/${this.selectedItem.id}`, this.formAddItem)
          .then(res => {
            this.isLoading        = false;
            this.openFormEditItem = false;
            this.afterChangeData();
            console.log(res);
          })
          .catch(err => {
            this.isLoading = false;
            console.log(err.response);
          });
      },

      submitDel() {
        axios.delete(`api/v1/todos/${this.selectedItem.todo_id}/items/${this.selectedItem.id}`)
          .then(res => {
            this.afterCloseDialog();
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      },

      saveTodo(formName) {
        this.isLoading = true;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.put(`api/v1/todos/${this.data.id}`, this.formEdit)
              .then(res => {
                this.isLoading      = false;
                this.formEdit.title = res.data.title;
              })
              .catch(() => {
                this.isLoading = false;
              });
          } else {
            this.isLoading = false;
            return false;
          }
        });
      },

      // addItem(formName) {
      //   this.isLoading = true;
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       axios.post('api/v1/todos', this.ruleForm)
      //         .then(res => {
      //           this.isLoading = false;
      //           this.$emit('addTodoList');
      //           console.log(res);
      //         })
      //         .catch(err => {
      //           this.isLoading = false;
      //           console.log(err);
      //         });
      //     } else {
      //       this.isLoading = false;
      //       return false;
      //     }
      //   });
      // },

      getData(callback) {
        axios.get(`api/v1/todos/${this.data.id}/items`)
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
      this.getData((res) => {
        this.listItem    = res.data;
        this.loadingData = false;
      });
    },

  };
</script>

<style scoped>
  .btn__addItem {
    width: 100%;
    text-align: left;
    margin: 16px 0;
  }

  .box_empty {
    margin: 64px 0;
  }
</style>
