<template>
  <div class="one-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OneForm',
  props: {
    model: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: '60px'
    }
  },
  provide () {
    return {
      Form: this
    }
  }
}
</script>
