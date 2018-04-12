<template>
  <div class="app-container userBox">
    <div class="addUserStyle">
    <el-form ref="form " label-width="50px" class="inputStyle">
      <el-input
        placeholder="请输入名字"
        suffix-icon="el-icon-edit"
        v-model="inputName">
      </el-input>
    </el-form>
    <el-form ref="form " label-width="50px" class="inputStyle">
      <el-input
        placeholder="请输入密码"
        minlength="6"
        suffix-icon="el-icon-edit"
        v-model="inputWord">
      </el-input>
    </el-form>
    <el-form ref="form " label-width="50px" class="inputStyle">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入描述"
        v-model="dis">
      </el-input>
    </el-form>
    <div class="butStyle">
      <el-button type="primary" @click="dieUser">清空</el-button>
      <el-button type="primary" plain @click="addUser">提交</el-button>
    </div>
    </div>
  </div>
</template>

<script>
import { addUser } from '@/api/table'
export default {
  data() {
    return {
      inputName: '',
      inputWord: '',
      dis: ''
    }
  },
  methods: {
    dieUser() {
      this.inputName = ''
      this.dis = ''
      this.inputWord = ''
      this.$message('已经清空')
    },
    async addUser() {
      try {
        if (this.inputName === '' || this.dis === '' || this.inputWord === '') {
          this.$message({
            message: '不能为空',
            type: 'warning'
          })
          return
        }
        const user = await addUser({
          username: this.inputName,
          discription: this.dis,
          password: this.inputWord
        })
        if (user.data.code !== 20000) {
          this.$message({
            message: `错误, 错误码为${user.data.mes}`,
            type: 'warning'
          })
          return
        }
        this.$message({
          type: 'success',
          message: `添加成功`
        })
        this.inputName = ''
        this.dis = ''
        this.inputWord = ''
      } catch (e) {
        this.$message({
          message: '错误, 请稍后重试',
          type: 'warning'
        })
      }
    }
  }
}
</script>


<style scoped>
.userBox{
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center
}
.addUserStyle{
  height: 450px;
  width: 400px;
}
.addUserStyle:hover{
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4)
}
.inputStyle{
  margin-top: 40px;
  padding: 10px
}
.butStyle{
  min-height: 20px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px
}
</style>

