<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>单位性质</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 2.为Echarts准备一个Dom -->
      <div class="fillcontain">
        <div class="fillcontainer" ref="fillcontainer">
          <el-row :gutter="10">
            <el-col :span="12" style="height:100%;">
              <div id="typePosition"></div>
            </el-col>
            <el-col :span="12" style="height:100%;">
              <div id="typePosition2"></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/theme/roma.js'

export default {
  data() {
    return {}
  },
  created() {},
  methods: {},
  async mounted() {
    var myChart = echarts.init(document.getElementById('typePosition'))
    const { data: res } = await this.$http.get('reports/type/4')
    if (res.meta.status !== 200) return this.$message('获取折线图数据失败!')
    myChart.setOption(res.data)

    var myChart2 = echarts.init(document.getElementById('typePosition2'))
    const { data: res2 } = await this.$http.get('reports/type/5')
    if (res2.meta.status !== 200) return this.$message('获取折线图数据失败!')
    myChart2.setOption(res2.data)
  }
}
</script>
<style lang="less" scoped>
.fillcontain {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px 20px 0px 20px;
  -webkit-box-shadow: 0 0 10px #2fb6f6;
  box-shadow: 0 0 10px #2fb6f6;
  border-radius: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #ffffff;
}
.fillcontainer {
  width: 100%;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #ffffff;
}
#typePosition,
#typePosition2 {
  position: relative;
  width: 100%;
  height: 620px;
  border-radius: 10px;
}
</style>
