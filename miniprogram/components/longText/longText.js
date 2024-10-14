// components/longText/longText.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    able:{
      type:String,
      value:"true"
    },
    titleable:{
      type:String,
      value:"true"
    },
    contentable:{
      type:String,
      value:"true"
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    formatData:{}
  },
  lifetimes:{
    
  
  },
  /**
   * 组件的方法列表
   */
  methods: {
    createLongText:function(e){
      const tempLongText = this.data.formatData.longText
      const tempTheMaxLengthOfLongText = this.data.formatData.theMaxLengthOfLongText
    const tempLongTextQuestion = this.data.formatData.longTextQuestion
      tempLongText.push("")
      tempLongTextQuestion.push("")
      tempTheMaxLengthOfLongText.push(100)
      this.setData({
        formatData:{
          ...this.data.formatData,
          longTextQuestion:tempLongTextQuestion,
          longText:tempLongText,
          theMaxLengthOfLongText:tempTheMaxLengthOfLongText
        }
       
      })

    },




    removeLongText:function(e){
      const tempLongText = this.data.formatData.longText
      const tempTheMaxLengthOfLongText = this.data.formatData.theMaxLengthOfLongText
      const tempLongTextQuestion = this.data.formatData.longTextQuestion
      tempLongText.pop()
      tempLongTextQuestion.pop()
      tempTheMaxLengthOfLongText.pop()
      this.setData({
        formatData:{
          ...this.data.formatData,
          longTextQuestion:tempLongTextQuestion,
          longText:tempLongText,
          theMaxLengthOfLongText:tempTheMaxLengthOfLongText
        }
    
      })

    },
    longTextQuestionInput:function(e){
      const tempIndex= e.currentTarget.dataset.index
      const tempLongTextQuestion = this.data.formatData.longTextQuestion
      tempLongTextQuestion[tempIndex]=e.detail.value
      this.setData({
        formatData:{
          ...this.data.formatData,
          longTextQuestion:tempLongTextQuestion
        }
       
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
    addLength:function(e){
      const tempIndex= e.currentTarget.dataset.index
      const tempTheMaxLengthOfLongText=this.data.formatData.theMaxLengthOfLongText
     
      tempTheMaxLengthOfLongText[tempIndex]+=50
      this.setData({
        formatData:{
          ...this.data.formatData,
          theMaxLengthOfLongText:tempTheMaxLengthOfLongText
        }
     
      })

    },
    decLength:function(e){
      const tempIndex= e.currentTarget.dataset.index
      const tempTheMaxLengthOfLongText=this.data.formatData.theMaxLengthOfLongText
      if(tempTheMaxLengthOfLongText[tempIndex]<=0){
        return 
      }
      tempTheMaxLengthOfLongText[tempIndex]-=50

      this.setData({
        formatData:{
          ...this.data.formatData,
          theMaxLengthOfLongText:tempTheMaxLengthOfLongText
        }
    
      })

    },

    removeLongTextSpecial:function(e){

      const tempIndex =e.currentTarget.dataset.index
      const tempLongText=this.data.formatData.longText
      const tempLongTextQuestion=this.data.formatData.longTextQuestion
      const tempTheMaxLengthOfLongText=this.data.formatData.theMaxLengthOfLongText
      tempLongText.splice(tempIndex,1)
      tempLongTextQuestion.splice(tempIndex,1)
      tempTheMaxLengthOfLongText.splice(tempIndex,1)
      this.setData({
        formatData:{
          ...this.data.formatData,
          longText:tempLongText,
          longTextQuestion:tempLongTextQuestion,
          theMaxLengthOfLongText:tempTheMaxLengthOfLongText
        }
  
      })
      


    },




  }
})