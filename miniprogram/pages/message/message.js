// pages/format/format.js
Page({

  
  data: {
    formatData:[],
    page:0,
    hasMore:true,
    formatTime:[]
  },

  getFormatInfomation:function(e){
    const db = wx.cloud.database();
    const collection = db.collection('data');
    if(this.data.hasMore){
    collection.orderBy('createDate', 'desc').skip(this.data.page*10).limit(10).field({
      formatName:true,
      createDate:true,
      _id:true,
      nickName:true
    }).get({
      success:res=>{
        console.log(res)
        if(res.data.length<10){
          this.data.hasMore=false
        }
        this.data.page+=1
        for(let i=0;i<res.data.length;i++){
          this.data.formatTime.push(res.data[i].createDate.toLocaleString())
        }

        this.setData({
          formatTime:this.data.formatTime,
          hasMore:this.data.hasMore,
          page:this.data.page,
          formatData:[...this.data.formatData,...res.data]
        })
      },
      fail:err=>{
        wx.showToast({
          title: '获取数据失败',
          icon:'error',
          duration: 500
        })
      }
    })
  }
  else{
    wx.showToast({
      title: '没有更多数据了',
      icon:"none",
      duration: 500
    })
  }



  },

  onLoad(options) {
    this.getFormatInfomation()
   
  },



  onReady() {
  
  },

onPullDownRefresh:function(){
  wx.showToast({
    title: '重新加载中',
    icon:"loading",
    duration: 500
  })
  this.setData({
    formatData:[],
    page:0,
    hasMore:true,
    formatTime:[]
  });
  this.getFormatInfomation()
  wx.stopPullDownRefresh()
},

onReachBottom:function(){
  wx.showToast({
    title: '加载中',
    icon:"loading",
    duration: 500
  })
  this.getFormatInfomation()
},
goToFormatInfo:function(e){
   const tempId=e.currentTarget.dataset.id
   console.log(e)
   wx.navigateTo({
    url:`../messageDetailInfomation/messageDetailInfomation?id=${tempId}`
   })
}
 
})