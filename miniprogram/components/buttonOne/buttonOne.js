// components/ButtonOne/buttonOne.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    color:{
      type:String,
      value:"rgb(205, 205, 240)"
    },
    title:{
      type:String,
      value:"默认按钮文本"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    Click(){
      console.log("buttonOne IS CLICKED")
      this.triggerEvent('click')
    }
  }
})