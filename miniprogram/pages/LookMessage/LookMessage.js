// pages/LookMessage/LookMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   formatName:"",
   formatData:{},
   nickName:"",
   readed:false
  },

  submit:function(e){
    const db = wx.cloud.database();
    const collection = db.collection('data');
    const tempformatName=this.data.formatName
    const tempFormatData=this.data.formatData
    const tempNickName=this.data.nickName
    const tempDate=new Date()
    const tempReaded=this.data.readed
    collection.add({
      data:{
        formatName:tempformatName,
        formatData:tempFormatData,
        createDate:tempDate,
        nickName:tempNickName,
        readed:tempReaded
      },
      success:res=>{
        wx.showToast({
          title: '提交成功',
          icon:'success'
        })
      },
      fail:err=>{
        wx.showToast({
          title: '提交失败',
          icon:'error'
        })

      }

    })


  },

  onLoad(options) {
  const tempFormatName=options.formatName
  this.setData({
    formatName:tempFormatName
  })
  const db = wx.cloud.database();
  const collection = db.collection('format');
  collection.where({
    formatName:tempFormatName
  }).get({
    success:res=>{
      this.setData({
        formatData:res.data[0],
      })


      const temoCol=this.data.formatData.col
      const tempRow=this.data.formatData.row
      const tempTable=this.data.formatData.table
   
      const tempWritten = Array.from({ length: tempRow }, () => Array(temoCol).fill(false))
      
      for( let i =0;i<tempRow;i++ ){
        for( let j =0;j<temoCol;j++ ){
            if(tempTable[i][j].length!=0){
              tempWritten[i][j]=true
            }
        }
      }
     
      
    
      const  tempRadioValue=new Array(this.data.formatData.radioGroup.length)
      for(let i=0;i<this.data.formatData.radioGroup.length;i++){
        tempRadioValue[i]=-1
      }

      const  tempCheckValue=new Array(this.data.formatData.checkGroup.length)
     
   
    
      this.setData({
        formatData:{
          ...this.data.formatData,
          written:tempWritten,
          radioValue:tempRadioValue,
          checkValue: tempCheckValue
        }
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
  LengthOfRow:function(value){
    const baseWidth = 70; // 假设每个字符的宽度
    const padding =30 ; // 内边距
    return baseWidth  + padding* value; 
  },
  onInputChange: function (e) {
    const widthArray=this.data.formatData.widthArray
    const row= e.currentTarget.dataset.row
    const col = e.currentTarget.dataset.col
    const value = e.detail.value
    const table = this.data.formatData.table
    table[row][col]=value

    let maxLengthOfRow=this.LengthOfRow(table[row][0].length)
   
    for(let i=1;i<this.data.formatData.col;i++){
      let temp = this.LengthOfRow(this.data.formatData.table[row][i].length)
     
      if(maxLengthOfRow<temp){
        maxLengthOfRow=this.LengthOfRow(table[row][i].length)
      }
    }
    widthArray[row]= maxLengthOfRow
  
    this.setData({
      formatData:{
        ...this.data.formatData,
        table:table,
        widthArray:widthArray
      }
    })
  },
  onRadioChange:function(e){
    
    const tempRadioValue = this.data.formatData.radioValue
    tempRadioValue[e.currentTarget.dataset.index]=e.detail.value
    this.setData({
      radioValue:tempRadioValue
    })

  },
  onCheckChange:function(e){
    console.log(e.detail.value)
    const tempCheckValue = this.data.formatData.checkValue
    tempCheckValue[e.currentTarget.dataset.index]=e.detail.value
    this.setData({
      checkValue:tempCheckValue
    })

  },
  longTextInput:function(e){
    const tempIndex= e.currentTarget.dataset.index
    const tempLongText = this.data.formatData.longText
    tempLongText[tempIndex]=e.detail.value
    this.setData({
      formatData:{
        ...this.data.formatData,
        longText:tempLongText
      }
    
    })


  },

  nickNameInput:function(e){
  
    const tempValue=e.detail.value
   
    this.setData({
      nickName:tempValue
    })
  }
})