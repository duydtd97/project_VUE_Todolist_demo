<template>
  <transition name = "el-fade-in-linear">
    <el-form :model = "ruleForm" :rules = "rules" :ref = "'ruleForm'">
      <div v-show = 'open'>
        <el-row type = "flex" justify = 'space-between' class = 'el-row-custom'>
          <el-col :span = "16" style = 'text-align: left'>
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
                <el-button type = "primary" icon = "el-icon-check" circle :loading="isLoading" @click = "submitForm('ruleForm')"/>
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

  export default {
    name: 'NewItem',
    props: {
      open: {
        type: Boolean,
        default: false,
      },
      ruleForm: Object,
      rules: Object,
    },
    data() {
      return {
        isLoading: false,

        // ruleForm: {
        //   title: '',
        // },
        // rules: {
        //   title: [
        //     {required: true, message: 'Please input name', trigger: 'blur'},
        //     {min: 3, message: 'Length should be at least 3 character', trigger: 'blur'},
        //   ],
        // },
      };
    },
    methods: {
      closeForm(formName) {
        this.$emit('closeFormAdd');
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.isLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('submitFormAdd')

          } else {
            this.isLoading = false;
            return false;
          }
        })
      }
    },
  };
</script>

<style scoped>
</style>
