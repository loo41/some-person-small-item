<template>
  <div>
    <div v-show="!show" v-loading="!show" style="height: 200px;"></div>
    <div v-show="show">
    <div class="showBox">
      <div class="user">
         <div class="userHeader">
           <img :src="user.headimgurl" class="imgStyle" />
      </div>
      <div class="userInfo">
        <div>
        <div class="infoStyle">名称: {{user.nickname}}</div>
        <div class="infoStyle" v-if="user.sex == 1">性别: 男</div>
        <div class="infoStyle" v-if="user.sex == 2">性别: 女</div>
        <div class="infoStyle" v-if="user.sex == 0">性别: 无</div>
        </div>
      </div>
      </div>
      <div style="margin-top: 20px;">
        <div style="height: 40px; line-height: 40px; overflow: hidden; ">{{list.askName}}</div>
        <div class="rewordStyle">{{list.askDicripution}}</div>
        <div class="unitStyle">{{list.askUnit}}</div>
      </div>
    </div>
    <div v-for="(item, index) in this.list.allQuestion" :key="index" style="margin-top: 10px; margin-bottom: 15px;">
      <div v-if="item.type === 1">
          <el-card class="box-card">
          <div>
              <div style="font-size: 16px;" class="oneStyle">
                <div>{{index+1}} :</div>
                <div class="titleStyle">{{item.title}}</div>
              </div>
          </div>
          <div style="margin-top: 20px;">
              <div v-for="(select, index) in item.subject" :key="index" class="elRadioStyle">
                  <el-radio  v-model="item.trueSubject.value" :label="index">{{select.value}}</el-radio>
              </div>
          </div>
          <div class="grade">
              <div>单选题</div>
              <div>{{item.grade}}分题</div>
          </div>
          </el-card>
      </div>
      <div v-else-if="item.type === 2">
          <el-card class="box-card">
              <div style="font-size: 16px;" class="oneStyle">
                <div>{{index+1}}:</div>
                <div class="titleStyle">{{item.title}}</div>
              </div>
              <div style="margin-top: 20px;">
              <el-checkbox-group
                  v-model="item.trueSubject.value">
                  <el-checkbox v-for="(select, index) in item.subject" :label="select.value" :key="index" >{{select.value}}</el-checkbox>
              </el-checkbox-group>
              </div>
              <div class="grade">
                <div>多选题</div>
                <div>{{item.grade}}分题</div>
              </div>
          </el-card>
      </div>
  </div>
  <div style="margin-top: 20px;">
    <el-button type="primary" @click="uploadData()" class="but">提交</el-button>
  </div>
  <div class="youngon">
    Copyright © 2018 天津商业大学阳光网站
  </div>
  </div>
  </div>
</template>

