<template>
  <el-dialog
      :title = "data.title"
      :visible = "open"
      width = "30%"
      append-to-body
      center
      :before-close = "handleCloseDialog">
    <el-row>
      <h3> Todos </h3>

      <el-row v-if = 'listItem.length || loadingData' v-loading = "loadingData">
        <el-row :gutter = '16'>
          <el-col :span = '24' v-for = "(item, i) in listItem" :key = "i">
            <el-checkbox class = 'customCB' border size = 'medium' :label = "item.content" :checked = 'item.done'
                         @change.native = "handleCheckedItemsChange(item.id, $event)" />
          </el-col>
        </el-row>
      </el-row>

      <el-row v-else class = 'box_empty' v-loading = "loadingData">
        <h3>Chua co du lieu </h3>
      </el-row>
    </el-row>
    <span slot = "footer" class = "dialog-footer">
      <el-button type = "primary" width = '100%' @click = "handleCloseDialog">Save and Exit</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {axios} from '@/utils/axiosInstance';

  export default {
    name: 'DialogCheckTodo',
    props: {
      open: {
        type: Boolean,
        default: false,
      },
      data: Object,
    },
    data() {
      return {
        loadingData: false,
        listItem: [],
        checkedItems: {
          done: false,
        },
      };
    },
    methods: {
      handleCloseDialog() {
        this.$emit('closeDialog');
      },
      getData(callback) {
        axios.get(`api/v1/todos/${this.data.id}/items`)
          .then(res => {
            callback(res);
          })
          .catch(err => {
            console.log(err);
          });
      },
      handleCheckedItemsChange(id, e) {
        this.checkedItems.done = e.target.checked;
        axios.put(`api/v1/todos/${this.data.id}/items/${id}`, this.checkedItems)
          .then((res) => {
            console.log(res);
            this.loadingData = false;
          })
          .catch((err) => {
            console.log(err);
            this.loadingData = false;
          });
      },
    },
    beforeMount() {
      this.loadingData = true;
      this.getData((res) => {
        console.log(res);
        this.listItem    = res.data;
        this.loadingData = false;
      });
    },
  };
</script>

<style scoped>
  .box_empty {
    margin: 48px 0;
  }

  .customCB {
    margin: 8px 0;
  }
</style>
