<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据可视化</el-breadcrumb-item>
      <el-breadcrumb-item>每日新增</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 2.为Echarts准备一个Dom -->
      <div class="fillcontain">
        <div id="fillcontainer" class="fillcontainer" ref="fillcontainer">
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
    var myChart = echarts.init(document.getElementById('fillcontainer'))
    const { data: res } = await this.$http.get('reports/type/4')
    if (res.meta.status !== 200) return this.$message('获取折线图数据失败!')
    myChart.setOption(res.data)
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
  height: 620px;
}
#typePosition,
#typePosition2 {
  position: relative;
  width: 100%;
  height: 620px;
  border-radius: 10px;
}
</style>
