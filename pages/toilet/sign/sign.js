// pages/home/index/index.js
var app = getApp();
Page({
  onReady: function () {
    this.getThemeData();
  },
  details() {
    wx.navigateTo({
      url: '../../toilet/details/details',
    })
  },
}) 