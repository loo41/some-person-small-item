<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='index' width="150">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='ID' width="150">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.avatar}}
        </template>
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
    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <el-input :placeholder="userInfromation[1]" :disabled="true" class="changeUserI">
          <template slot="prepend">id</template>
        </el-input>
        <el-input :placeholder="userInfromation[2]" v-model="inputName" class="changeUserI">
          <template slot="prepend">姓名</template>
        </el-input>
        <el-input :placeholder="userInfromation[3]" v-model="inputD" class="changeUserI">
          <template slot="prepend">描述</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUserInformation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, changeUser, delectUser } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      userInfromation: [],
      inputName: '',
      inputD: ''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleEdit(index, row) {
      this.dialogVisible = true
      this.userInfromation[0] = index
      this.userInfromation[1] = row.id
      this.userInfromation[2] = row.username
      this.userInfromation[3] = row.discription
    },
    async changeUserInformation() {
      let message = '取消成功'
      try {
        if (this.inputName === '' && this.inputD === '') {
          message = '信息不能为空'
          return
        }
        if (this.inputName === this.userInfromation[2] &&
          this.inputD === this.userInfromation[3]) {
          message = '信息不能相同'
          return
        }
        const user = await changeUser({
          id: this.userInfromation[1],
          username: this.inputName,
          discription: this.inputD
        })
        if (user.data.code !== 20000) {
          message = '服务器端错误'
          return
        }
        message = 'success'
        this.list[this.userInfromation[0]].username = this.inputName
        this.list[this.userInfromation[0]].discription = this.discription
      } catch (e) {
        console.log(e)
      } finally {
        this.$message(message)
        this.inputName = ''
        this.inputD = ''
        this.dialogVisible = false
      }
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delectUser({ id: row.id })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.list.splice(this.userInfromation[0], 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.reverse()
        this.listLoading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .changeUserI{
    margin-top: 10px
  }
</style>