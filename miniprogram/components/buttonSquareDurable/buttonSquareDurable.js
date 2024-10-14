// components/buttonSquare/buttonSquare.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    color:{
      type:String,
      value:"rgb(152, 208, 248)"
    },
    colorActive:{
      type:String,
      value:"red"
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    pressed:false,
    backgroundColor:"white"
  },
lifetimes:{
  ready(){
    this.setData({
      backgroundColor:this.data.color
    })
  }
},
  /**
   * 组件的方法列表
   */
  methods: {
    press:function(){
      this.triggerEvent('click')
      if(this.data.pressed==false){
        this.setData({
          pressed:true,
          backgroundColor:this.data.colorActive
        })
      }
      else{
        this.setData({
          pressed:false,
          backgroundColor:this.data.color
        })
      }
    }
  }
})