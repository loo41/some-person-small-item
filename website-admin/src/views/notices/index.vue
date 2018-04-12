<template>
  <div class="app-container">
    <div class="but">
      <el-button type="primary" @click="uploadHtml">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      <el-button type="primary" icon="el-icon-delete" @click="clearData"></el-button>
    </div>

    <div>
      <el-input placeholder="项目名称" v-model="ariticName" class="bigStyle">
        <template slot="append">title</template>
      </el-input>
    </div>

    <div class="box">
      <el-input
        placeholder="企业名称"
        v-model="company"
        class="smallStyle">
      </el-input>
      <el-date-picker
        v-model="date"
        type="date"
        class="smallStyle"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
     </el-date-picker>
     <div>
       <el-button type="primary" @click="updateVisible = true">下载文件上传<i class="el-icon-upload el-icon--right"></i></el-button>
       <el-dialog
        title="file upload"
        :visible.sync="updateVisible"
        width="40%"
        :before-close="handleClose">
        <div>
          <el-upload
            class="uploadDown"
            ref="upload"
            name="downFile"
            action="http://vue-admin.tianchenyong.top/website/notice/uploadFile"
            :on-success="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-upload>
        </div>
      </el-dialog>
     </div>
     <div>
     </div>
    </div>

    <div class="titleStyle">正文</div>
    <div>
      <quill-editor ref="myTextEditor"  
        :content="content"
        class="editor"
        :options="editorOption"
        @change="onEditorChange($event)"> 
      </quill-editor>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor, Quill } from 'vue-quill-editor'
import { uploadHtmls, delectFILE } from '@/api/notice'
import { set } from './default'
import VueFileUpload from 'vue-file-upload'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
const [updateUrl, baseUrlImg, delectUrlImg, delectUrlFile, baseUrlFile] = [set.updateUrl, set.baseUrlImg, set.delectUrlImg, set.delectUrlFile, set.baseUrlFile]
export default {
  data() {
    return {
      content: '',
      ariticName: '',
      delectImg: [],
      delectFile: [],
      downFile: [],
      company: null,
      fileList: [],
      date: null,
      updateVisible: false,
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
      },
      notClick: false
    }
  },
  components: {
    quillEditor,
    VueFileUpload
  },
  beforeRouteLeave(to, from, next) {
    this.Delectimg()
    next()
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      this.$message({
        message: `文件${file.filename}移除成功`,
        type: 'success'
      })
    },
    handlePreview(response, file, fileList) {
      this.fileList = fileList
      fileList.map((item) => {
        this.delectFile.push(`${delectUrlFile}${item.response.filename}`)
        this.downFile.push(`${baseUrlFile}${item.response.filename}`)
      })
      this.$message({
        message: '上传成功, 若不需要在上传可以关闭',
        type: 'success'
      })
    },
    async Delectimg() {
      if (this.delectImg.length === 0 && this.delectFile.length === 0) {
        return
      }
      await delectFILE({ fileArray: this.delectImg.concat(this.delectFile) })
      this.$message({
        message: '没有使用的图片和文件已经删除',
        type: 'success'
      })
    },
    async uploadHtml() {
      if (this.notClick) return
      this.notClick = true
      await this.sendData()
      this.notClick = false
    },
    async handSuccess(response, file, fileList) {
      await this.sendData()
    },
    async sendData() {
      if (this.downFile.length !== 0) {
        let content = ``
        this.downFile.forEach(element => {
          content = `${content}<p><a href=${element} download=${element}>${element}</a></p>`
        })
        this.content = `${this.content}<p style="margin-top: 20px"><p>公告附件下载</p>${content}</p>`
      }
      if (this.ariticName === '' || this.company === '') {
        this.$message({
          showClose: true,
          message: '标题和公司不能为空',
          type: 'error'
        })
        return
      }
      try {
        await uploadHtmls({
          title: this.ariticName,
          company: this.company,
          date: this.date,
          htmlString: this.content
        })
        this.$message({
          type: `success`,
          message: 'success'
        })
        this.clearData()
      } catch (e) {
        console.log(e)
        this.$message({
          showClose: true,
          message: '未知错误',
          type: 'error'
        })
      }
    },
    onEditorChange({ quill, html, text }) {
      this.content = html
    },
    clearData() {
      this.content = ''
      this.ariticName = ''
      this.company = null
      this.date = null
      this.delectImg = []
      this.delectFile = []
      this.downFile = []
      this.$message({
        showClose: true,
        message: '成功',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.editor{
  height: 500px;
}
.but{
  margin-bottom: 10px;
}
.box{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}
.fileupload-button{
  position: relative;
  overflow: hidden;
  display: inline-block;
  color:#fff;
  padding:6px 12px;
  background-color:#409EFF;
  border-color: #409EFF;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer
}
.smallStyle{
  width: 400px;
}
.bigStyle{
  flex: 1!important;
}
.titleStyle{
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.upload{
  width: 300px;
}
</style>

