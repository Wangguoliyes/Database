// components/radioTable/radioTable.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    able:{
      type:String,
      value:"true"
    },
    render:{
      type:String,
      value:"false"
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    formatData:{},
    value:[]
  },
  lifetimes:{
 
     
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRadioChange:function(e){
      if(this.data.value&&this.data.value.length!=0){
      console.log(e.currentTarget.dataset.index)
      console.log(e.detail.value)
      const tempValue=this.data.value
      tempValue[e.currentTarget.dataset.index]=e.detail.value
      
      this.setData({
        value:tempValue
      })
    }
    },
    createRadioTable:function (e){
      const tempRadioGroupQuestion=this.data.formatData.radioGroupQuestion
      tempRadioGroupQuestion.push("")
      const tempRadioGroup = this.data.formatData.radioGroup
      tempRadioGroup.push(new Array())
      this.setData({
      formatData:{
        ...this.data.formatData,
        radioGroupQuestion:tempRadioGroupQuestion,
        radioGroup:tempRadioGroup
      }
    
    })
    
    },
    removeRadioTable:function (e){
      const tempRadioGroupQuestion=this.data.formatData.radioGroupQuestion
      tempRadioGroupQuestion.pop()
      const tempRadioGroup = this.data.formatData.radioGroup
      tempRadioGroup.pop()
      this.setData({
      formatData:{
        ...this.data.formatData,
        radioGroupQuestion:tempRadioGroupQuestion,
        radioGroup:tempRadioGroup
      }
    
    })
    
    },
    addRadioItem: function(e){
      console.log("增加选项")
      const index= e.currentTarget.dataset.index
      const tempRadioGroup=this.data.formatData.radioGroup
      tempRadioGroup[index].push("")
      this.setData({
        formatData:{
          ...this.data.formatData,
          radioGroup: tempRadioGroup
        }
        
      })
  
      },
    removeRadioItem: function(e){
        const index= e.currentTarget.dataset.index
        const tempRadioGroup=this.data.formatData.radioGroup
        tempRadioGroup[index].pop()
        this.setData({
          formatData:{
            ...this.data.formatData,
            radioGroup: tempRadioGroup
          }
        })
    
      },

    removeRadioItemSpeacial:function(e){
          const tempIndex =e.currentTarget.dataset.index
          const tempRadioGroup=this.data.formatData.radioGroup
          const tempRadioGroupQuestion=this.data.formatData.radioGroupQuestion
          tempRadioGroup.splice(tempIndex,1)
          tempRadioGroupQuestion.splice(tempIndex,1)
          this.setData({
            formatData:{
              ...this.data.formatData,
              radioGroup:tempRadioGroup,
              radioGroupQuestion:tempRadioGroupQuestion
            }

         
          })
      },

    tableQuestionInput:function(e){
        const tempTableIndex = e.currentTarget.dataset.tableindex
        const tempRadioGroupQuestion=this.data.formatData.radioGroupQuestion
        tempRadioGroupQuestion[tempTableIndex]=e.detail.value
        this.setData({
          formatData:{
            ...this.data.formatData,
            radioGroupQuestion: tempRadioGroupQuestion
          }
         
        })
      },
    tableItemInput:function(e){
        console.log(e)
        const tempTableIndex = e.currentTarget.dataset.tableindex
        const tempItemIndex = e.currentTarget.dataset.itemindex
        const tempRadioGroup=this.data.formatData.radioGroup
      
        tempRadioGroup[tempTableIndex][tempItemIndex]=e.detail.value
        this.setData({
          formatData:{
            ...this.data.formatData,
            radioGroup:tempRadioGroup
          }

        })
      },

  }
})