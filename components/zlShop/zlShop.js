// components/zlShop/zlShop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img1: { // 属性名
      type: String,
      value: ''
    },
    img2: { // 属性名
      type: String,
      value: ''
    },
    img3: { // 属性名
      type: String,
      value: ''
    },
    img4: { // 属性名
      type: String,
      value: ''
    },
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
    imgClick(e){
      this.triggerEvent('result', { code: 1, res: e.currentTarget.dataset.id })
    }
  }
})
