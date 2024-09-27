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
    const collection = db.collection('format');
    if(this.data.hasMore){
    collection.orderBy('createTime', 'desc').skip(this.data.page*10).limit(10).field({
      formatName:true,
      createTime:true,
      remarks:true
    }).get({
      success:res=>{
        console.log(res)
        if(res.data.length<10){
          this.data.hasMore=false
        }
        this.data.page+=1
        for(let i=0;i<res.data.length;i++){
          this.data.formatTime.push(res.data[i].createTime.toLocaleString())
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

  const formatName=e.currentTarget.dataset.name
  
  wx.navigateTo({
    url:`../formatDetailInfomation/formatDetailInfomation?formatName=${formatName}`
  })

}
 
})