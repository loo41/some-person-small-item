<template>
  <div>
      <el-dialog
        title="单选题设置"
        :visible.sync="aloneShow"
        width="50%"
        modal="false"
        :before-close="handleClose">
        <div>
            <div class="title">
                <div v-text="inputTitle" style="text-align: center"></div>
                <div v-for="(item, index) in select">
                    <el-radio  v-model="selectValue" :label="index">{{item.value}}</el-radio>
                </div>
            </div>
            <div>
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入标题" v-model="inputTitle">
                        <template slot="append">title</template>
                    </el-input>
                </div>
                <div>
                    <div style="margin-top: 15px;">
                        <el-button type="primary" @click="addSelect">添加选项</el-button>
                        <div v-for="(item, index) in select">
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
                    <el-select v-model="selectValue" clearable placeholder="请选择正确答案" style="margin-top: 15px;margin-bottom: 15px">
                        <el-option
                            v-for="(item, index) in select"
                            :key="index"
                            :value="index">
                        </el-option>
                    </el-select>
                    <el-input v-model="grade" placeholder="请输入该题分数" style="margin-bottom: 15px; width: 150px;"></el-input>
                </div>
                <div>

                </div>
                <div>
                    <el-button type="primary" @click="clear">清除</el-button>
                    <el-button type="primary" @click="conserve(1)">确定</el-button>
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
            inputTitle: '',
            select: [],
            selectValue: '',
            grade: ''
        }
    },
    props: {
        pushSbuject: {
            type: Function
        },
        handleClose: {
            type: Function
        },
        aloneVisible: {
            type: Boolean
        },
        changeData: {
            type: Number
        }
    },
    computed: {
        aloneShow () {
            this.clear()
            return this.aloneVisible
        }
    },
    methods: {
        conserve (type) {
            let testRex = /\d/g
            if (!(this.inputTitle && this.select.length !== 0 
                && this.selectValue !== '' && this.grade && testRex.test(this.grade))) {
                this.$message({
                    type: 'error',
                    message: '不能有空或输入错误'
                })
                return
            }
            if(this.changeData) {
                this.$confirm('确认更改').then(() => {
                let isChange = this.changeData
                this.pushSbuject(type, this.inputTitle, this.select, this.selectValue, this.grade, isChange)
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
                this.pushSbuject(type, this.inputTitle, this.select, this.selectValue, this.grade)
            }).catch((e) => {
                console.log(e)
                this.$message({
                    type: 'success',
                    message: 'success取消'
                })
            })
        },
        clear () {
            this.select = []
            this.inputTitle = ''
            this.selectValue = ''
            this.grade = ''
        },
        addSelect () {
            this.select.push({value: ''})
        },
        handleDelete (index) {
            this.select.splice(index, 1)
        },
    }
}
</script>

<style>

</style>
