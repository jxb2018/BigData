<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索 添加 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getStudentsList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getStudentsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加学生</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="snd" label="年度" width="50" align="center"></el-table-column>
        <el-table-column prop="sxh" label="学号" width="100" align="center"></el-table-column>
        <el-table-column prop="sxb" label="性别" width="50" align="center"></el-table-column>
        <el-table-column prop="sbyqx" label="毕业去向" width="120" align="center"></el-table-column>
        <el-table-column prop="ssjdw" label="实际单位" align="center"></el-table-column>
        <el-table-column prop="sdwszd" label="单位所在地" align="center"></el-table-column>
        <el-table-column prop="sxf" label="所在省份" width="80" align="center"></el-table-column>
        <el-table-column prop="sdwxz" label="单位性质" width="120" align="center"></el-table-column>
        <el-table-column prop="sdwlx" label="单位类型" width="120" align="center"></el-table-column>
        <el-table-column prop="shyxz" label="行业性质" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="showEditDialog(scope.row.stu_id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="removeStudentById(scope.row.stu_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加学生的对话框 -->
    <el-dialog title="添加学生" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体 -->
      <el-form
        :model="addStudentForm"
        ref="addStudentFormRef"
        :rules="addStudentFormRules"
        label-width="100px"
        :inline="true"
      >
        <el-form-item label="学号" prop="sxh">
          <el-input v-model="addStudentForm.sxh"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sxb">
          <el-radio-group v-model="addStudentForm.sxb">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年度" prop="snd">
          <el-select v-model="addStudentForm.snd" placeholder="2016">
            <el-option label="2016" value="2016"></el-option>
            <el-option label="2017" value="2017"></el-option>
            <el-option label="2018" value="2018"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业去向" prop="sbyqx">
          <el-select v-model="addStudentForm.sbyqx" placeholder="报送升学">
            <el-option label="报送升学" value="报送升学"></el-option>
            <el-option label="非派遣" value="非派遣"></el-option>
            <el-option label="非全日制" value="非全日制"></el-option>
            <el-option label="考取升学" value="考取升学"></el-option>
            <el-option label="考取升学" value="考取升学"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实际单位" prop="ssjdw">
          <el-input v-model="addStudentForm.ssjdw"></el-input>
        </el-form-item>
        <el-form-item label="所在省份" prop="sxf">
          <el-select v-model="addStudentForm.sxf" placeholder="山东">
            <el-option label="北京" value="北京"></el-option>
            <el-option label="天津" value="天津"></el-option>
            <el-option label="河北" value="河北"></el-option>
            <el-option label="山西" value="山西"></el-option>
            <el-option label="内蒙古" value="内蒙古"></el-option>
            <el-option label="辽宁" value="辽宁"></el-option>
            <el-option label="吉林" value="吉林"></el-option>
            <el-option label="黑龙江" value="黑龙江"></el-option>
            <el-option label="上海" value="上海"></el-option>
            <el-option label="江苏" value="江苏"></el-option>
            <el-option label="浙江" value="浙江"></el-option>
            <el-option label="安徽" value="安徽"></el-option>
            <el-option label="福建" value="福建"></el-option>
            <el-option label="江西" value="江西"></el-option>
            <el-option label="山东" value="山东"></el-option>
            <el-option label="河南" value="河南"></el-option>
            <el-option label="湖北" value="湖北"></el-option>
            <el-option label="湖南" value="湖南"></el-option>
            <el-option label="广东" value="广东"></el-option>
            <el-option label="广西" value="广西"></el-option>
            <el-option label="海南" value="海南"></el-option>
            <el-option label="重庆" value="重庆"></el-option>
            <el-option label="四川" value="四川"></el-option>
            <el-option label="贵州" value="贵州"></el-option>
            <el-option label="云南" value="云南"></el-option>
            <el-option label="西藏" value="西藏"></el-option>
            <el-option label="陕西" value="陕西"></el-option>
            <el-option label="甘肃" value="甘肃"></el-option>
            <el-option label="青海" value="青海"></el-option>
            <el-option label="宁夏" value="宁夏"></el-option>
            <el-option label="新疆" value="新疆"></el-option>
            <el-option label="台湾" value="台湾"></el-option>
            <el-option label="香港" value="香港"></el-option>
            <el-option label="澳门" value="澳门"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位所在地" prop="sdwszd">
          <el-input v-model="addStudentForm.sdwszd"></el-input>
        </el-form-item>
        <el-form-item label="单位性质" prop="sdwxz">
          <el-select v-model="addStudentForm.sdwxz" placeholder="国有企业">
            <el-option label="出国、出境" value="出国、出境"></el-option>
            <el-option label="国有企业" value="国有企业"></el-option>
            <el-option label="艰苦行业企业" value="艰苦行业企业"></el-option>
            <el-option label="科研设计单位" value="科研设计单位"></el-option>
            <el-option label="灵活就业" value="灵活就业"></el-option>
            <el-option label="其他企业" value="其他企业"></el-option>
            <el-option label="三资企业" value="三资企业"></el-option>
            <el-option label="升学" value="升学"></el-option>
            <el-option label="未就业" value="未就业"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位类型" prop="sdwlx">
          <el-select v-model="addStudentForm.sdwlx" placeholder="985院校">
            <el-option label="211院校" value="211院校"></el-option>
            <el-option label="985院校" value="985院校"></el-option>
            <el-option label="世界五百强" value="世界五百强"></el-option>
            <el-option label="未就业" value="未就业"></el-option>
            <el-option label="其他企事业" value="其他企事业"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业性质" prop="shyxz">
          <el-select v-model="addStudentForm.shyxz" placeholder="采矿业">
            <el-option label="采矿业" value="采矿业"></el-option>
            <el-option label="电力、热力、燃气及水生产和供应业" value="电力、热力、燃气及水生产和供应业"></el-option>
            <el-option label="建筑业" value="建筑业"></el-option>
            <el-option label="交通运输、仓储和邮政业" value="交通运输、仓储和邮政业"></el-option>
            <el-option label="教育业" value="教育业"></el-option>
            <el-option label="金融业" value="金融业"></el-option>
            <el-option label="科学研究和技术服务业" value="科学研究和技术服务业"></el-option>
            <el-option label="未就业" value="未就业"></el-option>
            <el-option label="信息传输软件和信息技术服务业" value="信息传输软件和信息技术服务业"></el-option>
            <el-option label="制造业" value="制造业"></el-option>
            <el-option label="租赁和商业服务业" value="租赁和商业服务业"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改学生的对话框 -->
    <el-dialog
      title="修改学生信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="editStudentForm"
        ref="editStudentFormRef"
        :rules="editStudentFormRules"
        label-width="100px"
        :inline="true"
      >
        <el-form-item label="学号" prop="sxh">
          <el-input v-model="editStudentForm.sxh"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sxb">
          <el-radio-group v-model="editStudentForm.sxb">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年度" prop="snd">
          <el-select v-model="editStudentForm.snd" placeholder="2016">
            <el-option label="2016" value="2016"></el-option>
            <el-option label="2017" value="2017"></el-option>
            <el-option label="2018" value="2018"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业去向" prop="sbyqx">
          <el-select v-model="editStudentForm.sbyqx" placeholder="报送升学">
            <el-option label="报送升学" value="报送升学"></el-option>
            <el-option label="非派遣" value="非派遣"></el-option>
            <el-option label="非全日制" value="非全日制"></el-option>
            <el-option label="考取升学" value="考取升学"></el-option>
            <el-option label="考取升学" value="考取升学"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实际单位" prop="ssjdw">
          <el-input v-model="editStudentForm.ssjdw"></el-input>
        </el-form-item>
        <el-form-item label="所在省份" prop="sxf">
          <el-select v-model="editStudentForm.sxf" placeholder="山东">
            <el-option label="北京" value="北京"></el-option>
            <el-option label="天津" value="天津"></el-option>
            <el-option label="河北" value="河北"></el-option>
            <el-option label="山西" value="山西"></el-option>
            <el-option label="内蒙古" value="内蒙古"></el-option>
            <el-option label="辽宁" value="辽宁"></el-option>
            <el-option label="吉林" value="吉林"></el-option>
            <el-option label="黑龙江" value="黑龙江"></el-option>
            <el-option label="上海" value="上海"></el-option>
            <el-option label="江苏" value="江苏"></el-option>
            <el-option label="浙江" value="浙江"></el-option>
            <el-option label="安徽" value="安徽"></el-option>
            <el-option label="福建" value="福建"></el-option>
            <el-option label="江西" value="江西"></el-option>
            <el-option label="山东" value="山东"></el-option>
            <el-option label="河南" value="河南"></el-option>
            <el-option label="湖北" value="湖北"></el-option>
            <el-option label="湖南" value="湖南"></el-option>
            <el-option label="广东" value="广东"></el-option>
            <el-option label="广西" value="广西"></el-option>
            <el-option label="海南" value="海南"></el-option>
            <el-option label="重庆" value="重庆"></el-option>
            <el-option label="四川" value="四川"></el-option>
            <el-option label="贵州" value="贵州"></el-option>
            <el-option label="云南" value="云南"></el-option>
            <el-option label="西藏" value="西藏"></el-option>
            <el-option label="陕西" value="陕西"></el-option>
            <el-option label="甘肃" value="甘肃"></el-option>
            <el-option label="青海" value="青海"></el-option>
            <el-option label="宁夏" value="宁夏"></el-option>
            <el-option label="新疆" value="新疆"></el-option>
            <el-option label="台湾" value="台湾"></el-option>
            <el-option label="香港" value="香港"></el-option>
            <el-option label="澳门" value="澳门"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位所在地" prop="sdwszd">
          <el-input v-model="editStudentForm.sdwszd"></el-input>
        </el-form-item>
        <el-form-item label="单位性质" prop="sdwxz">
          <el-select v-model="editStudentForm.sdwxz" placeholder="国有企业">
            <el-option label="出国、出境" value="出国、出境"></el-option>
            <el-option label="国有企业" value="国有企业"></el-option>
            <el-option label="艰苦行业企业" value="艰苦行业企业"></el-option>
            <el-option label="科研设计单位" value="科研设计单位"></el-option>
            <el-option label="灵活就业" value="灵活就业"></el-option>
            <el-option label="其他企业" value="其他企业"></el-option>
            <el-option label="三资企业" value="三资企业"></el-option>
            <el-option label="升学" value="升学"></el-option>
            <el-option label="未就业" value="未就业"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位类型" prop="sdwlx">
          <el-select v-model="editStudentForm.sdwlx" placeholder="985院校">
            <el-option label="211院校" value="211院校"></el-option>
            <el-option label="985院校" value="985院校"></el-option>
            <el-option label="世界五百强" value="世界五百强"></el-option>
            <el-option label="未就业" value="未就业"></el-option>
            <el-option label="其他企事业" value="其他企事业"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业性质" prop="shyxz">
          <el-select v-model="editStudentForm.shyxz" placeholder="采矿业">
            <el-option label="采矿业" value="采矿业"></el-option>
            <el-option label="电力、热力、燃气及水生产和供应业" value="电力、热力、燃气及水生产和供应业"></el-option>
            <el-option label="建筑业" value="建筑业"></el-option>
            <el-option label="交通运输、仓储和邮政业" value="交通运输、仓储和邮政业"></el-option>
            <el-option label="教育业" value="教育业"></el-option>
            <el-option label="金融业" value="金融业"></el-option>
            <el-option label="科学研究和技术服务业" value="科学研究和技术服务业"></el-option>
            <el-option label="未就业" value="未就业"></el-option>
            <el-option label="信息传输软件和信息技术服务业" value="信息传输软件和信息技术服务业"></el-option>
            <el-option label="制造业" value="制造业"></el-option>
            <el-option label="租赁和商业服务业" value="租赁和商业服务业"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStudent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表查询参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 5
      },
      userlist: [],
      total: 0,
      // 添加用户对话框
      addDialogVisible: false,
      // 用户添加
      addStudentForm: {
        snd: '',
        sxh: '',
        sxb: '',
        sbyqx: '',
        ssjdw: '',
        sdwszd: '',
        sxf: '',
        sdwxz: '',
        sdwlx: '',
        shyxz: ''
      },
      // 用户添加表单验证规则
      addStudentFormRules: {},
      editStudentForm: {},
      editStudentFormRules: {},
      editDialogVisible: false
    }
  },
  created() {
    this.getStudentsList()
  },
  methods: {
    async getStudentsList() {
      const { data: res } = await this.$http.get('students', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userlist = res.data.users
      this.total = res.data.total
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getStudentsList()
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagenum = newSize
      this.getStudentsList()
    },
    // 监听 添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addStudentFormRef.resetFields()
    },
    // 添加学生
    addStudent() {
      // 提交请求前，表单预验证
      this.$refs.addStudentFormRef.validate(async valid => {
        // console.log(valid)
        // 表单预校验失败
        if (!valid) return
        const { data: res } = await this.$http.post(
          'students',
          this.addStudentForm
        )
        if (res.meta.status !== 201) {
          this.$message.error('添加学生失败！')
        } else {
          this.$message.success('添加学生成功！')
        }
        // 隐藏添加用户对话框
        this.addDialogVisible = false
        this.getStudentsList()
      })
    },
    // 编辑用户信息
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('students/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询学生信息失败！')
      }
      this.editStudentForm = res.data
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editStudentFormRef.resetFields()
    },
    // 删除用户
    async removeStudentById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该学生, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete('students/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除学生失败！')
      this.$message.success('删除学生成功！')
      this.getStudentsList()
    },
    // 修改用户信息
    editStudent() {
      // 提交请求前，表单预验证
      this.$refs.editStudentFormRef.validate(async valid => {
        // console.log(valid)
        // 表单预校验失败
        if (!valid) return
        const { data: res } = await this.$http.put(
          'students/' + this.editStudentForm.stu_id,
          {
            snd: this.editStudentForm.snd,
            sxh: this.editStudentForm.sxh,
            sxb: this.editStudentForm.sxb,
            sbyqx: this.editStudentForm.sbyqx,
            ssjdw: this.editStudentForm.ssjdw,
            sdwszd: this.editStudentForm.sdwszd,
            sxf: this.editStudentForm.sxf,
            sdwxz: this.editStudentForm.sdwxz,
            sdwlx: this.editStudentForm.sdwlx,
            shyxz: this.editStudentForm.shyxz
          }
        )
        if (res.meta.status !== 200) {
          this.$message.error('更新学生信息失败！')
        }
        // 隐藏添加用户对话框
        this.editDialogVisible = false
        this.$message.success('更新学生信息成功！')
        this.getStudentsList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
