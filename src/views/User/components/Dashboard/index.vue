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
              <el-button type="primary" @click='showFormAdd()'>Add item</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style='margin-top: 40px'>
        <el-col :span='11' class='box_ListTodo'>
          <TodoItem/>
          <TodoItem/>
        </el-col>

        <el-col :span='12'>
          <NewItem v-bind:open='showAddItem' @closeFormAdd='showFormAdd'/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import TodoItem from '@/views/User/components/Dashboard/ListItem/Item';
  import NewItem  from '@/views/User/components/Dashboard/ListItem/NewItem';
  export default {
    name: 'Dashboard',
    components: {NewItem, TodoItem},
    data() {
      return {
        input: '',
        showAddItem: false
      }
    },
    methods:{
      showFormAdd(){
        this.showAddItem = !this.showAddItem;
      }
    }
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
</style>
