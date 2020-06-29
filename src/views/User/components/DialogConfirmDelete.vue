<template>
  <el-dialog
      :title="data.title"
      :visible="open"
      width="30%"
      append-to-body
      :before-close="handleCloseDialog">
    <span>Chắc chắn xóa không bạn ôi?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloseDialog">Thôi, k xóa nữa!</el-button>
      <el-button type="primary" @click="confirmDelete">Có, xóa đi!</el-button>
    </span>
  </el-dialog>
</template>

<script>

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
        this.$emit('submitDel', this.data.id);
      }
    }
  };
</script>

<style scoped>

</style>
