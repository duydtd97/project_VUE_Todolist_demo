<template>
  <el-dialog
      title = "Tips"
      :visible.sync = "open"
      width = "30%"
      :before-close = "handleClose">
    <span>Edit item</span>
    <span slot = "footer" class = "dialog-footer">
      <el-button @click = "console.log('save')">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'DialogEditItem',
    props:{
      open:{
        type: Boolean,
        default: false
      }
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

    }
  };
</script>

<style scoped>

</style>
