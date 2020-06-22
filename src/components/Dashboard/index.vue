<template>
  <el-row justify='center'>
    <el-col :offset='1' :span='23'>
      <el-row type="flex" justify="space-between">
        <el-col :span='4'>
          <h2 style='margin: 0; text-align: left'>My To-do list</h2>
        </el-col>
        <el-col :span="20">
          <el-row :gutter="10" type="flex" justify="end">
            <el-col :span="12">
              <el-input
                  placeholder="Search item by enter..."
                  v-model="input"
                  clearable>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click='addNewItem()'>Add item</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style='margin-top: 40px'>
        <el-col :span='11' class='box_ListTodo'>
          <TodoItem/>
        </el-col>

        <el-col :span='12'>
          <NewItem v-bind:open='showAddItem' @closeFormAdd='addNewItem'/>
        </el-col>
      </el-row>

    </el-col>

  </el-row>

</template>

<script>
  import TodoItem from '@/components/Dashboard/ListItem/Item';
  import NewItem  from '@/components/Dashboard/ListItem/NewItem';
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
      addNewItem(){
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
</style>
