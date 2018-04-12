<template>
  <div>
      <el-dialog
        title="获奖设置"
        :visible.sync="rewordShow"
        width="50%"
        modal="false"
        :before-close="handleClose">
        <div>
            <el-button type="primary" @click="addRword">添加奖项</el-button>
        </div>
        <div>
            <div v-for="(item, index) in reword">
                <div v-bind:key="index" style="margin-top: 15px;">
                    <div>
                        <span style="margin-right: 20px;">{{index+1}}等奖</span>
                        <el-input
                            placeholder="请输入奖品名称"
                            v-model="item.rewordName"
                            style="width: 25%"
                            clearable>
                        </el-input>
                        <el-input
                            placeholder="请输入奖品数量"
                            v-model="item.rewordNumber"
                            style="width: 25%"
                            clearable>
                        </el-input>
                        <el-input
                            placeholder="概率百分比"
                            v-model="item.rwordChance"
                            style="width: 25%"
                            clearable>
                        </el-input>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteRwordIndex(index)">删除</el-button>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <span style="margin-right: 20px;">谢谢参与</span>
                <el-input
                    placeholder="请输入不获奖数量"
                    style="width: 50%"
                    v-model="noReword"
                    clearable>
                </el-input>
            </div>
            <div style="margin-top: 20px;">
                <span style="margin-right: 20px;">领奖地点</span>
                <el-input
                    placeholder="请输入领奖地点"
                    style="width: 50%"
                    v-model="getRELO"
                    clearable>
                </el-input>
            </div>
            <div style="margin-top: 20px;">
                <el-button type="primary" @click="clear">清除</el-button>
                <el-button type="primary" @click="sureReword">确定</el-button>
            </div>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import {setReword} from '../../../api/reword'
export default {
    data () {
        return {
            reword: [],
            noReword: '',
            getRELO: ''
        }
    },
    props: {
        rewordShow: {
            type: Boolean
        },
        rewordID: {
            type: String
        },
        rewordClose: {
            type: Function
        }
    },
    methods: {
        handleClose () {
            this.rewordClose()
            this.clear()
        },
        clear() {
            this.reword = [],
            this.noReword = '',
            this.getRELO = ''
        },
        testReword () {
            let testRex = /\d/g
            this.reword.forEach((item, index) => {
                if (!(item.rewordName && testRex.test(item.rewordNumber) &&
                    testRex.test(item.rwordChance)) && ((0 <= item.rwordChance) && (item.rwordChance <= 100))) {
                    this.$message({
                        type: 'error',
                        message: '输入错误'
                    })
                    return false
                }
            })
            if (testRex.test(this.noReword) && this.getRELO) return true
            this.$message({
                type: 'error',
                message: '输入错误'
            })
            return false
        },
        sureReword () {
            this.$confirm('确认').then(async () => {
                if (!this.testReword()) return
                await setReword({
                    id: this.rewordID,
                    reword: this.reword,
                    noreword: this.noReword,
                    awardAddress: this.getRELO
                })
                this.$message({
                    type: 'success',
                    message: '设置成功'
                })
                this.clear()
            })
        },
        addRword () {
            this.reword.push({index: this.reword.length, 
                                rewordName: '', rewordNumber: '',
                                rwordChance: ''})
        },
        deleteRwordIndex (index) {
            this.reword.splice(index, 1)
        }
    }
}
</script>

<style>

</style>
