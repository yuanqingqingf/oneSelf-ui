<template>
  <div class="one-select" :class="{isDisabled:disabled}">
    <input :placeholder="placeholder" type="text" :disabled='disabled' class="one-select_input" :value='label' readonly="readonly" @click="show=!show">
    <span class="one-select_suffix">
      <i :class="[show ?'one-icon-arrow-up':'one-icon-arrow-down']"></i>
    </span>
    <transition name='selectOption'>
      <ul class="one-select_ul" v-show ='show' >
       <slot></slot>
     </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'OneSelect',
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      show: false,
      label: ''
    }
  },
  provide () {
    return {
      Select: this
    }
  },
  methods: {
    handleClick () {
      this.show = !this.show
    },
    dealData (obj) {
      this.$emit('input', obj.value)
      this.label = obj.label
    }
  }
}
</script>

<style lang="scss" scoped>
.one-select{
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
  width: 180px;
  .one-select_input{
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #dcdfe6;
    background: #fff;
    outline: none;
    width: 100%;
    height: 40px;
    padding: 0 10px 0 10px;
    border-radius: 3px;
    width: 100%;
    color: #606266;
    box-sizing: border-box;
  }
     .one-select_suffix{
      position: absolute;
      top: 6px;
      right: 5px;
      height: 100%;
      color: #c0c4cc;
      transition: .3s;
    }
  .one-select_ul{
    list-style: none;
    padding: 6px 0;
    margin: 0;
    background: #fff;
    box-shadow: 1,1,1,#000;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    position: absolute;
    top:42px;
    max-height: 274px;
    overflow: auto;
    min-width: 180px;
  }
}
.selectOption-enter-active{
 animation: selectMethod .3s;
}
.selectOption-leave-active{
  animation: selectMethod .3s reverse;
}
@keyframes selectMethod{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.isDisabled{
  .one-select_input{
    cursor: not-allowed;
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
  }
}
</style>
