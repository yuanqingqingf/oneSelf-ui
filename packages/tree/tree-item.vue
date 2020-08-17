<template>
  <transition name='tree'>
    <ul class="one-tree">
      <li class="one-tree_li" v-for='(item,i) in list' :key='item.label'>
        <div class="addbackground">
          <i v-if='item.children' :class="[item.showChildren ? 'one-icon-sami-select' : 'one-icon-add','iconsty']" @click="switchShow(i)"></i>
          <one-Checkedbox label='chang' :value='item.ischecked' @input="boxInput(i,item.id)" :style="{marginLeft:item.children ? 0 : '20px'}">
            <span @click.prevent="switchShow(i)" class="one-tree_label">{{item.label}}</span>
          </one-Checkedbox>
        </div>
        <one-tree-item v-if='item.showChildren' :data='item.children' style="background: #fff"></one-tree-item>
      </li>
    </ul>
  </transition>
</template>

<script>
export default {
  name: 'OneTreeItem',
  data () {
    return {
      list: this.data
    }
  },
  inject: ['TreeParent'],
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
  created () {
    console.log('多斯拉克放假快乐', this.list)
  },
  methods: {
    switchShow (i) {
      this.list[i].showChildren = !this.list[i].showChildren
    },
    boxInput (i, id) {
      const node = this.list[i]
      const saveId = []
      node.ischecked = !node.ischecked
      saveId.push(node.id)
      const temp = node.ischecked
      // 父节点选中后，下面的子节点都选中
      function loopChild (params) {
        if (!params.children) { return }
        params.children.map(item => {
          item.ischecked = temp
          saveId.push(item.id)
          loopChild(item)
        })
      }
      loopChild(node)
      this.TreeParent.checked(saveId, temp)
      // 如果子节点都选中，name父节点默认选中
      // this.childSetParent(id)
    },
    childSetParent (id) {
      let firstNode = false
      this.TreeParent.tempList.map(item => {
        if (item.id === id) {
          firstNode = true
        }
      })
      if (!firstNode) {
        const childNode = function (child) {
          let isAllChecked = true
          const allId = child.map(i => {
            isAllChecked = isAllChecked && i.ischecked
            return i.id
          })
          return { isAllChecked: isAllChecked, allId }
        }
        const total = function (params) {
          if (!params.children) { return }
          const t = childNode(params.children)
          if (t.allId.includes(id)) {
            params.ischecked = t.isAllChecked
          } else {
            total(params.children)
          }
        }
        this.TreeParent.tempList.map(item => {
          total(item)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.one-tree{
  list-style: none;
  padding: 0px 20px;
  margin: 0;
  .one-tree_li{
    margin: 5px 0;
    .addbackground{
      &:hover{
        background: #eaeefb;
      }
    }
  }
 .iconsty{
  color:#9c9393;
  cursor: pointer;
  // margin-right: 5px;
  }
  .one-tree_label{
    font-size: 14px;
    white-space: nowrap;
    cursor: pointer;
  }
}
.tree-enter-active{
  animation: tree .3s;
}
.tree-leave-active{
 animation: tree .3s reverse;
}
@keyframes tree{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>
