<template>
  <div>
    <one-tree-item :data='tempList' :checkNodes='checkNodes' @checked='checked'></one-tree-item>
  </div>
</template>

<script>
import OneTreeItem from './tree-item.vue'
export default {
  name: 'OneTree',
  components: { OneTreeItem },
  data () {
    return {
      checkList: [],
      tempList: JSON.parse(JSON.stringify(this.data))
    }
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    checkNodes: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  provide () {
    return {
      TreeParent: this
    }
  },
  created () {
    // // 每一项，添加showChildren【展开】和 ischecked【选中】
    const temp = JSON.parse(JSON.stringify(this.data))
    const a = (params) => {
      if (!params.children) {
        params.ischecked = false
        return
      }
      params.ischecked = false
      params.showChildren = false
      params.children.map(item => {
        a(item)
      })
    }
    temp.map(item => {
      a(item)
    })
    this.tempList = temp
  },
  methods: {
    checked (list, temp) {
      if (temp) {
        this.checkList = [...new Set([...this.checkList, ...list])] // 数组合并后-去重
      } else {
        this.checkList = this.checkList.filter(item => {
          return !list.includes(item)
        })
      }
      this.$emit('checked', this.checkList)
    }
  }
}
</script>
