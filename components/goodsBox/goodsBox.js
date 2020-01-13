// components/goodsBox/goodsBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object
    },
    wd: {
      type: String,
      value: "320rpx;"
    },
    hg: {
      type: String,
      value: "420rpx;"
    },
    tagImg: {
      type: String,
      value: "../../image/components/icon_shop_miaosha.png"
    },
    tagTxt: {
      type: String,
      value: "秒杀",
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
    //点击图片进入商品详情页
    navDetail(e){
      let curData = e.currentTarget.dataset.id;
      this.triggerEvent('navDetail', {
        code: 1,
        res: curData
      });
    },
    //加入购物车
    addShopCar(e){
      let curData = e.currentTarget.dataset.id;
      this.triggerEvent('addShopCar', {
        code: 1,
        res: curData
      });
    }
  }
})