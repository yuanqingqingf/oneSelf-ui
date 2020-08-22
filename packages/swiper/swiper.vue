<template>
  <div class="swiper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OneSwiper',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      names: [],
      selectName: '',
      timer: null
    }
  },
  mounted () {
    this.init()
    this.changeShow()
    this.paly()
  },
  methods: {
    init () {
      this.names = this.$children.map(item => {
        return item.name
      })
    },
    changeShow () {
      this.selectName = this.value ? this.value : this.names[0]
      this.$children.map(vm => {
        vm.selected = this.selectName
      })
    },
    paly () {
      this.timer = setInterval(() => {
        let index = this.names.indexOf(this.selectName)
        if (index === this.names.length - 1) {
          index = 0
        } else {
          index++
        }
        this.$emit('input', this.names[index])
      }, 2000)
    }
  },
  watch: {
    value (newValue, value) {
      this.changeShow()
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.swiper{
  width: 100%;
  // height: 300px;
  position: relative;
}
</style>
