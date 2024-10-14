Page({
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
    },
 
  },

onLoad(options){

if(options.data){
  console.log("with name")
  const db = wx.cloud.database();
  const collection = db.collection('format');
  collection.where({
    formatName:options.data
  }).get({
    success:res=>{
     console.log(res)
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

}
else{
  this.refreshComponentData();
}
},
onShow(options){
  this.refreshComponentData();
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

  onInput:function(e){
    console.log(e)
    const name = e.currentTarget.dataset.name
    this.setData({
      formatData:{
        ...this.data.formatData,
        [name]:e.detail.value
      }
    })
  },


  addRow: function () {
    const myTable= this.selectComponent('#table');
    myTable.addRow()
   
  },
  addCol: function () {
    const myTable= this.selectComponent('#table');
    myTable.addCol()
    

  },
  removeRow: function () {
    const myTable= this.selectComponent('#table');
    myTable.removeRow()
  
  },
  removeCol: function () {
    const myTable= this.selectComponent('#table');
    myTable.removeCol()
    
  },


createRadioTable:function (e){
  const myRadioTable= this.selectComponent('#radioTable');
  myRadioTable.createRadioTable()
 
  
  
},
removeRadioTable:function (e){
  const myRadioTable= this.selectComponent('#radioTable');
  myRadioTable.removeRadioTable()
},



createCheckTable:function (e){
  const myCheckTable= this.selectComponent('#checkTable');
  myCheckTable.createCheckTable()
},
removeCheckTable:function (e){
  const myCheckTable= this.selectComponent('#checkTable');
  myCheckTable.removeCheckTable()
},





    createLongText:function(e){
      const myLongText= this.selectComponent('#longText');
      myLongText.createLongText()
    },
    removeLongText:function(e){
      const myLongText= this.selectComponent('#longText');
      myLongText.removeLongText()
     

    },
  

    saveToFormat:function(e){
  
      if(this.data.formatData.formatName==''||this.data.formatData.formatName==null){
        wx.showToast({
          title: '模版名字为空',
          icon:'error'
        });
        return
      }



      const db = wx.cloud.database();
      const collection = db.collection('format');
      const theFormatName=this.data.formatData.formatName

      collection.where({
        formatName: theFormatName
      }).get().then(res=>{
        console.log(res)
        if(res.data.length>0){
          wx.showToast({
            title: '模版名字冲突',
            icon:'error'
          });
          console.log("NAME IS WRONG")
          return
        }
        else{
          console.log("YES SAVE IS LEGAL")
          const childTable= this.selectComponent('#table');
          const childRadioTable= this.selectComponent('#radioTable');
          const childCheckTable= this.selectComponent('#checkTable');
          const childLongText= this.selectComponent('#longText');
          console.log("YES" , childTable.data.formatData)
          this.setData({
            formatData:{
              ...this.data.formatData,
              row:childTable.data.formatData.row,
              col:childTable.data.formatData.col,
              table:childTable.data.formatData.table,
              widthArray:childTable.data.formatData.widthArray,
              radioGroup:childRadioTable.data.formatData.radioGroup,
              radioGroupQuestion:childRadioTable.data.formatData.radioGroupQuestion,
              checkGroup:childCheckTable.data.formatData.checkGroup,
              checkGroupQuestion:childCheckTable.data.formatData.checkGroupQuestion,
              longText:childLongText.data.formatData.longText,
              longTextQuestion:childLongText.data.formatData.longTextQuestion,
              theMaxLengthOfLongText:childLongText.data.formatData.theMaxLengthOfLongText
            }
          })

          wx.showToast({
            title: '保存中!!', // 提示用户保存成功
            icon: 'none',
            duration:1000
          });

          setTimeout( ()=>{collection.add({
            data:{
              formatName:this.data.formatData.formatName,
              formatData:this.data.formatData,
              createTime:new Date()
            },
            success:res=>{
              console.log('数据保存成功', res);
              wx.showToast({
                title: '保存成功', // 提示用户保存成功
                icon: 'success'
              });
            },
            fail: err => {
              console.error('数据保存失败:', err);
              wx.showToast({
                title: '保存失败', // 提示用户保存失败
                icon: 'none'
              });
            }
    
          })}, 1000);

         


        }
      }).catch(err => {
        console.error('查询失败:', err);
      })

     

    }
})


