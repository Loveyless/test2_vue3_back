<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <!-- 搜索框 -->
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <!-- 搜索按钮 -->
      <el-button @click="getTableData" :icon="Search" circle />
      <!-- 添加按钮 -->
      <el-button @click="handleDialog">
        {{ $t("table.adduser") }}
      </el-button>
    </el-row>


    <el-table :data="tableData" stripe style="width: 100%">

      <el-table-column
        :width="item.width"
        v-for="item in tableFor"
        :key="item.label"
        :prop="item.props"
        :label="$t('table.' + item.label)"
      >
      
      <!-- 用户状态按钮 这里不懂 这里的row就是一条数据 -->
      <template v-slot="{row}" v-if="item.props === 'mg_state' ">
        <el-switch
          v-model="row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeState(row)"
        />
      </template>

      
      <!-- 这里判断了是否是action -->
      <template #default="{ row }" v-else-if=" item.props === 'action' ">
        <el-button type="primary" size="small" :icon="Edit"></el-button>
        <el-button type="warning" size="small" :icon="Setting"></el-button>
        <el-button type="danger" size="small" :icon="Delete" @click="deleteUser(row)"></el-button>
      </template>
      
      </el-table-column>

    </el-table>

    <!-- 分页器 -->
    <el-pagination
      v-model:currentPage="queryForm.pagenum"
      :page-sizes="[10, 30, 100, 200]"
      :page-size="queryForm.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

      <!-- 添加用户对话框 -->
      <el-dialog
        v-model="dialogVisible"
        v-if="dialogVisible"
        title="Tips"
        width="50%"
        @close="handleClose"
      >
        <el-form :model="addForm" label-width="70px">
          <el-form-item label="name">
            <el-input v-model="addForm.username" />
          </el-form-item>
          <el-form-item label="code">
            <el-input v-model="addForm.password" type="password" />
          </el-form-item>
          <el-form-item label="email">
            <el-input v-model="addForm.email" />
          </el-form-item>
          <el-form-item label="mobile">
            <el-input v-model="addForm.mobile" />
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleClose">Cancel</el-button>
            <el-button type="primary" @click="handleSuccess"
              >Confirm</el-button
            >
          </span>
        </template>

      </el-dialog>

  </el-card>
</template>

<script setup>
import { Search,Edit,Setting,Delete } from "@element-plus/icons-vue";
import { ref } from "vue";
import axios from "@/axios";
import dayjs from "./DateRule"
import i18n from "@/i18n"

// 请求数据
const queryForm = ref({
  query: "",
  pagenum: 1,
  pagesize: 10,
});

// 分页器数据
const total = ref(0)

//表格数据
const tableData = ref([]);
// create_time: 1486720211
// email: "asdf@qq.com"
// mg_state: false
// mobile: "1213213123"
// role_name: "测试角色2"
// username: "linken"

// 这里的数据显示上去要通过i18n
// 写个循环往table上放进去
const tableFor = [
  {
    label: "username",
    props: "username",
  },
  {
    label: "role_name",
    props: "role_name",
  },
  {
    label: "email",
    props: "email",
  },
  {
    label: "mobile",
    props: "mobile",
  },
  {
    label: "create_time",
    props: "create_time",
  },
  {
    label: "mg_state",
    props: "mg_state",
  },
  {
    label: "action",
    props: "action",
    width: 300
  },
];

//请求1.3.1. 用户数据列表
const getTableData = async () => {
  const { data } = await axios.get("/users", { params: queryForm.value });
  tableData.value = data.users.map((i) => { 
    i.create_time = dayjs(i.create_time)
    return i
  });
  console.log("用户数据列表",tableData.value);
  // 页码
  total.value = data.total

};
getTableData();

//分页器
const handleSizeChange = (pageSize)=>{
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  getTableData()
}
const handleCurrentChange = (pageNum) => { 
  queryForm.value.pagenum = pageNum
  getTableData()
}

// 用户状态切换按钮
const changeState = async(item)=>{
  // const isState = item.mg_state == 0 ? 1 : 0
  console.log(item.mg_state);
  const isState = item.mg_state
  const res = await axios.put(`users/${parseInt(item.id)}/state/${isState}`)
  console.log(res);
}


//添加用户对话框是否显示
const dialogVisible = ref(false);
//打开对话框
const handleDialog = () => { 
  dialogVisible.value = true
}
//对话框取消
const handleClose = () => {
  dialogVisible.value = false
}
//添加的表单数据
const addForm = ref({
  username:"",
  password:"",
  emil:"",
  mobile:null
})
//对话框确认
const handleSuccess = async () => {
  const res = await axios.post("/users",addForm.value)
  console.log(res);
  handleClose()
  if(res.meta.status == 201){
    getTableData()
  }
}



//删除按钮
const deleteUser = (row)=>{
  console.log(row);
  ElMessageBox.confirm(
    i18n.global.t("dialog.deleteTitle"),
    i18n.global.t("dialog.title"),
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
       const res = await axios.delete(`/users/${row.id}`)
       if(res.meta.status == 200){
         getTableData()
       }
    })
    .catch(() => {
      
    })
}





</script>




<style lang="scss" scoped>
.header {
  margin-bottom: 16px;
}
::v-deep .el-pagination{
  padding-top: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
}
</style>
