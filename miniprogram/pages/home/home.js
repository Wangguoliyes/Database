// pages/home/home.js
Page({

  data: {
    totalFormat:0,
    totalData:0,
    newData:0,
    newDayData:0
 },
 onLoad(){
  
  const db = wx.cloud.database();
  const collectionFormat = db.collection('format');
  const collectionData = db.collection('data');
  const today = new Date();  // 当前时间
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // 今天 00:00:00
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59); // 今天 23:59:59
  const _ = db.command;      

  collectionData.where({
    formatData:{
      readed:false
    }
  }).count().then(res=>{
    this.setData({
      newData:res.total
    })
  })

  collectionData.where({
      createTime: _.gte(startOfDay).and(_.lte(endOfDay)) 

  }).count().then(res=>{
    this.setData({
      newDayData:res.total
    })
  })




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
 onPullDownRefresh:function(){
  wx.showToast({
    title: '重新加载中',
    icon:"loading",
    duration: 500
  })
  this.setData({
    totalFormat:0,
    totalData:0,
    newData:0
  },()=>{
    this.onLoad()
  });

  wx.stopPullDownRefresh()
},

})













