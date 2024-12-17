<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { get, put, del } from '../apis/request.js'
import { ElMessage } from 'element-plus'

interface User {
  id: number
  username: string
  password: string
  telephone: string
  email: string
}

const search = ref('')
const tableData = ref<User[]>([])
const total = ref(0)

// 编辑弹窗相关数据
const dialogVisible = ref(false)
const currentUser = ref<User | null>(null)

// 分页相关数据
const currentPage = ref(1)
const pageSize = ref(5) // 每页显示的条目数

// 获取用户信息
function fetchUsers(url) {
  console.log("调用users")
  get(url)
    .then(response => {
      if (response.status === 200) {
        tableData.value = response.data.data;
        // 设置总条目数
        total.value = tableData.value.length
      } else {
        console.log("获取所有用户信息失败！")
      }
    })
    .catch(error => {
      console.log("获取所有用户信息失败！")
    });
}

// 调用
function handleFetchUsers() {
  fetchUsers(`/users`)
}

// 过滤表格数据
const filterTableData = computed(() => {
  const filteredData = tableData.value.filter(
    (data) =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase())
  );

  // 计算分页数据
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.slice(start, end);
});

// 计算总页数
const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

// 编辑用户
function updateUserInfo(url, params) {
  console.log("调用更新用户信息接口");
  put(url, params)
    .then(response => {
      if (response.status === 200) {
        const userData = response.data.data;
        // 更新界面上的值
        tableData.value = userData.value
        ElMessage({
          message: '保存成功！',
          type: 'success'
        });
      } else {
        console.log("更新用户信息失败！");
      }
    })
    .catch(error => {
      console.log("更新用户信息失败！", error);
    });
}

// 弹窗调用
function handleDialog(user: User) {
  console.log("编辑用户的弹窗")
  currentUser.value = { ...user }; // 填充当前用户信息
  dialogVisible.value = true; // 显示弹窗
}

// 调用
function handleUpdateUserInfo(userId, username, phone, email) {
  const params = {
    username: username,
    telephone: phone,
    email: email,
  };
  updateUserInfo(`/users/${userId}`, params);
}


// 删除用户
function deleteUser(url) {
  console.log("调用删除用户接口");
  del(url)
    .then(response => {
      if (response.status === 200) {
        ElMessage({
          message: '删除成功！',
          type: 'success'
        });
        // 重新获取所有用户
        handleFetchUsers();
      } else {
        console.log("删除用户失败！");
      }
    })
    .catch(error => {
      console.log("删除用户失败！", error);
    });
}

// 调用
function handleDeleteSearchRecord(id) {
  deleteUser(`/users/${id}`)
}


// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page; // 更新当前页码
}


// 在组件挂载时获取用户信息
onMounted(() => {
  handleFetchUsers()
})

</script>

<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="电话" prop="telephone" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="default" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="default" @click="handleDialog(scope.row)">
            Edit
          </el-button>
          <el-button size="default" type="danger" @click="handleDeleteSearchRecord(scope.row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage"
      @current-change="handlePageChange" />

    <!-- 编辑用户弹窗 -->
    <el-dialog title="编辑用户信息" :visible.sync="dialogVisible">
      <el-form :model="currentUser">
        <el-form-item label="用户名">
          <el-input v-model="currentUser.username" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="currentUser.telephone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="currentUser.email" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"
          @click="handleUpdateUserInfo(currentUser.id, currentUser.username, currentUser.telephone, currentUser.email)">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.example-pagination-block+.example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
