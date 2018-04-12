<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='index' width="150">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='ID' width="150">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="300" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="公司" align="center" width="150">
        <template slot-scope="scope">
          {{scope.row.company}}
        </template>
      </el-table-column>
      <el-table-column label="日期" align="center" width="150">
        <template slot-scope="scope">
          {{scope.row.date}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          @click="lookHtml(scope.$index, scope.row)">查看</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="公示公告内容查看"
      :visible.sync="dialogVisible"
      class="displayScreen"
      width="50%">
      <div class="ql-container ql-snow">
        <div class="ql-editor">
          <div v-html="htmlString"></div>
        </div>
      </div>
      <div>

      </div>
    </el-dialog>
    <el-dialog
      title="更改内容"
      class="displayScreen"
      :before-close="Delectimg"
      :visible.sync="disAbleChange"
      width="50%">
      <div>
        <el-button type="primary" @click="changeHtmlString">确认更改<i class="el-icon-upload el-icon--right"></i></el-button>
      <div>
        <el-input :placeholder="userInfromation[1]" :disabled="true" class="changeUserI">
          <template slot="prepend">id</template>
        </el-input>
        <el-input :placeholder="userInfromation[2]" v-model="inputTitle" class="changeUserI">
          <template slot="prepend">标题</template>
        </el-input>
        <el-input :placeholder="userInfromation[3]" v-model="inputCP" class="changeUserI">
          <template slot="prepend">公司</template>
        </el-input>
        <el-input :placeholder="userInfromation[4]" v-model="inputDate" class="changeUserI">
          <template slot="prepend">日期</template>
        </el-input>
      </div>
      <div>
        <quill-editor ref="myTextEditor"  
          :content="content"
          class="editor"
          :options="editorOption"
          @change="onEditorChange($event)"> 
        </quill-editor>
      </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getNoticeList, delectNotice, getHtml, changeHtml, delectFILE } from '@/api/notice'
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
import { set } from './default'
const [updateUrl, baseUrlImg, delectUrlImg] = [set.updateUrl, set.baseUrlImg, set.delectUrlImg]
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      disAbleChange: false,
      userInfromation: [],
      delectImg: [],
      htmlString: '',
      onClick: false,
      inputTitle: '',
      inputCP: '',
      inputDate: '',
      content: '',
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'img',
            size: 3,
            action: updateUrl,
            error: () => { this.$message('error') },
            response: (res) => {
              this.delectImg.push(`${delectUrlImg}${res.filename}`)
              return `${baseUrlImg}${res.filename}`
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    quillEditor
  },
  created() {
    this.fetchData()
  },
  beforeRouteLeave(to, from, next) {
    this.Delectimg()
    next()
  },
  methods: {
    async Delectimg() {
      try {
        if (this.delectImg.length === 0) {
          return
        }
        await delectFILE({ fileArray: this.delectImg })
        this.$message({
          message: '没有使用的图片已经删除',
          type: 'success'
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.disAbleChange = false
      }
    },
    async changeHtmlString() {
      if (this.inputTitle === '' ||
        this.inputCP === '' ||
        this.inputDate === '' ||
        this.content === '') {
        this.$message({
          showClose: true,
          message: '不能有空',
          type: 'error'
        })
        return
      }
      try {
        await changeHtml({
          id: this.userInfromation[1],
          title: this.inputTitle,
          company: this.inputCP,
          date: this.inputDate,
          htmlString: this.content
        })
        this.list[this.userInfromation[0]].title = this.inputTitle
        this.list[this.userInfromation[0]].company = this.inputCP
        this.list[this.userInfromation[0]].date = this.inputDate
        this.$message({
          type: `success`,
          message: 'success'
        })
      } catch (e) {
        console.log(e)
        this.$message({
          showClose: true,
          message: '未知错误',
          type: 'error'
        })
      } finally {
        this.disAbleChange = false
      }
    },
    onEditorChange({ quill, html, text }) {
      this.content = html
    },
    async handleEdit(index, row) {
      try {
        this.userInfromation[0] = index
        this.userInfromation[1] = row.id
        this.inputTitle = this.userInfromation[2] = row.title
        this.inputCP = this.userInfromation[3] = row.company
        this.inputDate = this.userInfromation[4] = row.date
        const content = await getHtml({ id: row.id })
        this.content = this.userInfromation[5] = content.data.data[0].htmlString
        this.disAbleChange = true
      } catch (e) {
        console.log(e)
      }
    },
    async lookHtml(index, row) {
      if (this.onClick) return
      try {
        this.onClick = true
        const content = await getHtml({ id: row.id })
        this.htmlString = content.data.data[0].htmlString
        this.dialogVisible = true
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'error',
          message: '错误'
        })
      } finally {
        this.onClick = false
      }
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除这条公示, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delectNotice({ id: row.id })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.list.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    fetchData() {
      this.listLoading = true
      getNoticeList({ page: 1 }).then(response => {
        this.list = response.data.data.reverse()
        this.listLoading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .changeUserI{
    margin-top: 10px
  }
</style>


