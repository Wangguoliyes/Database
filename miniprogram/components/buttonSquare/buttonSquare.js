// components/buttonSquare/buttonSquare.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    color:{
      type:String,
      value:"rgb(112, 248, 248)"
    },
    width:{
      type:String,
      value:"400rpx"
    },
    height:{
      type:String,
      value:"150rpx"
    },
   
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
    press:function(){
      this.triggerEvent('click')
    }
  }
})