// pages/LookMessage/LookMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

   formatData:{},

  },

  

  onLoad(options) {
  const tempid=options.id
  const db = wx.cloud.database();
  const collection = db.collection('data');
  collection.where({
    _id:tempid
  }).get({
    success:res=>{
      this.setData({
        formatData:{
          ...res.data[0].formatData},
      },()=>{
        this.refreshComponentData()
      })

      
    },
    fail:err=>{
      wx.showToast({
        title: '读取数据失败',
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
        value:this.data.formatData.radioValue,
        formatData: tempformatData
      });
    }

    const checkTable = this.selectComponent('#checkTable'); // 假设 table 组件的 id 为 "tableComponent"
    if (checkTable) {
      console.log("checkTable is get",this.data.formatData.checkValue)
      checkTable.setData({
        value:this.data.formatData.checkValue,
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
   


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onPullDownRefresh(){
   
  },
  nameInput(e){
    const tempName = e.detail.value
    // console.log(e.detail.value)
    this.setData({
      nickName:tempName
    })
  },
  
   
})