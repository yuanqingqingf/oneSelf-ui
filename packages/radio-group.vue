<template>
  <div class="one-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OneRadioGroup',
  props: {
    // 接收到value；还需要触发当前组件的input时间
    value: null
  },
  provide () {
    return {
      RadioGroup: this
    }
  }
}
</script>
