<template>
<!-- 该文件中：列出各个组件的使用模板【供参考】 -->
  <div>
    <!-- 按钮 -->
    <div>type按钮</div>
    <one-button type='primary' @click="confirm">确定</one-button>
    <one-button type='success'>确定</one-button>
    <one-button type='info'>确定</one-button>
    <one-button type='warning'>确定</one-button>
    <one-button type='danger'>确定</one-button>
    <div>type+plain朴素按钮</div>
    <one-button plain>确定</one-button>
    <one-button plain type='primary'>确定</one-button>
    <one-button plain type='success'>确定</one-button>
    <one-button plain type='info'>确定</one-button>
    <one-button plain type='warning'>确定</one-button>
    <one-button plain type='danger'>确定</one-button>
    <div>round圆</div>
    <one-button type='primary' round>确定</one-button>
    <one-button type='success' round>取消</one-button>
    <one-button type='info' round>确定</one-button>
    <one-button type='warning' round>取消</one-button>
    <one-button type='danger' round>确定</one-button>
    <div>禁用</div>
    <one-button type='danger' round disabled @click="confirm">确定</one-button>
    <div>icon</div>
    <one-button type='primary' icon='one-icon-close'></one-button>
    <one-button type='primary' icon='one-icon-close'>点击</one-button>
    <one-button type='primary' @click="confirm">点击</one-button>
    <!-- dialog提示 -->
    <one-dialog title='温馨提示' :visible.sync='visible' top='50px' width='400px'>
      <template>
         <div>你确定要删除吗？</div>
      </template>
      <template v-slot:footer>
        <one-button>取消</one-button>
        <one-button type='primary' @click="confirm">确定</one-button>
      </template>
    </one-dialog>
    <!--开关  -->
    <one-switch name='tt' active-color='#000' inactive-color='red' v-model='controlSwitch'></one-switch>
    <one-switch name='rr' v-model='controlSwitch'></one-switch>
    <!-- input框 -->
    <one-input type='password' name='yy' v-model="username" placeholder="请输入" :disabled='false' showPassword></one-input>
    <one-input name='yy' type='text' v-model="password" placeholder="请输入" clearIcon></one-input>
    <!-- 单选按钮 -->
    <one-radio v-model='aihao' label='nan'>男</one-radio>
    <one-radio v-model='aihao' label='nv'>女</one-radio>
    <one-radio-group v-model='aihao'>
      <one-radio  label='nan'>男</one-radio>
      <one-radio  label='nv'>nv</one-radio>
    </one-radio-group>
    <!-- 多选按钮 -->
    <one-Checkedbox label='chang' v-model="single">单唱歌</one-Checkedbox>
    <one-checkedbox-group v-model="checkList">
      <one-Checkedbox label='chang'>唱歌</one-Checkedbox>
      <one-Checkedbox label='tiao'>跳舞</one-Checkedbox>
    </one-checkedbox-group>
    <!-- form表单  -->
    <one-form :model='formList'>
      <one-form-item label='用户名'>
        <one-input name='yy' type='text' v-model="formList.username" placeholder="请输入" clearIcon></one-input>
      </one-form-item>
      <one-form-item label='开关'>
          <one-switch name='rr' v-model='formList.conswitch'></one-switch>
      </one-form-item>
        <one-form-item label='性别'>
          <one-radio-group v-model='formList.sex'>
          <one-radio  label='nan'>男</one-radio>
          <one-radio  label='nv'>nv</one-radio>
        </one-radio-group>
      </one-form-item>
    </one-form>
    <!-- 树形控件 -->
    <one-tree :data='treeList' @checked='getTreeChecked'></one-tree>
    <!-- select 选择器 -->
    <one-select v-model="selectModel" placeholder="请选择">
      <one-option :disabled="item.disabled" v-for='item in selectOptions' :key='item.value' :label='item.label' :value='item.value'></one-option>
    </one-select>
    <!-- 级联选择器 -->
    <one-cascader
    :options="cascaderOptions"
    v-model="selectedCascader"
    @change="handleChangeCascader">
  </one-cascader>
    </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      selectedCascader: [], // 级联选择器 v-model
      // 级联选择器：options数据模板
      cascaderOptions: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致',
            children: [{
              value: 'qq',
              label: '青青'
            }]
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
       }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      selectModel: '选项1', // select 选择器 v-model
      // selsect 选择器:option
      selectOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '11',
          label: '双dsf',
          disabled: true
        }, {
          value: '44',
          label: '双奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
      }],
      visible: false, // dialog-显示与隐藏
      controlSwitch: false, // 开关
      username: '', // input 用户名称
      password: '', // input 密码
      aihao: 'nan', // 单选框
      checkList: ['chang'], // 多选框
      single: false,
      formList: { // form 表单
        username: '',
        conswitch: false,
        sex: ''
      },
      // 树控件-options 数据模板
      treeList: [
        {
          id: '1',
          label: '一级 1',
          showChildren: false,
          ischecked: false,
          children: [{
            id: '1001',
            label: '二级 1-1',
            showChildren: false,
            ischecked: false,
            children: [{
              id: 'x1',
              label: '三级 1-1-1',
              ischecked: false
            }]
          }]
        },
        {
          id: '2',
          label: '一级 2',
          showChildren: false,
          ischecked: false,
          children: [{
            id: '2001',
            label: '二级 2-1',
            showChildren: false,
            ischecked: false,
            children: [{
              id: 'x2',
              label: '三级 2-1-1',
              ischecked: false
            }]
          }, {
            id: '2002',
            label: '二级 2-2',
            showChildren: false,
            ischecked: false,
            children: [{
              id: 'x20',
              label: '三级 2-2-1',
              ischecked: false
            }]
          }]
        },
        {
          id: '3',
          label: '一级 3',
          showChildren: false,
          ischecked: false,
          children: [{
            id: '30',
            label: '二级 3-1',
            showChildren: false,
            ischecked: false,
            children: [{
              id: '300',
              label: '三级 3-1-1',
              ischecked: false
            }]
          }, {
            id: '30',
            label: '二级 3-2',
            showChildren: false,
            ischecked: false,
            children: [{
              id: '3001',
              label: '三级 3-2-1',
              ischecked: false
            }]
          }]
        }]
      }
  },
  methods: {
    confirm () {
      console.log('表单', this.selectedCascader)
    },
    handleChangeCascader () {
    },
    // 获取“树控件”中，选中项的id
    getTreeChecked (checedId) {
      console.log('选中node的id', checedId)
    }
  }
}
</script>

<style lang="scss">
#app {

}
</style>
