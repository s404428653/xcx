// components/grantBox/grantBox.js
let app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    reject(){//拒绝
      this.triggerEvent('result', {code: 0, res: ''})
    },

    onGotUserInfo(e){//允许获得用户信息
      this.triggerEvent('result', {code: 1, res: e.detail});
    }
  }
})
