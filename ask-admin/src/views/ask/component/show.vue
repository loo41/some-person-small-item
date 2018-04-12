<template>
    <div>
        <div v-for="(item, index) in show" :key="index" style="margin-top: 10px; margin-bottom: 15px;">
            <div v-if="item.type === 1">
                <el-card class="box-card">
                <div class="oneStyle">
                    <div style="font-size: 18px;">第{{index+1}}题: {{item.title}} (单选题)</div>
                    <div>{{item.grade}}分题</div>
                </div>
                <div style="margin-top: 20px;">
                    <div v-for="(select, index) in item.subject">
                        <el-radio  disabled  v-model="item.trueSubject" :label="index">{{select.value}}</el-radio>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <el-button type="primary" @click="change(index, item.type)">更改</el-button>
                    <el-button type="primary" @click="upMove(index)">上移<i class="el-icon-upload el-icon--right"></i></el-button>
                    <el-button type="danger" @click="delect(index)">删除</el-button>
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
                        v-model="item.trueSubject"
                        :min="1"
                        :max="2">
                        <el-checkbox v-for="(select, index) in item.subject" :label="select.value" :key="index" disabled>{{select.value}}</el-checkbox>
                    </el-checkbox-group>
                    </div>
                    <div style="margin-top: 20px;">
                        <el-button type="primary" @click="change(index, item.type)">更改</el-button>
                        <el-button type="primary" @click="upMove(index)">上移<i class="el-icon-upload el-icon--right"></i></el-button>
                        <el-button type="danger" @click="delect">删除</el-button>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    props: {
        showData: {
            type: Object
        },
        upMove: {
            type: Function
        },
        change: {
            type: Function
        }
    },
    computed: {
        show () {
            return this.showData
        }
    },
    methods: {
        delect (index) {
            this.$confirm('确认删除').then(() => {
                this.showData.splice(index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
            }).catch(() => {
                this.$message({
                    type: 'success',
                    message: '取消成功'
                })
            })
        },
    }
}
</script>

<style>
.oneStyle{
    display: flex;
    flex-direction: row;
    justify-content: space-between
}
</style>
