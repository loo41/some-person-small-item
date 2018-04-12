<template>
  <div>
    <div>
        <el-table :data="list"  v-loading="loading" border fit highlight-current-row>
            <el-table-column align="center" label='序号' width="150">
                <template slot-scope="scope">
                {{scope.$index}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='ID' width="150">
                <template slot-scope="scope">
                {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='抽奖状态' width="150">
                <template slot-scope="scope">
                {{scope.row.prizesStatus}}
                </template>
            </el-table-column>
            <el-table-column label="问卷标题" width="500" align="center">
                <template slot-scope="scope">
                {{scope.row.askName}}
                </template>
            </el-table-column>
            <el-table-column align="center"  label="操作">
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="rewordSee(scope.$index, scope.row)">抽奖测试</el-button>
                <el-button
                    type="primary"
                    size="mini"
                    @click="setRewordStatus(scope.$index, scope.row)">发布||关闭(问卷)</el-button>
                <el-button
                    size="mini"
                    v-if="scope.row.isSetReword === true"
                    @click="setReword(scope.$index, scope.row)">获奖设置更改</el-button>
                <el-button
                    v-if="scope.row.isSetReword === false"
                    size="mini"
                    @click="setReword(scope.$index, scope.row)">获奖设置</el-button>
               </template>
            </el-table-column>
       </el-table>
    </div>
    <reword
        :rewordShow="rewordShow"
        :rewordClose="rewordClose"
        :rewordID="rewordID">
    </reword>
    <cosmo-bonus
        :cosmoBonusShow="cosmoBonusShow"
        :rewordClose="rewordClose"
        :setValue="setValue">
    </cosmo-bonus>
 </div>
</template>

<script>
import reword from './component/reword'
import cosmoBonus from './component/cosmoBonus'
import {getAskList} from '../../api/ask'
import {delecReword, openCloaseStatus, getRewordSet} from '../../api/reword'
export default {
    data () {
        return {
            rewordShow: false,
            list: [],
            loading: false,
            rewordID: '',
            cosmoBonusShow: false,
            setValue: []
        }
    },
    components: {
        reword,
        cosmoBonus
    },
    watch: {
        list () {
            this.list.forEach((element, index) => {
              if (element.askType !== 1) {
                  this.list.splice(index, 1)
              }
            });
        }
    },
    async created () {
        const listData = await getAskList()
        const list = listData.data.data
        this.list = list
        this.loading = false
    },
    methods: {
        setReword (index, data) {
            this.rewordShow = true
            this.rewordID = data._id
        },
        async setRewordStatus (index, data) {
            try {
                this.$message({
                    showClose: true,
                    message: '抽奖状态开启后用户满足条件后可进行抽奖||关闭失效',
                    type: 'warning'
                });
                await openCloaseStatus({id: data._id, prizesStatus: !data.prizesStatus})
                this.list[index].prizesStatus = !data.prizesStatus
            } catch(e) {
                console.log(e)
            }
        },
        async rewordSee (index, data) {
            if (!(data.prizesStatus)) {
                this.$message('问卷未处于发布状态')
                return
            }
            if (!(data.isSetReword)) {
                this.$message('问卷还未设置奖品')
                return
            }
            this.cosmoBonusShow = true
            const setData = await getRewordSet({id: data._id, prizesStatus: true})
            const set = setData.data.data
            this.setValue = set
            this.cosmoBonusShow = true
        },
        rewordClose () {
            this.rewordShow = false
            this.cosmoBonusShow = false
        }
    }
}
</script>

<style>

</style>
