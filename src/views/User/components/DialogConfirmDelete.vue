<template>
  <el-dialog
      :title="titleTodo"
      :visible="open === id"
      width="30%"
      :before-close="handleClose">
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
      open: Number,
      id: Number,
      titleTodo: String
    },
    data() {
      return {

      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(() => {
            done();
          })
          .catch(() => {});
      },
      handleCloseDialog(){
        this.$emit('closeDialog');
      },
      confirmDelete(){
        axios.delete(`api/v1/todos/${this.id}`)
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
