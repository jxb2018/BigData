<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>毕业生就业数据管理系统</span>
      </div>
      <div style="margin-left:61%">
        <el-switch
          v-model="switchstatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @click.native="togleCollapse"
        ></el-switch>
      </div>
      <el-dropdown>
        <div class="el-icon-user">
          <span>{{username}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 主体 -->
    <el-container class="el-body">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
          background-color="#ffffff"
          text-color="#2c3e50"
          active-text-color="#409FFF"
        >
          <!-- :unique-opened="true"->只允许展开一个菜单 -->
          <!-- :collapse-transition="false" -> 关闭动画 -->
          <!-- router -> 导航开启路由模式 -->
          <!-- 一级菜单  -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <!-- 导航开启路由模式：
              将index值作为导航路由-->
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: window.sessionStorage.getItem('username'),
      // 左侧菜单数据
      menuList: [],
      switchstatus: true,
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao',
        '100': 'el-icon-s-home'
      },
      // 默认不折叠
      isCollapse: false,
      // 被激活导航地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    handleClick() {
      alert('button click')
    },
    logout() {
      // 清空token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取请求菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    // 菜单的折叠与展开
    togleCollapse() {
      this.isCollapse = !this.switchstatus
    },
    togleCollapse2() {
      this.isCollapse = !this.isCollapse
    },
    // 保存连接的激活地址
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-body {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-image: url(../../image/header.jpg);
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      height: 40px;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #ffffff;
  width: 100%;
  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #f1f5f8;
}
.iconfont {
  margin-right: 10px;
}
.el-icon-s-fold {
  padding-top: 10px;
  background-color: #ffffff;
  font-size: 20px;
  line-height: 24px;
  color: #2c3e50;
  margin-left: 50%;
  transform: translate(-45%, 0%);
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}
.el-icon-user {
  font-size: 18px;
  height: 20px;
  width: 100px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
