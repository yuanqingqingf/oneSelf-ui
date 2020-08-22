<template>
  <transition>
      <div v-show='isShow' class="itemSty" >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'OneSwiperItem',
  props: {
    name: {
      tyep: String,
      request: true
    }
  },
  data () {
    return {
      selected: '',
      reverse: ''
    }
  },
  computed: {
    isShow () {
      return this.selected === this.name
    }
  }
}
</script>

<style lang="scss" scoped>
.itemSty{
  height: 100%;
  width: 100%;
}
.v-enter{
  transform: translate(100%)
}
.v-leave-to{
  transform: translate(-100%)
}
.v-enter-active,.v-leave-active{
  transition: all 1s linear
}
.v-enter-active{
  position: absolute;
  top:0;
  left: 0;
}
</style>