<script>
import {sendCode, getClientREIF, getRewordSbject, uploadAnswer, getUserInfo} from '../api'
import Cookies from 'js-cookie'
export default {
  name: 'ask',
  data () {
    return {
      disable: false,
      show: false,
      state: '',
      openid: '',
      notClick: false,
      list: {},
      clear: {},
      lotteryDraw: 0,
      user: {}
    }
  },
  created () {
    let code = this.getCode('code')
    let noExitState = this.getCode('state').replace(/#\//, '')
    if (code && noExitState) { this.state = noExitState }
    sessionStorage.setItem('state', noExitState)
    this.getUserIF(code, this.state || noExitState)
  },
  methods: {
    getCode (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r = window.location.search.substr(1).match(reg)
      return r !== null ? decodeURI(r[2]) : null
    },
    async getUserIF (code, state) {
      const openid = await sessionStorage.getItem('openid')
      const rewordState = await sessionStorage.getItem('state')
      if (openid && rewordState) {
        const user = await getUserInfo({openid, rewordState})
        this.setInfo(user)
        return
      }
      const userInfo = await sendCode({code, state})
      this.setInfo(userInfo)
    },
    async setInfo (userInfo) {
      const infoToken = userInfo.data.token
      if (!(userInfo.data.user)) {
        this.user = userInfo.data.userIsExist[0]
      } else {
        this.user = userInfo.data.user
      }
      sessionStorage.setItem('openid', this.user.openid)
      Cookies.set('token', infoToken)
      this.clientRewordNote()
    },
    async clientRewordNote () {
      const note = await getClientREIF({openid: this.openid, state: this.state})
      const noteInfo = note.data.data
      this.openid = noteInfo.openid
      this.show = true
      this.dealWith(noteInfo)
    },
    reword () {
      let info = {openid: this.openid, state: this.state}
      this.$router.push({name: 'reword', params: {info: info}})
    },
    async dealWith (noteInfo) {
      this.lotteryDraw = noteInfo.lotteryDraw
      if (noteInfo.lotteryDraw > 0) {
        this.$confirm(`立即前往`, `你还有${noteInfo.lotteryDraw}抽奖机会`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.reword()
          return null
        }).catch((e) => {
          console.log(e)
          this.dealreword(noteInfo)
        })
      }
      this.dealreword(noteInfo)
    },
    async dealreword (noteInfo) {
      const reword = await getRewordSbject({state: this.state})
      this.list = reword.data.data
      if (!(this.list.prizesStatus)) {
        this.$message({
          message: `问卷未发布`,
          type: 'warning'
        })
        this.disable = false
        return
      }
      this.disable = true
      if (parseInt(noteInfo.expireTime) >= parseInt(new Date().getTime())) {
        this.$message({
          message: `您还没有达到可以答题的时间, 在过${noteInfo.expireTime - new Date().getTime()}秒还可以答题抽奖`,
          type: 'warning'
        })
        this.disable = false
        return null
      }
    },
    chack () {
      let die = false
      this.list.allQuestion.forEach((element, index) => {
        if (element.trueSubject.value === 15 && element.type === 1) {
          die = true
        } else if (element.trueSubject.value.length === 0) {
          die = true
        }
      })
      if (die) {
        this.$message({
          type: 'error',
          message: '还没有填完'
        })
        return false
      }
      return true
    },
    async isAnswer (grade, isReword) {
      if (this.list.askSetTime > 0 && isReword) {
        this.$alert(`今天答题抽奖次数已经用完, 本轮分数为${grade}分 没有达到抽奖分数`, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success',
              message: `success`
            })
          }
        })
        this.disable = false
        return false
      } else if (this.list.askSetTime <= 0 && isReword) {
        this.$alert(`本轮分数为${grade}分 没有达到抽奖分数, 还可以继续答题抽奖哦`, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success',
              message: `success`
            })
          }
        })
        this.disable = true
        return false
      } else if (this.list.askSetTime <= 0) {
        this.$confirm(`立即前往`, `本轮的分数为${grade} 获得一次抽奖机会`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.reword()
          this.lotteryDraw = this.lotteryDraw + 1
          return null
        }).catch((e) => {
          console.log(e)
          this.lotteryDraw = this.lotteryDraw + 1
          this.disable = true
          return null
        })
      } else if (isReword) {
        this.$alert(`今天答题抽奖次数已经用完, 本轮分数为${grade}分 达到抽奖分数`, '提示', {
          confirmButtonText: '前往抽奖',
          callback: action => {
            this.reword()
          }
        })
      }
    },
    async uploadData () {
      try {
        if (this.notClick) return
        this.notClick = true
        if (!(this.disable)) {
          this.$message({
            type: 'error',
            message: `不能答题抽奖`
          })
          return null
        }
        if (!(this.chack())) return
        const value = await uploadAnswer({answer: this.list, state: this.state, lotteryDraw: this.lotteryDraw})
        const gradeVlaue = value.data.grade
        let isReword = ''
        if (parseInt(gradeVlaue) < parseInt(this.list.askSetGrade)) {
          isReword = true
          await this.isAnswer(gradeVlaue, isReword)
          return null
        }
        isReword = false
        await this.isAnswer(gradeVlaue, isReword)
      } catch (e) {
        console.log(e)
      } finally {
        this.clearData()
        this.notClick = false
      }
    },
    clearData () {
      this.list.allQuestion.forEach((element, index) => {
          if (element.type === 1) {
            element.trueSubject = {index, value: 15}
          } else if (element.type === 2) {
            element.trueSubject = {index, value: []}
          }
      })
    }
  }
}
</script>

<style>
.el-message-box{
  width: 90%!important;
}
.elRadioStyle{
  display: flex;
  margin-top: 5px;
}
.showBox{
  min-height: 250px;
}
.rewordInfo{
  height: 150px;
}
.but{
  width: 60%;
}
.el-checkbox-group{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.el-checkbox {
  margin-left: 0px!important;
}
.grade {
  text-align: end;
  margin-top: 20px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.youngon{
  height: 50px;
  border-top: 1px #409EFF solid;
  margin-top: 40px;
  text-align: center;
  color: gray;
  font-size: 12px;
  line-height: 50px;
}

.user{
  height: 100px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px #409EFF solid;
}
.userHeader {
  height: 90px;
  width: 90px;
  background: gray;
  margin-left: 10px;
  margin-top: 5px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
}
.userInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.imgStyle{
  height: 100%;
  width: 100%;
}
.infoStyle{
  padding: 5px;
  text-align: left;
}
.oneStyle{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.titleStyle{
  text-indent: 5px;
}
.rewordStyle {
  overflow: hidden;
  font-size: 12px;
  text-align: left;
  text-indent: 15px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 15px;
}
.unitStyle {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding-right: 10%;
  text-align: end;
}
</style>
