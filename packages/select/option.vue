<template>
  <li class="one-option" @click="handleChange"
  :class="{isSelect: value === Select.value,isDisabled:disabled}"
  >
    {{label}}
  </li>
</template>

<script>
export default {
  name: 'OneOption',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: ['Select'],
  created () {
    if (this.Select.value === this.value) {
      this.Select.label = this.label
    }
  },
  methods: {
    handleChange () {
      if (this.disabled) { return }
      this.Select.dealData({ label: this.label, value: this.value })
      this.Select.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.one-option{
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
.isDisabled{
  cursor: not-allowed;
  color: #c0c4cc
}
</style>
