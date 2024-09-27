Page({
  data: {
 
    formatName:"",
    remarks:"",


    row:1,
    col:1,
    widthArray:[100],
    // 初始化一个 2x2 的表格
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


  onInput:function(e){
    console.log(e)
    const name = e.currentTarget.dataset.name
    this.setData({
      [name]:e.detail.value
    })
  },
  tableQuestionInput:function(e){
    const tempTableIndex = e.currentTarget.dataset.tableindex
    const tempRadioGroupQuestion=this.data.radioGroupQuestion
    tempRadioGroupQuestion[tempTableIndex]=e.detail.value
    this.setData({
      radioGroupQuestion: tempRadioGroupQuestion
    })
  },
  tableItemInput:function(e){
    console.log(e)
    const tempTableIndex = e.currentTarget.dataset.tableindex
    const tempItemIndex = e.currentTarget.dataset.itemindex
    const tempRadioGroup=this.data.radioGroup
  
    tempRadioGroup[tempTableIndex][tempItemIndex]=e.detail.value
    this.setData({
      radioGroup:tempRadioGroup
    })
  },


  checkQuestionInput:function(e){
    const tempTableIndex = e.currentTarget.dataset.tableindex
    const tempCheckGroupQuestion=this.data.checkGroupQuestion
    tempCheckGroupQuestion[tempTableIndex]=e.detail.value
    this.setData({
      checkGroupQuestion: tempCheckGroupQuestion
    })
  },
  checkItemInput:function(e){
    console.log(e)
    const tempTableIndex = e.currentTarget.dataset.tableindex
    const tempItemIndex = e.currentTarget.dataset.itemindex
    const tempCheckGroup=this.data.checkGroup
  
    tempCheckGroup[tempTableIndex][tempItemIndex]=e.detail.value
    this.setData({
      checkGroup:tempCheckGroup
    })
  },



LengthOfRow:function(value){
  const baseWidth = 70; // 假设每个字符的宽度
  const padding =30 ; // 内边距
  return baseWidth  + padding* value; 
},

deleteTapLeft:function(col){

  const myCol= col.currentTarget.dataset.col;
  console.log(myCol)
  if( this.data.col<=0){
    wx.showToast({
      title: '至少保留一列',
      icon: 'none'
    });
    return 
  }
  
  for(let i =0;i<this.data.row;i++){
    this.data.table[i].splice(myCol,1)
  }
 
 
  this.setData({
    table:this.data.table,
    
    col:this.data.col-1
  })

const tempCol=this.data.col
const tempRow=this.data.row
const tempWidthArray=this.data.widthArray
for(let i =0;i< tempRow;i++){
  let tempMaxLength=0
  for(let j=0;j<tempCol;j++){
    if(tempMaxLength<this.data.table[i][j].length){
      tempMaxLength=this.data.table[i][j].length
    }
    tempWidthArray[i]=this.LengthOfRow(tempMaxLength)
  }

}
this.setData({
 
    widthArray:tempWidthArray
   
  })
 
},

deleteTapUp:function(row){

const myRow= row.currentTarget.dataset.row;

if(this.data.row<=0){
  wx.showToast({
    title: '至少保留一行',
    icon: 'none'
  });
  return 
}

this.data.table.splice(myRow,1)
this.data.widthArray.splice(myRow,1)
this.setData({
  table:this.data.table,
  widthArray:this.data.widthArray,
  row:this.data.row-1
})

},
  // 更新单元格内容
  onInputChange: function (e) {
    const widthArray=this.data.widthArray
    const row= e.currentTarget.dataset.row
    const col = e.currentTarget.dataset.col
    const value = e.detail.value
    const table = this.data.table
    table[row][col]=value

    let maxLengthOfRow=this.LengthOfRow(table[row][0].length)
   
    for(let i=1;i<this.data.col;i++){
      let temp = this.LengthOfRow(this.data.table[row][i].length)
     
      if(maxLengthOfRow<temp){
        maxLengthOfRow=this.LengthOfRow(table[row][i].length)
      }
    }
    widthArray[row]= maxLengthOfRow
  
    this.setData({
      table:table,
      widthArray:widthArray
    })
  },

  // 添加一行
  addRow: function () {
 
    const table = this.data.table;
    const widthArray=this.data.widthArray;
    widthArray.push(70);

    const newRow = new Array(table[0].length).fill("");  // 创建与列数相同的新行
    table.push(newRow);
    this.setData({
      row:this.data.row+1,
      table: table,
      widthArray:widthArray
    })
   
  },

  // 添加一列
  addCol: function () {
  
    const table = this.data.table;

    for (let i = 0; i < table.length; i++) {
      table[i].push("");  // 每一行添加一个空的单元格
    }
    this.setData({
      table: table,
      col:this.data.col+1
    })
   
  },

  // 删除最后一行
  removeRow: function () {

    const table = this.data.table;
    const widthArray=this.data.widthArray;
  
    if (table.length > 1) {
      widthArray.pop();
      table.pop();  // 删除最后一行
      this.setData({
        table: table,
        row:this.data.row-1,
        widthArray:widthArray
      });
    } else {
      wx.showToast({
        title: '至少保留一行',
        icon: 'none'
      });
    }
  
  },

  // 删除最后一列
  removeCol: function () {

    const table = this.data.table;

    if (table[0].length > 1) {
      for (let i = 0; i < table.length; i++) {
        table[i].pop();  // 每一行删除最后一列
      }
      this.setData({
        col:this.data.col-1,
        table: table
      });
    } else {
      wx.showToast({
        title: '至少保留一列',
        icon: 'none'
      });
    }
    
  },




  addRadioItem: function(e){
    const index= e.currentTarget.dataset.index
    const tempRadioGroup=this.data.radioGroup
    tempRadioGroup[index].push("")
    this.setData({
      radioGroup: tempRadioGroup
    })

    },
    removeRadioItem: function(e){
      const index= e.currentTarget.dataset.index
      const tempRadioGroup=this.data.radioGroup
      tempRadioGroup[index].pop()
      this.setData({
        radioGroup: tempRadioGroup
      })
  
      },

createRadioTable:function (e){
  const tempRadioGroupQuestion=this.data.radioGroupQuestion
  tempRadioGroupQuestion.push("")
  const tempRadioGroup = this.data.radioGroup
  tempRadioGroup.push(new Array())
this.setData({
  radioGroupQuestion:tempRadioGroupQuestion,
  radioGroup:tempRadioGroup
})

},

removeRadioTable:function (e){
  const tempRadioGroupQuestion=this.data.radioGroupQuestion
  tempRadioGroupQuestion.pop()
  const tempRadioGroup = this.data.radioGroup
  tempRadioGroup.pop()
  this.setData({
  radioGroupQuestion:tempRadioGroupQuestion,
  radioGroup:tempRadioGroup
})

},


removeRadioItemSpeacial:function(e){
const tempIndex =e.currentTarget.dataset.index
const tempRadioGroup=this.data.radioGroup
const tempRadioGroupQuestion=this.data.radioGroupQuestion
tempRadioGroup.splice(tempIndex,1)
tempRadioGroupQuestion.splice(tempIndex,1)
this.setData({
radioGroup:tempRadioGroup,
radioGroupQuestion:tempRadioGroupQuestion
})
},

addCheckItem: function(e){
  const index= e.currentTarget.dataset.index
  const tempCheckGroup=this.data.checkGroup
  tempCheckGroup[index].push("")
  this.setData({
    checkGroup: tempCheckGroup
  })

  },
  removeCheckItem: function(e){
    const index= e.currentTarget.dataset.index
    const tempCheckGroup=this.data.checkGroup
    tempCheckGroup[index].pop()
    this.setData({
      checkGroup: tempCheckGroup
    })

    },
    removeCheckItemSpecial:function(e){

const tempIndex =e.currentTarget.dataset.index
const tempCheckGroup=this.data.checkGroup
const tempCheckGroupQuestion=this.data.checkGroupQuestion
tempCheckGroup.splice(tempIndex,1)
tempCheckGroupQuestion.splice(tempIndex,1)
this.setData({
checkGroup:tempCheckGroup,
checkGroupQuestion:tempCheckGroupQuestion
})

},

    createCheckTable:function (e){
      const tempCheckGroupQuestion=this.data.checkGroupQuestion
      tempCheckGroupQuestion.push("")
      const tempCheckGroup = this.data.checkGroup
      tempCheckGroup.push(new Array())
    this.setData({
      checkGroupQuestion:tempCheckGroupQuestion,
      checkGroup:tempCheckGroup
    })
    
    },
    createLongText:function(e){
      const tempLongText = this.data.longText
      const tempTheMaxLengthOfLongText = this.data.theMaxLengthOfLongText
    const tempLongTextQuestion = this.data.longTextQuestion
      tempLongText.push("")
      tempLongTextQuestion.push("")
      tempTheMaxLengthOfLongText.push(100)
      this.setData({
        longTextQuestion:tempLongTextQuestion,
        longText:tempLongText,
        theMaxLengthOfLongText:tempTheMaxLengthOfLongText
      })

    },

    removeLongText:function(e){
      const tempLongText = this.data.longText
      const tempTheMaxLengthOfLongText = this.data.theMaxLengthOfLongText
    const tempLongTextQuestion = this.data.longTextQuestion
      tempLongText.pop()
      tempLongTextQuestion.pop()
      tempTheMaxLengthOfLongText.pop()
      this.setData({
        longTextQuestion:tempLongTextQuestion,
        longText:tempLongText,
        theMaxLengthOfLongText:tempTheMaxLengthOfLongText
      })

    },
    longTextQuestionInput:function(e){
      const tempIndex= e.currentTarget.dataset.index
      const tempLongTextQuestion = this.data.longTextQuestion
      tempLongTextQuestion[tempIndex]=e.detail.value
      this.setData({
        longTextQuestion:tempLongTextQuestion
      })
    },
    longTextInput:function(e){
      const tempIndex= e.currentTarget.dataset.index
      const tempLongText = this.data.longText
      tempLongText[tempIndex]=e.detail.value
      this.setData({
        longText:tempLongText
      })


    },
    addLength:function(e){
      const tempIndex= e.currentTarget.dataset.index
      const tempTheMaxLengthOfLongText=this.data.theMaxLengthOfLongText
     
      tempTheMaxLengthOfLongText[tempIndex]+=50
      this.setData({
        theMaxLengthOfLongText:tempTheMaxLengthOfLongText
      })

    },
    decLength:function(e){
      const tempIndex= e.currentTarget.dataset.index
      const tempTheMaxLengthOfLongText=this.data.theMaxLengthOfLongText
      if(tempTheMaxLengthOfLongText[tempIndex]<=0){
        return 
      }
      tempTheMaxLengthOfLongText[tempIndex]-=50

      this.setData({
        theMaxLengthOfLongText:tempTheMaxLengthOfLongText
      })

    },


    removeLongTextSpecial:function(e){

      const tempIndex =e.currentTarget.dataset.index
      const tempLongText=this.data.longText
      const tempLongTextQuestion=this.data.longTextQuestion
      const tempTheMaxLengthOfLongText=this.data.theMaxLengthOfLongText
      tempLongText.splice(tempIndex,1)
      tempLongTextQuestion.splice(tempIndex,1)
      tempTheMaxLengthOfLongText.splice(tempIndex,1)
      this.setData({
      longText:tempLongText,
      longTextQuestion:tempLongTextQuestion,
      theMaxLengthOfLongText:tempTheMaxLengthOfLongText
      })
      


    },

    saveToFormat:function(e){
  
      if(this.data.formatName==''){
        wx.showToast({
          title: '模版名字为空',
          icon:'error'
        });
        return
      }
      const db = wx.cloud.database();
      const collection = db.collection('format');
      const theFormatName=this.data.formatName

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
          collection.add({
            data:{
              formatName:this.data.formatName,
              remarks:this.data.remarks,
              row:this.data.row,
              col:this.data.col,
              widthArray:this.data.widthArray,
              table:this.data.table,
              radioGroupQuestion:this.data.radioGroupQuestion,
              radioGroup:this.data.radioGroup,
              checkGroupQuestion:this.data.checkGroupQuestion,
              checkGroup:this.data.checkGroup,
              longTextQuestion:this.data.longTextQuestion,
              longText:this.data.longText,
              theMaxLengthOfLongText:this.data.theMaxLengthOfLongText,
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
    
          })
        }
      }).catch(err => {
        console.error('查询失败:', err);
      })

     

    }
})


