<template>
    <el-dialog
        title="用户问卷获奖信息查看"
        :visible.sync="rewordInfoShow"
        width="50%"
        modal="false"
        :before-close="handleClose">
        <div>
            <el-table :data="userInfo.winNotes"  v-loading="loading" border fit highlight-current-row>
            <el-table-column align="center" label='序号' width="150">
                <template slot-scope="scope">
                {{scope.$index}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='奖品名称' width="150">
                <template slot-scope="scope">
                {{scope.row.reword}}
                </template>
            </el-table-column>
            <el-table-column label="领取状态" width="150" align="center">
                <template slot-scope="scope">
                {{scope.row.state}}
                </template>
            </el-table-column>
            <el-table-column align="center"  label="操作">
                <template slot-scope="scope">
                <el-button
                    v-if="scope.row.reword === '谢谢参与再接再厉' || scope.row.reword == null"
                    size="mini"
                    type="primary">没有奖</el-button>
                <el-button
                    v-else-if="scope.row.reword"
                    size="mini"
                    type="primary"
                    @click="closeReword(scope.$index, scope.row)">设置为已获奖</el-button>
                </template>
            </el-table-column>
            </el-table>
       </div>
       <div style="margin-top: 20px;">
        <el-table :data="userInfo.rewordData"  v-loading="loading" border fit highlight-current-row>
            <el-table-column align="center" label='序号' width="150">
                <template slot-scope="scope">
                {{scope.$index}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='分数' width="150">
                <template slot-scope="scope">
                {{scope.row.grade}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='抽奖时间'>
                <template slot-scope="scope">
                {{scope.row.date}}
                </template>
            </el-table-column>
            </el-table>
       </div>
    </el-dialog>
  
</template>

<script>
import {closeRewordInfo} from '../../api/client'
export default {
    data () {
        return {}
    },
    props: {
        rewordInfoShow: {
            type: Boolean
        },
        close: {
            type: Function
        },
        openid: {
            type: String
        },
        user: {
            type: Object
        }
    },
    computed: {
        userInfo () {
            return this.user
        }
    },
    methods: {
        clear () {
            this.userReword = ''
            this.user = {}
        },
        async closeReword (index, data) {
            if (data.state) {
                this.$message({
                    type: 'success',
                    message: '该奖品已经被领取了'
                })
                return
            }
            let trueFalse = data.state
            let openid = this.user.openid
            let state = this.user.state
            await closeRewordInfo({openid, state, trueFalse})
            this.user.winNotes.splice(index, 1, {reword: data.reword, state: true})
            this.$message({
                type: 'success',
                message: '成功'
            })
        },
        handleClose () {
            this.clear()
            this.close()
        }
    }
}
</script>

<style>

</style>
