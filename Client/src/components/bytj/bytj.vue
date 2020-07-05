<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据可视化</el-breadcrumb-item>
      <el-breadcrumb-item>累计最多</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 2.为Echarts准备一个Dom -->
      <div class="fillcontain">
        <div class="fillcontainer" ref="fillcontainer">
          <iframe
            v-show="true"
            id="show-iframe"
            frameborder="0"
            name="showHere"
            scrolling="auto"
            src="http://121.41.225.123:8500"
          ></iframe>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Home from '../Home.vue'
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

  mounted() {
    const oIframe = document.getElementById('show-iframe')
    oIframe.style.width = '100%'
    oIframe.style.height = '100%'
  }
}
</script>
<style lang="less" scoped>
.fillcontain {
  position: relative;
  width: 100%;
  height: 680px;
  -webkit-box-shadow: 0 0 10px #2fb6f6;
  box-shadow: 0 0 10px #2fb6f6;
  border-radius: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #ffffff;
}
.fillcontainer {
  width: 100%;
  height: 100%;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #ffffff;
}
.el-icon-s-fold {
  font-size: 20px;
}
</style>
