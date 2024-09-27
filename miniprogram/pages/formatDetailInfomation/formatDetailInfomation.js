// pages/formatDetailInfomation/formatDetailInfomation.js
Page({

  data: {
    formatName:"",
    formatData:{},
    // messageName:"",
    // messageRemarks:""
  },

  onLoad(options) {
    this.setData({
      formatName:options.formatName
    })
    const db = wx.cloud.database();
    const collection = db.collection('format');
    collection.where({
      formatName:this.data.formatName
    }).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          formatData:res.data[0]
        })
       
      },
      fail:res=>{
        wx.showToast({
          title: '未找到数据',
          icon:'error'
        })
      }

    })
  },
//   messageNameInput:function(e){
//     this.setData({
//       messageName:e.detail.value
//     })
//   },
//   messageRemarksInput:function(e){
//     this.setData({
//       messageRemarks:e.detail.value
//     })
//   },
//   transformToMessage:function(e){
// const tempFormatName = this.data.formatName
// const tempMessageName= this.data.messageName
// const tempMessageRemarks=this.data.messageRemarks

// if(tempMessageName.length==0){
//   wx.showToast({
//     title: '文档名字不能为空',
//     icon:"error"
//   })
//   return 
// }
// const db = wx.cloud.database();
// const collection = db.collection('data');
// collection.where({
//   messageName: tempMessageName
// }).get().then(res=>{
// if(res.data.length>0){
// wx.showToast({
//   title: '文档名字冲突',
//   icon:"error"
// })
// }
// else{
//   wx.navigateTo({
//     url:`../LookMessage/LookMessage?formatName=${tempFormatName}&messageName=${tempMessageName}&messageRemarks=${tempMessageRemarks}`
//   })
// }

// })

   

//   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const pages = getCurrentPages();
    const formatName=this.data.formatName
    return {
      title: '填写表格',
      path:`pages/LookMessage/LookMessage?formatName=${formatName}`,
    }
  }
})