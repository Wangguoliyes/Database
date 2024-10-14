// components/checkTable/checkTable.js
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
    onCheckChange:function(e){
      console.log(e)
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
   createCheckTable:function (e){
      const tempCheckGroupQuestion=this.data.formatData.checkGroupQuestion
      tempCheckGroupQuestion.push("")
      const tempCheckGroup = this.data.formatData.checkGroup
      tempCheckGroup.push(new Array())
    this.setData({
      formatData:{
        ...this.data.formatData,
        checkGroupQuestion:tempCheckGroupQuestion,
        checkGroup:tempCheckGroup
      }
   
    })
    
    },

    removeCheckTable:function (e){
      const tempCheckGroupQuestion=this.data.formatData.checkGroupQuestion
      tempCheckGroupQuestion.pop()
      const tempCheckGroup = this.data.formatData.checkGroup
      tempCheckGroup.pop()
    this.setData({
      formatData:{
        ...this.data.formatData,
        checkGroupQuestion:tempCheckGroupQuestion,
        checkGroup:tempCheckGroup
      }
   
    })
    
    },

    addCheckItem: function(e){
      const index= e.currentTarget.dataset.index
      const tempCheckGroup=this.data.formatData.checkGroup
      tempCheckGroup[index].push("")
      this.setData({
        formatData:{
          ...this.data.formatData,
          checkGroup: tempCheckGroup
        }
     
      })
    
      },
    removeCheckItem: function(e){
        const index= e.currentTarget.dataset.index
        const tempCheckGroup=this.data.formatData.checkGroup
        tempCheckGroup[index].pop()
        this.setData({
          formatData:{
            ...this.data.formatData,
            checkGroup: tempCheckGroup
          }
         
        })
    
        },
    removeCheckItemSpecial:function(e){
    
    const tempIndex =e.currentTarget.dataset.index
    const tempCheckGroup=this.data.formatData.checkGroup
    const tempCheckGroupQuestion=this.data.formatData.checkGroupQuestion
    tempCheckGroup.splice(tempIndex,1)
    tempCheckGroupQuestion.splice(tempIndex,1)
    this.setData({
      formatData:{
        ...this.data.formatData,
        checkGroup:tempCheckGroup,
        checkGroupQuestion:tempCheckGroupQuestion
      }

    })
    
    },


    checkQuestionInput:function(e){
      const tempTableIndex = e.currentTarget.dataset.tableindex
      const tempCheckGroupQuestion=this.data.formatData.checkGroupQuestion
      tempCheckGroupQuestion[tempTableIndex]=e.detail.value
      this.setData({
        formatData:{
          ...this.data.formatData,
          checkGroupQuestion: tempCheckGroupQuestion
        }
     
      })
    },
    checkItemInput:function(e){
      console.log(e)
      const tempTableIndex = e.currentTarget.dataset.tableindex
      const tempItemIndex = e.currentTarget.dataset.itemindex
      const tempCheckGroup=this.data.formatData.checkGroup
    
      tempCheckGroup[tempTableIndex][tempItemIndex]=e.detail.value
      this.setData({
        formatData:{
          ...this.data.formatData,

          checkGroup:tempCheckGroup
        }
        
      })
    },






  }
})