// components/communitySearch/communitySearch.js
const app = getApp();

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
    cumtys: { //列表数据
      type: Array,
      value: []
    },
    curCumty: {
      type: Object,
      value: {}
    },
    lastComtys: {
      type: Array,
      value: []
    },
    curCity: {
      type: Object,
      value: null
    },
    keys: {
      type: Array,
      value: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    curCity: {},
    cumtys: null,
    bkcumtys: null
  },

  ready: function() {
    const query = this.createSelectorQuery()
    query.select('#top-box').boundingClientRect()
    query.exec(res => {
      let hg = res[0].height
      this.setData({
        scrollHg: this.data.hg - hg + "px"
      })
    })
  },

  observers: {
    "cumtys": function(cumtys){
      if(cumtys.length && !this.data.bkcumtys){
        this.data.bkcumtys = cumtys
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //城市选择结果
    communityResult(e) {
      let curData = e.currentTarget.dataset.res;
      !curData ? curData = e.detail.res : ""
      this.triggerEvent('result', {
        code: 1,
        res: curData
      });
    },
    //选择城市
    chooseCity() {
      this.triggerEvent('chooseCity', {
        code: 1,
        res: "in choose community"
      });
    },
    //添加社区
    addCommunity() {
      this.triggerEvent('addCommunity', {
        code: 1,
        res: "in choose community"
      });
    },
    //城市查询变化
    comutyChange(e) {
      let k = e.detail.value ? e.detail.value : "";
      k = k.trim().toUpperCase(); // trim 去除字符串的首尾空格  -  toUpperCase字符串转换为大写
      let res = [];
      switch (k.length) {
        case 0:
          this.setData({
            cumtys: this.data.bkcumtys
          })
          res = this.data.bkcumtys.filter(item => item.id == k)
          if (res && res.length) {
            this.setData({
              cumtys: res
            })
          } else {
            this.filterByKey('name', k)
            
          }
          break;
        case 1:
          res = this.data.bkcumtys.filter(item => item.id == k)
          if (res && res.length) {
            this.setData({
              cumtys: res
            })
          } else {
            this.filterByKey('name', k)
        
          }
          break;
        default:
          let ck = false
          k.split('').every(item => {
            if (this.data.keys.indexOf(item) < 0) {
              ck = true;
              return false
            }
          })
          if (ck) { 
            this.filterByKey('name', k)

          } else { 
            this.filterByKey('pinyin', k)
          }
          break;
      }
    },
    //过滤
    filterByKey(key, k) {
      this.data.cumtys = JSON.parse(JSON.stringify(this.data.bkcumtys));
      let res = this.data.cumtys.filter(item => {
        let matched = false
        item.child = item.child.filter(sub => {
          if (sub[key] && sub[key].indexOf(k) >= 0) {
            matched = true
            return true
          } else {
            return false
          }
        })
        if (matched) {
          return true;
        } else {
          return false
        }
      })
      if(res == "") {
        wx.showToast({
            icon: "none",
            title: "暂无搜索结果",
        })
      }
      this.setData({
        cumtys: res
      });
    }
  }
})