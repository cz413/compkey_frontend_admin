<script lang="ts" setup>
import {computed, ref, onMounted} from 'vue'
import {get, put, del} from '../apis/request.js'
import {ElMessage} from 'element-plus'

interface Comment {
  id: number
  username:String
  CommentId: number
  compwordId: number
  word:String
  grade: number
  text: string
}

const search = ref('')
const tableData = ref<Comment[]>([])
const total = ref(0)

// 编辑弹窗相关数据
const dialogVisible = ref(false)
const currentComment = ref<Comment | null>(null)

// 分页相关数据
const currentPage = ref(1)
const pageSize = ref(5) // 每页显示的条目数

function fetchComments(url) {
  console.log("调用Comments")
  get(url)
      .then(response => {
        if (response.status === 200) {
          tableData.value = response.data.data;
          // 设置总条目数
          total.value = tableData.value.length
        } else {
          console.log("获取所有评论信息失败！")
        }
      })
      .catch(error => {
        console.log("获取所有评论信息失败！")
      });
}

// 调用
function handleFetchComments() {
  fetchComments(`/comments`)
}

// 过滤表格数据
const filterTableData = computed(() => {
  const filteredData = tableData.value.filter(
      (data) =>
          !search.value ||
          data.Commentname.toLowerCase().includes(search.value.toLowerCase())
  );

  // 计算分页数据
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.slice(start, end);
});

// 计算总页数
const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

// 删除用户
function deleteComment(url) {
  console.log("调用删除评论接口");
  del(url)
      .then(response => {
        if (response.status === 200) {
          ElMessage({
            message: '删除成功！',
            type: 'success'
          });
          // 重新获取所有用户
          handleFetchComments();
        } else {
          console.log("删除评论失败！");
        }
      })
      .catch(error => {
        console.log("删除评论失败！", error);
      });
}

// 调用
function handleDeleteComment(id) {
  console.log("调用删除评论接口"+id);
  deleteComment(`/comments/${id}`)
}


// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page; // 更新当前页码
}


// 在组件挂载时获取用户信息
onMounted(() => {
  handleFetchComments()
})
</script>

<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="用户" prop="username"/>
      <el-table-column label="竞争词" prop="word"/>
      <el-table-column label="分数" prop="grade"/>
      <el-table-column label="评论" prop="text"/>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="default" placeholder="Type to search"/>
        </template>
        <template #default="scope">
          <el-button size="default" type="danger" @click="handleDeleteComment(scope.row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage"
                   @current-change="handlePageChange"/>
  </div>
</template>


<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>