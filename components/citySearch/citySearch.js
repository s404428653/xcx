// components/citySearch/citySearch.js
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
    citys: { //列表数据
      type: Array,
      value: []
    },
    curCity: {
      type: Object,
      value: {}
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
    key: "A",
    scrollHg: "100%",
    //城市列表
    citys: [],
    //备份
    bkCitys: []
  },
  lifetimes: {
    attached: function() {
      app.req("/api/operatingcity/list", {}, "get").then(res => {
        if (res.data && res.data.code == 0) {
          let datas = res.data.data;
          this.data.keys.map(k => {
            let ra = datas.filter(item => item.firstChar.toUpperCase() == k)
            this.data.citys = this.data.citys.concat({
              id: k,
              child: ra
            })
          })
          this.setData({
            citys: this.data.citys,
            bkCitys: this.data.citys
          })
        }
      }).catch(e => {
        console.log(e)
      })
    }
  },
  ready: function() {
    const query = this.createSelectorQuery()
    query.select('#top-box').boundingClientRect()
    query.exec(res => {
      let th = res[0].height
      this.setData({
        scrollHg: this.data.hg - th + "px"
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //选择城市
    cityResult(e) {
      this.setData({
        curArea: e.detail.res
      })
      this.triggerEvent('result', {
        code: 1,
        res: e.detail.res
      });
    },

    //城市查询变化
    cityChange(e) {
      let k = e.detail.value ? e.detail.value : "";
      k = k.trim().toUpperCase();
      let res = [];
      switch (k.length) {
        case 0:
          this.setData({
            citys: this.data.bkCitys
          })
          break;
        case 1:
          res = this.data.bkCitys.filter(item => item.id == k)
          if (res && res.length) {
            this.setData({
              citys: res
            })
          } else {
            this.filterByKey('shortname', k)
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
          if (ck) { //
            this.filterByKey('shortname', k)
          } else { //
            this.filterByKey('pinyin', k)
          }
          break;
      }
    },
    //过滤
    filterByKey(key, k) {
      this.data.citys = JSON.parse(JSON.stringify(this.data.bkCitys));
      let res = this.data.citys.filter(item => {
        let matched = false
        item.child = item.child.filter(sub => {
          if (sub[key].indexOf(k) >= 0) {
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
      this.setData({
        citys: res
      });
    }
  }
})