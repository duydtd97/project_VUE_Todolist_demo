<template>
  <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
    <span>Chắc chắn xóa không bạn ôi?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Thôi, k xóa nữa!</el-button>
      <el-button type="primary" @click="dialogVisible = false">Có, xóa đi!</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'DialogConfirmDelete',
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(() => {
            done();
          })
          .catch(() => {});
      }
    }
  };
</script>

<style scoped>

</style>
