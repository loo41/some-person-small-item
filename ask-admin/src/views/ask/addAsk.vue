<template>
    <div class="askBox">
    <div>
        <el-button type="primary" icon="el-icon-delete" @click="clearAll"></el-button>
        <el-button type="primary" @click="uploadAllData">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
    <div>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输问卷名称" v-model="askName">
                <template slot="append">name</template>
            </el-input>
        </div>
        <div style="margin-top: 15px;" >
            <el-input placeholder="发布单位"  v-model="askUnit">
                <template slot="append">publishUnit</template>
            </el-input>
        </div>
        <div style="margin-top: 15px;">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入本次问卷的描述"
                v-model="askDicripution">
            </el-input>
        </div>
        <div style="margin-top: 15px;" class="askStyle">
            <el-select v-model="askValue" clearable placeholder="请选择问卷类型">
                <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
            <div>
                <el-input placeholder="请输入展示题目数(Number)" v-model="askAmount">
                </el-input>
            </div>
            <div>
                <el-button type="primary"  v-if="askValue === '分数奖励问卷'" @click="askSet">
                    基本配置
                    <i class="el-icon-upload el-icon--right"></i>
                </el-button>
            </div>
        </div>
    </div>
    <div class="select">
        <el-radio-group >
            <el-button type="primary" @click="selectOne">单选题</el-button>
            <el-button type="primary" @click="selectMore">多选题</el-button>
            <el-button type="primary" @click="selectFillUp">填空题</el-button>
            <el-button type="primary">自定义题</el-button>
        </el-radio-group>
    </div>
    <div style="min-height: 100px;">
        <show 
            :showData="allQuestion"
            :upMove="upMove"
            :change="change">
        </show>
    </div>
    <div>
        <el-dialog
            title="分数奖励问卷基本设置"
            :visible.sync="askSetVisible"
            width="50%"
            modal="false"
            :before-close="handleClose">
            <div class="title" style="margin-top: 10px;">
                <div style="text-align: center">设置多少时间可以再次答题抽奖</div>
                <div>
                    <el-input placeholder="请输入时间" v-model="askSetTime" style ="width: 200px">
                        <template slot="append">time</template>
                    </el-input>
                </div>
            </div>
            <div class="title" style="margin-top: 10px;">
                <div style="text-align: center">设置最少获奖分数</div>
                <div>
                    <el-input placeholder="请输入分数" v-model="askSetGrade" style ="width: 200px">
                        <template slot="append">grade</template>
                    </el-input>
                </div>
            </div>
            <div class="askSetBottom">
                <el-button type="primary" @click="askSetSure" >确定</el-button>
            </div>
       </el-dialog>
    </div>
    <div>
    <div>
        <div>
            <alone 
                :pushSbuject="storeSbuject" 
                :aloneVisible="dialogVisible"
                :changeData="changeData"
                :handleClose="handleClose">
            </alone>
        </div>
        <div>
            <more
                :storeSbuject="storeSbuject" 
                :moreVisible="moreVisible"
                :changeData="changeData"
                :handleClose="handleClose">
            </more>
        </div>
        <div>
            <fill-up
                :storeSbuject="storeSbuject"
                :fillUpVisible="fillUpVisible"
                :handleClose="handleClose">
            </fill-up>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
