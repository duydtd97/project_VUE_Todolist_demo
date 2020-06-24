<template>
  <transition name="el-fade-in-linear">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div v-show='open'>
        <el-row type="flex" justify='space-between' class='el-row-custom'>
          <el-col :offset='1' :span="16" style='text-align: left'>
            <el-form-item prop="name">
              <el-input
                  placeholder="Todo name"
                  v-model="ruleForm.name"
                  clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-row type="flex" justify='end'>
              <el-form-item style='margin: 0 8px'>
                <el-button type="primary" icon="el-icon-check" circle @click="submitForm('ruleForm')"/>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" icon="el-icon-close" circle @click="closeForm('ruleForm')"/>
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
    name:'NewItem',
    props:{
      open:{
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        ruleForm: {
          name: '',
        },
        rules: {
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      closeForm(formName){
        this.$emit('closeFormAdd');
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
  };
</script>

<style scoped>
</style>
