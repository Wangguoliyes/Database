// pages/home/home.js
Page({

  data: {
    totalFormat:0,
    totalData:0,
    newData:0
 },
 onLoad(){
  
  const db = wx.cloud.database();
  const collectionFormat = db.collection('format');
  const collectionData = db.collection('data');
  collectionFormat.count().then(res=>{
    this.setData({
      totalFormat:res.total
    })
  })
  collectionData.count().then(res=>{
    this.setData({
      totalData:res.total
    })
  })


 },
 Click_createFormat:function(){
  wx.navigateTo({
    url:`../createFormat/createFormat`
  })
 },
 Click_checkUnread:function(){
  wx.navigateTo({
    url: '../specialMessage/specialMessage?type=unread' // 替换为你要跳转的 tabBar 页面路径
  });
 },

 Click_checkRead:function(){
  wx.navigateTo({
    url: '../specialMessage/specialMessage?type=read' // 替换为你要跳转的 tabBar 页面路径
  });
 },


})













