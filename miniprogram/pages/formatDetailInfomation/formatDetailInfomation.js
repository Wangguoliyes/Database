// pages/formatDetailInfomation/formatDetailInfomation.js
Page({

  data: {
    formatName:"",
    formatData: {
        checkGroup:[],
        checkGroupQuestion:[],
        col:0,
        formatName:"",
        table:[],
        widthArray:[],
        row:0,
 
    }

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
         console.log("RES",res)
        this.setData({
          formatData:{
              ...res.data[0].formatData
          }
        },
        ()=>{
          wx.nextTick(() => {
            this.refreshComponentData();
          });
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

  refreshComponentData() {
    const tempformatData = this.data.formatData;
    const table = this.selectComponent('#table'); // 假设 table 组件的 id 为 "tableComponent"
    if (table) {
      // console.log("table is get")
      table.setData({
        formatData: tempformatData
      });
    }

    const radioTable = this.selectComponent('#radioTable'); // 假设 table 组件的 id 为 "tableComponent"
    if (radioTable) {
      // console.log("radioTable is get")
      radioTable.setData({
        formatData: tempformatData
      });
    }

    const checkTable = this.selectComponent('#checkTable'); // 假设 table 组件的 id 为 "tableComponent"
    if (checkTable) {
      // console.log("checkTable is get")
      checkTable.setData({
        formatData: tempformatData
      });
    }
   


    const  longText = this.selectComponent('#longText'); // 假设 table 组件的 id 为 "tableComponent"
    if (longText) {
      // console.log(" longText is get")
      longText.setData({
        formatData: tempformatData
      });
    }


  },

  onReady() {

  },


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
  },

  changeFormatBasedOnTheFormat:function(e){
    const tempName=this.data.formatName
    wx.navigateTo({
      url:`../createFormat/createFormat?data=${tempName}`
    })
  },
  lookForTheRelavantMessage:function(e){
    const tempName=this.data.formatName
    wx.navigateTo({
      url:`../specialMessage/specialMessage?data=${tempName}&type=all`
    })
  }
})