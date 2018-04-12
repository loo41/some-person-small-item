<template>
  <div>
  <div class="box">
      <div class="turnplate_box">
        <canvas id="myCanvas" ref="myCanvas" width="300px" height="300px" :style="domStyle"></canvas>
        <canvas id="myCanvas01" ref="myCanvas01" width="200px" height="200px"></canvas>
        <canvas id="myCanvas03" ref="myCanvas03" width="200px" height="200px"></canvas>
        <canvas id="myCanvas02" ref="myCanvas02" width="150px" height="150px"></canvas>
        <button id="tupBtn" ref="tupBtn" class="turnplatw_btn" @click="startReword"></button>
    </div>
  </div>
  <el-button type="info">还有 {{clickNum}} 抽奖机会</el-button>
  </div>
</template>

<script>
import {getClANRE, sendRewordData} from '../api'
import {dealWith} from './dealWith'
export default {
  data () {
    return {
      angles: '',
      clickNum: 0,
      notClick: false,
      errorRun: false,
      rotNum: 0,
      notice: null,
      domStyle: '',
      color: ['#626262', '#787878', 'rgba(0,0,0,0.5)', '#DCC722', 'white', '#FF4350'],
      info: '',
      info1: '',
      openid: '',
      state: '',
      note: [],
      reword: [],
      maybe: [],
      canClick: false
    }
  },
  watch: {
    info () {
      if (this.info) {
        this.canvasRun()
      }
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    async getInfo () {
      this.openid = this.$route.params.info.openid
      this.state = this.$route.params.info.state
      if (!(this.openid) || !(this.state)) {
          this.$message({
              type: 'error',
              message: '不合法的进入是不允许的'
          })
          this.errorRun = true
          return
      }
      const note = await getClANRE({openid: this.openid, state: this.state})
      const data = note.data
      this.note =  data.note
      this.reword = data.reword
      this.clickNum = this.note.lotteryDraw
      const dataInfo = await dealWith(this.reword)
      this.info = dataInfo[0]
      this.info1 = dataInfo[1]
      this.maybe = dataInfo[2]
      this.canClick = true
      if (parseInt(this.clickNum) !== 0) {
        this.$alert(`恭喜你还有${this.clickNum}次机会`, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'success',
              message: `祝你好运`
            })
          }
        })
      } else {
          this.$message({
            message: `已经没有抽奖机会了`
          })
      }
    },
    async startReword () {
      try {
        if (!(this.canClick)) {
          return
        }
        if (this.errorRun) {
          this.$message({
            type: 'error',
            message: '非法进入, 不允许抽奖'
          })
          return
        }
        if (this.clickNum <= 0) {
          this.$message({
            type: 'success',
            message: '已经没有抽奖机会了'
          })
          return
        }
        if (this.notClick) return
        this.notClick = true
        await this.runCup()
        this.clickNum--
      } catch(e) {
        console.log(e)
      }
    },
    async runCup () {
      await this.probability()
      const degValue = 'rotate('+ this.angles + 'deg' + ')'
      this.domStyle = `transform: ${degValue}`
      setTimeout(() => {
        if (this.notice == '谢谢参与再接再厉' || this.notice == null) {
          this.$message({
            type: 'success',
            message: `谢谢参与再接再厉`
          })
          this.notClick = false
          return
        }
        this.$alert(`${this.notice} 请在一至二个工作日之内到${this.reword.awardAddress}领取`, '提示', {
          confirmButtonText: '确定',
        })
        this.notClick = false
      }, 6000)
      await sendRewordData({
        openid: this.openid, state: this.state, 
        reword: this.notice, lotteryDraw: this.clickNum
      })
    },
    probability () {
      let num = Math.random() * 10
      let angles = 0
      let notice = null
      let rotNum = this.rotNum
      let info1 = this.info1
      let info = this.info
      if ( 0 <= num < this.getMaby(0)) {
        angles = 2160 * rotNum + 1800
        notice = info[0] + info1[0]
      } else if ((this.getMaby(0) <= num) && (num< this.getMaby(1))) {
        angles = 2160 * rotNum + 1845
        notice = info[7] + info1[7]
      } else if ( (this.getMaby(1) <= num) && (num < this.getMaby(2))) {
        angles = 2160 * rotNum + 1890
        notice = info[6] + info1[6]
      } else if ((this.getMaby(2) <= num) && (num < this.getMaby(3) )) {
        angles = 2160 * rotNum + 1935
        notice = info[5] + info1[5]
      } else if ((this.getMaby(3) <= num) &&  ( num < this.getMaby(4))) {
        angles = 2160 * rotNum + 1980
        notice = info[4] + info1[4]
      } else if ((this.getMaby(4) <= num) &&  (num < this.getMaby(5))) {
        angles = 2160 * rotNum + 2025
        notice = info[3] + info1[3]
      } else if ((this.getMaby(5) <= num) && (num < this.getMaby(6))) {
        angles = 2160 * rotNum + 2070
        notice = info[2] + info1[2]
      } else if ((this.getMaby(6) <= num) && (num < this.getMaby(7))) {
        angles = 2160 * rotNum + 2115
        notice = info[1] + info1[1]
      }
      rotNum = rotNum + 1
      this.angles = angles
      this.notice = notice
      this.rotNum = rotNum
    },
    getMaby (index) {
      let gared = 0
      for (let i = 0; i < parseInt(index); i++) {
        gared = gared + this.maybe[i]
      }
      return gared
    },
    canvasRun () {
      const canvas = this.$refs.myCanvas
      const canvas01 = this.$refs.myCanvas01
      const canvas03 = this.$refs.myCanvas03
      const canvas02 = this.$refs.myCanvas02
      this.ctx = canvas.getContext('2d')
      this.ctx1 = canvas01.getContext('2d')
      this.ctx3 = canvas03.getContext('2d')
      this.ctx2 = canvas02.getContext('2d')
      this.createCircle()
      this.createCirText()
      this.initPoint()
    },
    createCircle () {
      const ctx = this.ctx
      let startAngle = 0
      let endAngle = 0
      for (var i = 0; i < 8; i++) {
        startAngle = Math.PI * (i / 4)
        endAngle = startAngle + Math.PI * (1 / 4)
        ctx.save()
        ctx.beginPath()
        ctx.arc(150, 150, 100, startAngle, endAngle, false)
        ctx.lineWidth = 120
        if (i % 2 === 0) {
          ctx.strokeStyle = this.color[0]
        } else {
          ctx.strokeStyle = this.color[1]
        }
        ctx.stroke()
        ctx.restore()
      }
    },
    createCirText () {
      const ctx = this.ctx
      ctx.textAlign = 'start'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = this.color[3]
      let step = 2 * Math.PI / 8
      for (var i = 0; i < 8; i++) {
        ctx.save()
        ctx.beginPath()
        ctx.translate(150, 150)
        ctx.rotate(i * step)
        ctx.font = '20px Microsoft YaHei'
        ctx.fillStyle = this.color[3]
        ctx.fillText(this.info[i], -30, -115, 60)
        ctx.font = '14px Microsoft YaHei'
        ctx.fillText(this.info1[i], -30, -95, 60)
        ctx.closePath()
        ctx.restore()
      }
    },
    initPoint () {
      const ctx1 = this.ctx1
      const ctx2 = this.ctx2
      const ctx3 = this.ctx3
      ctx1.beginPath()
      ctx1.moveTo(100, 24)
      ctx1.lineTo(90, 62)
      ctx1.lineTo(110, 62)
      ctx1.lineTo(100, 24)
      ctx1.fillStyle = this.color[5]
      ctx1.fill()
      ctx1.closePath()
      ctx3.beginPath()
      ctx3.arc(100, 100, 40, 0, Math.PI * 2, false)
      ctx3.fillStyle = this.color[5]
      ctx3.fill()
      ctx3.closePath()
      ctx3.font = 'Bold 20px Microsoft YaHei'
      ctx3.textAlign = 'start'
      ctx3.textBaseline = 'middle'
      ctx3.fillStyle = this.color[4]
      ctx3.beginPath()
      ctx3.fillText('开始', 80, 90, 40)
      ctx3.fillText('抽奖', 80, 110, 40)
      ctx3.fill()
      ctx3.closePath()
      ctx2.beginPath()
      ctx2.arc(75, 75, 75, 0, Math.PI * 2, false)
      ctx2.fillStyle = this.color[2]
      ctx2.fill()
      ctx2.closePath()
    }
  }
}
</script>

<style>
.box{
  width: 300px;
  height: 300px;
  margin: 100px auto;
  position: relative;
}
.turnplate_box{
  width: 300px;
  height: 300px;
  margin: 0 auto;
  position: relative;
}
.turnplate_box canvas{
  position: absolute;
}
#myCanvas{
  background-color: white;
  left: 0px;
  border-radius: 100%;
}
#myCanvas01,#myCanvas03{
  left: 50px;
  top: 50px;
  z-index: 30;
}
#myCanvas02{
  left: 75px;
  top: 75px;
  z-index: 20;
}
#myCanvas{
  transition: transform 6s;
  -o-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
}
.turnplatw_btn{
  width: 60px;
  height: 60px;
  left: 120px;
  top: 120px;
  border-radius: 100%;
  position: absolute;
  cursor: pointer;
  border: none;
  background: transparent;
  outline: none;
  z-index: 40;
}
</style>
