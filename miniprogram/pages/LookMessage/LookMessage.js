// pages/LookMessage/LookMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   formatName:"",
   formatData:{},
   nickName:"",
   readed:false,
   written:[],
   radioValue:[],
   checkValue: []

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
        formatData:{
          ...res.data[0].formatData},
      },()=>{
        this.create()
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

  create(){
    const tempCol=this.data.formatData.col
    const tempRow=this.data.formatData.row
    const tempTable=this.data.formatData.table
    console.log("table ",tempTable)
    console.log("tableCol ",tempCol)
    console.log("tableRow ",tempRow)
     const tempWritten = Array.from({ length: tempCol }, () => Array(tempRow).fill("true"))
    
    for( let i =0;i<tempCol;i++ ){
      for( let j =0;j<tempRow;j++ ){
          if(tempTable[i][j].length!=0){
            tempWritten[i][j]="false"
          }
      }
    }
    console.log("tempWritten ", tempWritten)
    
  
     const  tempRadioValue=new Array(this.data.formatData.radioGroup.length)
     for(let i=0;i<this.data.formatData.radioGroup.length;i++){
       tempRadioValue[i]=-1
     }

    const  tempCheckValue=new Array(this.data.formatData.checkGroup.length)
   
 
  
    this.setData({
      written:tempWritten,
      radioValue:tempRadioValue,
      checkValue: tempCheckValue
    },()=>{
      this.refreshComponentData()
    })
  },

  refreshComponentData() {
    const tempformatData = this.data.formatData;
    const table = this.selectComponent('#table'); // 假设 table 组件的 id 为 "tableComponent"
    if (table) {
      // console.log("table is get")
      table.setData({
        editableArray:this.data.written,
        formatData: tempformatData
      });
    }

    const radioTable = this.selectComponent('#radioTable'); // 假设 table 组件的 id 为 "tableComponent"
    if (radioTable) {
      // console.log("radioTable is get")
      radioTable.setData({
        value:this.data.radioValue,
        formatData: tempformatData
      });
    }

    const checkTable = this.selectComponent('#checkTable'); // 假设 table 组件的 id 为 "tableComponent"
    if (checkTable) {
      // console.log("checkTable is get")
      checkTable.setData({
        value:this.data.checkValue,
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
  Click(){

    const db = wx.cloud.database();
    const collection = db.collection('data');
    const childTable= this.selectComponent('#table');
    const childRadioTable= this.selectComponent('#radioTable');
    const childCheckTable= this.selectComponent('#checkTable');
    const childLongText= this.selectComponent('#longText');
const tempTime = new Date()
  this.setData({
            formatData:{
              ...this.data.formatData,
              nickName:this.data.nickName,
              row:childTable.data.formatData.row,
              col:childTable.data.formatData.col,
              table:childTable.data.formatData.table,
              widthArray:childTable.data.formatData.widthArray,
              radioGroup:childRadioTable.data.formatData.radioGroup,
              radioGroupQuestion:childRadioTable.data.formatData.radioGroupQuestion,
              radioValue:childRadioTable.data.value,
              checkGroup:childCheckTable.data.formatData.checkGroup,
              checkGroupQuestion:childCheckTable.data.formatData.checkGroupQuestion,
              checkValue:childCheckTable.data.value,
              longText:childLongText.data.formatData.longText,
              longTextQuestion:childLongText.data.formatData.longTextQuestion,
              theMaxLengthOfLongText:childLongText.data.formatData.theMaxLengthOfLongText,
            create:tempTime
            }
          },
          ()=>{
            collection.add({
              data: {
                createTime:tempTime,
                formatData:this.data.formatData
              },
              success: function(res) {
                wx.showToast({
                  title: '提交成功',
                  icon:"success"
                })
                console.log(res)
              },
              fail: function(err) {
                wx.showToast({
                  title: '提交失败',
                  icon:"error"
                })
                console.log(res)
              }
            })
          })

   
    
     
       
       

      
         

      }


   
})