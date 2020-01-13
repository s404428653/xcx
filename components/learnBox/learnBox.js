// components/learnBox/learnBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    course: {
      type: Object
    }
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
    clickCourse(e){
      this.triggerEvent('result', { code: 1, res: e.currentTarget.dataset.id })
    }
  }
})
