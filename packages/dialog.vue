<template>
<!-- 使用transition包裹一个元素后，这个元素在显示隐藏就会自动添加一些类名 -->
  <transition name='dialog-fade'>
    <!-- self代表只有点击自己才触发，点子元素不触发 阻止冒泡 -->
    <div class="one-dialog_wrapper" v-show='visible' @click.self="handleClose">
      <div class="one-dialog" :style="{ width, marginTop: top }">
        <!-- 头部 -->
        <div class="one-dialog_header">
          <slot name='title'>
            <!-- 将span定义在slot内部，当父组件传入slot时，span不生效；当不传入slot时，slot生效 -->
              <span class="one-dialog_title">{{title}}</span>
          </slot>
          <button class="one-dialog_headerbtn" @click="handleClose">
            <i class="one-icon-close"></i>
          </button>
        </div>
        <!-- 中部 -->
        <div class="one-dialog_body">
          <!-- 默认插槽 -->
          <slot/>
        </div>
        <!-- 尾部($slots.footer存在就显示，不存在就不显示；因为如果不存在还显示的话，他的padding值会影响布局) -->
        <div class="one-dialog_footer" v-if='$slots.footer'>
          <slot name='footer'></slot>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'OneDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: { // dialog的宽度
      type: String,
      default: '50%'
    },
    top: { // dialog距离顶部的距离
      type: String,
      default: '15vh'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
// scoped会给当前组件的模板中的所有的元素都添加一个随机的属性 data-v-(随机数)
// scopde会给当前组件中所有的样式 类 添加一个对应的属性选择器
.one-dialog_wrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0,0,0,0.5);
  .one-dialog{
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    box-sizing: border-box;
    width: 30%;
    &_header{
      padding: 20px 20px 10px;
      .one-dialog_title{
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .one-dialog_headerbtn{
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .one-icon-close{
          color:#909399
        }
      }
    }
    &_body{
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &_footer{
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      // footer中的按钮是‘父组件穿过来的’，如果是设置.one-button:first-child定位不到。
      // scss中提供了深度选择器::v-deep。less中深度选择器/deep/。css中深度选择器是>>>
      /**
        深度选择器的原理：加上深度选择器之后，one-button:first-child该类后面就不会添加随机属性
        eg.其他类.one-button[data-v-eae7ef7c]
            该类.one-button:first-child
       */
      ::v-deep .one-button:first-child{
        margin-right: 20px;
      }
    }
  }
}
.dialog-fade-enter-active{
  animation: fade .3s;
  transform: translateY(-20px)
}
.dialog-fade-leave-active{
  animation: fade .3s reverse;
  transform: translateY(0)
}
@keyframes fade{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>
