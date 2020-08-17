// 整个包的入口
// 定义 install 方法，接受 Vue 作为参数，如果使用 use 注册插件，则所有的组件都将被注册
// 统一导出
// 导出颜色选择器
import Button from './button'
import Dialog from './dialog'
import Input from './input'
import Checkbox from './checkbox'
import Radio from './radio'
import RadioGroup from './radio-group'
import Switch from './switch'
import CheckboxGroup from './checkbox-group'
import Form from './form'
import FormItem from './form-item'
import Tree from './tree/tree.vue'
import select from './select/select.vue'
import cascader from './cascader/cascader.vue'
import './fonts/iconfont.css'

const components = [
  Button,
  Dialog,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  CheckboxGroup,
  Form,
  FormItem,
  Tree,
  select,
  cascader
]
const install = function (Vue) {
  // 全局注册所有的组件
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}
/**
 * Vue.js 官方提供的一些插件 (例如 vue-router) 在检测到 Vue 是可访问的全局变量时会自动调用 Vue.use()。然而在像 CommonJS 这样的模块环境中，你应该始终显式地调用 Vue.use()
 */

// 判断是否直接引入文件，如果是，就不用调用vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
