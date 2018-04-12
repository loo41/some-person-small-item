<style lang="less">
    @import "./home.less";
</style>
<template>
   <div>
    <div class="home-main dataView">
        <div class="dataUser">
            <el-card>
                <div class="userHeader">
                    <img src="../../images/logo-min.jpg" style="height: 100%; width: 100%;"/>
                </div>
            </el-card>
            <el-card style="margin-top: 20px" class="userStyle centerStyle">
                <div>
                    <div style="height: 200px; width: 200px;" class="userStyle">
                        <div style="font-size: 20px;">username: {{user}}</div>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="dataStyle">
            <el-card class="centerStyle">
                <div style="height: 400px; width: 700px;" id="dataView"></div>
            </el-card>
        </div>
    </div>
    <el-card style="margin-top: 20px;">
      <div class="bottom"></div>
    </el-card>
    </div>
</template>

<script>
import echarts from 'echarts'
import {getAllData} from '../../api/allData'
export default {
    name: 'home',
    data () {
        return {
            user: '',
            data: []
        };
    },
    created () {
        this.getData()
    },
    mounted () {
        this.user = sessionStorage.getItem('userName')
    },
    methods: {
        async getData () {
            const all = await getAllData()
            const allData = all.data.data
            this.data = allData
            await this.dataView()
        },
        dataView () {
            const myChart = echarts.init(document.getElementById('dataView'));
            myChart.setOption({
                title: {
                    text: 'ask_Youngon数据分析'
                },
                tooltip: {},
                xAxis: {
                    data: ['管理人员', '发布文章数', '总用户', '总量']
                },
                yAxis: {},
                series: [{
                    name: 'ask_youngon',
                    type: 'bar',
                    data: this.data
                }]
            })
        }
    }
};
</script>
<style>
.dataView{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
.dataUser{
    height: 200px;
    width: 200px;
}
.dataStyle{
    flex: 1;
    margin-left: 20px;
    height: 420px;
}
.el-card{
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.userHeader{
    background: red;
    height: 100px;
    width: 100px;
    border-radius: 50%; 
}
.bottom{
    height: 200px;
}
.userStyle{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.centerStyle div{
    display: flex!important;
    flex-direction: row!important;
    justify-content: center!important;
}
</style>

