// pages/home/index/index.js
var app = getApp();
Page({
  onReady: function () {
    this.getThemeData();
  },
  translate: function () {
    this.setData({
      isRuleTrue: true
    })
    this.animation.translate(-245, 0).step()
    this.setData({ animation: this.animation.export() })
  },

  success: function () {
    this.setData({
      isRuleTrue: false
    })
    this.animation.translate(0, 0).step()
    this.setData({ animation: this.animation.export() })
  },
  tryDriver: function () {
    this.setData({
      background: "#89dcf8"
    })
  },
  details() {
    this.switchRegTip()
    wx.navigateTo({
      url: '../../toilet/details/details',
    })
  },
})