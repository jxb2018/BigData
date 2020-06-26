<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>毕业统计</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 2.为Echarts准备一个Dom -->
      <div class="fillcontain">
        <div id="main" class="echartsPosition"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js'
import '../../../node_modules/echarts/theme/roma.js'

export default {
  data() {
    return {}
  },
  created() {},

  async mounted() {
    var myChart = echarts.init(document.getElementById('main'), 'roma')
    const { data: res } = await this.$http.get('reports/type/7')
    if (res.meta.status !== 200) return this.$message('获取地图数据失败!')
    myChart.setOption(res.data)
  }
}
</script>
<style lang="less" scoped>
.echartsPosition {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px 0px 0px 20px;
  border-radius: 10px;
  box-sizing: border-box;
}
.fillcontain {
  padding: 8px 0px 35px 0px;
  position: relative;
  width: 100%;
  height: 620px;
  -webkit-box-shadow: 0 0 10px #2fb6f6;
  box-shadow: 0 0 10px #2fb6f6;
  border-radius: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #ffffff;
}
</style>
