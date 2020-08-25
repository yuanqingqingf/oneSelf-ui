<template>
  <div class="one-steps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OneSteps',
  props: {
    active: {
      type: [String, Number],
      required: true
    },
    isCenter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      allTitles: []
    }
  },
  mounted () {
    this.allTitles = this.$children.map(item => {
      return item.title
    })
    this.$children.map((vm, i) => {
      vm.index = i
      vm.active = this.active
      vm.isCenter = this.isCenter
    })
  }
}
</script>

<style lang="scss" scoped>
.one-steps{
  display: flex;
  white-space: nowrap;
}
</style>
