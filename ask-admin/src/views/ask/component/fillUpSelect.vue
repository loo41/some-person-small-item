<template>
  <div>
      <el-dialog
        title="填空设置"
        :visible.sync="fillShow"
        width="50%"
        modal="false"
        :before-close="handleClose">
      </el-dialog>
  </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props: {
        fillUpVisible: {
            type: Boolean
        },
        handleClose: {
            type: Function
        }
    },
    computed: {
        fillShow () {
            return this.fillUpVisible
        }
    }
}
</script>

<style>

</style>
