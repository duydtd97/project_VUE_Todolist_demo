<template>
  <transition name = "el-fade-in-linear">
    <el-form :model = "ruleForm" :rules = "rules" ref = "ruleForm">
      <div v-show = 'open'>
        <el-row type = "flex" justify = 'space-between' class = 'el-row-custom'>
          <el-col :offset = '1' :span = "16" style = 'text-align: left'>
            <el-form-item prop = "title">
              <el-input
                  placeholder = "Todo name"
                  v-model = "ruleForm.title"
                  clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span = "8">
            <el-row type = "flex" justify = 'end'>
              <el-form-item style = 'margin: 0 8px'>
                <el-button type = "primary" icon = "el-icon-check" circle :loading="isLoading" @click="submitForm()" />
              </el-form-item>
              <el-form-item>
                <el-button type = "danger" icon = "el-icon-close" circle @click = "closeForm('ruleForm')" />
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </transition>
</template>

<script>
  import { axios } from '@/utils/axiosInstance';

  export default {
    name: 'NewItem',
    props: {
      open: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isLoading: false,

        ruleForm: {
          title: '',
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
      closeForm(formName) {
        this.$emit('closeFormAdd');
        this.$refs[formName].resetFields();
      },
      submitForm() {
        this.isLoading = true;
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
      },
    },
  };
</script>

<style scoped>
</style>
