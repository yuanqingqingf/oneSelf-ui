<template>
  <div id='app'>
    <!-- <one-button type='primary' @click="confirm">确定</one-button> -->
    <!-- <one-steps :active='active' isCenter>
      <one-step title='步骤1'></one-step>
      <one-step title='步骤2'></one-step>
      <one-step title='步骤3'></one-step>
    </one-steps> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      active: 1,
      selectSwiper: ''
    }
  },
  methods: {
    confirm () {
      this.$message({
        title: '标题',
        message: '确定要删除吗',
        onOk: () => {
          console.log('这里是ok的啦')
        },
        onCancel: () => {
          console.log('这里是oncancel的啦')
        }
      })
    },
    showDialogMethod () {
      this.visible = !this.visible
    },
    handleChangeCascader () {
    },
    // 获取“树控件”中，选中项的id
    getTreeChecked (checedId) {
      console.log('选中node的id', checedId)
    }
  }
}
</script>

<style lang="scss">
#app {
  // padding: 5px 20px;
  // .one-button{
  // margin: 5px
  // }
  width:600px;
  // border:1px solid #000;
  .item{
    height: 300px;
    font-size: 50px;
    background: #ccc;
  }
}
</style>
