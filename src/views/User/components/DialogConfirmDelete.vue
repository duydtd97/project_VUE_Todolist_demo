<template>
  <el-dialog
      :title="data.title"
      :visible="open"
      width="30%"
      :before-close="handleCloseDialog">
    <span>Chắc chắn xóa không bạn ôi?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloseDialog">Thôi, k xóa nữa!</el-button>
      <el-button type="primary" @click="confirmDelete">Có, xóa đi!</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {axios} from '@/utils/axiosInstance';

  export default {
    name: 'DialogConfirmDelete',
    props:{
      open: {
        type: Boolean,
        default: false
      },
      data: Object
    },
    data() {
      return {

      };
    },
    methods: {
      handleCloseDialog(){
        this.$emit('closeDialog');
      },
      confirmDelete(){
        axios.delete(`api/v1/todos/${this.data.id}`)
          .then(res =>{
            // this.$emit('delTodo', this.id);
            this.$emit('afterDeleteTodo');
            this.$emit('closeDialog');
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

</style>
