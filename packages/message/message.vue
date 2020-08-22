<template>
  <transition>
    <div class="one-message" v-show="visible">
      <div class="one-message-panel">
        <div class="one-message-title">
          <span>{{title}}</span>
          <i class="one-icon-close" @click="cancel"></i>
        </div>
        <div class="one-message-content">
          {{message}}
        </div>
        <div class="one-message-foot">
          <one-button @click="cancel">取消</one-button>
          <one-button  type='primary' @click="confirm">确定</one-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'OneMessage',
  data () {
    return {
      message: '你确定要删除吗',
      title: '提示',
      visible: false
    }
  },
  methods: {
    cancel () {
      this.onOk()
      this.visible = false
    },
    confirm () {
      this.onCancel()
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.one-message{
  position: fixed;
  top:0;
  left: 0;
   background-color: rgba(0,0,0,0.3);
   height: 100%;
   width: 100%;
   z-index: 999;
  .one-message-panel{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    min-width: 360px;
    border-radius: 3px;
    .one-message-title{
      font-size: 18px;
       padding: 20px 20px 10px;
      color: #303133;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i{
        cursor: pointer;
        color: #909399;
        &:hover{
          color:#409eff
        }
      }
    }
    .one-message-content{
      padding:10px 25px;
    }
    .one-message-foot{
      padding: 10px;
      text-align: right;
    }
    .one-button:first-child{
      margin-right: 8px;
    }
  }
}
.v-enter{
  opacity: 1;
}
.v-leave-to{
  opacity: 0;
}
.v-enter-active,.v-leave-active{
  transition: 0.3s;
}
</style>
