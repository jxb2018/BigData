<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>毕业分布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 2.为Echarts准备一个Dom -->
      <div class="fillcontain">
        <div id="selectButtoon" class="selectButtoon">
          <el-radio-group v-model="radio" @change="changeHandler">
            <el-radio v-model="radio" label="0">2016</el-radio>
            <el-radio v-model="radio" label="1">2017</el-radio>
            <el-radio v-model="radio" label="2">2018</el-radio>
          </el-radio-group>
        </div>
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
    return {
      radio: '0'
    }
  },
  created() {},
  methods: {
    changeHandler() {
      this.drawMap()
    },
    async drawMap() {
      var myChart = echarts.init(document.getElementById('main'), 'roma')
      const { data: res } = await this.$http.get('reports/type/6')
      if (res.meta.status !== 200) return this.$message('获取地图数据失败!')
      console.log(res.data)
      myChart.setOption(res.data[this.radio])
    }
  },
  async mounted() {
    this.drawMap()
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
.selectButtoon {
  margin-left: 78%;
}
</style>
