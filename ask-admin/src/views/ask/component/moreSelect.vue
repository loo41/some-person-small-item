<template>
    <div>
        <el-dialog
        title="多选题设置"
        :visible.sync="moreShow"
        width="50%"
        modal="false"
        :before-close="handleClose">
        <div>
            <div class="title">
                <div v-text="inputTitle" style="text-align: center"></div>
                <el-checkbox-group 
                    v-model="selectValue"
                    :min="1"
                    :max="2">
                    <el-checkbox v-for="(item, index) in selectCV" :label="item.value" :key="index">{{item.value}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div>
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入标题" v-model="inputTitle">
                        <template slot="append">title</template>
                    </el-input>
                </div>
                <div>
                    <div style="margin-top: 15px;">
                        <el-button type="primary" @click="addValue">添加选项</el-button>
                        <div v-for="(item, index) in selectCV">
                            <div v-bind:key="index" style="margin-top: 15px;">
                                <el-input
                                    placeholder="请输入值"
                                    v-model="item.value"
                                    style="width: 50%"
                                    clearable>
                                </el-input>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(index)">删除</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style="margin-top: 10px; margin-bottom: 10px; min-height: 30px;">
                    <div style="text-align: center">请选择正确答案</div>
                    <el-checkbox-group v-model="selectValue">
                        <el-option
                            v-for="(item, index) in selectCV"
                            :key="index"
                            :value="item.value">
                        </el-option>
                        <el-checkbox
                        v-for="(item, index) in selectCV"
                        :key="index"
                        :label="item.value">
                        </el-checkbox>
                    </el-checkbox-group>
                    </div>
                    <el-input v-model="grade" placeholder="请输入该题分数" style="margin-bottom: 15px; width: 150px;"></el-input>
                </div>
                <div>

                </div>
                <div>
                    <el-button type="primary" @click="clearAll">清除</el-button>
                    <el-button type="primary" @click="uploadData(2)">确定</el-button>
                </div>
            </div>
        </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            selectCV: [],
            inputTitle: '',
            selectValue: [],
            grade: ''
        }
    },
    props: {
        storeSbuject: {
            type: Function
        },
        moreVisible: {
            type: Boolean
        },
        handleClose: {
            type: Function
        },
        changeData: {
            type: Number
        }
    },
    computed: {
        moreShow () {
            this.clearAll()
            return this.moreVisible
        }
    },
    methods: {
        uploadData (type) {
            try {
                let testRex = /\d/g
                if (!(this.inputTitle && this.selectCV.length !== 0 &&
                    this.selectValue.length !== 0 && this.grade && testRex.test(this.grade))) {
                    this.$message({
                        type: 'error',
                        message: '不能有空或输入错误'
                    })
                    return
                }
                if(this.changeData) {
                    this.$confirm('确认更改').then(() => {
                    let isChange = this.changeData
                    this.storeSbuject(type, this.inputTitle, this.selectCV, this.selectValue, this.grade, isChange)
                    }).catch((e) => {
                        console.log(e)
                        this.$message({
                            type: 'error',
                            message: 'error || 取消成功'
                        })
                    })
                    return
                }
                this.$confirm('确认提交，尽量少更改, 服务器配置低').then(() => {
                this.storeSbuject(type, this.inputTitle, this.selectCV, this.selectValue, this.grade)
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: 'success取消'
                    })
                })
            } catch (e) {
                console.log(e)
            }
        },
        clearAll () {
            this.selectCV = []
            this.inputTitle = ''
            this.selectValue = []
            this.grade = '',
            this.checkList = ''
        },
        addValue () {
            this.selectCV.push({value: ''})
        },
        handleDelete (index) {
            this.selectCV.splice(index, 1)
        }
    }
}
</script>

<style>

</style>
