<template>
    <div>
    <div class="lookUser" @keydown.enter="lookForUserInfo">
      <el-input placeholder="请输入查询内容" v-model="inputValue" class="input-with-select">
        <el-select v-model="select" slot="prepend" class="inputStyles" placeholder="请选择">
          <el-option label="姓名" value="1"></el-option>
          <el-option label="openid" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="lookForUserInfo"></el-button>
      </el-input>
    </div>
    <el-table :data="list"  v-loading="loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="150">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='OPENID' width="150">
        <template slot-scope="scope">
          {{scope.row.openid}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='姓名' width="150">
        <template slot-scope="scope">
          {{scope.row.nickname}}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.sex}}
        </template>
      </el-table-column>
      <el-table-column label="省份" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.province}}
        </template>
      </el-table-column>
      <el-table-column label="国家" width="150" align="center" v-if="userGarde >= 7">
        <template slot-scope="scope">
          {{scope.row.city}}
        </template>
      </el-table-column>
       <el-table-column label="特权" width="150" align="center" v-if="userGarde >= 7">
        <template slot-scope="scope">
          {{scope.row.privilege}}
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column label="头像" align="center" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.headimgurl" style="height: 50px; width: 50px;"/>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="lookReword(scope.$index, scope.row)">查看抽奖信息</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="userButStyle">
      <div class="butStyle">
        <el-button type="primary" @click="pushPage" class="but">下一页</el-button>
      </div>
    </div>
    <reword
      :rewordInfoShow="rewordInfoShow"
      :openid="openid"
      :close="close"
      :user="user"
      >
    </reword>
    </div>
</template>

<script>
import {clientList, lookForUser, getClientRewordInfo} from '../../api/client'
import reword from './showReword.vue'
export default {
    name: 'page',
    data () {
        return {
            notClick: false,
            notList: false,
            page: 1,
            list: [],
            deposit: [],
            loading: true,
            select: '姓名',
            openid: '',
            inputValue: '',
            userReword: '',
            user: {},
            rewordInfoShow: false
        }
    },
    components: {
      reword
    },
    created () {
        this.getListData()
    },
    watch: {
      inputValue () {
        if (this.inputValue) {
          this.list = this.deposit
        }
      },
      userReword () {
        if (userReword) {
          this.rewordInfoShow = true
          return
        }
      }
    },
    methods: {
        close () {
          this.rewordInfoShow = false
        },
        lookReword (index, data) {
          this.openid = data.openid
          this.$prompt('请输入问卷_id', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputErrorMessage: '问卷_id格式不正确'
          }).then(async ({ value }) => {
            const data = value.replace(/\+/g, '').trim()
            const info = await getClientRewordInfo({state: data, openid: this.openid})
            this.user = info.data.data
            if (!!(this.user)) {
              this.rewordInfoShow = true
              return
            } else {
              this.$message({
                type: 'success',
                message: '该用户在该问卷没有抽奖结果||输入问卷ID错误'
              })
            }
          }).catch(() => {
            return null 
          })
          return
        },
        async lookForUserInfo() {
          try {
            if (this.notClick) return
            this.notClick = true
            if (!(this.inputValue)) {
              this.$message({
                type: 'success',
                message: '不能为空'
              })
              return
            }
            const user = await lookForUser({info: this.inputValue, type: this.select})
            const userInfo = user.data.data
            this.list = userInfo
          } catch (e) {
            console.log(e)
          } finally {
            this.notClick = false
          }
        },
        async pushPage() {
           try {
              if (this.notClick) return
              this.notClick = true
              if (this.notList) {
                this.$message({
                  type: 'success',
                  message: '没有更多了'
                })
                return
              }
              const listData = await clientList({page: this.page+1})
              this.list = listData.data.data
              this.deposit = listData.data.data
              this.page = thiss.page + 1
              if (list.length < 20) {
                this.notList = true
              }
           } catch (e) {
             console.log(e)
           } finally {
             this.notClick = false
           }
        },
        async getListData () {
            try {
              if (this.notClick) return
              this.notClick = true
              if (this.notList) {
                this.$message({
                  type: 'success',
                  message: '没有更多了'
                })
                return
              }
              const listData = await clientList({page: this.page})
              const list = listData.data.data
              if (list.length < 20) {
                this.notList = true
              }
              this.list = list
              this.deposit = listData.data.data
              this.loading = false
            } catch (e) {
              console.log(e)
            } finally {
              this.notClick = false
            }
        }
    }
};
</script>
<style scoped >
.butStyle{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.but{
  margin-left: 100px; 
}
.inputStyles{
  width: 150px;
}
.userButStyle{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
