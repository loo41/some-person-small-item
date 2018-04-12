<template>
  <div>
      <el-dialog
        title="答题测试"
        :visible.sync="answerShow"
        width="50%"
        modal="false"
        center
        :before-close="handleClose">
        <div v-for="(item, index) in this.answerData.allQuestion" :key="index" style="margin-top: 10px; margin-bottom: 15px;">
            <div v-if="item.type === 1">
                <el-card class="box-card">
                <div class="oneStyle">
                    <div style="font-size: 18px;">第{{index+1}}题: {{item.title}} (单选题)</div>
                    <div>{{item.grade}}分题</div>
                </div>
                <div style="margin-top: 20px;">
                    <div v-for="(select, index) in item.subject" :key="index">
                        <el-radio  v-model="item.trueSubject" :label="index">{{select.value}}</el-radio>
                    </div>
                </div>
                </el-card>
            </div>
            <div v-else-if="item.type === 2">
                <el-card class="box-card">
                    <div class="oneStyle">
                        <div style="font-size: 18px;">第{{index+1}}题: {{item.title}} (多选题)</div>
                        <div>{{item.grade}}分题</div>
                    </div>
                    <div style="margin-top: 20px;">
                    <el-checkbox-group 
                        v-model="item.trueSubject">
                        <el-checkbox v-for="(select, index) in item.subject" :label="select.value" :key="index" >{{select.value}}</el-checkbox>
                    </el-checkbox-group>
                    </div>
                </el-card>
            </div>
        </div> 
        <div style="margin-top: 20px;">
            <el-button type="primary" @click="uploadData()">确定</el-button>
        </div>  
      </el-dialog>
  </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    props: {
        answerShow: {
            type: Boolean
        },
        answerData: {
            type: Object
        },
        closeAnswer: {
            type: Function
        },
        trueAnswer: {
            type: Array
        }
    },
    methods: {
        handleClose () {
            this.closeAnswer()
        },
        uploadData () {
            let die = false
            let grade = 0
            this.answerData.allQuestion.forEach((element, index) => {
                if (element.trueSubject === 15 && element.type === 1) {
                    die = true
                } else if (element.trueSubject.length === 0) {  
                    die = true
                }
            });
            if (die) {
                this.$message({
                    type: 'error',
                    message: `还有没有作答的题目`
                })
                return
            }
            this.answerData.allQuestion.forEach((item, index) => {
                if (item.type === 1 && this.trueAnswer[index].answer === item.trueSubject) {
                    grade = parseInt(grade) + parseInt(item.grade)
                } else if(item.type === 2) {
                    if (this.trueAnswer[index].answer.sort().toString() === item.trueSubject.sort().toString()) {
                        grade = parseInt(grade) + parseInt(item.grade)
                    }
                }
            })
            this.$alert(`你的分数是 ${grade}分`, '分数', {
            confirmButtonText: '确定',
            callback: action => {
                this.$message({
                    type: 'success',
                    message: `success`
                })
            }
            });
        }
    }
}
</script>

<style>

</style>
