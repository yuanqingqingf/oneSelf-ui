<template>
  <div class="one-switch" :class="{'is-checked':value}"  @click="handleClick">
    <input ref='input' class="one-switch_input" type='checkbox' :name='name'>
    <span class="one-switch_core" ref='core'>
      <span class="one-switch_button"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'OneSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 激活的颜色
    activeColor: {
      type: String,
      default: ''
    },
    // 不激活的颜色
    inactiveColor: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  mounted () {
    // 修改开关的颜色
    this.setColor()
    this.$refs.input.checked = this.value
  },
  methods: {
    async handleClick () {
      this.$emit('input', !this.value)
      // 等待value发生了改变，在setColor
      // 数据修改后，等待dom更新，在修改按钮的颜色
      // console.log('前', this.value)
      await this.$nextTick() // nextTick涉及到Vue中DOM的异步更新，
      // console.log('后', this.value)
      this.setColor()
      this.$refs.input.checked = this.value
    },
    setColor () {
      if (this.activeColor || this.inactiveColor) {
        const color = this.value ? this.activeColor : this.inactiveColor
        this.$refs.core.style.borderColor = color
        this.$refs.core.style.background = color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .one-switch{
    display: inline-block;
    align-items: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;
    .one-switch_core{
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color .3s,background-color .3s;
    vertical-align: middle;
    .one-switch_button{
      position:absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all .3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
      }
    }
  }
  // 选中样式
  .is-checked {
    .one-switch_core{
      border-color: #409eff;
      background-color: #409eff;
      .one-switch_button {
        transform: translateX(20px);
      }
    }
  }
  // 隐藏input标签
  .one-switch_input{
    position:absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
</style>
