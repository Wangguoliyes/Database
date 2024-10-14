// pages/format/format.js
Page({

  
  data: {
    totalNumber:0,
    manage:false,
    needDelete:[],
    formatData:[],
    page:0,
    hasMore:true,
    formatTime:[]
  },

  
  getFormatInfomation:function(e){
    const db = wx.cloud.database();
    const collection = db.collection('format');
    collection.count().then(res=>{
  
      this.setData({
        totalNumber:res.total
      })
    })
    

    if(this.data.hasMore){
    collection.orderBy('createTime', 'desc').skip(this.data.page*10).limit(10).field({
      formatData:{
        remarks:true
      },
 
      formatName:true,
      createTime:true,
   
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
  },()=>{
    this.getFormatInfomation()
  });

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
  console.log("goToFormatInfo")
  const formatName=e.currentTarget.dataset.name
  const tempId=e.currentTarget.dataset.id
  if(this.data.manage==false){
    
     console.log(e)
     wx.navigateTo({
      url:`../formatDetailInfomation/formatDetailInfomation?formatName=${formatName}`
    })
    }
    else{
      const tempNeedDelete=this.data.needDelete
      let index=tempNeedDelete.indexOf(tempId)
      if(index==-1){
      tempNeedDelete.push(tempId)
      }
      else{
        tempNeedDelete.splice(index,1)
      }
      this.setData({
        needDelete:tempNeedDelete
      })
    }

},

manageTap:function(e){
  console.log("manageTap")
  let tempManage=this.data.manage
  let tempNeedDelete=[]
  if(tempManage==false){
    tempManage=true
  }
  else{
    tempManage=false
  }
this.setData({
  manage:tempManage,
  needDelete:tempNeedDelete
})


},

deleteTap:function(e){

  if(this.data.manage==false){
    return
  }
  else{
    wx.showModal({
      title: '确认操作', // 标题
      content: '你确定要执行这个操作吗？', // 内容
      success: res=> {
        if (res.confirm) {
          const db = wx.cloud.database();
          const collection = db.collection('format');
          const tasks = this.data.needDelete.map(tempId => 
          collection.doc(tempId).remove());
          wx.showToast({
            title: '删除中',
            duration:1
          })

          setTimeout(()=>{
            this.setData({
              needDelete: []
            });
          },500)
          
          setTimeout(()=>{
            this.onPullDownRefresh()
          },500)

       

        } else if (res.cancel) {
          console.log('用户点击取消');
          // 用户点击取消后的回调
        }
      }
    });



   
   

 

  }
}

 
})