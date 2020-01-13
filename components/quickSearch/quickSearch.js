// components/quickSearch/quickSearch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hg: { //高度
      type: String,
      value: "100%",
    },
    wd: { //宽度
      type: String,
      value: "100%",
    },
    listData: { //列表数据
      type: Array,
      value: []
    },
    keys: {
      type: Array,
      value: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    },
    //检测是否可选
    checkUse: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    key: "A",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollToKey(e) {
      this.setData({
        key: e.target.dataset.key
      })
    },
    chooseItem(e) { //选择项
      let res = e.target.dataset.item
      if (this.data.checkUse && !res.use) {//可选检测
        res = {}
      }
      this.triggerEvent('result', {
        code: 1,
        res: res
      });
    }
  }
})