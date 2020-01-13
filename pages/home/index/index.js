// pages/home/index/index.js
var app = getApp();
Page({

  data: {
    userInfo: {
      //用户头像
      userImg: "",
      //用户名
      userName: "",
      //等级
      myGrade: 0,
      //微积分
      myCalculus: 0,
      //账号
      account: "",
      //电话
      phone: "",
      // realName
      realName: ""
    },
    //功能
    funBtns: [{
      name: "车位管理",
      img: "../../../image/home/home_mine_chewei.png",
      navUrl: "../../car/carPlace/placeIndex/placeIndex"
    },
    {
      name: "车辆管理",
      img: "../../../image/home/home_mine_cheliang.png",
      navUrl: "../../car/carManager/carIndex/carIndex"
    },
    {
      name: "千迹微积分",
      img: "../../../image/home/home_mine_jifen.png",
      navUrl: "../../wallet/pointsMain/pointsMain"
    },
    {
      name: "千迹权益",
      img: "../../../image/home/home_mine_huiyuan.png",
      navUrl: "../../wallet/memberBenifits/memberBenifits"
    },
    {
      name: "千迹信誉",
      img: "../../../image/home/home_mine_xinyu.png",
      navUrl: "../../wallet/credit/credit"
    },
    {
      name: "收货地址",
      img: "../../../image/home/home_mine_dizhi.png",
      navUrl: "../../shop/address/address"
    },
    {
      name: "帮助中心",
      img: "../../../image/home/home_mine_bangzhu.png",
      navUrl: "../../info/helpCenter/helpCenter"
    },
    {
      name: "关于我们",
      img: "../../../image/home/home_mine_about.png",
      navUrl: "../../"
    },
    ],
    //未注册提示注册
    regTip: false,
  },
  onReady: function () {
    this.getThemeData();
  },
  onShow: function () {
    app.setTabBar(3);
    app.checkNotice()
    if (!app.globalData.token) {
      this.switchRegTip()
    }

    app.getUser(() => {
      if (app.globalData.userInfo != null) {
        let phone = app.globalData.userInfo.mobile
        let tel = phone.substr(0, 3) + '****' + phone.substr(7, 11);

        this.setData({
          userInfo: {
            userImg: app.globalData.userInfo.avatar,
            userName: app.globalData.userInfo.nickname,
            realName: app.globalData.userInfo.realName,
            myGrade: app.globalData.userInfo.grade || 0,
            myCalculus: app.globalData.userInfo.calculusBalance || 0,
            account: app.globalData.userInfo.qjAccount || "",
            phone: tel || "",
          }
        })


      }
    })
  },
  switchRegTip() {
    this.setData({
      regTip: !this.data.regTip // 未注册提示
    })
  },
  navRegPage() {
    this.switchRegTip()
    wx.navigateTo({
      url: '../../login/register/register',
    })
  },
  navLoginPage() {
    this.switchRegTip()
    wx.navigateTo({
      url: '../../login/loginForm/loginForm',
    })
  },
  toiletrecord() {
    this.switchRegTip()
    wx.navigateTo({
      url: '../../toilet/records/records',
    })
  },
  toiletsign() {
    this.switchRegTip()
    wx.navigateTo({
      url: '../../toilet/sign/sign',
    })
  },
  toiletcheck() {
    this.switchRegTip()
    wx.navigateTo({
      url: '../../toilet/check/check',
    })
  },
  toiletinspect() {
    this.switchRegTip()
    wx.navigateTo({
      url: '../../toilet/inspect/inspect',
    })
  },
  //导航
  navByUrl(e) {
    var item = e.currentTarget.dataset.item;
    if (item.name == "千迹信誉") {
      wx.showToast({
        icon: 'none',
        title: '您的千迹信誉暂未生成',
      })
      return false
    }
    if (item.name == "帮助中心" || item.name == "关于我们") {
      wx.navigateTo({
        url: item.navUrl,
      })
    } else {
      if (app.globalData.token) {
        wx.navigateTo({
          url: item.navUrl,
        })
      } else {
        this.switchRegTip()
      }
    }

  },
  //优惠卷
  navCoupon() {
    if (app.globalData.token) {
      wx.navigateTo({
        url: '../../wallet/coupon/coupon',
      })
    } else {
      this.switchRegTip()
    }
  },
  //代金卷
  navVoucher() {
    if (app.globalData.token) {
      wx.navigateTo({
        url: '../../wallet/voucher/voucher',
      })
    } else {
      this.switchRegTip()
    }
  },
  //我的订单
  navMyOrder() {
    if (app.globalData.token) {
      wx.navigateTo({
        url: '../../wallet/myOrder/myOrder',
      })
    } else {
      this.switchRegTip()
    }
  },
  //关于我们
  navInfo() {
    wx.navigateTo({
      url: '../../info/secrecy/secrecy',
    })
  },
  //个人信息
  navPersonalInfo() {
    if (app.globalData.token) {
      wx.navigateTo({
        url: '../../info/personalInfo/personalInfo?recKey=userInfo.userImg',
      })
    } else {
      this.switchRegTip()
    }

  },
  //设置动态样式
  getThemeData() {
    let pages = getCurrentPages()
    let url = pages[pages.length - 1].route
    this.setData({
      dySty: app.globalData.themeData[url],
      scnHt: app.globalData.screenHeight
    })
  },
  //Etc页面
  navEtc(e) {
    wx.navigateTo({
      url: '../../shop/aodi/aodi',
    })
  },
})