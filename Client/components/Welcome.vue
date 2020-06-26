<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>首页总览</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 2.为Echarts准备一个Dom -->
      <div class="fillcontain">
        <div class="fillcontainer" ref="fillcontainer">
          <el-row :gutter="10">
            <el-col :span="12" style="height:100%;width:65%">
              <div id="typePosition"></div>
            </el-col>
            <el-col :span="12" style="height:100%;width:35%">
              <div id="typePosition2"></div>
              <div id="typePosition3"></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import '../../node_modules/echarts/theme/roma.js'
import echarts from 'echarts'
import Home from './Home.vue'
export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    switch() {
      Home.methods.togleCollapse2()
    }
  },

  async mounted() {
    var myChart = echarts.init(document.getElementById('typePosition'))
    const { data: res } = await this.$http.get('reports/type/2')
    if (res.meta.status !== 200) return this.$message('获取3D地图数据失败!')
    myChart.setOption(res.data)

    var myChart2 = echarts.init(document.getElementById('typePosition2'))
    const { data: res2 } = await this.$http.get('reports/type/3')
    if (res2.meta.status !== 200) return this.$message('获取扇形图数据失败!')
    myChart2.setOption(res2.data)

    var myChart3 = echarts.init(document.getElementById('typePosition3'))
    const { data: res3 } = await this.$http.get('reports/type/8')
    if (res3.meta.status !== 200) return this.$message('获取扇形图数据失败!')
    myChart3.setOption(res3.data)
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
#typePosition {
  position: relative;
  width: 100%;
  height: 620px;
  border-radius: 10px;
}
#typePosition2 {
  position: relative;
  width: 98%;
  height: 310px;
  border-radius: 10px;
}
#typePosition3 {
  position: relative;
  width: 100%;
  height: 310px;
  border-radius: 10px;
}
.el-icon-s-fold {
  font-size: 20px;
}
</style>
