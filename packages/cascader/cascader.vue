<template>
  <div class="one-cascader" :class="{isDisabled:disabled}">
    <input :placeholder="placeholder" type="text" :disabled='disabled' class="one-cascader_input" :value='label' readonly="readonly" @click="show=!show">
    <span class="one-cascader_suffix">
      <i :class="[show ?'one-icon-arrow-up':'one-icon-arrow-down']"></i>
    </span>
    <!-- <transition name='cascaderOption'> -->
      <div class="one-cascader_main" v-show='show'>
        <div class="one-cascader_item" v-for='(item,i) in list' :key='i'>
          <ul class="one-cascader_z" >
            <li :class="{isSelect: selectValue.includes(child.value)}" class="one-cascader-innderItem" v-for='child in item' :key='child.value' @click="handlClick(i,child)"> {{child.label}} </li>
          </ul>
        </div>
      </div>
        <!-- <cascaderItem  v-for='item in list' :key='item.value' :listItem='item' @dealData='dealData'></cascaderItem> -->
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'OneCascader',
  provide () {
    return {
      Cascader: this
    }
  },
  props: {
    value: {
      type: Array,
      default: () => { return [] }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    options: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      show: false,
      label: '',
      list: [],
      selectNode: [] // 保存选中项
    }
  },
  computed: {
    selectValue () {
      return this.selectNode.map(item => {
        return item.value
      })
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      if (this.value.length) {
        const getItem = (params) => {
          let p = {}
          const a = params.map(item => {
            if (this.value.includes(item.value)) { p = item }
            return { label: item.label, value: item.value }
          })
          return { a, p }
        }
        const selectList = []
        const selectNode = []
        let label = ''
        const loop = (params) => {
          const t = getItem(params)
          selectList.push(t.a)
          selectNode.push({ label: t.p.label, value: t.p.value })
          label = label + t.p.label + '/'
          if (!t.p.children) { return }
          loop(t.p.children)
        }
        loop(this.options)
        this.list = selectList
        this.selectNode = selectNode
        this.label = label.substring(0, label.length - 1)
      } else {
        const temp = this.options.map(item => {
          return { label: item.label, value: item.value }
        })
        this.list = [temp]
      }
    },
    handleClick () {
      this.show = !this.show
    },
    handlClick (index, child) {
      let temp = []
      // 递归找到child的孩子
      const loopList = (params) => {
        if (params.value === child.value) {
          temp = params.children ? params.children : []
          return
        }
        if (!params.children) { return }
        params.children.map(item => {
          loopList(item)
        })
      }
      this.options.map(item => {
        loopList(item)
      })
      // 修改选中的数据
      this.selectNode = this.selectNode.filter((item, i) => {
        if (i < index) {
          return item
        }
      })
      this.selectNode.push({ value: child.value, label: child.label })
      if (!temp.length) {
        // 没有子孩子，是叶子节点
        this.show = false
        let label = ''
        const value = []
        this.selectNode.map(item => {
          label = label + item.label + '/'
          value.push(item.value)
        })
        this.$emit('input', value)
        this.label = label.substring(0, label.length - 1)
      } else {
        this.list = this.list.filter((item, i) => {
          if (i <= index) {
            return item
          }
        })
        const curNode = temp.map(item => {
          return { label: item.label, value: item.value }
        })
        this.list.push(curNode)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.one-cascader{
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
  width: 180px;
  .one-cascader_input{
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #dcdfe6;
    background: #fff;
    outline: none;
    width: 100%;
    height: 40px;
    padding: 0 20px 0 10px;
    border-radius: 3px;
    width: 100%;
    color: #606266;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .one-cascader_suffix{
      position: absolute;
      top: 6px;
      right: 5px;
      height: 100%;
      color: #c0c4cc;
      transition: .3s;
      max-width: 100px;
    }
    .one-cascader_main{
      display: flex;
      list-style: none;
      padding: 6px 0;
      margin: 0;
      background: #fff;
      box-shadow: 1,1,1,#000;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      position: absolute;
      top:42px;
      .one-cascader_item{
        max-height: 274px;
        min-height: 150px;
        overflow-y: auto;
        // width: 180px;
        min-width: 150px;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
      }
      .one-cascader-innderItem{
        padding: 5px 8px;
        cursor: pointer;
          &:hover{
            background: #eaeefb;
          }
      }
      .isSelect{
        color: #409eff;
        font-weight: 700;
      }
      .one-cascader_z{
        margin: 0;
        padding: 0;
      }
    }
}
// .selectOption-enter-active{
//  animation: selectMethod .3s;
// }
// .selectOption-leave-active{
//   animation: selectMethod .3s reverse;
// }
// @keyframes selectMethod{
//   0%{
//     opacity: 0;
//   }
//   100%{
//     opacity: 1;
//   }
// }
// .isDisabled{
//   .one-select_input{
//     cursor: not-allowed;
//     background-color: #f5f7fa;
//     border-color: #e4e7ed;
//     color: #c0c4cc;
//   }
// }
</style>