import show from './component/show.vue'
import alone from './component/aloneSelect.vue'
import fillUp from './component/fillUpSelect.vue'
import more from './component/moreSelect.vue'
import {uploadAskQuestion} from '../../api/ask'
import Cookies from 'js-cookie'
export default {
    data () {
        return {
            dialogVisible: false,
            fillUpVisible: false,
            moreVisible: false,
            askSetVisible: false,
            allQuestion: [],
            askSetTime: '',
            askSetGrade: '',
            changeData: null,
            askAmount: null,
            options: ['分数奖励问卷', '无偿问卷'],
            askValue: '',
            askName: '',
            askUnit: '',
            askDicripution: ''
        }
    },
    components: {
        show,
        alone,
        more,
        fillUp
    },
    methods: {
        clearAll () {
            this.$confirm('确认clear all 填写的数据奖全部清空').then(() => {
                this.dialogVisible = false
                this.moreVisible = false
                this.fillUpVisible = false
                this.allQuestion = []
                this.changeData = null
                this.askAmount = null
                this.askSetTime = '',
                this.askSetGrade= '',
                this.askValue = ''
                this.askGrade = ''
                this.askName = ''
                this.askUnit = ''
                this.askDicripution = ''
            }).catch((e) => {console.log(e)})   
        },
        askSet () {
            this.askSetVisible = true
        },
        selectOne () {
            this.dialogVisible = true
        },
        selectMore () {
            this.moreVisible = true
        },
        selectFillUp() {
            this.fillUpVisible = true
        },
        handleClose () {
            this.dialogVisible = false,
            this.moreVisible = false,
            this.fillUpVisible = false,
            this.askSetVisible = false,
            this.changeData = null
        },
        askSetSure () {
            if (this.askSetTime && this.askSetGrade) {
                this.handleClose()
                return
            }
            this.$confirm('你还有没填写的内容, 不可以上传, 确定提交').then(() => {
                this.handleClose()
            }).catch((e) => {
                console.log(e)
            })
        },
        storeSbuject (type, title, subject, trueSubject, grade, isChange) {
            if (isChange) {
                this.allQuestion.splice(isChange-1, 1, {
                    type,
                    title,
                    subject,
                    trueSubject,
                    grade,
                    index: this.allQuestion.length
                })
                this.handleClose()
                this.changeData = 0
                return
            }
            if (type === 1 || type === 2) {
                this.allQuestion.push({
                    type,
                    title,
                    subject,
                    trueSubject,
                    grade,
                    index: this.allQuestion.length
                })
            }
            this.handleClose()
        },
        async change (index, type) {
            if (type === 1) {
                this.selectOne()
                this.changeData = index+1
                return
            }
            if (type === 2) {
                this.selectMore()
                this.changeData = index+1
                return
            }
        },
        upMove (index) {
            if (index <= 0) {
                this.$message('这已经是第一个了')
                return
            }
            const betweenValueUp = this.allQuestion[index-1]
            const betweenValueAfter = this.allQuestion[index]
            this.allQuestion.splice(index, 1, betweenValueUp)
            this.allQuestion.splice(index-1, 1, betweenValueAfter)
            this.$message({
                type: 'success',
                message: 'success'
            })
        },
        askValueType (value) {
            let flag = null
            const changeType = ['分数奖励问卷', '无偿问卷']
            changeType.forEach((item, index) => {
                if (value == item) {
                    flag = index + 1
                }
            }) 
            return flag
        },
        testPass () {
            let testRex = /\d/g
            if (this.askName && this.askUnit 
                && this.askDicripution && this.askValue &&
                 testRex.test(this.askAmount)) {
                    if (this.askValueType(this.askValue) === 1) {
                        if (this.askSetTime && this.askSetGrade && (0 <= parseInt(this.askSetTime) && parseInt(this.askSetTime) <= 500)) {
                            return true
                        }
                        this.$message({
                            type: 'error',
                            message: '输入有误'
                        })
                        return false
                    }
                    return true
            }
            this.$message({
                type: 'error',
                message: '输入有误'
            })
            return false
        },
        async setData () {
            let data = {}
            let user = await Cookies.get('user')
            if (this.askValueType(this.askValue) === 1) {
                data = {
                    askName: this.askName,
                    askUnit: this.askUnit,
                    askDicripution: this.askDicripution,
                    allQuestion: this.allQuestion,
                    askType: 1,
                    prizesStatus: false,
                    isSetReword: false,
                    askAmount: this.askAmount,
                    askSetTime: this.askSetTime,
                    askSetGrade: this.askSetGrade,
                    publishName: user
                }
            }
            if (this.askValueType(this.askValue) === 2) {
                data = {
                    askName: this.askName,
                    askUnit: this.askUnit,
                    allQuestion: this.allQuestion,
                    askDicripution: this.askDicripution,
                    askType: 2,
                    prizesStatus: true,
                    askAmount: this.askAmount,
                    isSetReword: true,
                    publishName: user
                }
            }
            return data
        },
        async uploadAllData () {
            if (!(this.testPass())) return
            await this.$confirm('确认提交, 提交后不可更改').then(async () => {
            try {
                let data = await this.setData()
                await uploadAskQuestion(data)
                this.$message({
                    type: 'success',
                    message: '上传成功'
                })
                this.clearAll()
            } catch (e) {
                console.log(e)
            }}).catch(() => {
              console.log(e)
              this.$message({
                  type: 'success',
                  message: '取消成功'
              })
            })
        }
    }
}
</script>

<style>
.askBox{
    width: 900px;
    min-height: 800px;
    margin: 0 auto;
}
.select{
    margin-top: 10px;
}
.v-modal{
    display: none!important
}
.title{
    padding: 10px;
}
.askSetBottom{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.askStyle{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.el-card__body {
    width: 100%!important;
}
</style>

