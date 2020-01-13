// pages/login/register/register.js
let app = getApp();

Component({
  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    mobileTip: "", //""
    pwd: "",
    pwdTip: "",
    encrip: true,
  },

  methods: {
    onLoad: function (options) {

    },
    //更改密码是否可见
    changePwdEncrip() {
      this.setData({
        encrip: !this.data.encrip
      })
    },
    checkPhoneNumber() {
      if (!(/^1[345789]\d{9}$/.test(this.data.mobile))) {
        this.setData({
          mobileTip: 1
        })
      }
    },
    bindKeyMobile: function (e) {
      this.setData({
        mobileTip: "",
        errorMsg: "",
        mobile: e.detail.value
      })
    },
    bindKeyPwd: function (e) {
      this.setData({
        pwdTip: "",
        pwd: e.detail.value
      })
    },

    appLogin() { //注册/登录操作，登录成功后进首页
      // if (this.data.mobileTip) {
      //   return false;
      // }
      // if (!this.data.pwd) {
      //   this.setData({
      //     pwdTip: "请输入密码"
      //   })
      // }
      // var vm = this;
      // if (this.data.mobile && this.data.pwd) {
      //   var param = {
      //     mobile: vm.data.mobile,
      //     password: vm.data.pwd
      //   }
      //   var loginUrl = "/api/client/login/password";
      //   if (app.globalData.userInfo.unionId) {
      //     loginUrl = "/api/client/captcha/joinWx"
      //     param.unionId = app.globalData.userInfo.unionId,
      //       param.avatar = app.globalData.userInfo.avatarUrl,
      //       param.gender = app.globalData.userInfo.gender,
      //       param.nickname = app.globalData.userInfo.nickName
      //   } else {
      //     param.unionId = app.globalData.userInfo.unionId,
      //       param.avatar = app.globalData.userInfo.avatar || app.globalData.userInfo.avatarUrl,
      //       param.nickname = app.globalData.userInfo.nickname || app.globalData.userInfo.nickName
      //   }
        // app.req(loginUrl, param).then(res => {
        //   if (res.data.code == 0) {
        //     app.globalData.userInfo = res.data.data.userInfo
        //     wx.setStorageSync('user-info', res.data.data.userInfo)
        //     wx.setStorageSync('qj-token', res.data.data.token)
        //     app.globalData.token = res.data.data.token
            wx.switchTab({
              url: '../../home/index/index'
            })
          // } else {
          //   this.setData({
          //     errorMsg: res.data.msg
          //   })
          // }
        // })
      
    },
    switchRegTip() {
      this.setData({
        regTip: !this.data.regTip // 未注册提示
      })
    },
    loginin() {
      this.switchRegTip()
      wx.navigateTo({
        url: '../home/index/index',
      })
    },
    //显示隐私政策
    showDocDetail: function (e) {
      var tp = e.currentTarget.dataset.tp
      if (tp == 1) {
        wx.navigateTo({
          url: '/pages/info/userAgreement/userAgreement',
        })
      } else if (tp == 2) {
        wx.navigateTo({
          url: '/pages/info/secrecy/secrecy'
        })
      }
    },

  },
})
