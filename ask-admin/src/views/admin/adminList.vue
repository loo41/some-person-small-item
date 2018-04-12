<template>
    <div>
    <el-table :data="list"  v-loading="loading"  border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="150">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='ID' width="150">
        <template slot-scope="scope">
          {{scope.row._id}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='等级' width="150">
        <template slot-scope="scope">
          {{scope.row.grade}}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.sex}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="密码(等级>=7)" width="150" align="center" v-if="userGarde >= 7">
        <template slot-scope="scope">
          {{scope.row.password}}
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{scope.row.discription}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog
        :title="adminUser"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div class="">
            <el-input :placeholder="userID" :disabled="true" class="changeUser">
                <template slot="prepend">_id</template>
            </el-input>
            <el-input :placeholder="userInfromation[0]" v-model="form.grade" class="changeUser">
                <template slot="prepend">等级</template>
            </el-input>
            <el-input :placeholder="userInfromation[1]" v-model="form.username" class="changeUser">
                <template slot="prepend">姓名</template>
            </el-input>
            <el-input :placeholder="userInfromation[2]" v-model="form.password" class="changeUser">
                <template slot="prepend">密码</template>
            </el-input>
            <el-input :placeholder="userInfromation[3]" v-model="form.dic" class="changeUser">
                <template slot="prepend">描述</template>
            </el-input>
            <el-input :placeholder="userInfromation[4]" v-model="form.sex" class="changeUser">
                <template slot="prepend">性别</template>
            </el-input>
            <div slot="footer" class="changeUser">
              <el-button @click="this.dieOut">取 消</el-button>
              <el-button type="primary" @click="changeUserInformation">确 定</el-button>
            </div>
        </div>
      </el-dialog>
    </div>
    </div>
</template>

<script>
import {getList, delectUser, changeUser} from '../../api/manageUser'
import Cookies from 'js-cookie';
export default {
    data () {
        return {
            list: [{_id: '444', username: 'dada', grade: 'dada', sex: '男', discription: '2', password: '111'},
            {_id: '444', username: 'dada', grade: 'dada', sex: '男', discription: '2', password: '555'}],
            userGarde: Cookies.get('grade'),
            dialogVisible: false,
            userInfromation: [],
            adminUser: '',
            notClick: false,
            loading: true,
            userID: '',
            nowLocation: '',
            form: {grade: '', username: '', password: '', dic: '', sex: ''}
        }
    },
    async created () {
      try {
        const list = await getList()
        const listData = list.data.data
        this.list = listData
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'error',
          message: '数据获取出错'
        })
      } finally {
        this.loading = false
      }
    },
    methods: {
        grade () {
            if (parseInt(Cookies.get('grade')) < 7) {
                this.$message({
                    type: 'error',
                    message: '对不起, 你的等级不具备操作权限'
                })
                return false
            }
            return true
        },
        emptyFrom () {
          for (let value of Object.values(this.form)) {
              if (!(value)) return false
          }
          return true
        },
        alikeFrom () {
          if (this.form.grade === this.userInfromation[0] &&
           this.form.username === this.userInfromation[1] && 
           this.form.password === this.userInfromation[2] &&
           this.form.dic === this.userInfromation[3]) {
            message = '信息不能相同'
            return false
          }
          return true
        },
        async changeUserInformation () {
            let message = 'error'
            try {
                if (this.notClick) return
                this.notClick = true
                if (!this.emptyFrom()) {
                    message = '信息不能有空'
                    return
                }
                if (!this.alikeFrom()) {
                    message = '信息不能相同'
                    return
                }
                const {username, dic, grade, sex, password} = this.form
                await changeUser({
                  _id: this.userID,
                  grade,
                  username,
                  password,
                  sex,
                  discription: this.form.dic
                })
                this.list[this.nowLocation].username = username
                this.list[this.nowLocation].discription = dic
                this.list[this.nowLocation].grade = grade
                this.list[this.nowLocation].sex = sex
                this.list[this.nowLocation].password = password
                message = 'success'
                this.clear()
            } catch (e) {
                console.log(e)
            } finally {
                this.$message(message)
                this.notClick = false
            }
        },
        clear () {
          this.form = {grade: '', username: '', password: '', dic: '', sex: ''}
        },
        dieOut () {
          this.clear()
          this.userInfromation = []
          this.dialogVisible = false
        },
        handleClose () {
            this.dialogVisible = false
        },
        handleEdit (index, data) {
            if (!(this.grade())) return
            this.nowLocation = index
            this.dialogVisible = true
            this.userID = data._id
            this.adminUser = `${data.username}====信息更改`
            this.userInfromation[0] = data.grade
            this.userInfromation[1] = data.username
            this.userInfromation[2] = data.password
            this.userInfromation[3] = data.discription
            this.userInfromation[4] = data.sex
        },
        handleDelete (index, data) {
            if (!(this.grade())) return
            this.$confirm(`此操作将永久删除${data.username}和相关记录, 是否继续?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(async () => {
              await delectUser({id: data._id})
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除 || 删除失败'
              });
            });
        }
    }
};
</script>
<style>
.changeUser{
  margin-top: 10px
}
</style>

