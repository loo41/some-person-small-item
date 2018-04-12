<template>
    <div class="addUserBox">
    <div class="addUserStyle">
    <el-form ref="form " label-width="50px" class="inputStyle">
        <el-input
            placeholder="请输入用户名"
            suffix-icon="el-icon-edit"
            v-model="inputName">
        </el-input>
    </el-form>
    <el-form ref="form " label-width="50px" class="inputStyle">
        <el-input
            placeholder="请输入登陆密码"
            minlength="6"
            suffix-icon="el-icon-edit"
            v-model="inputWord">
        </el-input>
    </el-form>
    <div class="inputStyle">
        <el-radio v-model="radio" label="1">男</el-radio>
        <el-radio v-model="radio" label="2">女</el-radio>
    </div>
    <div class="inputStyle">
        <el-select v-model="gradeUser" clearable placeholder="等级选择">
            <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item"
                :value="item">
            </el-option>
        </el-select>
    </div>
    <el-form ref="form " label-width="50px" class="inputStyle">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入描述"
        v-model="dis">
      </el-input>
    </el-form>
    <div class="butStyle inputStyle">
      <el-button type="primary" @click="dieUser">清空</el-button>
      <el-button type="primary" plain @click="addUser">注册</el-button>
    </div>
    </div>
    </div>
</template>

<script>
import {addUser} from '../../api/manageUser'
import Cookies from 'js-cookie';
export default {
    name: 'page2',
    data () {
        return {
            options: [4, 5, 6, 7, 8],
            inputName: '',
            inputWord: '',
            radio: 0,
            notClick: false,
            sex: ['男', '女'],
            dis: '',
            gradeUser: ''
        }
    },
    methods: {
        dieUser () {
            this.inputName = ''
            this.inputWord = ''
            this.radio = 0
            this.notClick = false
            this.dis = ''
            this.gradeUser = ''
        },
        grade () {
            if (parseInt(Cookies.get('grade')) < 7) {
                this.$message({
                    type: 'error',
                    message: '对不起, 你的等级不具备添加管理员'
                })
                return false
            }
            return true
        },
        isDataTrue () {
            if (!(this.inputName && this.inputWord 
                && this.sex[this.radio-1] 
                && this.dis && this.gradeUser)) {
                    this.$message({
                        type: '',
                        message: '内容不能为空'
                    })
                    return false
            }
            return true
        },
        async addUser () {
            try {
                if (this.notClick) return
                this.notClick = true
                if (!(this.grade())) return
                if (!(this.isDataTrue())) return
                await addUser({
                    username: this.inputName,
                    password: this.inputWord,
                    sex: this.sex[this.radio-1],
                    discription: this.dis,
                    grade: this.gradeUser
                })
                this.$message({
                    type: 'success',
                    message: '注册成功'
                })
                this.dieUser()
            } catch (e) {
                console.log(e)
                this.notClick = false
            }
        }
    }
};
</script>
<style>
.addUserStyle{
    height: 400px;
    width: 500px;
}
.addUserStyle:hover{
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
}
.addUserBox{
    display: flex;
    height: 600px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.inputStyle{
    padding: 10px;
}
</style>
