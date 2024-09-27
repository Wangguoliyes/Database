// pages/home/home.js
Page({

  data: {

 },
 createFormat:function(){
  wx.navigateTo({
    url:`../createFormat/createFormat`
  })
 },

 unReadMessage:function(){
  wx.navigateTo({
    url: '../specialMessage/specialMessage?type=unread' // 替换为你要跳转的 tabBar 页面路径
  });
 },

 readMessage:function(){
  wx.navigateTo({
    url: '../specialMessage/specialMessage?type=read' // 替换为你要跳转的 tabBar 页面路径
  });
 },


})













