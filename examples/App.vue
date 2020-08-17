<template>
  <div id='app'>
    <one-tree :data='treeList' @checked='getTreeChecked'></one-tree>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      // 树控件-options 数据模板
      treeList: [
        {
          id: '1',
          label: '一级 1',
          showChildren: false,
          ischecked: false,
          children: [{
            id: '1001',
            label: '二级 1-1',
            showChildren: false,
            ischecked: false,
            children: [{
              id: 'x1',
              label: '三级 1-1-1',
              ischecked: false
            }]
          }]
        },
        {
          id: '2',
          label: '一级 2',
          showChildren: false,
          ischecked: false,
          children: [{
            id: '2001',
            label: '二级 2-1',
            showChildren: false,
            ischecked: false,
            children: [{
              id: 'x2',
              label: '三级 2-1-1',
              ischecked: false
            }]
          }, {
            id: '2002',
            label: '二级 2-2',
            showChildren: false,
            ischecked: false,
            children: [{
              id: 'x20',
              label: '三级 2-2-1',
              ischecked: false
            }]
          }]
        },
        {
          id: '3',
          label: '一级 3',
          showChildren: false,
          ischecked: false,
          children: [{
            id: '30',
            label: '二级 3-1',
            showChildren: false,
            ischecked: false,
            children: [{
              id: '300',
              label: '三级 3-1-1',
              ischecked: false
            }]
          }, {
            id: '30',
            label: '二级 3-2',
            showChildren: false,
            ischecked: false,
            children: [{
              id: '3001',
              label: '三级 3-2-1',
              ischecked: false
            }]
          }]
        }]
    }
  },
  methods: {
    confirm () {
      console.log('表单', this.selectedCascader)
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
  padding: 5px 20px;
  .one-button{
  margin: 5px
  }
}
</style>
