<template>
<div>
  <el-table :data="list"  v-loading="loading" border fit highlight-current-row>
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
      <el-table-column label="问卷标题" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.askName}}
        </template>
      </el-table-column>
      <el-table-column label="发布单位" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.askUnit}}
        </template>
      </el-table-column>
      <el-table-column label="发布人" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.publishName}}
        </template>
      </el-table-column>
      <el-table-column label="问卷发布状态" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.prizesStatus}}
        </template>
      </el-table-column>
      <el-table-column label="试题类型" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.askType}}
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center" width="200">
        <template slot-scope="scope">
          {{scope.row.askDicripution}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="seeReword(scope.$index, scope.row)">试做</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="getAskConn(scope.$index, scope.row)">获取连接</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div>
      <answer
        :answerShow="answerShow"
        :answerData ="answerData"
        :closeAnswer ="closeAnswer"
        :trueAnswer="trueAnswer">
      </answer>
    </div>
</div>
</template>

<script>
import {delectAsk, getAskList} from '../../api/ask'

import answer from './component/answer'
const APPID = `wx69e5e843e03a2014`
const URL = `http://ask.tianchenyong.top`
export default {
    data () {
        return {
            list: [{askName: 'ada', allQuestion: 
            [{type: 1, title: 'adada', subject: [{value: 12}, {value: 555}], trueSubject: 1, grade: 10},{type: 2, title: 'adada', subject: [{value: 12}, {value: 555}], trueSubject: [], grade: 10}]}],
            loading: true,
            answerShow: false,
            answerData: {},
            trueAnswer: []
        }
    },
    components: {
        answer
    },
    async created () {
        try {
          const listdata = await getAskList()
          const list = listdata.data.data
          this.list = list
        } catch(e) {
          console.log(e)
        } finally {
          this.loading = false
        }
    },
    methods: {
        async seeReword (index, data) {
           this.answerShow = true
           this.answerData = await this.dealWith(data)
        },
        dealWith (datas) {
            const data = datas.allQuestion
            let dataValue = null
            data.forEach((item, index) => {
                if (Array.isArray(item.trueSubject)) {
                    dataValue = item.trueSubject
                    item.trueSubject = []
                } else {
                    dataValue = item.trueSubject
                    item.trueSubject = 15
                }
                this.trueAnswer.push({value: index, answer: dataValue})
            })
            return datas
        },
        closeAnswer () {
           this.answerShow = false
        },
        getAskConn (index, data) {
          if (data.askType === 1 && data.isSetReword !== false) {
             this.$confirm('确定获奖数据已经填写，否则将不会出现获取情况', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
              let URLencode = encodeURI(URL)
              this.$alert(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${URLencode}&response_type=code&scope=snsapi_userinfo&state=${data._id}#wechat_redirect=1`, '连接地址', {
                confirmButtonText: '确定',
                callback: action => {
                this.$message({
                  type: 'info',
                  message: `success`
                });
              }})
            }).catch((e) => {console.log(e)})
          }
        },
        handleDelete (index, data) {
            this.$confirm('此操作将永久问卷和数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(async () => {
                  await delectAsk({id: data._id})
                  this.$message({
                      type: 'success',
                      message: '删除成功'
                  })
                  this.list.splice(index, 1)
            }).catch((e) => {
              console.log(e)
              this.$message({
                  type: 'success',
                  message: '成功取消||删除失败'
              })
            })
        }
    }
}
</script>

<style>

</style>


