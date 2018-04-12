<template>
  <el-dialog
    title="抽奖"
    :visible.sync="cosmoBonusShow"
    width="50%"
    modal="false"
    center
    :before-close="handleClose">
        <div class="rewordBox">
          <div v-for="(item, index) in rewordSet" :key="index" class="reword">
              <el-button type="primary" v-if="index === 4" @click="startReword">开始抽奖</el-button>
              <div v-else-if="index !== 4 && item === '谢谢参与'" :style="rewordStyle[index+1]">谢谢参与</div>
              <div v-else-if="item !== '谢谢参与'" :style="rewordStyle[index+1]">{{item}}</div>
          </div>
        </div>
  </el-dialog>
</template>

<script>
export default {
    data () {
        return {
            rewordArray: [],
            newArray: [],
            rewordStyle: new Array(9).fill(``),
            notClick: false
        }
    },
    props: {
        cosmoBonusShow: {
            type: Boolean
        },
        rewordClose: {
            type: Function
        },
        setValue: {
            type: Array
        }
    },
    computed: {
        rewordSet () {
            if (this.setValue[0] === undefined) return
            this.setValue[0].reword.forEach(element => {
                this.rewordArray.push(element.rewordName)
            });
            if ( this.rewordArray.length < 9) {
                const array = new Array(9 - this.rewordArray.length).fill(`谢谢参与`)
                this.newArray = this.rewordArray.concat(array)
                return this.newSort(this.newArray)

            }
            return this.newSort(this.rewordArray)
        }
    },
    methods: {
        clear () {
            this.rewordArray = []
            this.newArray = []
            this.rewordStyle = new Array(9).fill(``)
            this.notClick = false
        },
        newSort(array) {
            let value = 0
            array.forEach((item, index) => {
                if (Math.random() > 0.2) {
                    value = item
                    array.splice(index, 1)
                    array.splice(Math.floor(Math.random()*7), 0, value)
                }
            })
            if (array[4] !== '谢谢参与') {
                for(let i = 0; i < array.length; i++) {
                    if (array[i] === '谢谢参与') {
                        array.splice(i, 1, array[4])
                        break
                    }
                }
            }
            this.newArray = array
            return array
        },
        startReword () {
            if (this.notClick) return
            this.notClick = true
            let index = 0
            let i = 0
            let time = Math.floor(150 - Math.random() * 100)
            let timeReword = setInterval(() => {
               index++
               this.rewordStyle = new Array(9).fill(``)
               if (index === 5) {
                   index = 6
               }
               if (index !== 5) {
                   this.rewordStyle.splice(index, 1, `background: #409EFF; color: white`)
               }
               if (index === 9) {
                   index = 0
               }
            }, time)
            setTimeout(() => {
                clearInterval(timeReword)
                this.$confirm(`${this.newArray[index-1]}`).then(() => {
                    this.rewordStyle = new Array(9).fill(``)
                    this.notClick = fals
                }).catch(() => {
                    this.notClick = false
                    console.log(e)
                })
            }, 4000)
        },
        handleClose () {
            this.rewordClose()
            this.clear()
        }
    }
}
</script>

<style>
.reword{
    height: 100px;
    width: 100px;
    text-align: center;
    line-height: 100px;
    border: 2px solid #DCDFE6;
}
.rewordBox{
    display: flex;
    width: 306px;
    height: 306px;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 auto
}
</style>
