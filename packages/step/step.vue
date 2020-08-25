<template>
  <div class="one-step" :style="style" :class="[{preActive: preActive, isActiveSty: isActive, isCenterSty: isCenter}]">
    <div class="one-step_head">
      <div class="one-step_line" v-if='!isLast'>
        <i></i>
      </div>
      <div class="one-step_inner">{{ preActive ? '√':index+1}}</div>
    </div>
    <div class="one-step_main">
      <div>{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OneStep',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      index: -1,
      active: '',
      isCenter: false
    }
  },
  computed: {
    preActive () {
      return this.index < this.active
    },
    isActive () {
      return this.index + '' === this.active + ''
    },
    isLast () {
      return this.index === this.$parent.allTitles.length - 1
    },
    style () {
      const allTitles = this.$parent.allTitles.length
      let bai = ''
      if (this.isCenter) {
        bai = (100 / allTitles) + '%'
      } else {
        this.isLast ? bai = 'auto' : bai = (100 / (allTitles - 1)) + '%'
      }
      return { 'flex-basis': bai }
    }
  }
}
</script>

<style lang="scss" scoped>
$origin: #c0c4cc;
$preActiveColor: #409eff;
$curActiveColor: #303133;
.one-step{
  flex: 1;
  position: relative;
  color: $origin;
  .one-step_head{
    position: relative;
    .one-step_line{
        position: absolute;
        left: 0;
        right: 0;
        top: 12px;
        height: 2px;
        background: $origin;
    }
    .one-step_inner{
      width:24px;
      height: 24px;
      border: 2px solid $origin;
      border-radius: 100%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      position: relative;
    }
  }
  .one-step_main{
    line-height: 32px;
  }
}
// active 之前的-已完成
.preActive{
  .one-step_head{
    color: $preActiveColor;
    .one-step_inner{
      border-color: $preActiveColor
    }
  }
  .one-step_main{
    color: $preActiveColor
  }
}
// 等于active 当前的isActiveSty
.isActiveSty{
  .one-step_head{
    color: $curActiveColor;
    .one-step_inner{
      border-color: $curActiveColor
    }
  }
  .one-step_main{
    color: $curActiveColor
  }
}
// 剧中样式
.isCenterSty{
  text-align: center;
  .one-step_head{
    .one-step_line{
      left:50%;
      right: -50%;
    }
  }
}
</style>
