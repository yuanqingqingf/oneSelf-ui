import Vue from 'vue'
import Message from './message.vue'
const MessageConstructor = Vue.extend(Message)

const message = function (option) {
  option = option || {}
  const instence = new MessageConstructor({
    data: option
  })
  instence.visible = true
  instence.$mount()
  document.body.appendChild(instence.$el)
  return instence
}

export default message
