// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formatData:{
      formatName:"",
      remarks:"",
      row:1,
      col:1,
      widthArray:[60],

      table: [
        [""]
      ],

      radioGroupQuestion:[],
      radioGroup:[],
      checkGroupQuestion:[],
      checkGroup:[],
      longTextQuestion:[],
      longText:[],
      theMaxLengthOfLongText:[]
    }
  },
test:function(){
  console.log("YYYY")
},
sync:function(){
  const childInstance = this.selectComponent('#table');
  console.log("同步完毕")
  this.setData({
    formatData:{
      ...this.data.formatData,
      ...childInstance.data.formatData
    }
  })

},
create:function(){
  const childInstance = this.selectComponent('#table');
  childInstance. createLongText()

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

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

  },

})