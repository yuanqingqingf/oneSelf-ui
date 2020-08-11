<template>
  <div class="one-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OneCheckboxGroup',
  props: {
    value: {
      type: Array
    }
  },
  provide () {
    return {
      CheckboxGroup: this
    }
  }
}
</script>
